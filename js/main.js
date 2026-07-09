const h=document.getElementById('hdr'),m=document.getElementById('mob'),n=document.getElementById('nav');
window.addEventListener('scroll',()=>h.classList.toggle('scrolled',scrollY>50));
if(m&&n){m.addEventListener('click',()=>n.classList.toggle('open'));n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>n.classList.remove('open')))}

const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.querySelectorAll('.faq-q').forEach(b=>{b.addEventListener('click',()=>{const i=b.parentElement,o=i.classList.contains('on');document.querySelectorAll('.faq-i').forEach(x=>x.classList.remove('on'));if(!o)i.classList.add('on')})});
const f=document.getElementById('contactForm');
if(f)f.addEventListener('submit',async e=>{e.preventDefault();const t=e.target,b=t.querySelector('button[type=submit]'),o=b.textContent;b.textContent='Sending...';b.disabled=true;try{const r=await fetch(t.action,{method:'POST',body:new FormData(t)}),d=await r.json();if(d.success)t.innerHTML='<div style="text-align:center;padding:3rem 1rem"><h3 style="font-size:1.3rem;font-weight:700;margin-bottom:.5rem;color:#7A1215">Message Sent!</h3><p style="color:#555">Thank you. We\'ll get back to you soon.</p></div>';else throw 0}catch(e){b.textContent='Error — Try Again';b.disabled=false;setTimeout(()=>b.textContent=o,3000)}});
