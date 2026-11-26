# 数字人展示包

## 打开方式
在本目录执行 `python -m http.server 4173 --bind 127.0.0.1`，打开 http://127.0.0.1:4173/algorithm.html 。
两页、assets 目录须一起保留。线上发布需由主页维护者合入；本包未自动发布。

## 素材状态
- classroom.html：保留协作组的六段现有录屏；版本与测试信息记录在本文；数据未重新复测。
- algorithm.html：按用户编号 1–5 接入五段正式操作录屏，分别对应进入开讲、步骤同步、暂停续播、代码追问、音色语气。
- 新素材放入 assets/media/algorithm，文件名见该目录 README.txt。当前已附封面和视频；建议用 HTTP 预览。
- 算法页版本：基线为主项目 feature/qeh 662f8e1e，数字人后端 qeh 53d6e05；录屏还包含之后的本地问答修复。
- 字幕逐句同步、判题失败用例自动讲解、多形象均未列作已完成功能。

## 原件与集成
收到的原始解压包未修改，另有工作区私有原始备份。当前包只整理展示，不改教学产品或服务。
字体、配色、公共样式来自提供的 EduNexus 模板；新增两张可编辑 SVG。无需前端构建。

## 网页视频兼容性
用户原片为 HEVC，原文件保留于 D:/1126。展示包使用 H.264 / yuv420p 视频副本，音频流原样复制，启用 faststart。

| 场景 | 时长 | 画面尺寸 |
|---|---|---|
|a1-entry|14.2s|1280×698|
|a2-step-sync|18.9s|1152×720|
|a3-pause-resume|14.2s|1280×704|
|a4-code-question|8.9s|1248×720|
|a5-voice-style|11.6s|1280×704|

## 展示与交接说明
本模块为静态功能展示页，通过本地录屏演示产品功能；不提供在线课堂或工作台服务连接。页面中的播放、标签切换和导航可用。主页维护者可将 digital-human 目录整体接入现有站点，入口为 classroom.html 和 algorithm.html。

课堂素材基线：主项目 team/digital f34223eb，服务 feature/lzh-rtp-captions c87db57。课堂数据由协作组提供，本次未重新复测，也不作为算法侧性能结论。以下为从公开页面移出的原始交接信息，保留其来源口径：

<aside class="source-note wrap" aria-label="课堂版本来源"><b>课堂素材来源说明</b><p>本页保留协作组提供的课堂录屏、功能说明与数据，版本为页面所列 team/digital · f34223eb / feature/lzh-rtp-captions · c87db57；数据未在本次展示整理中重新复测。算法页另列自己的实现版本，不共用性能结论。</p></aside>

<div class="tablewrap"><table>
    <thead><tr><th>验收指标</th><th>结果</th><th>说明</th></tr></thead>
    <tbody>
      <tr><td>音色</td><td><code>longanlufeng</code></td><td>课堂默认男声</td></tr>
      <tr><td>会话 / 视频 / 语音就绪</td><td>true / true / true</td><td>三路都建立成功</td></tr>
      <tr><td>首次播放耗时</td><td>2413 ms</td><td>开始讲课到首帧有声</td></tr>
      <tr><td>暂停与恢复</td><td>true</td><td>位置保持，不重播</td></tr>
      <tr><td>播放进度事件</td><td>288 条</td><td>字幕对齐的数据来源</td></tr>
      <tr><td>RTP 尾包 / 取消发送</td><td>true / true</td><td>收尾与打断都正确</td></tr>
      <tr><td>解码帧 / 音频字节</td><td>1515 帧 / 738,600 B</td><td>画面与音频确实在流</td></tr>
    </tbody>
  </table></div>

<div class="limits">
    <div><h3>当前限制</h3><ul>
      <li>进度回传仍在个人分支 <code>c87db57</code>，未合入数字人服务公共分支。</li>
      <li>课堂 API、语音网关、LiveTalking 必须指向同一实例，否则出现 PCM 背压 429。</li>
      <li>云端默认音色实测基频约 188 Hz，偏女声；需要明确男声时可切换 edge-tts 云阳或提供授权音色。</li>
      <li>本轮只保留「小岚」一个教师形象。</li>
    </ul></div>
    <div><h3>下一步</h3><ul>
      <li>合并进度回传分支，补齐失败重试提示。</li>
      <li>首播压到 1.5 s 以内，逐页字幕抽查。</li>
      <li>多形象、讲稿动作编排、真实板书书写。</li>
      <li>手机宽度（390px）走查课堂。</li>
    </ul></div>
  </div>
