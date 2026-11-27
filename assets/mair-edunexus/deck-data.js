window.eduDeck = {
  diagrams: {
    infra: {
      zh: [["请求限域", "课程、资料、写入对象"], ["Host / Pi 分层", "工具执行前核验当前权限"], ["可验证完成", "持久化回执与产物"], "模型给出操作意图，Host 用权限、终态与提交回执判定完成。"],
      en: [["Scope the Request", "Courses, assets and writable targets"], ["Host / Pi Boundary", "Recheck access before tool execution"], ["Verifiable Completion", "Persist receipts and artifacts"], "The model proposes actions. Host verifies access, terminal state and committed receipts."]
    },
    rsi: {
      zh: [["选尾部，建索引", "先取末尾 8 条合格消息"], ["校准与留出验证", "逐字节等价，权限约束不变"], ["投影器局部计数", "访问 823,808 → 3,977"], "5 个固定合成留出场景。数据来自历史投影器，整条请求耗时需单独测量。"],
      en: [["Select Tail and Index", "Select the last 8 eligible messages"], ["Calibration and Holdout", "Byte equality and access invariants"], ["Local Projection Counts", "Journal visits 823,808 → 3,977"], "Five fixed synthetic holdout cases. These counts cover projection only. End-to-end latency requires a separate measurement."]
    },
    classroom: {
      zh: [["课件时间树", "按物理页解析 p:timing"], ["后台双路径", "能解析时用解析，复杂页用 Impress"], ["完整帧组才可见", "有效步数等于计划步数"], "同一帧组校验源哈希、渲染代际、步骤和 PNG。缺步时继续读已发布的预览。"],
      en: [["Slide Timing Tree", "Parse p:timing per physical page"], ["Background Render Paths", "Parse first, fall back to Impress"], ["Publish Only Complete Packs", "Valid step count equals the plan"], "Check source hash, renderer fingerprint, step IDs and PNGs. Serve the published preview while steps are missing."]
    },
    notes: {
      zh: [["选中对话块", "会话、消息和内容块标识"], ["提交动作与回执", "分离来源引用和所有者权限"], ["个人库条目", "原始引用随正文一起保存"], "用户触发保存后记录 actionReceiptId。打开个人资产时检查 ownerUserId。"],
      en: [["Select a Message Block", "Session, message and block IDs"], ["Commit and Record Receipt", "Separate provenance and ownership"], ["Personal Library Entry", "Persist citations with content"], "An explicit save records actionReceiptId. Opening the entry verifies ownerUserId."]
    },
    avatar: {
      zh: [["Qwen PCM 流", "stream_id 与片段序号控制队列"], ["媒体与字幕对齐", "按 SSRC 匹配 48 kHz RTP"], ["接收端确认尾包", "播放头越过尾帧才确认完成"], "同一 PCM 驱动口型和 WebRTC 音轨。实线为媒体，虚线为播放回执。"],
      en: [["Qwen PCM Stream", "Queue by stream ID and sequence"], ["Media and Caption Alignment", "Match SSRC on a 48 kHz RTP clock"], ["Receiver Tail Acknowledgment", "Wait until playout passes the tail"], "One PCM stream drives lip motion and WebRTC audio. Solid lines carry media. Dashed lines carry playback receipts."]
    },
    algorithm: {
      zh: [["可复现的状态快照", "数据结构和 activeLine"], ["讲解请求绑定步骤", "requestId 关联当前讲授"], ["匹配的完成事件", "问答和中止有独立状态"], "当前讲授的完成回执驱动推进。暂停保留位置，追问使用当前代码和状态。"],
      en: [["Reproducible State Snapshots", "Data state and activeLine"], ["Bind Narration to Its Step", "requestId tracks the active lecture"], ["Match the Completion Event", "Questions and stops have separate states"], "The active lecture receipt advances playback. Pausing retains position. Questions use the current code and state."]
    },
    ppt: {
      zh: [["大纲与内容确认", "确认绑定用户、会话与版本"], ["逐页生产与核验", "SVG 定稿，检查缺页与版式"], ["交付 PPTX", "修改后检查状态重置"], "检查不通过时返回对应诊断，修订后重新核验，再生成交付文件。"],
      en: [["Confirm Outline and Content", "Bind confirmation to user, session and revision"], ["Build and Check Individual Slides", "Finalize SVG and check coverage and layout"], ["Deliver Editable PPTX", "Edits invalidate the prior check"], "Failed checks return diagnostics. Recheck amended slides before creating the deliverable."]
    }
  },
  chapters: [
    ["intro", "开场"], ["problem", "教学挑战"], ["infra", "技术基座"],
    ["demo", "功能演示"], ["outlook", "展望"]
  ],
  slides: [
    {
      id: "cover", chapter: "intro", type: "cover", label: "智联教枢",
      title: "MAIR·EduNexus\n智联教枢",
      statement: "推动“结果评价”到“体验式学习”",
      subtitle: "Agentic Infra 时代的计算机教学智能平台与实践探索",
      bullets: ["可交互的课堂", "可复盘的过程", "可校验的教学产物"]
    },
    {
      id: "opening", chapter: "intro", type: "opening", label: "开场演示",
      title: "先看一遍｜课堂可以被学生打断",
      subtitle: "当学生跟不上这一页，可以停下来、问清楚，再从原处继续。",
      media: ["classroom/02.mp4", "classroom/02.jpg"],
      actions: [
        ["classroom-home", "看课堂怎么继续", "切页、动画、讲解与追问"],
        ["notes-home", "看理解怎么留下来", "把课堂内容归档为自己的笔记"],
        ["algorithm-avatar-home", "看程序怎么一步步执行", "逐步解读数据状态和代码"]
      ]
    },
    {
      id: "policy", chapter: "problem", type: "policy", label: "政策与教学目标",
      title: "让过程评价有可观察的证据",
      subtitle: "保留结果评价，把练习中的解释、验证和修订带回教学过程。",
      foot: "课堂里的提问、推演和修订，可以成为教师给出反馈的依据。",
      cards: [
        ["2020 · 教育评价改革", "强化过程评价", "课堂追问、代码推演和笔记修订都可以成为教学反馈的依据。", "https://www.moe.gov.cn/jyb_xxgk/moe_1777/moe_1778/202010/t20201013_494381.html"],
        ["2025 · 教育强国建设规划纲要", "智能技术支持评价", "以教学场景为单位验证 AI 的作用，观察学生如何完成具体学习任务。", "https://www.moe.gov.cn/jyb_xxgk/moe_1777/moe_1778/202501/t20250119_1176193.html"],
        ["2025 · 教育数字化意见", "应用导向，治理为基", "使用受授权的课程资料，记录可复核的产物，支持教师审阅。", "https://www.moe.gov.cn/srcsite/A01/s7048/202504/t20250416_1187476.html"]
      ]
    },
    {
      id: "challenges", chapter: "problem", type: "challenge", label: "计算机本科教学挑战",
      title: "一道题做对了，学生理解了哪一步？",
      subtitle: "以二分查找找第一个满足条件的位置为例。",
      steps: [
        ["看概念", "为什么更新的是右边界？", "结合当前代码行、区间和元素状态逐步讲解。"],
        ["试边界", "重复元素和全空区间会怎样？", "暂停推演，指出当前不变量，并验证一个反例。"],
        ["留证据", "下次还能解释自己的选择吗？", "把出错样本、修正理由和课堂来源存进笔记。"]
      ],
      footer: "让教师看到学生卡在哪个推理步骤，让学生能重走这一步。"
    },
    {
      id: "architecture", chapter: "infra", type: "tech", label: "Agentic Infra 架构",
      title: "Agentic Infra｜给教学行动加上权限与回执",
      subtitle: "学生指着一页课件发问，系统要先确定能读什么，再验证实际完成了什么。",
      figure: "infra", alt: "多层教学智能体基座的科研概念插图",
      cards: [
        ["请求限域", "授权随任务传播", "ResourceEnvelope 携带用户、课程、可读资料和可写对象。检索缓存命中也要核验当前 ACL 与资料代际。"],
        ["执行控制", "Host 裁决，Pi 组织循环", "Pi 组织模型和工具结果。Host 校验 Tool Call 的权限、预算和用户确认，再执行实际操作。"],
        ["提交证据", "用持久化回执判定完成", "长任务记录状态与回执。失败、取消和未提交结果有独立终态，只有已提交产物发布到工作台。"]
      ],
      source: "实现依据 · enterprise-acceptance.md · agent-artifacts-jobs-rag.md"
    },
    {
      id: "rsi", chapter: "infra", type: "tech", label: "创新与 RSI",
      title: "RSI｜优化会话历史投影，用等价性约束改进",
      subtitle: "以最近对话进入模型上下文的实现为例，展示两轮受控的递归改进。",
      figure: "rsi", alt: "最近历史投影、校准与留出数据隔离、局部成本对比",
      cards: [
        ["两次迭代", "先复用索引，再缩小构造范围", "先为证据统一建立索引，再取末尾 8 个可读候选。只对进入窗口的消息构造回答。"],
        ["验证约束", "校准筛候选，留出集做终验", "最终候选只在留出集做终验。逐字节比较 JSON，并复核权限、来源撤回和失败终态。"],
        ["局部实测", "构造回答次数 229 → 9", "5 个合成留出场景与基线输出逐字节等价。通过人工审阅后在代码中固定策略。"]
      ],
      source: "实现与数据 · docs/guides/harness-rsi.md · npm run rsi:evaluate"
    },
    {
      id: "classroom-home", chapter: "demo", type: "feature-cover", label: "模拟课堂 · 首页",
      name: "模拟课堂", title: "遇到不懂的地方，\n先停下来问一句",
      subtitle: "学生可以听讲、追问再继续，老师可以把课件、讲稿和互动演示交给学生使用。",
      demo: "classroom", poster: "classroom/02.jpg", alt: "模拟课堂的课件讲解与提问界面",
      demoPages: [
        ["classroom", "流式讲解与随堂互动", "从打开课件，到追问、批注和续讲"],
        ["classroom-resources", "教学资源与师生交互", "从教师发布，到学生查看和使用"]
      ]
    },
    {
      id: "classroom", chapter: "demo", type: "demo", label: "模拟课堂 · 流式讲解",
      title: "模拟课堂｜让讲解跟着学生的节奏走",
      subtitle: "打开课件开始听讲，遇到问题随时打断，问清楚再继续。",
      items: [
        ["open", "课件即课堂", "classroom/05.mp4", "classroom/05.jpg", "选一份资料，就可以开始上课", "从课程资料中打开文件。对照下载原件和进入课堂两个入口，看看同一份教学资料怎样用于课堂讲解。", []],
        ["interrupt", "打断再续讲", "classroom/02.mp4", "classroom/02.jpg", "讲到不懂的地方，随时插一句", "听流式讲解如何回应当前页的问题。留意提问出现后课件的位置，以及这一段讲授怎样继续。", [["讲授与问答独立", "两类语音各自记录进度，打断时可以回到原讲授。"], ["流式回应", "语音可边生成边播放，缩短等到第一句话的时间。"]]],
        ["generate", "问答与演示", "classroom/01.mp4", "classroom/01.jpg", "问清原理，再做成一段可交互演示", "从课堂中的多轮追问出发，让 Agent 生成一段 Demo。看讲解如何从口头解释过渡到可以在课堂里查看的演示。", [["沿用课堂上下文", "围绕当前讲授内容追问，并在同一课堂发起演示生成。"]]],
        ["voice", "选择讲解声音", "", "classroom/figure-3.png", "给课堂选一种听得顺的声音", "截图展示教师音色和讲解语气的入口。在同一页课件上，可以按听课偏好调整讲解声音。", []],
        ["annotation", "找出本页重点", "", "classroom/figure-1.png", "让知识重点落在课件上", "观察课件上的编号、标注范围，以及下方对应的重难点说明。学生也可以使用框选工具关注特定内容。", [["标注对应可见位置", "图上编号与课件下方说明对应，讲解可以回到具体内容。"]]],
        ["note", "随手记一笔", "", "classroom/figure-2.png", "听到关键处，就在课堂里记下来", "课堂侧栏可以边看课件边写笔记，也可以保存后归档到个人笔记本。截图中笔记与课件页同时可见。", []],
        ["autopage", "讲完自动翻页", "classroom/12.mp4", "classroom/12.jpg", "让讲解自然接到下一页", "观察托管模式下讲解结束后的页面切换。连续听课时不必逐页点击，想自己控制时仍可手动翻页。", [["按播放状态推进", "当前段落播完后，课堂才推进到下一页。"]]]
      ]
    },
    {
      id: "classroom-resources", chapter: "demo", type: "demo", label: "模拟课堂 · 资源与师生交互",
      title: "模拟课堂｜让教师的资源走进学生课堂",
      subtitle: "从课上使用演示和讲稿，到教师发布、学生接收与后续修订。",
      tech: "classroom-tech",
      items: [
        ["bubble", "推演冒泡排序", "classroom/13.mp4", "classroom/13.jpg", "看得见每一次比较和交换", "用冒泡排序 Demo 做课堂例子。跟着画面观察元素怎样比较、什么时候交换，以及一轮结束后哪些位置已经确定。", [["把过程变成教学材料", "用可视化呈现中间状态，方便学生针对某一步提问。"]]],
        ["scripts", "选用不同讲稿", "classroom/04.mp4", "classroom/04.jpg", "同一份课件，可以换一种讲法", "在课堂的讲稿入口查看可用讲稿，选择和切换适合本次听课的版本。留意课件与讲稿是分别选择的。", [["讲稿与课件关联", "同一课件可以关联不同讲稿，在课堂中切换。"]]],
        ["share-demo", "共享演示", "classroom/06.mp4", "classroom/06.jpg", "把教师的互动演示分享给学生", "先看教师如何发布和导入 Demo，再切到学生端，查看已发布的演示怎样出现在课堂中。", [["同一资源，两端使用", "教师负责发布，学生在课堂使用发布后的 Demo。"]], ["classroom/10.png", "从学生端找到教师发布的演示", "截图展示学生进入课堂后可以看到的 Demo。在同一个演示项里对照教师端操作，核对资源如何到达学生。"]],
        ["share-course", "共享课程", "classroom/07.mp4", "classroom/07.jpg", "教师发布，学生有入口可学", "教师端录屏展示课程发布过程。切到学生端可以对照发布结果，看看学生如何进入课程。", [["发布后才进入学习视图", "教师发布和学生查看从各自入口完成。"]], ["classroom/09.png", "学生在课程列表中找到已发布课程", "截图展示学生侧的课程入口。与教师发布录屏相对照，看到课程从教师管理走到学生使用。"]],
        ["edit-script", "修订教师讲稿", "classroom/08.mp4", "classroom/08.jpg", "把讲稿改成适合自己课堂的版本", "观察教师打开已有讲稿、修改内容并保存的操作。课程需要更新讲法时，可以从已有讲稿继续修订。", []]
      ]
    },
    {
      id: "classroom-tech", chapter: "demo", type: "tech", label: "模拟课堂 · 技术",
      title: "模拟课堂｜让翻页与后台生成解耦",
      subtitle: "课件更新时，学生仍能打开当前页。后台准备完成后，课堂按页读取新帧。",
      figure: "classroom", alt: "静态课件预览与分步动画组合为课堂页上下文的科研概念插图",
      cards: [
        ["预存代际", "源文件和工具链共同定位", "缓存按原件哈希、工具链指纹、课件 ID、页码和步号定位。解析分步优先，复杂动画使用 Impress 帧组。"],
        ["读侧完整性", "完整步集合才进入课堂", "核对路径、文件哈希、PNG 和覆盖步数。新帧组缺步时，运行态仍可读同源的有效旧预览或静态页。"],
        ["生成隔离", "课上读成品，后台补缺项", "课堂动画口只读登记帧。工作目录保留到渲染结束，发布与播放期间用租约保护成品。"]
      ],
      source: "实现依据 · presentation-build-preview.ts · courseware-preprocessing.ts"
    },
    {
      id: "notes-home", chapter: "demo", type: "feature-cover", label: "学习笔记 · 首页",
      name: "学习笔记", title: "把课堂里弄懂的事，\n留在自己的笔记里",
      subtitle: "从对话摘录解释，从课堂归档学习内容，也可以从空白开始写。复习时还能找回出处。",
      demo: "notes", poster: "write.jpg", alt: "个人学习笔记编辑界面"
    },
    {
      id: "notes", chapter: "demo", type: "demo", label: "学习笔记 · 演示",
      title: "学习笔记｜把课堂理解留下来",
      subtitle: "从提问、课堂复盘或个人整理进入同一个个人工作区。",
      items: [
        ["dialog", "对话存笔记", "dialog-save.mp4", "dialog-save.jpg", "把有用解释存进笔记", "从对话中选择值得保留的内容，再到个人资料库中打开并编辑这条笔记。", [["显式保存", "用户确认后才从临时对话写入个人资料库。"], ["保留来源", "记录原消息和引用，方便日后复核。"]]],
        ["archive", "课堂归档", "archive.mp4", "archive.jpg", "从课堂归档到个人空间", "演示如何把本次课堂中的学习内容保存到可回看的笔记条目。", [["个人所有，保留出处", "笔记归本人所有，课程和课堂可追溯。"]]],
        ["write", "自主写作", "write.mp4", "write.jpg", "把理解写成自己的话", "打开笔记编辑器，用自己的话整理概念或把错题的修正过程记下来，稍后可以继续修改。", []]
      ]
    },
    {
      id: "notes-tech", chapter: "demo", type: "tech", label: "学习笔记 · 技术",
      title: "学习笔记｜个人资产与出处分开建模",
      subtitle: "可编辑的学习成果有自己的归属，课堂与资料提供追溯线索。",
      figure: "notes", alt: "课堂证据层、来源标签和笔记编辑面板组成的科研概念插图",
      cards: [
        ["对话保存", "草稿先于写入", "从已选 messageId、blockId 投影出学习草稿。用户保存后建立动作回执和个人资产条目。"],
        ["来源关系", "回看时能定位原消息", "资产保留 sourceSessionId、sourceMessageId 及 citations。正文随后能独立修订。"],
        ["对象授权", "用所有者核验个人条目", "同步到个人库后按 ownerUserId 查回条目，并把 libraryEntryId 与 actionReceiptId 回填到来源块。"]
      ],
      source: "实现依据 · action-plane/conversation-learning-drafts.ts"
    },
    {
      id: "classroom-avatar-home", chapter: "demo", type: "feature-cover", label: "课堂数字人 · 首页",
      name: "课堂数字人", title: "让讲者和课件\n出现在同一个课堂",
      subtitle: "在课件旁同时看到讲者和当前页。翻页时继续讲新内容，遇到公式或疑问可以停下来互动。",
      demo: "classroom-avatar", poster: "c1-intro.png", alt: "课件与课堂数字人同屏"
    },
    {
      id: "classroom-avatar", chapter: "demo", type: "demo", label: "课堂数字人 · 演示",
      title: "课堂数字人｜课件与讲者同屏",
      subtitle: "以整页讲授为主，展示翻页、公式解释和互动。",
      items: [
        ["intro", "进入课堂", "c1-intro.mp4", "c1-intro.png", "让讲者和资料一起出现", "看课件、数字人画面与语音如何在同一课堂出现。听到讲解时，讲者的口型和声音同步呈现。", [["共享课件上下文", "讲解围绕课堂当前可见页组织。"], ["单路声源驱动", "同一 PCM 流用于口型驱动和 WebRTC 音轨。"]]],
        ["pages", "逐页同步", "c2-pages.mp4", "c2-pages.png", "切到下一页就讲下一页", "观察页码变化和讲解内容的对应关系，讲者画面延续在同一课堂。", [["切页替换讲解", "旧页语音流可取消，已有媒体连接可复用。"]]],
        ["formula", "公式讲解", "c3-formula.mp4", "c3-formula.png", "解释公式里的关键项", "在含公式的课件里看数字人如何结合当前资料解释符号和推理。", [["讲解上下文落到页", "讲授围绕该页内容，不把相邻页混在一起。"]]],
        ["question", "课堂互动", "c5-question.mp4", "c5-question.png", "对当前课堂追问", "展示学生结合当前教学内容进行互动的路径，观察课堂讲者的回答。", []]
      ]
    },
    {
      id: "classroom-avatar-tech", chapter: "demo", type: "tech", label: "课堂数字人 · 技术",
      title: "课堂数字人｜用浏览器播放回执驱动课堂",
      subtitle: "数字人模式统一媒体输出，课堂控制按实际播放推进。",
      figure: "avatar", alt: "PCM 音频、数字人口型与 WebRTC 媒体同步的科研概念插图",
      cards: [
        ["有序队列", "背压重试保留序号", "LiveTalking 消费跟不上时，重试同一音频片段。切页、打断会取消旧流和等待，WebRTC 可以继续复用。"],
        ["播放时钟", "用同一 SSRC 对齐字幕", "根据接收端 RTP 时间戳与进度标记计算显示游标。暂停时冻结，空闲 RTP 不计入讲解进度。"],
        ["完成判定", "尾包到达后等待持续播放", "尾帧跨度是 960 ticks（20 ms）。同一接收源越过尾帧后，还需连续保持 150 ms 才确认完成。"]
      ],
      source: "实现依据 · avatar-bridge.mjs · avatar-playout.ts（digital 原型）"
    },
    {
      id: "algorithm-avatar-home", chapter: "demo", type: "feature-cover", label: "算法数字人 · 首页",
      name: "算法数字人", title: "让程序跑到哪一步，\n讲解就跟到哪一步",
      subtitle: "在同一个执行步骤看数据、代码和讲解。可以暂停并追问当前行，再继续推演。",
      demo: "algorithm-avatar", poster: "a2-step-sync.png", alt: "算法推演、代码高亮与数字人讲解"
    },
    {
      id: "algorithm-avatar", chapter: "demo", type: "demo", label: "算法数字人 · 演示",
      title: "算法数字人｜逐步讲清程序状态",
      subtitle: "把抽象算法变成可以停住、可以追问的执行过程。",
      items: [
        ["sync", "步骤与代码", "a2-step-sync.mp4", "a2-step-sync.png", "同时看数据、代码和解释", "观察数据状态、高亮代码行和语音讲解如何对应到同一步，找出变化是由哪行代码引起的。", [["以步骤绑定数据与代码", "同一执行步骤提供数据状态和当前行。"], ["匹配回执才推进", "只用当前讲授请求的完成事件驱动下一步。"]]],
        ["pause", "暂停与恢复", "a3-pause-resume.mp4", "a3-pause-resume.png", "停在这一步想清楚", "在推演中暂停，确认变化发生的原因后恢复到原来的学习位置。", [["暂停保留游标", "恢复操作延续当前播放位置和算法步骤。"]]],
        ["question", "对代码追问", "a4-code-question.mp4", "a4-code-question.png", "向数字人追问这一行", "围绕当前代码行和状态提问，借具体输入理解分支条件和执行结果。", [["问答与讲授分开", "问答读取当前代码和步骤，其完成事件不推进讲授。"]]],
        ["entry", "进入算法演示", "a1-entry.mp4", "a1-entry.png", "选择算法演示场景", "查看算法演示入口、代码区域和可视化区域，进入逐步讲授。", []]
      ]
    },
    {
      id: "algorithm-avatar-tech", chapter: "demo", type: "tech", label: "算法数字人 · 技术",
      title: "算法数字人｜同一步骤同时约束代码、画面和语音",
      subtitle: "把可复现的算法执行状态作为教学依据。",
      figure: "algorithm", alt: "数组状态、代码行和语音时间点互相对齐的科研概念插图",
      cards: [
        ["教学状态", "上下文显式绑定代码行", "AlgorithmNarration 携带 code、activeLine、text 和 requestId。当前高亮和生成讲解来自同一执行位置。"],
        ["事件隔离", "讲授和问题分别记活动流", "活动流记录 lecture 或 question 及响应身份。讲授完成回传本次 requestId，供算法演示推进。"],
        ["暂停和追问", "流程保留当前推演位置", "暂停保留请求与播放位置。追问携带当前代码和步骤，需要时可继续原有讲授。"]
      ],
      source: "实现依据 · algorithm-narration.ts · AlgorithmNarrator.tsx（digital 原型）"
    },
    {
      id: "ppt-home", chapter: "demo", type: "feature-cover", label: "PPT 生成 · 首页",
      name: "PPT 生成", title: "从教学目标出发，\n交付一份可编辑的课件",
      subtitle: "先确认教学需求和内容结构，再逐页预览和修订，最后导出 PPTX 继续备课。",
      demo: "ppt", poster: "ppt-preview.png", alt: "已生成课件的在线预览"
    },
    {
      id: "ppt", chapter: "demo", type: "demo", label: "PPT 生成 · 演示",
      title: "PPT 生成｜从教学需求到可编辑课件",
      subtitle: "示例覆盖教学需求确认、课件编辑、在线预览与导出。",
      items: [
        ["complete", "完整生成", "ppt-complete.mp4", "ppt-complete.jpg", "用主题和教学目标启动课件", "录屏从工作台发起请求，查看教学任务确认和课件大纲，最后打开可编辑的导出文件。", [["结构分段确认", "先确定受众和目标，再确认大纲与内容。"], ["交付前核验", "页齐、检查通过后才允许调用导出。"]]],
        ["edit", "编辑稿件", "", "ppt-edit.png", "生成后还可以逐页修订", "查看课件工作区。可以针对某一页继续提出修改要求，保留对内容的控制。", [["按页定位修改", "写入或重做会清除原检查结论。"]]],
        ["preview", "在线预览", "", "ppt-preview.png", "按最终画面校对", "浏览页面缩略图和当前课件页，检查内容层次、版式及教学顺序。", []],
        ["export", "导出课件", "", "ppt-export.png", "交付后可继续备课", "查看导出的课件在办公软件中的展示，教师可以继续编辑并用于备课。", []]
      ]
    },
    {
      id: "ppt-tech", chapter: "demo", type: "tech", label: "PPT 生成 · 技术",
      title: "PPT 生成｜教学意图、版面与文件分别验收",
      subtitle: "用结构化计划和可检查产物控制生成过程。",
      figure: "ppt", alt: "课件计划、版式检查和版本化产物叠层的科研概念插图",
      cards: [
        ["任务与版本", "大纲和内容分阶段确认", "Brief 保存教学目标，SlidePlan 组织顺序。确认键绑定用户、会话和版本，计划规范化后用 SHA-256 校验。"],
        ["逐页生产", "SVG 定稿后检查完整性", "PPT-Master 接收逐页片段并定稿。运行检查前确认页已齐，质量模块报告文本溢出、重叠等可定位问题。"],
        ["交付条件", "修改使既有检查失效", "工具写入后重置 checked。失败返回可重试的结构化诊断，重新检查后完成 PPTX 交付。"]
      ],
      source: "实现依据 · ppt-brief.ts · ppt-master-authoring-tools.ts · ppt-quality.ts"
    },
    {
      id: "roadmap", chapter: "outlook", type: "roadmap", label: "试点与计划",
      title: "把演示推进为可评价的试点",
      subtitle: "先选范围明确的课程，和老师一起定义每项功能怎样算有效。",
      phases: [
        ["01 验证上课链路", "教师备课与学生使用", "选两类课件和一类算法练习，补齐共享资料与讲稿。记录翻页、首次出声、续讲、课件生成和媒体播放结果。"],
        ["02 建立运行基线", "可观测的服务和成本", "按课堂场景记录任务成功率和延迟。设置单人限额，对语音合成、渲染缓存和冷启动分开评估。"],
        ["03 形成合作课题", "企业共创与竞赛实践", "围绕多模态教学、Agentic Infra 与评测建立可复现实验。用教师反馈和学生作品完善展项。"]
      ],
      line: "需要共同确认：首批课程、教师参与方式、资料授权和每日模型预算。"
    },
    {
      id: "closing", chapter: "outlook", type: "closing", label: "讨论与回看",
      title: "让学生真正走过推理过程",
      subtitle: "借课堂互动、算法推演和可回看的笔记，把学会的过程呈现给老师和学生。",
      actions: [
        ["classroom", "回看模拟课堂"], ["algorithm-avatar", "回看算法数字人"], ["ppt", "回看课件生成"]
      ]
    }
  ]
};
