(function(){
document.querySelectorAll('[data-tabs]').forEach(function(list,index){
 const tabs=Array.from(list.querySelectorAll('[role=tab]')),scope=document.getElementById(list.dataset.tabs);if(!scope)return;
 const panels=Array.from(scope.querySelectorAll('.panel'));
 function select(i,focus){scope.querySelectorAll('video').forEach(v=>v.pause());tabs.forEach((t,j)=>{t.id=t.id||'demo-tab-'+index+'-'+j;t.setAttribute('aria-controls','demo-panel-'+index+'-'+j);t.setAttribute('aria-selected',String(i===j));t.tabIndex=i===j?0:-1;});panels.forEach((p,j)=>{p.id='demo-panel-'+index+'-'+j;p.setAttribute('role','tabpanel');p.setAttribute('aria-labelledby',tabs[j].id);p.hidden=i!==j;p.classList.toggle('is-active',i===j);});if(focus)tabs[i].focus({preventScroll:true});}
 tabs.forEach((t,i)=>{t.addEventListener('click',()=>select(i,true));t.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%tabs.length;if(e.key==='ArrowLeft')n=(i-1+tabs.length)%tabs.length;if(e.key==='Home')n=0;if(e.key==='End')n=tabs.length-1;if(n!==undefined){e.preventDefault();select(n,true);}});});select(0,false);
});
document.addEventListener('visibilitychange',()=>{if(document.hidden)document.querySelectorAll('video').forEach(v=>v.pause());});
let ready=0;const videos=Array.from(document.querySelectorAll('[data-demo-src]'));
videos.forEach(v=>{
 let counted=false;
 v.addEventListener('loadedmetadata',()=>{if(!v.videoWidth)return;v.hidden=false;v.previousElementSibling.hidden=true;if(!counted){ready++;counted=true;}const count=document.querySelector('[data-ready-count]');if(count)count.textContent=videos.length+' 项功能 · '+videos.length+' 段演示';});
 v.addEventListener('error',()=>{v.hidden=true;v.previousElementSibling.hidden=false;v.previousElementSibling.querySelector('p').textContent='视频暂不可播放，请检查素材格式';});
 v.preload='metadata';v.src=v.dataset.demoSrc;
});
})();