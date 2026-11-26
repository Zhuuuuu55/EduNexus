/* Static, offline-compatible demos. Text and media are editable in content.js. */
(() => {
'use strict';
const data=window.LEARNING_SHOWCASE, media='assets/learning-showcase/media/';
const lightbox=document.querySelector('.ls-lightbox');
function openImage(image){
 document.querySelectorAll('video').forEach(v=>v.pause());
 lightbox.querySelector('img').src=media+image.id+'.jpg';
 lightbox.querySelector('img').alt=image.title;
 lightbox.querySelector('h3').textContent=image.title;
 lightbox.querySelector('p').textContent=image.caption;
 lightbox.showModal();
}
lightbox.querySelector('button').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',e=>{if(e.target===lightbox){const r=lightbox.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)lightbox.close();}});
// Only one recording should be audible at a time, including between the two modules.
document.querySelectorAll('video').forEach(v=>v.addEventListener('play',()=>document.querySelectorAll('video').forEach(other=>{if(other!==v)other.pause();})));
const shortLabels={entry:'课件进入',builds:'页内分步',lecture:'讲稿与讲解',guide:'实时问答',binary:'二分查找',bubble:'冒泡排序',autopage:'自动翻页',jump:'目录定位',write:'自己写笔记',inote:'课堂内记录',archive:'归档到笔记本'};
function bindTabKeys(list){
 list.addEventListener('keydown',e=>{
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
  const tabs=[...list.querySelectorAll('[role=tab]')],current=tabs.indexOf(document.activeElement);
  if(current<0)return;
  e.preventDefault();let next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(current+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
  tabs[next].click();tabs[next].focus();
 });
}
document.querySelectorAll('[data-feature]').forEach(stage=>{
 const name=stage.dataset.feature,items=data[name],video=stage.querySelector('video'),tabs=stage.querySelector('.ls-demo-tabs');
 const videoPanel=stage.querySelector('.ls-video-panel'),imagePanel=stage.querySelector('.ls-image-panel');
 const field=n=>stage.querySelector('[data-field="'+n+'"]');
 function select(i){
  const item=items[i];video.pause();video.src=media+item.id+'.mp4';video.poster=media+item.id+'.jpg';video.load();
  stage.querySelector('.ls-load-error').hidden=true;
  tabs.querySelectorAll('button').forEach((b,j)=>{b.setAttribute('aria-selected',String(j===i));b.tabIndex=j===i?0:-1;});
  videoPanel.setAttribute('aria-labelledby',name+'-demo-'+i);
  field('case').textContent='测试记录 '+item.case;
  ['title','subtitle','meaning','observe'].forEach(n=>field(n).textContent=item[n]);
  field('steps').replaceChildren(...item.steps.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
  field('source').href=item.source;field('mediaCaption').textContent=shortLabels[item.id];field('duration').textContent='按需播放 · 可拖动进度';
 }
 items.forEach((item,i)=>{const b=document.createElement('button');b.type='button';b.id=name+'-demo-'+i;b.setAttribute('role','tab');b.setAttribute('aria-controls',videoPanel.id);b.textContent=shortLabels[item.id];b.addEventListener('click',()=>select(i));tabs.append(b);});
 video.addEventListener('loadedmetadata',()=>{const t=Math.round(video.duration);field('duration').textContent=Math.floor(t/60)+':'+String(t%60).padStart(2,'0')+' · 按需播放';});
 video.addEventListener('error',()=>stage.querySelector('.ls-load-error').hidden=false);
 const modes=stage.querySelector('.ls-mode');
 modes.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{
  const isVideo=b.dataset.mode==='video';video.pause();videoPanel.hidden=!isVideo;imagePanel.hidden=isVideo;
  modes.querySelectorAll('button').forEach(t=>{t.setAttribute('aria-selected',String(t===b));t.tabIndex=t===b?0:-1;});
 }));
 data.images[name].forEach(image=>{
  const card=document.createElement('article');card.className='ls-gallery-card';
  const button=document.createElement('button');button.type='button';button.setAttribute('aria-label','放大：'+image.title);
  const img=document.createElement('img');img.src=media+image.id+'.jpg';img.alt=image.title;img.loading='lazy';img.width=1280;img.height=720;button.append(img);button.addEventListener('click',()=>openImage(image));
  const copy=document.createElement('div');copy.className='ls-gallery-copy';
  const h=document.createElement('h4');h.textContent=image.title;const p=document.createElement('p');p.textContent=image.caption;
  const a=document.createElement('a');a.href=image.source;a.target='_blank';a.rel='noopener';a.className='ls-source';a.textContent='原测试记录 '+image.case+' ↗';copy.append(h,p,a);card.append(button,copy);stage.querySelector('.ls-gallery').append(card);
 });
 bindTabKeys(tabs);bindTabKeys(modes);select(0);
});
})();
