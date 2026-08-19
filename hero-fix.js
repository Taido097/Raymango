(()=>{
  const HERO_URL='https://images.squarespace-cdn.com/content/v1/66a856f13424f06b8fa96d9a/aa9c7205-18e9-4ef9-8b6a-c17a4c1a7a3b/_AY_4416.jpg?format=2500w';
  const END_URL='https://images.squarespace-cdn.com/content/v1/66a856f13424f06b8fa96d9a/7afca8de-ef08-4021-9c8e-a4a80d446676/AND06323.jpg?format=2500w';

  const applyImages=()=>{
    const hero=document.querySelector('.hero-bg');
    if(hero){
      hero.style.setProperty('background-image',`url('${HERO_URL}')`,'important');
      hero.style.setProperty('background-color','#000','important');
      hero.style.setProperty('background-size','cover','important');
      hero.style.setProperty('background-position','center center','important');
      hero.style.setProperty('background-repeat','no-repeat','important');
      const img=hero.querySelector('img');
      if(img){
        img.style.setProperty('display','none','important');
        img.style.setProperty('visibility','hidden','important');
        img.style.setProperty('opacity','0','important');
      }
    }

    const endImg=document.querySelector('.final-image-sticky img');
    if(endImg){
      endImg.src=END_URL;
      endImg.alt='Raymango editorial wedding portrait';
    }
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyImages,{once:true});
  else applyImages();
})();
