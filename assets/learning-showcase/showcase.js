/* Repository-native, offline-compatible showcase. All feature/media mappings live in content.js. */
(() => {
'use strict';
const data=window.LEARNING_SHOWCASE,base='assets/learning-showcase/',storageKey='edunexus-showcase-commentary-v2';
let savedNotes={},storageAvailable=true;
try{const stored=JSON.parse(localStorage.getItem(storageKey)||'{}');if(stored&&typeof stored==='object'&&!Array.isArray(stored))savedNotes=stored;}catch{storageAvailable=false;}
const lightbox=document.querySelector('.ls-lightbox'),renderers=[];
function pauseAll(){document.querySelectorAll('video').forEach(v=>v.pause());}
function openImage(media){pauseAll();lightbox.querySelector('img').src=base+media.src;lightbox.querySelector('img').alt=media.title;lightbox.querySelector('h3').textContent=media.title;lightbox.querySelector('p').textContent=media.explanation;lightbox.showModal();}
lightbox.querySelector('button').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',e=>{if(e.target!==lightbox)return;const r=lightbox.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)lightbox.close();});
document.querySelectorAll('video').forEach(v=>v.addEventListener('play',()=>document.querySelectorAll('video').forEach(other=>{if(other!==v)other.pause();})));
function noteKey(point,media){return point.id+'/'+media.kind+'/'+media.id;}
function exportNotes(){
 const text=['# 模拟课堂与学习笔记 · 演示讲解','',...['classroom','notes'].flatMap(name=>data[name].flatMap(point=>[
  '## '+point.number+' '+point.title,'',point.summary,'','讲解要点：',...point.steps.map(t=>'- '+t),'','设计与学习价值：'+point.meaning,'',
  ...point.media.flatMap(media=>['### '+media.title,'',media.explanation,'',...(savedNotes[noteKey(point,media)]?['我的补充：',savedNotes[noteKey(point,media)],'']:[])]),
  ...(point.notice?['素材说明：'+point.notice,'']:[]),...(point.missing.length?['待补素材：'+point.missing.join('；'),'']:[]),'原测试记录：'+point.source,''
 ]))].join('\n');
 const url=URL.createObjectURL(new Blob(['\uFEFF'+text],{type:'text/markdown;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='模拟课堂与学习笔记-演示讲解.md';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
document.querySelectorAll('.ls-export-notes').forEach(b=>b.addEventListener('click',exportNotes));
function bindTabKeys(list){list.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;const tabs=[...list.querySelectorAll('[role=tab]')].filter(t=>!t.disabled),i=tabs.indexOf(document.activeElement);if(i<0)return;e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[next].click();tabs[next].focus();});}
function setSelected(list,active){list.querySelectorAll('[role=tab]').forEach(b=>{b.setAttribute('aria-selected',String(b===active));b.tabIndex=b===active?0:-1;});}
document.querySelectorAll('[data-feature]').forEach(stage=>{
 const name=stage.dataset.feature,points=data[name],nav=stage.querySelector('.ls-case-nav'),content=stage.querySelector('.ls-case-content'),video=stage.querySelector('video'),modes=stage.querySelector('.ls-mode'),switcher=stage.querySelector('.ls-media-switcher'),thumbs=stage.querySelector('.ls-image-thumbs'),textarea=stage.querySelector('textarea'),saveStatus=stage.querySelector('.ls-save-state');
 const field=n=>stage.querySelector('[data-field="'+n+'"]');let currentPoint,activeMedia,mode='video';
 function selectMedia(media){
  video.pause();activeMedia=media;
  field('mediaTitle').textContent=media.title;field('clipTitle').textContent=media.title;field('clipExplanation').textContent=media.explanation;
  field('mediaType').textContent=media.kind==='video'?'视频实录':'原始截图';
  stage.querySelector('.ls-load-error').hidden=true;
  switcher.querySelectorAll('button').forEach(b=>{b.setAttribute('aria-selected',String(b.dataset.media===media.id));b.tabIndex=b.dataset.media===media.id?0:-1;});
  thumbs.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.media===media.id)));
  if(media.kind==='video'){
   video.src=base+media.src;video.poster=base+media.poster;video.load();const sec=Math.round(media.duration);field('duration').textContent=Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0')+' · 可全屏';
  }else{
   video.removeAttribute('src');video.load();const img=stage.querySelector('.ls-main-image img');img.src=base+media.src;img.alt=media.title;
   field('duration').textContent=media.width+' × '+media.height;
  }
  textarea.value=savedNotes[noteKey(currentPoint,media)]||'';
  saveStatus.textContent=storageAvailable?'补充文字按当前素材自动保存；可导出完整讲解。':'浏览器存储不可用，请使用“导出讲解文字”保留补充。';
 }
 function selectMode(kind){
  if(!currentPoint.media.some(m=>m.kind===kind))return;mode=kind;pauseAll();
  const media=currentPoint.media.filter(m=>m.kind===kind);
  stage.querySelector('.ls-video-panel').hidden=kind!=='video';stage.querySelector('.ls-image-panel').hidden=kind!=='image';
  setSelected(modes,modes.querySelector('[data-mode="'+kind+'"]'));switcher.replaceChildren();thumbs.replaceChildren();
  media.forEach((m,i)=>{
   if(kind==='video'){
    const b=document.createElement('button');b.type='button';b.setAttribute('role','tab');b.setAttribute('aria-controls',name+'-video-panel');b.dataset.media=m.id;b.textContent=(i+1)+'. '+m.title;b.addEventListener('click',()=>selectMedia(m));switcher.append(b);
   }else{
    const b=document.createElement('button');b.type='button';b.dataset.media=m.id;b.setAttribute('aria-label','显示图片：'+m.title);b.setAttribute('aria-pressed','false');const img=document.createElement('img');img.src=base+m.src;img.alt='';img.loading='lazy';const span=document.createElement('span');span.textContent=(i+1)+'. '+m.title;b.append(img,span);b.addEventListener('click',()=>selectMedia(m));thumbs.append(b);
   }
  });
  switcher.hidden=kind!=='video';selectMedia(media[0]);
 }
 function selectPoint(point,updateHash=false){
  currentPoint=point;pauseAll();const button=nav.querySelector('[data-point="'+point.id+'"]');setSelected(nav,button);content.setAttribute('aria-labelledby',button.id);
  field('case').textContent='测试展示 '+point.number+' / '+point.group;field('title').textContent=point.title;field('summary').textContent=point.summary;field('meaning').textContent=point.meaning;field('source').href=point.source;
  field('steps').replaceChildren(...point.steps.map(t=>{const li=document.createElement('li');li.textContent=t;return li;}));
  const counts={video:point.media.filter(m=>m.kind==='video').length,image:point.media.filter(m=>m.kind==='image').length};
  field('evidence').textContent=[counts.video?counts.video+' 段视频':'',counts.image?counts.image+' 张图片':''].filter(Boolean).join(' · ');
  modes.querySelectorAll('[data-mode]').forEach(b=>{const count=counts[b.dataset.mode];b.disabled=!count;b.querySelector('span').textContent=count;});
  field('notice').textContent=point.notice;field('notice').hidden=!point.notice;
  const missing=stage.querySelector('.ls-missing-list');missing.hidden=!point.missing.length;missing.querySelector('ul').replaceChildren(...point.missing.map(t=>{const li=document.createElement('li');li.textContent=t;return li;}));
  selectMode(counts.video?'video':'image');
  if(updateHash){try{history.replaceState(null,'','#case-'+point.id);}catch{}}
 }
 points.forEach(point=>{
  const b=document.createElement('button');b.id='case-'+point.id;b.type='button';b.dataset.point=point.id;b.setAttribute('role','tab');b.setAttribute('aria-controls',content.id);
  const number=document.createElement('span');number.className='ls-case-number';number.textContent=point.number;const label=document.createElement('strong');label.textContent=point.label;const badge=document.createElement('small');badge.textContent=point.media.some(m=>m.kind==='video')?'视频':'图片';if(point.notice){badge.textContent='素材待补';badge.className='ls-badge-warning';}
  b.append(number,label,badge);b.addEventListener('click',()=>selectPoint(point,true));nav.append(b);
 });
 modes.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>selectMode(b.dataset.mode)));
 stage.querySelector('.ls-main-image').addEventListener('click',()=>{if(activeMedia?.kind==='image')openImage(activeMedia);});
 stage.querySelector('.ls-main-image img').addEventListener('error',()=>stage.querySelector('.ls-load-error').hidden=false);
 video.addEventListener('error',()=>{if(activeMedia?.kind==='video'&&video.getAttribute('src'))stage.querySelector('.ls-load-error').hidden=false;});
 textarea.addEventListener('input',()=>{
  savedNotes[noteKey(currentPoint,activeMedia)]=textarea.value;
  try{localStorage.setItem(storageKey,JSON.stringify(savedNotes));storageAvailable=true;saveStatus.textContent='已保存到当前浏览器 · 可导出讲解文字';}catch{storageAvailable=false;saveStatus.textContent='当前浏览器无法保存，请导出讲解文字。';}
 });
 bindTabKeys(nav);bindTabKeys(modes);bindTabKeys(switcher);
 const fromHash=points.find(p=>'#case-'+p.id===location.hash);selectPoint(fromHash||points[0]);
 renderers.push({points,selectPoint});
});
window.addEventListener('hashchange',()=>{for(const r of renderers){const point=r.points.find(p=>'#case-'+p.id===location.hash);if(point)r.selectPoint(point);}});
})();
