# Lua Travel & Tours — website operations

## Shared components
- `assets/site-system.css` is the central source for fonts (Jost / Cormorant Garamond), palette, core buttons and image placeholders.
- `assets/site-shared.js` is the central source for the standard footer markup, Travel Agents navigation link, and media enhancements.
- Existing page headers remain in HTML to preserve each page's design and existing event listeners. The shared script inserts the B2B navigation entry. To change full header layouts, consolidate those page-specific HTML fragments in a subsequent refactor.
- Existing page-level CSS remains for compatibility; further cleanup should remove redundant rules in stages and be visually tested.

## Forms — REQUIRED owner activation
The following static-site forms POST to `https://formsubmit.co/info@luawellnesstravel.com`:
- `contact.html` — travel enquiries
- `travel-agents.html` — B2B trade enquiries

The mailto-only JavaScript handler on Contact was removed.

**IMPORTANT**: FormSubmit requires mailbox confirmation when the address is first activated. An authorized owner of `info@luawellnesstravel.com` must:
1. Open the published Contact page and submit a safe, clearly labelled TEST enquiry.
2. Check the business inbox for the FormSubmit activation email and approve it.
3. Submit another test after activation; check the email arrives and the thank-you redirect works.
4. Repeat a test with the B2B form; confirm the subject distinguishes B2B and B2C leads.

Until confirmation and real delivery testing, DO NOT advertise the forms as live. No confirmation email has been clicked or test submission performed as part of this repository change. Spam filtering and personal-data handling are delegated to the provider; review their policies before collecting real customer details.

## Image improvements and remaining work
The shared script enables lazy loading and async decoding for existing images where appropriate, and provides a neutral fallback when an image cannot load. Existing hotel catalogue cards already use lazy loading; Google Drive thumbnail requests in `hotels.html` were reduced from w1600 to w960 where applicable.

**Not yet complete:** Images still hotlink to Google Drive and external hotels. Rehosting and compression requires a verified source library and suitable upload mechanism. Next step: inventory each source, save web-optimized WebP/AVIF files under versioned assets or a reliable image CDN, and update both catalogue and hotel detail galleries. Verify actual file loading on desktop and mobile.

## Business links
- `travel-agents.html` — For Travel Agents, with services, process and Request B2B Rates form
- `thank-you.html` — a confirmation landing page reached only after the form provider's redirect

## Pre-launch checklist
- [ ] Activate FormSubmit business email address
- [ ] Test Contact & B2B form deliveries end-to-end
- [ ] Check page redirects after submit on mobile and desktop
- [ ] Audit broken external images and backup local assets
- [ ] Review privacy/data protection disclosures
- [ ] Check responsive header/menu after the shared B2B link was added
- [ ] Run Lighthouse and keyboard accessibility checks
- [ ] Verify GitHub Pages deployment branch and successful publishing
