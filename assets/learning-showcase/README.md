# 模拟课堂与学习笔记展示模块

入口：`learning-showcase.html`。沿用当前仓库首页的设计令牌、Noto 字体、导航、留白与卡片风格；`template-base.css` 为首页主样式的原样提取，模块扩展集中在 `showcase.css`。

本地预览：在仓库根目录执行 `python -m http.server 4173 --bind 127.0.0.1`，访问 `http://127.0.0.1:4173/learning-showcase.html`。也可直接双击 HTML；移动文件时需保留同目录的 assets。

- 两个独立功能板块：`#classroom`、`#notes`。各自上方是可切换演示与旁侧讲解，下方是技术架构图、实现思路和设计亮点。
- 视频与图片分别通过页签展示。切换演示停止旧视频；播放其他模块的视频时也暂停原视频。图片可点击放大。
- 替换文字和素材对应关系：编辑 `assets/learning-showcase/content.js`。替换录屏：更新 `media/` 中同名 MP4 与 JPG。播放器不自动播放，不预先加载全部录像。
- 内容依据：飞书“模拟课堂与学习笔记测试表 副本” `NRzqdB5DVoYR6wxFJfLcEO9GnJe`；已有测试录屏；本地 HUST-CSAgent 源码。原始测试文档的各项结论仍以原文为准，本页不把已有素材等同于全面验收通过。
- 源码核对位置：`apps/web/src/views/classroom-launcher-workspace/ClassroomLauncherWorkspace.tsx` 的 pageContext、questionResume 与分步/播放状态；`ClassroomAssets.tsx` 的受限 Demo iframe；`apps/api/src/routes/registrars/learning.ts` 的当前用户笔记本及保存权限检查。
- 对话保存笔记、完整讲稿切换、标注/显示状态等缺少对应独立本地素材的过程，保留原文入口，不使用其他录屏冒充。当前图片均为实录截帧，可后续换成专门的界面截图。
- 仅添加静态展示模块与主页入口，不改已有工作台逻辑。未部署或推送远端。
