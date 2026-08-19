(()=>{
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const ORKAN_EASE='cubic-bezier(.12,.23,.27,1)';
const RAYMOND_IMAGE='https://images.squarespace-cdn.com/content/v1/66a856f13424f06b8fa96d9a/12aa1fc0-724f-4c81-8b99-71a916d0b227/RAY68424.jpg?format=2500w';

const motionStyle=document.createElement('style');
motionStyle.textContent=`
.reveal-item{opacity:.001;transform:translateY(24px);transition-property:opacity,transform;transition-duration:.6s;transition-timing-function:${ORKAN_EASE};transition-delay:0s;will-change:transform,opacity}
.reveal-item.delay1{transition-delay:.1s}.reveal-item.delay2{transition-delay:.2s}
.reveal-item.in,.reveal.in .reveal-item{opacity:1;transform:translateY(0)}
.media,.service-image,.testimonial-image,.final-image-sticky,.ticker-track{background:#f2561d}
.fit-image{object-fit:contain!important;object-position:center!important;width:100%!important;height:100%!important;margin:0!important;transform:none!important;filter:none!important}
.work-card:hover .fit-image,.testimonial.active .fit-image{transform:none!important}

.hero-bg,.about-bg{background:#000!important;overflow:hidden!important}
.hero-bg .raymond-hero{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;margin:0!important;object-fit:cover!important;object-position:center 38%!important;filter:grayscale(1) contrast(1.08) brightness(.68)!important;will-change:transform}
.about-bg .raymond-profile{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;margin:0!important;object-fit:cover!important;object-position:center 38%!important;filter:grayscale(1) contrast(1.04) brightness(.74)!important;will-change:transform}
.hero-content{color:#f2561d!important}
.hero-copy,.hero-sign{color:#f2561d!important}

/* Orkan ending: sticky full-viewport brand layer over the sticky image. */
.final-image{height:200vh!important;position:relative!important;background:#f2561d!important}
.final-image-sticky{position:sticky!important;top:0!important;height:100vh!important;overflow:hidden!important;filter:brightness(.8)!important}
.final-image-sticky img{width:100%!important;height:100%!important;object-fit:cover!important;transform:scale(1.02);will-change:transform}
.final-word{position:sticky!important;top:0!important;margin-top:-100vh!important;height:100vh!important;width:100%!important;padding:0 24px!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:0!important;color:#f2561d!important;mix-blend-mode:normal!important;font-family:Mattone,sans-serif!important;font-size:152px!important;font-weight:700!important;line-height:.8!important;letter-spacing:-.04em!important;pointer-events:none!important;z-index:4!important;overflow:hidden!important}
.final-word .orkan-letter{display:block;flex:none;white-space:pre;color:#f2561d;will-change:transform,opacity}
@media(max-width:1199px){.final-word{font-size:96px!important}}
@media(max-width:809px){.final-word{font-size:48px!important;padding:0 16px!important}}

.orkan-footer-shell .ticker-track{align-items:center!important}
.orkan-footer-shell .ticker-track img{width:150px!important;min-width:150px!important;height:216px!important;flex:0 0 150px!important;object-fit:cover!important;object-position:center!important}
@media(max-width:809px){.orkan-footer-shell .ticker-track img{width:82px!important;min-width:82px!important;height:110px!important;flex-basis:82px!important}}

.orkan-footer-shell{height:70vh;position:relative;z-index:2;background:#000;overflow:hidden;will-change:transform;transform:translate3d(0,-200px,0)}
.orkan-footer-shell .footer{height:100%!important;min-height:0!important;background:#000!important;color:#fff!important;padding:24px!important;display:flex!important;flex-direction:column!important;justify-content:space-between!important;overflow:visible!important}
.orkan-footer-shell .footer a{color:#fff!important}
.orkan-footer-shell .footer-top{max-width:none!important;width:100%!important;margin:0!important;display:flex!important;flex-direction:row!important;align-items:flex-start!important;justify-content:center!important;gap:8px!important}
.orkan-footer-shell .footer-top>*{flex:1 0 0!important;width:1px!important}
.orkan-footer-shell .footer-col{gap:12px!important;font-size:11px!important}
.orkan-footer-shell .footer-nav{display:flex!important;flex-direction:column!important;align-items:center!important;gap:12px!important}
.orkan-footer-shell .footer-social{display:flex!important;justify-content:flex-end!important;gap:12px!important;font-size:11px!important}
.orkan-footer-shell .footer-ticker{overflow:hidden!important;width:100%!important;margin:0!important}
.orkan-footer-shell .ticker-track{gap:16px!important;animation-timing-function:linear!important;animation-iteration-count:infinite!important;will-change:transform}
.orkan-footer-shell .footer-bottom{max-width:1600px!important;width:100%!important;margin:0!important;padding:0!important;border:0!important;color:#fff!important;opacity:.9!important;font-size:10px!important;transform:none!important}
@media(max-width:809px){
 .orkan-footer-shell{height:70vh;overflow:hidden}
 .orkan-footer-shell .footer{height:100%!important;padding:48px 16px 24px!important;gap:16px!important;justify-content:flex-end!important}
 .orkan-footer-shell .footer-top{flex-direction:column!important;gap:16px!important}
 .orkan-footer-shell .footer-top>*{width:100%!important;flex:none!important}
 .orkan-footer-shell .footer-nav{align-items:flex-start!important}
 .orkan-footer-shell .footer-social{justify-content:flex-start!important}
 .orkan-footer-shell .ticker-track{gap:8px!important}
}
`;
document.head.appendChild(motionStyle);

const heroBg=document.querySelector('.hero-bg');
let heroImg=heroBg?.querySelector('img');
const oldVideo=heroBg?.querySelector('video');
if(heroBg){
  if(oldVideo)oldVideo.remove();
  if(!heroImg){heroImg=document.createElement('img');heroBg.prepend(heroImg)}
  heroImg.src=RAYMOND_IMAGE;
  heroImg.alt='Raymond Do of Raymango';
  heroImg.className='raymond-hero';
}
const raymondProfile=document.querySelector('.about-bg img');
if(raymondProfile){
  raymondProfile.src=RAYMOND_IMAGE;
  raymondProfile.className='raymond-profile';
  raymondProfile.alt='Raymond Do of Raymango';
}

const heroCopy=document.querySelector('.hero-copy');
const heroSign=document.querySelector('.hero-sign');
if(heroCopy)heroCopy.textContent='Raymango captures weddings through emotion, movement, light, and atmosphere—creating photographs that feel cinematic, honest, and deeply personal.';
if(heroSign)heroSign.textContent='CALIFORNIA, UNITED STATES';

/* Split RAYMANGO into individual letters like Orkan's ORKAN ending component. */
const finalWord=document.querySelector('.final-word');
if(finalWord){
  finalWord.setAttribute('aria-label','RAYMANGO');
  finalWord.innerHTML='RAYMANGO'.split('').map((letter,i)=>`<span class="orkan-letter" data-letter="${i}">${letter}</span>`).join('');
}

const footer=document.querySelector('.footer');
let footerShell=null;
if(footer&&!footer.parentElement.classList.contains('orkan-footer-shell')){
  footerShell=document.createElement('div');
  footerShell.className='orkan-footer-shell';
  footer.parentNode.insertBefore(footerShell,footer);
  footerShell.appendChild(footer);
}else if(footer){footerShell=footer.parentElement}

const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal,.reveal-item').forEach(el=>io.observe(el));

function spring({from=1,to=0,stiffness=200,damping=70,mass=1,onFrame,onDone}){
  if(reduce){onFrame(to);onDone?.();return}
  let x=from,v=0,last=performance.now();
  function frame(now){
    const dt=Math.min((now-last)/1000,.032);last=now;
    const a=(-stiffness*(x-to)-damping*v)/mass;
    v+=a*dt;x+=v*dt;onFrame(x);
    if(Math.abs(v)<.001&&Math.abs(x-to)<.001){onFrame(to);onDone?.();return}
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

if(heroImg){
  heroImg.style.transform='scale(1.04)';
  requestAnimationFrame(()=>spring({from:1.04,to:1,stiffness:200,damping:70,mass:1,onFrame:v=>heroImg.style.transform=`scale(${v})`}));
}

if(footerShell){
  if(reduce){footerShell.style.transform='translate3d(0,0,0)'}
  else{
    const footerIO=new IntersectionObserver(entries=>entries.forEach(e=>{
      if(!e.isIntersecting)return;
      footerIO.disconnect();
      footerShell.animate([{transform:'translate3d(0,-200px,0)'},{transform:'translate3d(0,0,0)'}],{duration:720,easing:ORKAN_EASE,fill:'forwards'});
    }),{threshold:.01,rootMargin:'0px 0px -2% 0px'});
    footerIO.observe(footerShell);
  }
}

if(!reduce&&innerWidth>809){
  let target=scrollY,current=scrollY,raf=0;
  const clamp=v=>Math.max(0,Math.min(v,document.documentElement.scrollHeight-innerHeight));
  const ease=t=>Math.min(1,1.001-Math.pow(2,-10*t));
  let start=0,from=0,duration=0;
  function animateTo(next,d=1.2){from=current;target=clamp(next);start=performance.now();duration=d*1000;if(!raf)raf=requestAnimationFrame(tick)}
  function tick(now){const p=Math.min(1,(now-start)/duration);current=from+(target-from)*ease(p);scrollTo(0,current);if(p<1)raf=requestAnimationFrame(tick);else{current=target;raf=0;scrollTo(0,current)}}
  addEventListener('wheel',e=>{if(document.body.classList.contains('menu-open'))return;e.preventDefault();const base=raf?target:scrollY;animateTo(base+e.deltaY,Math.max(.45,Math.min(1.2,Math.abs(e.deltaY)/850+.48)))},{passive:false});
  addEventListener('scroll',()=>{if(!raf){current=target=scrollY}},{passive:true});
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const el=document.querySelector(a.getAttribute('href'));if(!el)return;e.preventDefault();animateTo(el.offsetTop,1.2)}));
}

const fitCandidates=[...document.querySelectorAll('.media img,.service-image img,.testimonial-image img,.final-image-sticky img')];
function decideFit(img){
  const apply=()=>{const box=img.parentElement?.getBoundingClientRect();if(!box||!box.width||!box.height||!img.naturalWidth||!img.naturalHeight)return;const ir=img.naturalWidth/img.naturalHeight,fr=box.width/box.height;const retained=Math.min(ir/fr,fr/ir);img.classList.toggle('fit-image',retained<.82)};
  if(img.complete)apply();else img.addEventListener('load',apply,{once:true});
}
fitCandidates.forEach(decideFit);
let fitTimer;addEventListener('resize',()=>{clearTimeout(fitTimer);fitTimer=setTimeout(()=>fitCandidates.forEach(decideFit),120)});

let ticking=false;const parallaxEls=[...document.querySelectorAll('.service-parallax')];
function onScrollMotion(){
  const vh=innerHeight;
  parallaxEls.forEach(img=>{
    if(img.classList.contains('fit-image')){img.style.transform='none';return}
    const p=img.parentElement.getBoundingClientRect(),c=(p.top+p.height/2-vh/2)/vh;
    img.style.transform=`translate3d(0,${-c*34}px,0) scale(1.12)`;
  });

  /* Keep the brand layer pinned exactly like the Orkan sticky name overlay. */
  if(finalWord){
    const r=finalWord.parentElement.getBoundingClientRect();
    const progress=Math.max(0,Math.min(1,(-r.top)/(Math.max(1,r.height-innerHeight))));
    finalWord.querySelectorAll('.orkan-letter').forEach((letter,i)=>{
      const offset=(i-(7/2))*2.5*(1-progress);
      letter.style.transform=`translate3d(${offset}px,0,0)`;
      letter.style.opacity=String(.92+.08*progress);
    });
  }
  ticking=false;
}
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(onScrollMotion)}},{passive:true});
addEventListener('resize',()=>requestAnimationFrame(onScrollMotion),{passive:true});

