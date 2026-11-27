(() => {
  const { chapters, diagrams, slides } = window.eduDeck;
  const ui = {
    home: "回到封面", chapterNav: "汇报章节", outline: "目录", outlineTitle: "汇报目录",
    close: "关闭", hint: "← → 翻页 · F 全屏", fullscreen: "全屏", exitFull: "退出全屏",
    previous: "← 上一页", next: "下一页 →", college: "华中科技大学计算机科学与技术学院",
    start: "开始演示", openingClip: "开场录屏：打断和继续讲授",
    recording: "录屏", screenshot: "截图", openingLabel: "模拟课堂 · 打断与续讲",
    jump: "直接跳到功能演示", policy: "教育部文件 ↗", code: "二分查找示例", enlarge: "放大技术图",
    codeLabel: "有序数组 · 查找第一个 ≥ 4 的位置", tabs: "演示片段", technology: "技术设计 →"
  };
  document.querySelectorAll("[data-ui]").forEach(element => {
    element.textContent = ui[element.dataset.ui];
  });
  document.querySelector(".brand").setAttribute("aria-label", ui.home);
  document.querySelector("#chapters").setAttribute("aria-label", ui.chapterNav);
  const stage = document.querySelector("#deck");
  const slide = document.querySelector("#slide");
  const menu = document.querySelector("#outline");
  const figureDialog = document.querySelector("#figure-dialog");
  const position = document.querySelector("#position");
  const progress = document.querySelector("#progress");
  const previous = document.querySelector("#previous");
  const next = document.querySelector("#next");
  const full = document.querySelector("#fullscreen");
  const pageDirectory = document.querySelector("#page-directory");
  const selected = new Map();
  const collections = new Map();
  const demoGroups = new Map();
  const studentView = new Set();
  const timestamps = new Map();
  let current = 0;
  let mediaKey = "";
  let figureLanguage = "zh";

  const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const figure = (name, format = "png") => "assets/figures/" + name + "." + format;
  const media = (name) => name.startsWith("../") ? name : "assets/media/" + name;
  const pad = (value) => String(value).padStart(2, "0");

  function jumpButton(id, label, extra = "") {
    return "<button type='button' class='jump' data-jump='" + esc(id) + "'><strong>" +
      esc(label) + "</strong>" + (extra ? "<small>" + esc(extra) + "</small>" : "") +
      "<span aria-hidden='true'>↗</span></button>";
  }

  function title(page) {
    return "<div class='slide-head'><div class='section-label'>" + esc(page.label) +
      "</div><h1 id='slide-title' tabindex='-1'>" + esc(page.title) + "</h1><p>" +
      esc(page.subtitle) + "</p></div>";
  }

  function video(src, poster, label, preload = "none") {
    return "<video controls playsinline preload='" + esc(preload) + "'" +
      (poster ? " poster='" + esc(media(poster)) + "'" : "") +
      " src='" + esc(media(src)) + "' aria-label='" + esc(label) + "'></video>";
  }

  function demoItems(page) {
    if (!page.collections) return page.items;
    const collection = page.collections.find(item => item.id === collections.get(page.id)) ?? page.collections[0];
    const group = demoGroups.get(page.id) ?? "全部";
    return collection.items.filter(item => group === "全部" || item[8].group === group);
  }

  function collectionControls(page) {
    if (!page.collections) return "";
    const active = collections.get(page.id) ?? page.collections[0].id;
    const group = demoGroups.get(page.id) ?? "全部";
    return "<div class='collection-controls'><div role='group' aria-label='演示素材类型'>" +
      page.collections.map(item => "<button type='button' data-collection='" + esc(item.id) +
        "' aria-pressed='" + (item.id === active) + "'>" + esc(item.label) + "</button>").join("") +
      "</div><label>类别<select data-demo-group aria-label='筛选 OJ 演示类别'>" +
      ["全部", ...page.groups].map(value => "<option" + (value === group ? " selected" : "") + ">" + esc(value) + "</option>").join("") +
      "</select></label></div>";
  }

  function longScreenshot(file, label) {
    const src = media(file);
    return "<div class='reader-toolbar'><span>框内上下滚动 ↓</span><div>" +
      "<button type='button' data-reader-zoom aria-pressed='false'>放大 150%</button>" +
      "<button type='button' data-reader-top>回到顶部</button>" +
      "<a href='" + esc(src) + "' target='_blank' rel='noopener noreferrer'>原图 ↗</a></div></div>" +
      "<div class='screenshot-scroll' data-scroll-viewer tabindex='0' role='region' aria-label='" +
      esc(label + "，可上下滚动的完整长截图") + "'><img src='" + esc(src) + "' alt='" + esc(label) + "'></div>";
  }

  function recordContent(record) {
    return "<div class='record-scroll' data-record-viewer tabindex='0' role='region' aria-label='" +
      esc(record.t + "，完整复测记录") + "'><span class='section-label'>" + esc(record.id + " · " + record.g) +
      "</span><h3>" + esc(record.t) + "</h3><dl><dt>操作</dt><dd>" + esc(record.q) +
      "</dd><dt>记录结果</dt><dd>" + esc(record.p) + "</dd></dl>" +
      (record.code ? "<pre>" + esc(record.code) + "</pre>" : "") +
      (record.shot ? "<img src='" + esc(media(record.shot)) + "' alt='" + esc(record.t + "实机截图") + "'>" : "") +
      (record.detail ? "<small>执行记录 · " + esc(record.detail) + "</small>" : "") + "</div>";
  }

  function cards(items) {
    return items.map(([label, heading, description]) =>
      "<article class='card'><span class='section-label'>" + esc(label) +
      "</span><h2>" + esc(heading) + "</h2><p>" + esc(description) + "</p></article>"
    ).join("");
  }

  function diagram(page) {
    const [first, second, third, caption] = diagrams[page.figure][figureLanguage];
    const languages = [["zh", "中文图"], ["en", "英文图"]].map(([key, label]) =>
      "<button type='button' data-language='" + key + "' aria-pressed='" +
      (figureLanguage === key) + "' aria-label='" + (key === "zh" ? "中文技术图" : "English technical figure") + "'>" + label + "</button>"
    ).join("");
    const format = page.diagramFormat ?? "png";
    const file = figure(page.figure + "-research-" + figureLanguage, format);
    return "<figure class='research-figure'><div class='diagram-top'>" +
      "<span>科研配图</span><div class='diagram-languages'>" + languages +
      "<button type='button' data-enlarge>" + esc(ui.enlarge) + "</button>" +
      "<a href='" + file + "' download>保存 " + format.toUpperCase() + "</a></div></div><img lang='" + figureLanguage + "' alt='" +
      esc([first, second, third].map(([name, detail]) => name + " · " + detail).join(" / ")) + "' src='" +
      file + "'><figcaption><span lang='" + figureLanguage + "'>" + esc(caption) + "</span>" +
      (page.source ? "<small>" + esc(page.source) + "</small>" : "") + "</figcaption></figure>";
  }

  const layouts = {
    cover(page) {
      return "<div class='cover-art' aria-hidden='true'><img src='" + figure("hero") +
        "' alt=''></div><div class='cover-copy'><img class='college-lockup' src='assets/brand/college-lockup.png' alt='" + esc(ui.college) + "'><h1 id='slide-title' tabindex='-1'>" +
        esc(page.title) + "</h1><h2>" + esc(page.statement) + "</h2><p>" + esc(page.subtitle) +
        "</p><ul class='cover-points'>" + page.bullets.map((item) => "<li>" + esc(item) + "</li>").join("") +
        "</ul><button class='primary start' type='button' data-jump='opening'>" + esc(ui.start) + " <span>→</span></button></div>";
    },
    opening(page) {
      return title(page) + "<div class='opening-grid'><div class='opening-media'><div class='viewer'>" +
        video(...page.media, ui.openingClip) + "</div><div class='viewer-caption'><span>" + esc(ui.recording) + "</span><span>" + esc(ui.openingLabel) + "</span></div>" +
        "</div><div class='quick-links'><h2>" + esc(ui.jump) + "</h2>" +
        page.actions.map((action) => jumpButton(...action)).join("") + "</div></div>";
    },
    policy(page) {
      return title(page) + "<div class='policy-grid'>" + page.cards.map(([label, heading, desc, url]) =>
        "<article class='policy-card'><span class='section-label'>" + esc(label) + "</span><h2>" +
        esc(heading) + "</h2><p>" + esc(desc) + "</p><a href='" + esc(url) +
        "' target='_blank' rel='noopener noreferrer'>" + esc(ui.policy) + "</a></article>"
      ).join("") + "</div><div class='policy-foot'>" + esc(page.foot) + "</div>";
    },
    challenge(page) {
      return title(page) + "<div class='challenge-grid'><div class='code-plate' aria-label='" + esc(ui.code) + "'>" +
        "<div class='code-label'>" + esc(ui.codeLabel) + "</div>" +
        "<div class='array'><span>1</span><span>2</span><span class='picked'>4</span><span class='same'>4</span><span>7</span></div>" +
        "<pre>while (lo &lt; hi) {\n  const mid = (lo + hi) &gt;&gt; 1;\n  if (a[mid] &gt;= target) hi = mid;\n  else lo = mid + 1;\n}</pre></div><div class='challenge-cards'>" + cards(page.steps) +
        "</div></div><p class='note-line'>" + esc(page.footer) + "</p>";
    },
    tech(page) {
      return title(page) + "<div class='tech-grid'>" + diagram(page) +
        "<div class='tech-cards'>" + cards(page.cards) + "</div></div>";
    },
    "feature-cover"(page) {
      const demoPage = slides.find(item => item.id === page.demo);
      const [lead, emphasis] = page.title.split("\n");
      const entries = page.demoLinks
        ? page.demoLinks.map(([index, label, detail]) => [demoPage.id, label, detail, index])
        : page.demoPages
        ? page.demoPages.map(([id, label, detail]) => [id, label, detail, 0])
        : demoPage.items.map(([, label, file], index) => [demoPage.id, label, file ? ui.recording : ui.screenshot, index]);
      const links = entries.map(([id, label, detail, index]) =>
        "<button type='button' class='feature-link' data-jump='" + esc(id) +
        "' data-clip-jump='" + index + "'><strong>" + esc(label) +
        "</strong><small>" + esc(detail) +
        "</small><span aria-hidden='true'>↗</span></button>"
      ).join("");
      return "<div class='feature-intro'><span class='section-label'>" + esc(page.name) +
        "</span><h1 id='slide-title' tabindex='-1'>" + esc(lead) + "<br><em>" + esc(emphasis) +
        "</em></h1><p>" + esc(page.subtitle) +
        "</p><div class='feature-actions'><button type='button' class='primary' data-jump='" +
        demoPage.id + "' data-clip-jump='0'>开始演示 →</button><button type='button' data-jump='" + demoPage.id +
        "-tech'>查看技术设计 ↗</button></div></div><div class='feature-preview'><figure class='feature-still" +
        (page.topCrop ? " top-crop" : "") + "'>" +
        "<img src='" + media(page.poster) + "' alt='" + esc(page.alt) + "'></figure>" +
        "<nav class='feature-links' aria-label='" + esc(page.name) + "的演示片段'>" + links + "</nav></div>";
    },
    demo(page) {
      const items = demoItems(page);
      const index = selected.get(page.id) ?? 0;
      const [, , src, poster, heading, description, details, companion, options = {}] = items[index];
      const showStudent = companion && studentView.has(page.id + "/" + index);
      const [activePoster, activeHeading, activeDescription] = showStudent ? companion : [poster, heading, description];
      const techPage = slides.find((item) => item.id === (page.tech ?? page.id + "-tech"));
      const tabs = items.map(([, label], key) =>
        "<button type='button' role='tab' id='clip-" + key + "' aria-controls='clip-panel' " +
        "aria-selected='" + (key === index) + "' tabindex='" + (key === index ? 0 : -1) +
        "' data-demo='" + key + "'>" + esc(label) + "</button>"
      ).join("");
      const visual = options.kind === "long-image" ? longScreenshot(poster, heading) :
        options.kind === "record" ? recordContent(options.record) :
        src && !showStudent ? video(src, poster, heading, page.preload ?? "none") :
        "<img class='demo-still' src='" + media(activePoster) + "' alt='" + esc(activeHeading) + "'>";
      const viewerClass = options.kind === "long-image" ? " long-reader" : options.kind === "record" ? " record-reader" : "";
      const sides = companion ? "<div class='demo-sides' role='group' aria-label='选择教师端或学生端'>" +
        "<button type='button' data-demo-side='teacher' aria-pressed='" + !showStudent + "'>教师端录屏</button>" +
        "<button type='button' data-demo-side='student' aria-pressed='" + Boolean(showStudent) + "'>学生端截图</button></div>" : "";
      const notes = details.length ? "<ul class='demo-notes' aria-label='核心设计'" + (page.extended ? " tabindex='0' data-note-reader" : "") + ">" +
        details.map(([label, detail]) => "<li><strong>" + esc(label) + "</strong><p>" +
          esc(detail) + "</p></li>").join("") + "</ul>" : "";
      return title(page) + "<div class='demo-grid'><aside>" + collectionControls(page) + "<div class='tabs' role='tablist' " +
        "aria-orientation='vertical' aria-label='" + esc(ui.tabs) + "'>" + tabs +
        "</div></aside><div class='demo-panel' id='clip-panel' role='tabpanel' aria-labelledby='clip-" + index +
        "'><div class='demo-content'><div class='viewer" + viewerClass + "'>" + visual + "</div><div class='demo-copy'>" + sides + "<h2>" + esc(activeHeading) +
        "</h2><p>" + esc(activeDescription) + "</p>" +
        (techPage ? "<button type='button' class='tech-jump' data-jump='" + techPage.id + "'>" + esc(ui.technology) + "</button>" : "") +
        "</div></div>" + notes + "</div></div>";
    },
    roadmap(page) {
      return title(page) + "<div class='roadmap-grid'>" + cards(page.phases) +
        "</div><p class='note-line'>" + esc(page.line) + "</p>";
    },
    closing(page) {
      return "<div class='closing-art' aria-hidden='true'><img src='" + figure("hero") +
        "' alt=''></div><div class='closing-copy'>" + title(page) + "<div class='closing-links'>" +
        page.actions.map((action) => jumpButton(...action)).join("") + "</div></div>";
    }
  };

  function storePlayback() {
    const videoElement = slide.querySelector("video");
    if (!videoElement) return;
    if (Number.isFinite(videoElement.currentTime) && videoElement.currentTime > 0) {
      timestamps.set(mediaKey, videoElement.currentTime);
    }
    videoElement.pause();
  }

  function render(focusTitle = false) {
    const page = slides[current];
    storePlayback();
    mediaKey = page.id + "/" + (collections.get(page.id) ?? "") + "/" + (demoGroups.get(page.id) ?? "") + "/" + (selected.get(page.id) ?? 0);
    slide.className = "slide " + page.type + (page.extended ? " extended" : "");
    slide.innerHTML = layouts[page.type](page);
    const videoElement = slide.querySelector("video");
    const time = timestamps.get(mediaKey);
    if (videoElement && time > 0) {
      videoElement.preload = "metadata";
      videoElement.addEventListener("loadedmetadata", () => {
        if (time < videoElement.duration) videoElement.currentTime = time;
      }, { once: true });
    }
    document.querySelectorAll("[data-chapter]").forEach((button) => {
      button.setAttribute("aria-current", button.dataset.chapter === page.chapter ? "true" : "false");
    });
    document.querySelectorAll(".outline-list [data-jump]").forEach((button) => {
      button.setAttribute("aria-current", button.dataset.jump === page.id ? "page" : "false");
    });
    previous.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    progress.style.width = ((current + 1) / slides.length * 100) + "%";
    position.textContent = pad(current + 1) + " / " + pad(slides.length);
    pageDirectory.value = page.id;
    document.title = page.label + " · MAIR·EduNexus";
    if (focusTitle) document.querySelector("#slide-title").focus({ preventScroll: true });
  }

  function navigate(index, focusTitle = true, useHistory = true) {
    if (index < 0 || index >= slides.length || index === current) return;
    current = index;
    if (useHistory) {
      try {
        history.pushState(null, "", "#" + slides[current].id);
      } catch {
        location.hash = slides[current].id;
      }
    }
    render(focusTitle);
  }

  function chooseDemo(index) {
    const page = slides[current];
    if (index < 0 || index >= demoItems(page).length || (selected.get(page.id) ?? 0) === index) return;
    const tabScroll = slide.querySelector(".tabs").scrollTop;
    selected.set(page.id, index);
    render();
    slide.querySelector(".tabs").scrollTop = tabScroll;
    const activeTab = slide.querySelector("[data-demo='" + index + "']");
    activeTab.focus({ preventScroll: true });
    activeTab.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  const indexOf = (id) => slides.findIndex((page) => page.id === id);
  const followHash = () => navigate(Math.max(0, indexOf(location.hash.slice(1))), false, false);

  document.querySelector("#chapters").innerHTML = chapters.map(([id, label]) => {
    const first = slides.find((page) => page.chapter === id);
    return "<button type='button' data-chapter='" + id + "' data-jump='" + first.id + "'>" +
      esc(label) + "</button>";
  }).join("");
  document.querySelector("#outline-list").innerHTML = chapters.map(([id, label]) =>
    "<section><h3>" + esc(label) + "</h3>" + slides.flatMap((page, index) =>
      page.chapter === id ? ["<button type='button' data-jump='" + page.id + "'><span>" +
        pad(index + 1) + "</span>" + esc(page.label) + "</button>"] : []
    ).join("") + "</section>"
  ).join("");
  pageDirectory.innerHTML = chapters.map(([id, label]) =>
    "<optgroup label='" + esc(label) + "'>" + slides.flatMap((page, index) =>
      page.chapter === id ? ["<option value='" + esc(page.id) + "'>" +
        pad(index + 1) + " · " + esc(page.label) + "</option>"] : []
    ).join("") + "</optgroup>"
  ).join("");
  pageDirectory.addEventListener("change", () => navigate(indexOf(pageDirectory.value), false));
  slide.addEventListener("change", (event) => {
    if (!event.target.matches("[data-demo-group]")) return;
    demoGroups.set(slides[current].id, event.target.value);
    selected.set(slides[current].id, 0);
    render();
    slide.querySelector("[data-demo-group]").focus({ preventScroll: true });
  });

  document.addEventListener("click", (event) => {
    const jump = event.target.closest("[data-jump]");
    const demo = event.target.closest("[data-demo]");
    const side = event.target.closest("[data-demo-side]");
    const language = event.target.closest("[data-language]");
    const collection = event.target.closest("[data-collection]");
    if (jump) {
      if (menu.open) menu.close();
      if (jump.dataset.clipJump !== undefined) {
        collections.delete(jump.dataset.jump);
        demoGroups.delete(jump.dataset.jump);
        selected.set(jump.dataset.jump, Number(jump.dataset.clipJump));
      }
      navigate(indexOf(jump.dataset.jump));
    }
    if (demo) chooseDemo(Number(demo.dataset.demo));
    if (collection && collection.getAttribute("aria-pressed") !== "true") {
      collections.set(slides[current].id, collection.dataset.collection);
      selected.set(slides[current].id, 0);
      render();
      slide.querySelector("[data-collection='" + collection.dataset.collection + "']").focus({ preventScroll: true });
    }
    if (event.target.closest("[data-reader-top]")) slide.querySelector("[data-scroll-viewer]").scrollTop = 0;
    const zoom = event.target.closest("[data-reader-zoom]");
    if (zoom) {
      const reader = slide.querySelector("[data-scroll-viewer]");
      const ratio = reader.scrollTop / Math.max(1, reader.scrollHeight - reader.clientHeight);
      const zoomed = reader.classList.toggle("is-zoomed");
      zoom.setAttribute("aria-pressed", String(zoomed));
      zoom.textContent = zoomed ? "适应宽度" : "放大 150%";
      reader.scrollTop = ratio * Math.max(0, reader.scrollHeight - reader.clientHeight);
      if (!zoomed) reader.scrollLeft = 0;
    }
    if (side && side.getAttribute("aria-pressed") !== "true") {
      const key = slides[current].id + "/" + (selected.get(slides[current].id) ?? 0);
      if (side.dataset.demoSide === "student") studentView.add(key);
      else studentView.delete(key);
      render();
      slide.querySelector("[data-demo-side='" + side.dataset.demoSide + "']").focus({ preventScroll: true });
    }
    if (language && figureLanguage !== language.dataset.language) {
      figureLanguage = language.dataset.language;
      slide.querySelector(".research-figure").outerHTML = diagram(slides[current]);
      slide.querySelector("[data-language='" + figureLanguage + "']").focus({ preventScroll: true });
    }
    if (event.target.closest("[data-enlarge]")) {
      const preview = slide.querySelector(".research-figure img");
      const detail = document.querySelector("#figure-detail");
      detail.src = preview.src;
      detail.alt = preview.alt;
      document.querySelector("#figure-title").textContent = slides[current].label;
      figureDialog.showModal();
    }
  });
  document.querySelector("#outline-open").addEventListener("click", () => menu.showModal());
  document.querySelector("#outline-close").addEventListener("click", () => menu.close());
  document.querySelector("#figure-close").addEventListener("click", () => figureDialog.close());
  previous.addEventListener("click", () => navigate(current - 1));
  next.addEventListener("click", () => navigate(current + 1));
  function toggleFullscreen() {
    const transition = document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.();
    transition?.catch(() => {});
  }
  full.addEventListener("click", toggleFullscreen);
  document.addEventListener("fullscreenchange", () => {
    full.textContent = document.fullscreenElement ? ui.exitFull : ui.fullscreen;
  });
  document.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || menu.open || figureDialog.open ||
        event.target.closest("video, input, textarea, select, [contenteditable], [data-scroll-viewer], [data-record-viewer], [data-note-reader]")) return;
    const tab = event.target.closest("[data-demo]");
    if (tab && ["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      const count = demoItems(slides[current]).length;
      const active = Number(tab.dataset.demo);
      const target = { ArrowDown: (active + 1) % count, ArrowUp: (active - 1 + count) % count, Home: 0, End: count - 1 }[event.key];
      event.preventDefault();
      chooseDemo(target);
      return;
    }
    const key = event.key.toLowerCase();
    if (["arrowright", "pagedown", "arrowleft", "pageup", "home", "end", "f", "g"].includes(key)) event.preventDefault();
    if (key === "arrowright" || key === "pagedown") navigate(current + 1);
    if (key === "arrowleft" || key === "pageup") navigate(current - 1);
    if (key === "home") navigate(0);
    if (key === "end") navigate(slides.length - 1);
    if (key === "f") toggleFullscreen();
    if (key === "g") menu.showModal();
  });
  window.addEventListener("popstate", followHash);
  window.addEventListener("hashchange", followHash);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) storePlayback();
  });
  const resize = () => stage.style.setProperty("--scale", Math.min(innerWidth / 1600, innerHeight / 900));
  window.addEventListener("resize", resize);
  resize();
  current = Math.max(0, indexOf(location.hash.slice(1)));
  render();
})();
