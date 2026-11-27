/* Shared Lua navigation, footer links and media behaviour. Loaded on static GitHub Pages. */
(()=>{'use strict';
const partnerHref='travel-agents.html';
const footerMarkup=`<div class="lua-footer-inner">
<div class="lua-footer-grid">
<div class="lua-footer-company"><a href="index.html" aria-label="Lua Travel homepage"><img class="lua-footer-logo" src="assets/lua-logo.svg" alt="Lua Travel"></a><p class="lua-footer-brand-line">Lua Travel</p><p class="lua-footer-address">Group 10, Son Pho 1 Block, Hoi An Dong Ward,<br>Da Nang City, Vietnam</p><a href="mailto:info@luawellnesstravel.com">info@luawellnesstravel.com</a><a href="https://wa.me/84988849593" target="_blank" rel="noopener noreferrer">WhatsApp: +84 988 849 593</a><a href="tel:+610474425066">Australia: +61 047 442 5066</a></div>
<div><h4>Explore</h4><ul><li><a href="destinations.html">Destinations</a></li><li><a href="tours.html">Our Tours</a></li><li><a href="hotels.html">Hotels</a></li><li><a href="cruise.html">Cruise</a></li></ul></div>
<div><h4>Company</h4><ul><li><a href="about.html">About Lúa</a></li><li><a href="blogs.html">Travel Journal</a></li><li><a href="contact.html">Contact us</a></li><li><a href="travel-agents.html">For Travel Agents</a></li></ul></div>
<div><h4>Support</h4><ul><li><a href="faq.html">FAQs</a></li><li><a href="contact.html">Send an enquiry</a></li><li><a href="tel:+84388855913">Hotline / Zalo: +84 388 855 913</a></li></ul></div></div>

<div class="lua-footer-base"><div class="lua-footer-social" aria-label="Follow Lua Travel on social media">
<a href="https://www.facebook.com/LuaWellnessTravel" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg></a>
<a href="https://www.instagram.com/lua_wellness_travel" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.8" r="1.2" fill="currentColor"/></svg></a>
<a href="https://www.linkedin.com/company/luatravel/posts/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5.1 3a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2zM3.4 8.7h3.4V21H3.4zM9 8.7h3.25v1.68h.05c.46-.87 1.59-1.94 3.28-1.94 3.5 0 4.15 2.21 4.15 5.08V21h-3.4v-6.67c0-1.59-.03-3.63-2.21-3.63-2.22 0-2.56 1.73-2.56 3.52V21H9z"/></svg></a></div><span>© ${new Date().getFullYear()} Lua Travel. All rights reserved.</span></div></div>`;
function prepare(){
  const header=document.querySelector('header');
  const nav=header?.querySelector('nav.nav, nav.lj-nav, nav.lc-detail-nav, nav.hc-nav-group');
  if(nav&&!nav.querySelector('.lua-partner-nav')){
    const link=document.createElement('a');link.href=partnerHref;link.className='lua-partner-nav';link.textContent='For Travel Agents';
    const cta=nav.querySelector('.nav-cta,.hc-enquire')||[...nav.querySelectorAll('a')].find(a=>/plan your trip|enquire/i.test(a.textContent));
    if(cta)nav.insertBefore(link,cta);else nav.append(link);
  }
  if(nav && !nav.querySelector('a[href="blogs.html"]')){
    const journal=document.createElement('a');
    journal.href='blogs.html';
    journal.textContent='Travel Journal';
    journal.className='lua-journal-nav';
    const partner=nav.querySelector('.lua-partner-nav');
    if(partner)nav.insertBefore(journal,partner);
    else nav.append(journal);
  }
  // Keep navigation labels in title case, even on pages with legacy uppercase styles.
  if(nav){
    const labels={'destinations.html':'Destinations','tours.html':'Our Tours','hotels.html':'Hotels','cruise.html':'Cruise','about.html':'About Lúa','blogs.html':'Travel Journal','travel-agents.html':'For Travel Agents'};
    nav.querySelectorAll('a').forEach(link=>{
      const label=labels[link.getAttribute('href')];
      if(label && link.childElementCount===0)link.textContent=label;
      if(link.childElementCount===0 && /plan your trip/i.test(link.textContent))link.textContent=link.textContent.replace(/plan your trip/i,'Plan Your Trip');
      link.style.setProperty('text-transform','none','important');
    });
  }
  const footer=document.querySelector('footer.lua-site-footer') || document.querySelector('footer') || document.createElement('footer');
  footer.id='lua-shared-footer';
  footer.classList.add('lua-site-footer');
  footer.innerHTML=footerMarkup;
  if(!footer.isConnected)document.body.append(footer);
  const footerStyle=document.createElement('style');
  footerStyle.textContent=`
@font-face{font-family:Lua Footer Spectral;src:url("assets/fonts/spectral/Spectral-Regular.ttf") format("truetype");font-weight:400;font-display:swap}
html body footer#lua-shared-footer.lua-site-footer {
  background:#1d211e!important;color:#cfd4ca!important;
  padding:clamp(34px,4vw,58px) 0 16px!important;
}
html body #lua-shared-footer :is(div,p,a,li,h4,span) {
  font-family:"Lua Footer Spectral",Georgia,serif!important;font-weight:400!important;
}
html body #lua-shared-footer .lua-footer-inner {
  width:min(1160px,calc(100% - 64px))!important;max-width:none!important;margin:0 auto!important;
}
html body #lua-shared-footer .lua-footer-grid {
  display:grid!important;grid-template-columns:1.5fr .85fr .95fr 1fr;
  gap:24px clamp(20px,4vw,64px)!important;padding:0 0 22px!important;
}
html body #lua-shared-footer .lua-footer-company {
  display:grid!important;grid-template-columns:38px minmax(0,1fr);align-content:start;align-items:center;
}
html body #lua-shared-footer .lua-footer-company>* {grid-column:1/-1}
html body #lua-shared-footer .lua-footer-company>a:first-child {grid-area:1/1;margin:0!important}
html body #lua-shared-footer .lua-footer-brand-line {
  grid-area:1/2;margin:0!important;font-size:23px!important;line-height:1.05!important;color:#f2eee5!important;
}
html body #lua-shared-footer .lua-footer-logo {
  display:block;width:38px!important;height:38px!important;object-fit:contain;
  margin:0!important;filter:brightness(0) invert(1)!important;
}
html body #lua-shared-footer .lua-footer-grid h4 {
  margin:4px 0 12px!important;font-size:15px!important;line-height:1.5!important;
  text-transform:none!important;letter-spacing:.02em!important;color:#f2eee5!important;
}
html body #lua-shared-footer .lua-footer-grid ul {padding:0!important;margin:0!important;list-style:none}
html body #lua-shared-footer .lua-footer-grid li {padding:0!important;margin:0 0 6px!important}
html body #lua-shared-footer .lua-footer-grid a:not(:first-child), 
html body #lua-shared-footer .lua-footer-grid li a,
html body #lua-shared-footer .lua-footer-address {
  color:#cfd4ca!important;font-size:12px!important;line-height:1.65!important;letter-spacing:normal!important;
}
html body #lua-shared-footer .lua-footer-company>a:not(:first-child) {margin:0 0 3px!important}
html body #lua-shared-footer .lua-footer-address {margin:10px 0 6px!important}
html body #lua-shared-footer .lua-footer-base {
  display:flex!important;align-items:center;justify-content:space-between;gap:16px;
  margin:0!important;padding:12px 0 0!important;border-top:1px solid #ffffff26!important;
  color:#cfd4ca!important;font-size:11px!important;
}
html body #lua-shared-footer .lua-footer-social {display:flex;gap:10px}
html body #lua-shared-footer .lua-footer-social a {
  display:grid;place-items:center;width:32px!important;height:32px!important;
  border:1px solid #ffffff66!important;border-radius:50%!important;
  background:transparent!important;color:#e1e7dd!important;
}
html body #lua-shared-footer .lua-footer-social svg {width:14px;height:14px}
html body #lua-shared-footer a:hover {text-decoration:underline}
@media(max-width:900px){
  html body #lua-shared-footer .lua-footer-grid {grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media(max-width:600px){
  html body #lua-shared-footer .lua-footer-inner {width:calc(100% - 40px)!important}
  html body #lua-shared-footer .lua-footer-company {grid-column:1/-1}
}`;
  document.head.append(footerStyle);
  document.querySelectorAll('main img').forEach(img=>{
    if(!img.hasAttribute('decoding'))img.decoding='async';
    if(!img.hasAttribute('loading')&&!img.closest('.hero,.lua-showcase-hero,.lt-hero'))img.loading='lazy';
    img.addEventListener('error',()=>{
      if(img.classList.contains('lua-image-error')||!img.parentElement)return;
      img.classList.add('lua-image-error');
      const placeholder=document.createElement('span');placeholder.className='lua-img-fallback';
      placeholder.setAttribute('role','img');placeholder.setAttribute('aria-label','Image unavailable');
      placeholder.textContent='Image currently unavailable';
      img.insertAdjacentElement('afterend',placeholder);
    });
  });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',prepare,{once:true});else prepare();
})();
