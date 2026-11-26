/* Public affairs player; isolated from the homepage workbench demo. */
(() => {
'use strict';
const demos = document.getElementById('pa-demo');
const records = JSON.parse(document.getElementById('pa-demo-data').textContent);
const embeddedMedia = JSON.parse(document.getElementById('pa-embedded-media').textContent);
const embeddedResults = document.getElementById('pa-embedded-results').textContent;
const player = document.getElementById('pa-demo-video');
const list = document.getElementById('pa-demo-index');
const filters = [...demos.querySelectorAll('[data-group]')];
let active = records[0];
let currentVideoUrl;

function mediaUrl(dataUrl) {
  const base64 = dataUrl.slice(dataUrl.indexOf(',') + 1);
  const bytes = Uint8Array.from(atob(base64), character => character.charCodeAt(0));
  return URL.createObjectURL(new Blob([bytes], { type: 'video/mp4' }));
}

function selectDemo(item, play) {
  active = item;
  for (const element of list.querySelectorAll('button')) {
    if (element.dataset.id === item.id) element.setAttribute('aria-current', 'true');
    else element.removeAttribute('aria-current');
  }
  player.pause();
  player.poster = embeddedMedia[item.id].jpg;
  const previousUrl = currentVideoUrl;
  currentVideoUrl = mediaUrl(embeddedMedia[item.id].mp4);
  player.src = currentVideoUrl;
  if (previousUrl) URL.revokeObjectURL(previousUrl);
  player.setAttribute('aria-label', item.title);
  document.getElementById('pa-demo-group').textContent = item.group;
  document.getElementById('pa-demo-title').textContent = item.title;
  document.getElementById('pa-demo-question').textContent = item.question;
  document.getElementById('pa-demo-proof').textContent = item.description;
  if (play) void player.play().catch(() => {});
}

function showGroup(group) {
  const visible = records.filter(item => group === '全部' || item.group === group);
  for (const button of filters) button.setAttribute('aria-pressed', String(button.dataset.group === group));
  list.replaceChildren(...visible.map(item => {
    const row = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.id = item.id;
    const number = document.createElement('span');
    number.className = 'pa-demo-number';
    number.textContent = String(records.indexOf(item) + 1).padStart(2, '0');
    const name = document.createElement('strong');
    name.textContent = item.title;
    const time = document.createElement('span');
    time.className = 'pa-demo-duration';
    time.textContent = Math.round(item.durationSeconds) + ' 秒';
    button.append(number, name, time);
    if (item === active) button.setAttribute('aria-current', 'true');
    button.addEventListener('click', () => selectDemo(item, true));
    row.append(button);
    return row;
  }));
  if (!visible.includes(active)) selectDemo(visible[0], false);
}

for (const button of filters) button.addEventListener('click', () => showGroup(button.dataset.group));
for (const link of document.getElementById('domain-affairs').querySelectorAll('[data-demo-target]')) {
  link.addEventListener('click', () => {
    const item = records.find(record => record.id === link.dataset.demoTarget);
    if (!item) return;
    showGroup('全部');
    selectDemo(item, false);
  });
}
const resultsLink = document.getElementById('pa-results-link');
resultsLink.addEventListener('click', (event) => {
  event.preventDefault();
  const blob = new Blob([embeddedResults], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
  setTimeout(() => URL.revokeObjectURL(url), 60000);
});
selectDemo(records[0], false);
showGroup('全部');
})();
