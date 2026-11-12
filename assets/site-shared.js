/* Shared Lua navigation, footer links and media behaviour. Loaded on static GitHub Pages. */
(()=>{'use strict';
const partnerHref='travel-agents.html';
const footerMarkup=`<div class="lua-footer-inner">
<div class="lua-footer-grid">
<div class="lua-footer-company"><a href="index.html" aria-label="Lua Travel & Tours homepage"><img class="lua-footer-logo" src="assets/lua-logo.svg" alt="Lua Travel & Tours"></a><p class="lua-footer-address">Group 10, Son Pho 1 Block, Hoi An Dong Ward,<br>Da Nang City, Vietnam</p><a href="mailto:info@luawellnesstravel.com">info@luawellnesstravel.com</a><a href="https://wa.me/84988849593" target="_blank" rel="noopener noreferrer">WhatsApp: +84 988 849 593</a><a href="tel:+610474425066">Australia: +61 047 442 5066</a></div>
<div><h4>Explore</h4><ul><li><a href="destinations.html">Destinations</a></li><li><a href="tours.html">Our Tours</a></li><li><a href="hotels.html">Hotels</a></li><li><a href="cruise.html">Cruise</a></li></ul></div>
<div><h4>Company</h4><ul><li><a href="about.html">About Lúa</a></li><li><a href="contact.html">Contact us</a></li><li><a href="travel-agents.html">For Travel Agents</a></li></ul></div>
<div><h4>Support</h4><ul><li><a href="faq.html">FAQs</a></li><li><a href="contact.html">Send an enquiry</a></li><li><a href="tel:+84388855913">Hotline / Zalo: +84 388 855 913</a></li></ul></div></div>
<div class="lua-footer-base"><div class="lua-footer-social" aria-label="Follow Lua Travel on social media">
<a href="https://www.facebook.com/LuaWellnessTravel" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg></a>
<a href="https://www.instagram.com/lua_wellness_travel" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.8" r="1.2" fill="currentColor"/></svg></a>
<a href="https://www.linkedin.com/company/luatravel/posts/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5.1 3a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2zM3.4 8.7h3.4V21H3.4zM9 8.7h3.25v1.68h.05c.46-.87 1.59-1.94 3.28-1.94 3.5 0 4.15 2.21 4.15 5.08V21h-3.4v-6.67c0-1.59-.03-3.63-2.21-3.63-2.22 0-2.56 1.73-2.56 3.52V21H9z"/></svg></a></div><span>© ${new Date().getFullYear()} Lua Travel &amp; Tours. All rights reserved.</span></div></div>`;
function prepare(){
  const header=document.querySelector('header');
  const nav=header?.querySelector('nav.nav, nav.lj-nav, nav.lc-detail-nav, nav.hc-nav-group');
  if(nav&&!nav.querySelector('.lua-partner-nav')){
    const link=document.createElement('a');link.href=partnerHref;link.className='lua-partner-nav';link.textContent='For Travel Agents';
    const cta=nav.querySelector('.nav-cta,.hc-enquire')||[...nav.querySelectorAll('a')].find(a=>/plan your trip|enquire/i.test(a.textContent));
    if(cta)nav.insertBefore(link,cta);else nav.append(link);
  }
  const footer=document.querySelector('footer.lua-site-footer');
  if(footer)footer.innerHTML=footerMarkup;
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
