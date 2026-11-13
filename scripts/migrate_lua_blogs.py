#!/usr/bin/env python3
"""Migrate editorial bodies and inline images from Lua Wellness Travel to Lua Travel.
Run in GitHub Actions; keep the source as an attribution link in each article."""
import json
import re
import os
import time
import html
from pathlib import Path
from urllib.parse import urljoin, urlparse
import requests
from bs4 import BeautifulSoup, NavigableString, Tag
import trafilatura

ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / "assets/blog-archive.js"
OUTPUT = ROOT / "assets/blog-content.js"
IMAGES = ROOT / "assets/blog-inline"
IMAGES.mkdir(parents=True, exist_ok=True)
DATA = json.loads(ARCHIVE.read_text(encoding="utf8").split("=", 1)[1].rstrip(";\n "))
BASE = "https://luawellnesstravel.com"
KNOWN = {
  183: "/b183-handmade-souvenirs-in-hoi-an-a-guide-to-local-crafts.html",
  182: "/b182-hoi-an-after-dark-hidden-bars-local-food.html",
  181: "/b181-thu-bon-river-in-hoi-an-culture-life-local-stories.html",
  180: "/b180-discover-rural-vietnam-a-countryside-escape-in-hoi-an.html",
}
session = requests.Session()
session.headers.update({"User-Agent": "Mozilla/5.0 (compatible; LuaTravelMigration/1.0; +https://linhhoangvo.github.io/Luatravel/)", "Accept-Language":"en-US,en;q=0.9"})
BAD_WORDS = {"popular blogs", "filter articles", "read this next", "categories", "partner", "company", "support", "content", "search"}

def is_bad(el):
    if el.name in ("script", "style", "noscript", "nav", "footer", "header", "form", "button", "iframe"):
        return True
    names = " ".join(el.get("class", [])).lower() + " " + str(el.get("id", "")).lower()
    return any(x in names for x in ("sidebar", "breadcrumb", "social", "share", "related", "comment", "menu", "pagination", "toc", "footer", "widget"))

def fetch(url, tries=3):
    for i in range(tries):
        try:
            response = session.get(url, timeout=32)
            response.raise_for_status()
            response.encoding = response.apparent_encoding or "utf-8"
            return response.text
        except Exception as exc:
            if i == tries - 1:
                raise
            time.sleep(2 * (i+1))

def clean_fragment(fragment, pageurl, itemid):
    soup = BeautifulSoup(fragment, "html.parser")
    for t in list(soup.find_all(True)):
        if is_bad(t):
            t.decompose()
    for t in list(soup.find_all(True)):
        if t.name not in ("p", "h2", "h3", "h4", "h5", "ul", "ol", "li", "strong", "b", "em", "i", "a", "blockquote", "figure", "figcaption", "img", "br", "div", "span"):
            t.unwrap()
    for tag in list(soup.find_all(True)):
        if tag.name == "a":
            href = tag.get("href", "")
            if href.startswith(("http://", "https://", "/", "#")):
                tag.attrs = {"href": urljoin(pageurl, href), "rel": "noopener noreferrer"}
            else:
                tag.unwrap()
        elif tag.name == "img":
            src = tag.get("data-src") or tag.get("data-original") or tag.get("src") or ""
            # Responsive source may be in source tags, but prefer actual src.
            src = urljoin(pageurl, src)
            if not src.startswith(("http://", "https://")):
                tag.decompose()
                continue
            ext = os.path.splitext(urlparse(src).path)[1].lower()
            if ext not in (".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"):
                ext = ".jpg"
            name = f"{itemid}-{len(list(IMAGES.glob(str(itemid)+'-*')))+1:02d}{ext}"
            local = IMAGES / name
            try:
                resp = session.get(src, timeout=24)
                resp.raise_for_status()
                ct = resp.headers.get("content-type", "").lower()
                if len(resp.content) > 1000 and "image" in ct and len(resp.content) < 12_000_000:
                    local.write_bytes(resp.content)
                    src = f"assets/blog-inline/{name}"
            except Exception as exc:
                print(f"  image unavailable: {src}: {str(exc)[:100]}", flush=True)
            tag.attrs = {"src": src, "alt":tag.get("alt") or "", "loading":"lazy", "decoding":"async"}
        else:
            tag.attrs = {}
    for tag in list(soup.find_all(("div", "span"))):
        tag.unwrap()
    for tag in list(soup.find_all(["p", "li", "h2", "h3", "h4"])):
        if not tag.get_text(" ", strip=True) and not tag.find("img"):
            tag.decompose()
    return str(soup)

