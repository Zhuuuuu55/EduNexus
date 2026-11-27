/* Long screenshots stay inside a fixed, keyboard-accessible reading frame. */
(() => {
  'use strict';
  const root = document.getElementById('domain-tutor');
  if (!root) return;
  const records = JSON.parse(document.getElementById('at-demo-data').textContent);
  const byId = id => document.getElementById('at-' + id);
  const frame = byId('shot-viewport');
  const shot = byId('shot');
  const list = byId('demo-index');
  const filters = [...root.querySelectorAll('[data-at-group]')];
  let visible = records;
  let active = records[0];

  function updateProgress() {
    const distance = frame.scrollHeight - frame.clientHeight;
    const percent = distance > 1 ? Math.round(Math.min(1, Math.max(0, frame.scrollTop / distance)) * 100) : 100;
    byId('progress').value = percent;
    byId('progress-text').textContent = distance > 1 ? `已读 ${percent}%` : '完整截图已显示';
  }

  function updateZoomLabel() {
    byId('zoom').textContent = frame.classList.contains('is-zoomed') ? '适应宽度' : `放大 ${window.matchMedia('(max-width:560px)').matches ? 300 : 150}%`;
  }

  function updateNavigation() {
    const position = visible.indexOf(active);
    byId('previous').disabled = position <= 0;
    byId('next').disabled = position >= visible.length - 1;
    byId('case-position').textContent = `案例 ${String(active.id).padStart(2, '0')} / 10`;
    for (const button of list.querySelectorAll('button')) {
      if (Number(button.dataset.atCase) === active.id) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    }
  }

  function selectDemo(item) {
    active = item;
    byId('demo-group').textContent = item.group;
    byId('demo-title').textContent = item.title;
    byId('demo-question').textContent = item.question;
    byId('demo-focus').textContent = item.focus;
    byId('reading-note').textContent = item.note ? '核对提示：' + item.note : '';
    byId('reading-note').hidden = !item.note;
    byId('original').href = item.src;
    byId('original').setAttribute('aria-label', `查看案例 ${item.id} 的原图（新标签页）`);
    byId('load-error').hidden = true;
    frame.setAttribute('aria-busy', 'true');
    shot.alt = `案例 ${item.id}：${item.title}，完整对话长截图`;
    shot.width = item.width;
    shot.height = item.height;
    shot.src = item.src;
    frame.scrollTop = 0;
    frame.scrollLeft = 0;
    byId('status').textContent = `正在加载案例 ${item.id}：${item.short}`;
    updateNavigation();
    updateProgress();
  }

  function showGroup(group) {
    visible = records.filter(item => group === '全部' || item.group === group);
    for (const button of filters) button.setAttribute('aria-pressed', String(button.dataset.atGroup === group));
    list.replaceChildren(...visible.map(item => {
      const row = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.atCase = String(item.id);
      button.setAttribute('aria-controls', 'at-shot-viewport');
      const number = document.createElement('span');
      number.className = 'at-case-number';
      number.textContent = String(item.id).padStart(2, '0');
      const copy = document.createElement('span');
      copy.className = 'at-case-copy';
      const title = document.createElement('strong');
      title.textContent = item.short;
      const subtitle = document.createElement('small');
      subtitle.textContent = item.title.split('：')[1];
      copy.append(title, subtitle);
      button.append(number, copy);
      button.addEventListener('click', () => selectDemo(item));
      row.append(button);
      return row;
    }));
    if (!visible.includes(active)) selectDemo(visible[0]);
    else updateNavigation();
  }

  shot.addEventListener('load', () => {
    frame.removeAttribute('aria-busy');
    byId('status').textContent = `案例 ${active.id} 已加载，可在截图框内上下滚动。`;
    updateProgress();
  });
  shot.addEventListener('error', () => {
    frame.removeAttribute('aria-busy');
    byId('load-error').hidden = false;
    byId('status').textContent = '截图加载失败，可通过“查看原图”重试。';
  });
  frame.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', () => { updateProgress(); updateZoomLabel(); });
  byId('top').addEventListener('click', () => { frame.scrollTop = 0; updateProgress(); });
  byId('zoom').addEventListener('click', () => {
    const ratio = frame.scrollHeight > frame.clientHeight ? frame.scrollTop / (frame.scrollHeight - frame.clientHeight) : 0;
    const zoomed = frame.classList.toggle('is-zoomed');
    byId('zoom').setAttribute('aria-pressed', String(zoomed));
    updateZoomLabel();
    frame.scrollTop = ratio * Math.max(0, frame.scrollHeight - frame.clientHeight);
    if (!zoomed) frame.scrollLeft = 0;
    updateProgress();
  });
  byId('previous').addEventListener('click', () => {
    const position = visible.indexOf(active);
    if (position > 0) selectDemo(visible[position - 1]);
  });
  byId('next').addEventListener('click', () => {
    const position = visible.indexOf(active);
    if (position < visible.length - 1) selectDemo(visible[position + 1]);
  });
  for (const button of filters) button.addEventListener('click', () => showGroup(button.dataset.atGroup));
  for (const link of root.querySelectorAll('[data-at-target]')) link.addEventListener('click', () => {
    const item = records.find(record => record.id === Number(link.dataset.atTarget));
    if (item) { showGroup('全部'); selectDemo(item); }
  });
  selectDemo(active);
  showGroup('全部');
  updateZoomLabel();
})();
