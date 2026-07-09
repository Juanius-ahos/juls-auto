/* ============================================
   Jul's Auto Repair — main.js
   ============================================ */

/* 1. HEADER SCROLL EFFECT */
const h = document.getElementById('hdr');
window.addEventListener('scroll', () => {
  h.classList.toggle('scrolled', scrollY > 50);
});

/* 2. MOBILE MENU */
const m = document.getElementById('mob'), n = document.getElementById('nav');
if (m && n) {
  m.addEventListener('click', () => n.classList.toggle('open'));
  n.querySelectorAll('a').forEach(a => a.addEventListener('click', () => n.classList.remove('open')));
}

/* 3. SCROLL REVEAL */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: .15, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* 4. FAQ ACCORDION */
document.querySelectorAll('.faq-q').forEach(b => {
  b.addEventListener('click', () => {
    const i = b.parentElement, o = i.classList.contains('on');
    document.querySelectorAll('.faq-i').forEach(x => x.classList.remove('on'));
    if (!o) i.classList.add('on');
  });
});

/* 5. CONTACT FORM (Web3Forms) */
const f = document.getElementById('contactForm');
if (f) f.addEventListener('submit', async e => {
  e.preventDefault();
  const t = e.target, b = t.querySelector('button[type=submit]'), o = b.textContent;
  b.textContent = 'Sending...';
  b.disabled = true;
  try {
    const r = await fetch(t.action, { method: 'POST', body: new FormData(t) });
    const d = await r.json();
    if (d.success)
      t.innerHTML = '<div style="text-align:center;padding:3rem 1rem"><h3 style="font-size:1.3rem;font-weight:700;margin-bottom:.5rem;color:#7A1215">Message Sent!</h3><p style="color:#555">Thank you. We\'ll get back to you soon.</p></div>';
    else throw 0;
  } catch (e) {
    b.textContent = 'Error — Try Again';
    b.disabled = false;
    setTimeout(() => b.textContent = o, 3000);
  }
});

/* 6. CAROUSEL */
const track = document.querySelector('.carousel-track');
if (track) {
  let currentSlide = 0;
  const images = track.querySelectorAll('img');
  const dotsContainer = document.getElementById('carouselDots');

  images.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  });

  function goToSlide(n) {
    currentSlide = n;
    track.style.transform = `translateX(-${n * 100}%)`;
    document.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === n));
  }

  window.moveCarousel = function (dir) {
    let next = currentSlide + dir;
    if (next < 0) next = images.length - 1;
    if (next >= images.length) next = 0;
    goToSlide(next);
  };

  setInterval(() => moveCarousel(1), 5000);
}

/* 7. COUNTER ANIMATION */
const counters = document.querySelectorAll('.hero-stat-num[data-target]');
if (counters.length) {
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let current = 0;
        const increment = target / 30;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current);
          }
        }, 40);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));
}

/* 8. PARALLAX EFFECT */
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-bg');
  if (hero && scrollY < window.innerHeight) {
    hero.style.transform = `translateY(${scrollY * 0.3}px)`;
  }
});