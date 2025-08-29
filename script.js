// Basic interactivity: smooth scroll, active nav link, mobile toggle, back-to-top, form demo
document.addEventListener('DOMContentLoaded', () => {
  // Update year
  document.getElementById('year').innerText = new Date().getFullYear();

  // Smooth links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(!href || href === '#') return;
      const el = document.querySelector(href);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile menu if open
        if(window.innerWidth < 700) toggleMenu(false);
      }
    });
  });

  // Active nav link on scroll
  const links = Array.from(document.querySelectorAll('.nav-link'));
  const sections = links.map(l => document.querySelector(l.getAttribute('href')));
  function onScroll(){
    const y = window.scrollY + 120; // offset for header
    let current = sections[0];
    for(const s of sections){
      if(s && s.offsetTop <= y) current = s;
    }
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current.id));
    // back-to-top
    const btt = document.getElementById('backToTop');
    btt.style.display = window.scrollY > 600 ? 'block' : 'none';
  }
  onScroll();
  document.addEventListener('scroll', onScroll, {passive:true});

  // Back to top
  document.getElementById('backToTop').addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  menuToggle.addEventListener('click', ()=> toggleMenu());
  function toggleMenu(force){
    const nav = document.getElementById('nav');
    const show = typeof force === 'boolean' ? force : !nav.style.display || nav.style.display === 'none';
    nav.style.display = show ? 'flex' : 'none';
    if(show){ nav.style.flexDirection = 'column'; nav.style.gap='6px'; nav.style.position='absolute'; nav.style.top='64px'; nav.style.right='18px'; nav.style.background='rgba(2,6,10,0.9)'; nav.style.padding='10px'; nav.style.borderRadius='8px'}
    else { nav.style.removeProperty('flex-direction'); nav.style.removeProperty('gap'); nav.style.removeProperty('position'); nav.style.removeProperty('top'); nav.style.removeProperty('right'); nav.style.removeProperty('background'); nav.style.removeProperty('padding'); nav.style.removeProperty('border-radius'); nav.style.display = '' }
  }

  // Demo contact form handler (no backend)
  window.submitForm = function(e){
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const name = data.get('name') || 'Friend';
    alert(`Thanks ${name}! This demo form doesn't send messages. Wire a backend or a form service to accept messages.`);
    form.reset();
    return false;
  };
});