const slides=[...document.querySelectorAll('.testimonial')],dots=[...document.querySelectorAll('.testimonial-dots button')];let idx=0,timer,down=null;
function show(i){idx=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle('active',n===idx));dots.forEach((d,n)=>d.classList.toggle('active',n===idx));clearTimeout(timer);timer=setTimeout(()=>show(idx+1),5000)}
dots.forEach((d,i)=>d.addEventListener('click',()=>show(i)));const stage=document.getElementById('carousel');stage?.addEventListener('pointerdown',e=>down=e.clientX);stage?.addEventListener('pointerup',e=>{if(down===null)return;const dx=e.clientX-down;if(Math.abs(dx)>45)show(idx+(dx<0?1:-1));down=null});show(0);

const ticker=document.querySelector('.ticker-track');
function syncTickerVelocity(){if(!ticker)return;const cycle=ticker.scrollWidth/2;if(cycle>0)ticker.style.animationDuration=`${cycle/25}s`}
if(ticker){const imgs=[...ticker.querySelectorAll('img')];let pending=imgs.filter(i=>!i.complete).length;if(!pending)requestAnimationFrame(syncTickerVelocity);else imgs.forEach(i=>{if(!i.complete)i.addEventListener('load',()=>{if(--pending===0)syncTickerVelocity()},{once:true})});addEventListener('resize',syncTickerVelocity,{passive:true})}

const btn=document.querySelector('.menu-btn'),menu=document.querySelector('.mobile-menu');function setMenu(open){menu?.classList.toggle('open',open);document.body.classList.toggle('menu-open',open);if(btn)btn.textContent=open?'CLOSE':'MENU'}btn?.addEventListener('click',()=>setMenu(!menu?.classList.contains('open')));menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));

onScrollMotion();
})();