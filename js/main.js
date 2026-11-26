/* Jul's Auto Repair — interactions */
(function(){
  'use strict';
  var doc = document;

  /* Hero monument reveal on load */
  window.addEventListener('load', function(){ doc.body.classList.add('ready'); });
  // fallback if load already fired
  if (doc.readyState === 'complete') doc.body.classList.add('ready');

  /* Header: solid after scroll */
  var hdr = doc.getElementById('hdr');
  var heroEl = doc.querySelector('.hero, .pghero');
  function onScroll(){
    if (!hdr) return;
    var y = window.scrollY || window.pageYOffset;
    if (y > 40) hdr.classList.add('solid'); else hdr.classList.remove('solid');
  }
  // sub-pages: header is over a short dark hero — switch to light once past it
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* Mobile nav */
  var burger = doc.getElementById('burger');
  var mnav = doc.getElementById('mnav');
  if (burger && mnav){
    burger.addEventListener('click', function(){
      mnav.classList.toggle('open');
      doc.body.style.overflow = mnav.classList.contains('open') ? 'hidden' : '';
    });
    mnav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ mnav.classList.remove('open'); doc.body.style.overflow=''; });
    });
  }

  /* Reveal on scroll */
  var revs = doc.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revs.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:0.14, rootMargin:'0px 0px -8% 0px'});
    revs.forEach(function(el){ io.observe(el); });
  } else {
    revs.forEach(function(el){ el.classList.add('in'); });
  }

  /* FAQ accordion */
  doc.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click', function(){
      var item = q.closest('.faq-i');
      var ans = item.querySelector('.faq-a');
      var open = item.classList.toggle('open');
      ans.style.maxHeight = open ? ans.scrollHeight + 'px' : 0;
      q.setAttribute('aria-expanded', open);
    });
  });

  /* Services: hover/focus shows detail */
  var sd = doc.getElementById('svcDetail');
  if (sd){
    var sdName = sd.querySelector('.sd-name');
    var sdDesc = sd.querySelector('.sd-desc');
    doc.querySelectorAll('.svc-list button').forEach(function(b){
      function show(){
        doc.querySelectorAll('.svc-list button').forEach(function(x){x.classList.remove('on');});
        b.classList.add('on');
        sdName.textContent = b.dataset.name || b.textContent;
        sdDesc.textContent = b.dataset.desc || '';
      }
      b.addEventListener('mouseenter', show);
      b.addEventListener('focus', show);
      b.addEventListener('click', show);
    });
  }

  /* Live "Open now" status from hours: Mon–Fri 7–17, Sat 8–14 */
  (function(){
    var el = doc.getElementById('openStatus');
    if (!el) return;
    var now = new Date();
    var day = now.getDay();            // 0 Sun .. 6 Sat
    var mins = now.getHours()*60 + now.getMinutes();
    var open=false, closeTxt='', nextTxt='';
    if (day>=1 && day<=5){ if (mins>=420 && mins<1020){ open=true; closeTxt='Closes 5 PM'; } }
    else if (day===6){ if (mins>=480 && mins<840){ open=true; closeTxt='Closes 2 PM'; } }
    if (!open){
      if (day===6 && mins>=840) nextTxt='Opens Mon 7 AM';
      else if (day===0) nextTxt='Opens Mon 7 AM';
      else if (day>=1 && day<=5 && mins>=1020) nextTxt = (day===5) ? 'Opens Sat 8 AM' : 'Opens 7 AM tomorrow';
      else if (day===6) nextTxt='Opens 8 AM';
      else nextTxt='Opens 7 AM';
    }
    var label = doc.getElementById('openLabel');
    if (open){ el.classList.remove('closed'); if(label) label.textContent='Open now'; var c=doc.getElementById('openSub'); if(c) c.textContent=closeTxt; }
    else { el.classList.add('closed'); if(label) label.textContent='Closed'; var s=doc.getElementById('openSub'); if(s) s.textContent=nextTxt; }
  })();

  /* Current year */
  var yr = doc.getElementById('yr'); if (yr) yr.textContent = new Date().getFullYear();
})();
