(()=>{
  const applyHero=()=>{
    const hero=document.querySelector('.hero-bg');
    if(!hero)return;
    hero.style.setProperty('background-image',"url('/images/RAY56200.jpg')",'important');
    hero.style.setProperty('background-color','#000','important');
    hero.style.setProperty('background-size','cover','important');
    hero.style.setProperty('background-position','center 48%','important');
    hero.style.setProperty('background-repeat','no-repeat','important');
    const img=hero.querySelector('img');
    if(img){
      img.style.setProperty('display','none','important');
      img.style.setProperty('visibility','hidden','important');
      img.style.setProperty('opacity','0','important');
    }
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyHero,{once:true});
  else applyHero();
})();
