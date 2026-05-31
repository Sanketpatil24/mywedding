// ── CURSOR ──
(function(){
  const cur=document.getElementById('cursor');
  const ring=document.getElementById('cursor-ring');
  if(!cur||!ring)return;
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;
    cur.style.left=mx+'px';cur.style.top=my+'px';
  });
  function animRing(){
    rx+=(mx-rx)*.12;ry+=(my-ry)*.12;
    ring.style.left=rx+'px';ring.style.top=ry+'px';
    requestAnimationFrame(animRing);
  }
  animRing();
  document.querySelectorAll('a,button,.card,.ritual-card,.flight-card,.stay-card,.attire-card-sub,.chip').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-grow'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-grow'));
  });
})();

// ── NAV SCROLL ──
(function(){
  const nav=document.getElementById('main-nav');
  if(!nav)return;
  const isLight=nav.classList.contains('light');
  if(!isLight){
    window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>60));
  }
})();

// ── MOBILE MENU ──
let _mopen=false;
function toggleMenu(){
  _mopen=!_mopen;
  document.getElementById('mmenu').classList.toggle('open',_mopen);
}
function closeMenu(){
  _mopen=false;
  document.getElementById('mmenu').classList.remove('open');
}

// ── SCROLL REVEAL ──
(function(){
  const ro=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){e.target.classList.add('visible');ro.unobserve(e.target);}
    });
  },{threshold:.1});
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>ro.observe(el));
})();

// ── COUNTDOWN (if present) ──
(function(){
  const d=document.getElementById('hc-d');
  if(!d)return;
  function tick(){
    const t=new Date('2026-11-24T16:00:00+05:30'),now=new Date(),diff=t-now;
    if(diff<=0){const b=document.getElementById('hcdown');if(b)b.style.display='none';return;}
    d.textContent=Math.floor(diff/86400000);
    document.getElementById('hc-h').textContent=String(Math.floor(diff%86400000/3600000)).padStart(2,'0');
    document.getElementById('hc-m').textContent=String(Math.floor(diff%3600000/60000)).padStart(2,'0');
    document.getElementById('hc-s').textContent=String(Math.floor(diff%60000/1000)).padStart(2,'0');
  }
  tick();setInterval(tick,1000);
})();

// ── FEATURE CARD MOUSE GLOW ──
document.querySelectorAll('.feature-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
    card.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
  });
});

// ── RSVP ──
let _att=null;
function setAtt(v){
  _att=v;
  const y=document.getElementById('yes-btn');
  const n=document.getElementById('no-btn');
  if(y)y.className='att-btn'+(v==='yes'?' yes':'');
  if(n)n.className='att-btn'+(v==='no'?' no':'');
}
function submitRSVP(){
  const fn=document.getElementById('fn');
  const em=document.getElementById('em');
  if(!fn||!em||!fn.value.trim()||!em.value.trim()){alert('Please enter your name and email.');return;}
  fireConfetti();
  document.getElementById('rsvp-form').style.display='none';
  document.getElementById('rsvp-ok').style.display='block';
}
function fireConfetti(){
  const cc=['🎊','🎉','🌸','💛','🧡','💚','💜','🌺','✨'];
  for(let i=0;i<60;i++){
    const el=document.createElement('div');
    el.style.cssText=`position:fixed;top:-20px;left:${Math.random()*100}vw;font-size:${16+Math.random()*18}px;z-index:99999;pointer-events:none;animation:confettiFall ${1.5+Math.random()*2}s ${Math.random()*.8}s linear forwards;`;
    el.textContent=cc[Math.floor(Math.random()*cc.length)];
    document.body.appendChild(el);setTimeout(()=>el.remove(),4000);
  }
}