def get_fragment(source, title):
    parsed = BeautifulSoup(source, "html.parser")
    for t in parsed(["script", "style", "noscript"]):
        t.decompose()
    heading = next((h for h in parsed.find_all("h1") if title.lower()[:20] in h.get_text(" ", strip=True).lower()), None)
    if heading is None:
        heading = parsed.find("h1")
    if heading:
        # Find the smallest parent which contains the article body and 2+ subheadings.
        candidates = []
        for parent in list(heading.parents):
            if parent.name in ("html", "body"):
                continue
            hs = parent.find_all(["h2","h3","h4"])
            length = len(parent.get_text(" ", strip=True))
            if length > 650 and len(hs) >= 2:
                candidates.append((length, parent))
        if candidates:
            parent = min(candidates, key=lambda x:x[0])[1]
            # Find first editorial subheading, then take all body nodes before sidebar begins.
            headings = parent.find_all(["h2", "h3", "h4"])
            first = next((h for h in headings if h.get_text(" ", strip=True).lower() not in BAD_WORDS
                           and h.get_text(" ",strip=True).lower() not in ("content",)), None)
            if first:
                pieces = []
                # Use the stream in DOM order, while excluding sidebar and navigation.
                for tag in parent.find_all(["h2","h3","h4","p","ul","ol","img","figure","blockquote"]):
                    if tag is first or pieces:
                        if any(is_bad(a) for a in [tag]+list(tag.parents)[:-1]):
                            continue
                        txt = tag.get_text(" ", strip=True).lower()
                        if tag.name in ("h2","h3","h4") and (txt in BAD_WORDS or txt.startswith("filter articles")):
                            break
                        if tag.find_parent(["figure","ul","ol"]) and tag.name in ("img","p"):
                            continue
                        pieces.append(str(tag))
                fragment = "".join(pieces)
                if len(BeautifulSoup(fragment,"html.parser").get_text(" ",strip=True)) > 550:
                    return fragment
    # fallback to trafilatura's semantic extraction
    result = trafilatura.extract(source, output_format="html", include_images=True, include_links=True,
                                 include_formatting=True, favor_recall=True)
    if not result:
        raise ValueError("No readable article text found")
    parsed = BeautifulSoup(result, "html.parser")
    for t in parsed.find_all(["h1"]):
        if title[:20].lower() in t.get_text(" ",strip=True).lower():
            t.decompose()
    return str(parsed)

existing = {}
if OUTPUT.exists():
    match = re.search(r"window\.LUA_BLOG_CONTENT=(.*);\s*$", OUTPUT.read_text(encoding="utf8"), re.S)
    if match:
        try:
            existing = json.loads(match.group(1))
        except ValueError:
            pass
results = dict(existing)
failed = []
for n,item in enumerate(DATA,1):
    article_id = item["id"]
    url = item.get("original_url") or urljoin(BASE, KNOWN.get(article_id, ""))
    if not url or url == BASE:
        failed.append((article_id, "No source URL"))
        continue
    try:
        raw = fetch(url)
        fragment = get_fragment(raw, item["title"])
        output = clean_fragment(fragment, url, article_id)
        plain = BeautifulSoup(output, "html.parser").get_text(" ", strip=True)
        if len(plain) < 450:
            raise ValueError(f"Extracted body too short: {len(plain)}")
        subheads = len(BeautifulSoup(output,"html.parser").find_all(["h2","h3","h4"]))
        results[str(article_id)] = {"html":output, "source":url, "cover":item.get("image","")}
        print(f"[{n:02d}/{len(DATA)}] OK {article_id}: {len(plain)} chars; {subheads} headings",flush=True)
    except Exception as exc:
        failed.append((article_id, str(exc)))
        print(f"[{n:02d}/{len(DATA)}] FAILED {article_id}: {exc}",flush=True)
    time.sleep(.4)
OUTPUT.write_text("window.LUA_BLOG_CONTENT="+json.dumps(results,ensure_ascii=False,separators=(",",":"))+";\n",encoding="utf8")
print(f"FINISHED: {len(results)}/{len(DATA)} articles; failed={failed}",flush=True)
if len(results) < len(DATA):
    # Keep partial successful content; make failures visible in Actions logs.
    raise SystemExit(2)
