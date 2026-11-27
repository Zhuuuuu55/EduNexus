(()=>{
 const slides=[...document.querySelectorAll('.deck-slide')],prev=document.querySelector('[data-prev]'),next=document.querySelector('[data-next]'),jump=document.querySelector('.page-jump select'),counter=document.querySelector('.page-count'),bar=document.querySelector('.deck-progress i');
 if(!slides.length)return;
 let current=0;
 document.querySelectorAll('[data-demo-tabs]').forEach(list=>{
  const tabs=[...list.querySelectorAll('[role=tab]')],scope=document.getElementById(list.dataset.demoTabs),panels=[...scope.querySelectorAll('[role=tabpanel]')];
  function select(i,focus=false){
   scope.querySelectorAll('video').forEach(v=>v.pause());
   tabs.forEach((t,j)=>{t.setAttribute('aria-selected',String(j===i));t.tabIndex=j===i?0:-1;});
   panels.forEach((p,j)=>{p.hidden=j!==i;});
   if(focus)tabs[i].focus({preventScroll:true});
  }
  tabs.forEach((t,i)=>{t.addEventListener('click',()=>select(i));t.addEventListener('keydown',e=>{
   let n;if((e.key==='ArrowRight'||e.key==='ArrowDown'))n=(i+1)%tabs.length;if((e.key==='ArrowLeft'||e.key==='ArrowUp'))n=(i-1+tabs.length)%tabs.length;if(e.key==='Home')n=0;if(e.key==='End')n=tabs.length-1;
   if(n!==undefined){e.preventDefault();e.stopPropagation();select(n,true);}
  });});select(0);
 });
 function fit(){document.documentElement.style.setProperty('--deck-scale',Math.min(innerWidth/1600,innerHeight/900));}
 function show(index,focus=false){
  current=Math.max(0,Math.min(slides.length-1,index));
  document.querySelectorAll('video').forEach(v=>v.pause());
  slides.forEach((s,i)=>{s.hidden=i!==current;});
  prev.disabled=current===0;next.disabled=current===slides.length-1;
  jump.value=String(current);counter.textContent=(current+1)+' / '+slides.length;bar.style.width=((current+1)/slides.length*100)+'%';
  document.querySelectorAll('[data-goto]').forEach(b=>{if(Number(b.dataset.goto)===current)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
  history.replaceState(null,'','#slide-'+(current+1));
  if(focus)slides[current].focus({preventScroll:true});
 }
 prev.addEventListener('click',()=>show(current-1,true));next.addEventListener('click',()=>show(current+1,true));jump.addEventListener('change',()=>show(Number(jump.value),true));
 document.querySelectorAll('[data-goto]').forEach(b=>b.addEventListener('click',()=>show(Number(b.dataset.goto),true)));
 document.addEventListener('keydown',e=>{
  if(e.altKey||e.ctrlKey||e.metaKey||e.target.closest('video,input,textarea,select,button,a,[contenteditable=true]'))return;
  let n;if(e.key==='ArrowRight'||e.key==='PageDown')n=current+1;if(e.key==='ArrowLeft'||e.key==='PageUp')n=current-1;if(e.key==='Home')n=0;if(e.key==='End')n=slides.length-1;
  if(n!==undefined){e.preventDefault();show(n,true);}
 });
 const full=document.querySelector('[data-fullscreen]');
 full.addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{full.textContent='请按 F11 全屏';}});
 document.addEventListener('fullscreenchange',()=>{full.textContent=document.fullscreenElement?'退出全屏':'全屏';fit();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)document.querySelectorAll('video').forEach(v=>v.pause());});
 document.querySelectorAll('video').forEach(v=>{const slot=v.closest('.video-slot');if(slot){const fitMedia=()=>{if(!v.videoWidth||!slot.clientWidth||!slot.clientHeight)return;const scale=Math.min(slot.clientWidth/v.videoWidth,slot.clientHeight/v.videoHeight);v.style.width=(v.videoWidth*scale)+'px';v.style.height=(v.videoHeight*scale)+'px';};v.addEventListener('loadedmetadata',fitMedia);new ResizeObserver(fitMedia).observe(slot);fitMedia();}v.addEventListener('error',()=>{if(v.nextElementSibling)v.nextElementSibling.textContent='视频暂不可播放，请刷新重试。';});});
 window.addEventListener('resize',fit);window.addEventListener('hashchange',()=>{const m=location.hash.match(/^#slide-(\d+)$/);if(m)show(Number(m[1])-1);});
 fit();const m=location.hash.match(/^#slide-(\d+)$/);show(m?Number(m[1])-1:Number(document.body.dataset.start||0));
})();
