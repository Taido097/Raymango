(()=>{
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const ORKAN_EASE='cubic-bezier(.12,.23,.27,1)';

// Exact Orkan appear values captured from the supplied Framer build.
const motionStyle=document.createElement('style');
motionStyle.textContent=`
.reveal-item{opacity:.001;transform:translateY(24px);transition-property:opacity,transform;transition-duration:.6s;transition-timing-function:${ORKAN_EASE};transition-delay:0s;will-change:transform,opacity}
.reveal-item.delay1{transition-delay:.1s}.reveal-item.delay2{transition-delay:.2s}
.reveal-item.in,.reveal.in .reveal-item{opacity:1;transform:translateY(0)}
.media,.service-image,.testimonial-image,.final-image-sticky,.ticker-track{background:#f2561d}
.fit-image{object-fit:contain!important;object-position:center!important;width:100%!important;height:100%!important;margin:0!important;transform:none!important;filter:none!important}
.work-card:hover .fit-image,.testimonial.active .fit-image{transform:none!important}
.hero-bg img{will-change:transform}
`;
document.head.appendChild(motionStyle);

// Framer/Orkan entrance reveals: y 24 -> 0, opacity .001 -> 1, .6s tween.
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal,.reveal-item').forEach(el=>io.observe(el));

// Small spring solver matching Framer's captured spring constants.
function spring(el,{from=1,to=0,stiffness=200,damping=70,mass=1,onFrame,onDone}){
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

// Orkan hero image: scale 1.04 -> 1, spring stiffness 200 / damping 70 / mass 1.
const heroImg=document.querySelector('.hero-bg img');
if(heroImg){
  heroImg.style.transform='scale(1.04)';
  requestAnimationFrame(()=>spring(heroImg,{from:1.04,to:1,stiffness:200,damping:70,mass:1,onFrame:v=>heroImg.style.transform=`scale(${v})`}));
}

// Lenis-style inertial wheel scrolling used by the Orkan capture.
if(!reduce&&innerWidth>809){
  let target=scrollY,current=scrollY,raf=0;
  const clamp=v=>Math.max(0,Math.min(v,document.documentElement.scrollHeight-innerHeight));
  const ease=t=>Math.min(1,1.001-Math.pow(2,-10*t));
  let start=0,from=0,duration=0;
  function animateTo(next,d=1.2){from=current;target=clamp(next);start=performance.now();duration=d*1000;if(!raf)raf=requestAnimationFrame(tick)}
  function tick(now){
    const p=Math.min(1,(now-start)/duration);current=from+(target-from)*ease(p);scrollTo(0,current);
    if(p<1){raf=requestAnimationFrame(tick)}else{current=target;raf=0;scrollTo(0,current)}
  }
  addEventListener('wheel',e=>{if(document.body.classList.contains('menu-open'))return;e.preventDefault();const base=raf?target:scrollY;animateTo(base+e.deltaY,Math.max(.45,Math.min(1.2,Math.abs(e.deltaY)/850+.48)))},{passive:false});
  addEventListener('scroll',()=>{if(!raf){current=target=scrollY}},{passive:true});
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const el=document.querySelector(a.getAttribute('href'));if(!el)return;e.preventDefault();animateTo(el.offsetTop,1.2)}));
}

// Keep the Orkan frames, but preserve Raymango compositions when cover would crop too much.
const fitCandidates=[...document.querySelectorAll('.media img,.service-image img,.testimonial-image img,.final-image-sticky img,.ticker-track img')];
function decideFit(img){
  const apply=()=>{
    const box=img.parentElement?.getBoundingClientRect();
    if(!box||!box.width||!box.height||!img.naturalWidth||!img.naturalHeight)return;
    const ir=img.naturalWidth/img.naturalHeight,fr=box.width/box.height;
    const retained=Math.min(ir/fr,fr/ir);
    // If cover would discard roughly 18%+ of one axis, show the full photograph.
    if(retained<.82)img.classList.add('fit-image');else img.classList.remove('fit-image');
  };
  if(img.complete)apply();else img.addEventListener('load',apply,{once:true});
}
fitCandidates.forEach(decideFit);
let fitTimer;addEventListener('resize',()=>{clearTimeout(fitTimer);fitTimer=setTimeout(()=>fitCandidates.forEach(decideFit),120)});

// Orkan scroll-linked background/service image movement. Do not parallax contained images.
let ticking=false;const parallaxEls=[...document.querySelectorAll('.parallax-img,.service-parallax')];
function parallax(){
  const vh=innerHeight;
  parallaxEls.forEach(img=>{
    if(img.classList.contains('fit-image')){img.style.transform='none';return}
    const p=img.parentElement.getBoundingClientRect(),c=(p.top+p.height/2-vh/2)/vh;
    const service=img.classList.contains('service-parallax');
    img.style.transform=`translate3d(0,${-c*(service?34:20)}px,0) scale(${service?1.12:1.04})`;
  });
  ticking=false;
}
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(parallax)}},{passive:true});parallax();

// Orkan-style carousel: horizontal motion, 5-second progression, drag/swipe.
const slides=[...document.querySelectorAll('.testimonial')],dots=[...document.querySelectorAll('.testimonial-dots button')];let idx=0,timer,down=null;
function show(i){idx=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle('active',n===idx));dots.forEach((d,n)=>d.classList.toggle('active',n===idx));clearTimeout(timer);timer=setTimeout(()=>show(idx+1),5000)}
dots.forEach((d,i)=>d.addEventListener('click',()=>show(i)));const stage=document.getElementById('carousel');stage?.addEventListener('pointerdown',e=>down=e.clientX);stage?.addEventListener('pointerup',e=>{if(down===null)return;const dx=e.clientX-down;if(Math.abs(dx)>45)show(idx+(dx<0?1:-1));down=null});show(0);

// Orkan's large lower-page spring: y 1500 -> 0, stiffness 400 / damping 80 / mass 1.
const footerBottom=document.querySelector('.footer-bottom');
if(footerBottom){footerBottom.style.transform='translateY(1500px)';footerBottom.style.opacity='1';requestAnimationFrame(()=>spring(footerBottom,{from:1500,to:0,stiffness:400,damping:80,mass:1,onFrame:v=>{footerBottom.style.transform=`translateY(${v}px)`;footerBottom.style.opacity=String(.9+.1*Math.min(1,v/1500))},onDone:()=>{footerBottom.style.transform='translateY(0)';footerBottom.style.opacity='.9'}}))}

// Mobile menu retains Orkan's panel + stagger behavior.
const btn=document.querySelector('.menu-btn'),menu=document.querySelector('.mobile-menu');function setMenu(open){menu?.classList.toggle('open',open);document.body.classList.toggle('menu-open',open);if(btn)btn.textContent=open?'CLOSE':'MENU'}btn?.addEventListener('click',()=>setMenu(!menu?.classList.contains('open')));menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
})();