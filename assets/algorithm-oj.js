/* Supplied clips and records; independent from other homepage demos. */
(() => {
'use strict';
const clips=[
{id:'01',g:'OJ 评测',t:'题库与题单进度',shot:'assets/algorithm-oj/clip-01.jpg',need:'阶段 0 题单页（含进度与题目状态）',
 q:'工作台 → 算法练习 → 阶段 0 题单；AC 后返回题集',
 p:'8 题列表与标签完整；通过后进度变 1/8、题目标记「已通过」。'},
{id:'02',g:'OJ 评测',t:'运行样例与提交 AC',shot:'assets/algorithm-oj/clip-02.jpg',need:'oj-001 评测结果「全部通过 3/3」面板',
 q:'oj-001 填 Python 代码 → 运行样例 → 提交',
 p:'样例 1/1 通过；提交 3/3 通过（公开 1 + 隐藏 2），提示已同步 Notebook。'},
{id:'03',g:'OJ 评测',t:'WA 反馈：输出对比与逐行 diff',video:'assets/algorithm-oj/clip-03.mp4',need:'WA 结果页（预期/实际对比 + 本次提交改动）',
 q:'oj-001 把 print(a+b) 改成 print(a-b) 再提交',
 p:'0/3 答案不正确；给出预期/实际对比与排查提示，错题记录同步 Notebook。'},
{id:'04',g:'OJ 评测',t:'缺括号导致编译错误',shot:'assets/algorithm-oj/clip-04.jpg',
 q:'在 Python 编辑器中输入缺少右括号的求和代码，运行样例。',
 p:'评测结果显示「编译错误」，通过 0/0 个测试点。'},
{id:'05',g:'OJ 评测',t:'提交记录与源码回看',shot:'assets/algorithm-oj/clip-05.jpg',need:'提交记录 tab（多条历史列表）',
 q:'运行与评测 → 提交记录；oj-002 一次 AC',
 p:'历史按时间排列、可回看当时源码；第二题 3/3 一次通过。'},
{id:'06',g:'算法导师',t:'分层提示逐层展开',shot:'assets/algorithm-oj/clip-06.jpg',need:'oj-003 导师面板展开到第 2 层提示',
 q:'oj-003（未通过）→ 获取提示 → 查看下一层提示',
 p:'第 1 层「维护当前最大值」→ 第 2 层「不要初始化为 0」，不直接给代码。'},
{id:'07',g:'算法导师',t:'标准思路与完整答案',shot:'assets/algorithm-oj/clip-07.jpg',need:'「查看完整答案」展开态（参考实现 + 不变量）',
 q:'oj-003 讲解标准思路；oj-001 查看完整答案',
 p:'思路只讲步骤/不变量/复杂度；答案含参考实现与边界说明，与当前语言一致。'},
{id:'08',g:'算法导师',t:'AI 问答：问思路',video:'assets/algorithm-oj/clip-08.mp4',need:'导师对话区（思路回答 + 模型标注）',
 q:'导师面板发送「给我提示」，等待 AI 助教作答',
 p:'分步讲解思路并引导补全 main 逻辑；标注 qwen3-coder-flash，声明不读隐藏测试。'},
{id:'09',g:'算法导师',t:'AI 问答：评测卡点诊断',shot:'assets/algorithm-oj/clip-09.jpg',need:'卡点诊断回答（best=0 分析）',
 q:'先提交 best=0 的错误代码（WA 1/3），再问「结合最近一次评测，指出最可能的卡点」',
 p:'准确定位全负数不更新 best，给反例与修复建议；追问「给我一个边界用例」多轮有效。'},
{id:'10',g:'复盘沉淀',t:'修复重交与复盘',shot:'assets/algorithm-oj/clip-10.jpg',need:'修复后 AC 结果页（含一行 diff）或复盘面板',
 q:'按建议改 best=nums[0] 重交 → 复盘本题',
 p:'3/3 通过，diff 精确到一行；复盘给不变量复述与下一题迁移建议。'},
{id:'11',g:'复盘沉淀',t:'Notebook 笔记与错题卡',shot:'assets/algorithm-oj/clip-11.jpg',need:'Notebook 笔记详情（修复记录/防错提醒）',
 q:'提交结果页 → 查看 Notebook',
 p:'自动笔记含判定/源码哈希/修复记录/防错提醒；待复习卡片 2 张。'},
{id:'12',g:'实验室',t:'可视化与预测挑战',shot:'assets/algorithm-oj/clip-12.jpg',need:'排好队可视化 或 预测挑战答题反馈',
 q:'算法实验室 → 排好队 → 观察模式 / 预测挑战 / 搜索「二分」',
 p:'动画演示可单步改输入；预测答对给反馈并代码同步；搜索实时过滤。'}];
const records=[{"g": "OJ 评测", "t": "求和公开样例", "q": "oj-001 · Python · 运行公开样例", "p": "实际判定 accepted · 1/1 个测试点。公开样例期望 11，实际 11。", "code": "a,b=map(int,input().split())\nprint(a+b)", "detail": "coderun-28f926e159ed", "id": "R01"}, {"g": "OJ 评测", "t": "求和样例输出不符", "q": "oj-001 · Python · 运行公开样例", "p": "实际判定 wrong_answer · 0/1 个测试点。公开样例期望 11，实际 -5。", "code": "a,b=map(int,input().split())\nprint(a-b)", "detail": "coderun-6bb813744b1e", "id": "R02"}, {"g": "OJ 评测", "t": "Python 缺括号", "q": "oj-001 · Python · 运行公开样例", "p": "实际判定 compile_error · 0/0 个测试点。", "code": "a,b=map(int,input().split())\nprint(a+b", "detail": "coderun-c6ad5636d35b", "id": "R03"}, {"g": "OJ 评测", "t": "Python 除零", "q": "oj-001 · Python · 运行公开样例", "p": "实际判定 runtime_error · 0/1 个测试点。", "code": "a,b=map(int,input().split())\nprint(a//0)", "detail": "coderun-ad6f3bc35416", "id": "R04"}, {"g": "OJ 评测", "t": "求和正式 AC", "q": "oj-001 · Python · 正式提交", "p": "实际判定 accepted · 3/3 个测试点。公开样例期望 11，实际 11。", "code": "a,b=map(int,input().split())\nprint(a+b)", "detail": "coderun-340115a585c4", "id": "R05"}, {"g": "OJ 评测", "t": "求和正式 WA", "q": "oj-001 · Python · 正式提交", "p": "实际判定 hidden_test_failed · 0/3 个测试点。正式提交优先报告隐藏点失败，页面统一显示「答案不正确」。公开样例期望 11，实际 -5。", "code": "a,b=map(int,input().split())\nprint(a-b)", "detail": "coderun-9dfbb6ef4123", "id": "R06"}, {"g": "OJ 评测", "t": "仅写死公开样例", "q": "oj-001 · Python · 正式提交", "p": "实际判定 hidden_test_failed · 1/3 个测试点。公开样例期望 11，实际 11。", "code": "input()\nprint(11)", "detail": "coderun-d4e75401dc91", "id": "R07"}, {"g": "OJ 评测", "t": "奇偶样例", "q": "oj-002 · Python · 运行公开样例", "p": "实际判定 accepted · 1/1 个测试点。公开样例期望 ODD，实际 ODD。", "code": "n=int(input())\nprint(\"ODD\" if n%2 else \"EVEN\")", "detail": "coderun-83990aaa8e5a", "id": "R08"}, {"g": "OJ 评测", "t": "奇偶正式提交", "q": "oj-002 · Python · 正式提交", "p": "实际判定 accepted · 3/3 个测试点。公开样例期望 ODD，实际 ODD。", "code": "n=int(input())\nprint(\"ODD\" if n%2 else \"EVEN\")", "detail": "coderun-478162671b41", "id": "R09"}, {"g": "OJ 评测", "t": "最高分错误初始化", "q": "oj-003 · Python · 正式提交", "p": "实际判定 hidden_test_failed · 1/3 个测试点。公开样例期望 9，实际 9。", "code": "n=int(input())\na=list(map(int,input().split()))\nprint(max([0]+a))", "detail": "coderun-d170e94f468a", "id": "R10"}, {"g": "OJ 评测", "t": "最高分修复重交", "q": "oj-003 · Python · 正式提交", "p": "实际判定 accepted · 3/3 个测试点。公开样例期望 9，实际 9。", "code": "n=int(input())\na=list(map(int,input().split()))\nprint(max(a))", "detail": "coderun-24cb58240bff", "id": "R11"}, {"g": "算法导师", "t": "第 1 层提示", "q": "oj-005 · next_hint · 当前层 0", "p": "模式 · understand_problem\n层级 · 1\n提示内容 · 需要一个插入重复元素后，元素数量不会增加的数据结构。", "id": "R12"}, {"g": "算法导师", "t": "第 2 层提示", "q": "oj-005 · next_hint · 当前层 1", "p": "模式 · escalate_hint\n层级 · 2\n提示内容 · C++ 的 set 会自动维护互不相同的元素。", "id": "R13"}, {"g": "算法导师", "t": "第 3 层提示", "q": "oj-005 · next_hint · 当前层 2", "p": "模式 · escalate_hint\n层级 · 3\n提示内容 · 把每个数插入 set，最后输出 values.size()。", "id": "R14"}, {"g": "算法导师", "t": "标准思路 · oj-005", "q": "oj-005 · explain_approach", "p": "模式 · diagnose_attempt\n指导 · 依次读入 n 个整数，并把每个整数插入 set。 set 只保留互不相同的键，因此重复值不会增加集合大小。 全部读入后，set.size() 就是不同整数的数量。", "id": "R15"}, {"g": "算法导师", "t": "按需完整答案 · oj-005", "q": "oj-005 · show_solution · Python", "p": "模式 · full_solution\n参考语言 · python\n有参考实现 · 是", "id": "R16"}, {"g": "算法导师", "t": "标准思路 · oj-010", "q": "oj-010 · explain_approach", "p": "模式 · diagnose_attempt\n指导 · 读入所有元素后调用标准库 sort 进行升序排序。 按下标顺序输出，元素之间输出一个空格，末尾换行。 标准排序适合作为后续二分、双指针和贪心题的预处理。", "id": "R17"}, {"g": "算法导师", "t": "按需完整答案 · oj-010", "q": "oj-010 · show_solution · Python", "p": "模式 · full_solution\n参考语言 · python\n有参考实现 · 是", "id": "R18"}, {"g": "算法导师", "t": "标准思路 · oj-011", "q": "oj-011 · explain_approach", "p": "模式 · diagnose_attempt\n指导 · 从左到右扫描数组，并维护已经出现的数字集合。 读到 x 时查询 target-x 是否已经出现。 若出现立即输出 YES，否则加入 x；遍历结束输出 NO。", "id": "R19"}, {"g": "算法导师", "t": "按需完整答案 · oj-011", "q": "oj-011 · show_solution · Python", "p": "模式 · full_solution\n参考语言 · python\n有参考实现 · 是", "id": "R20"}, {"g": "复盘沉淀", "t": "历史判定 · 最高分错误初始化", "q": "读取 oj-003 提交历史并按执行编号定位", "p": "执行编号 · coderun-d170e94f468a\n判定 · hidden_test_failed\n历史记录数 · 4", "id": "R21"}, {"g": "复盘沉淀", "t": "历史源代码 · 最高分错误初始化", "q": "读取单次提交并核对源代码", "p": "执行编号 · coderun-d170e94f468a\n源码一致 · 是\n有评测证据 · 是", "id": "R22"}, {"g": "复盘沉淀", "t": "历史判定 · 最高分修复重交", "q": "读取 oj-003 提交历史并按执行编号定位", "p": "执行编号 · coderun-24cb58240bff\n判定 · accepted\n历史记录数 · 4", "id": "R23"}, {"g": "复盘沉淀", "t": "历史源代码 · 最高分修复重交", "q": "读取单次提交并核对源代码", "p": "执行编号 · coderun-24cb58240bff\n源码一致 · 是\n有评测证据 · 是", "id": "R24"}, {"g": "复盘沉淀", "t": "AC 与失败提交同步状态", "q": "读取两次提交的 Notebook 同步信息", "p": "AC 同步 · synced\n失败同步 · synced\n同一笔记本 · 是", "id": "R25"}, {"g": "复盘沉淀", "t": "AC 笔记", "q": "按提交或 Notebook 关联记录复核", "p": "找到记录 · 是\n判定 · accepted", "id": "R26"}, {"g": "复盘沉淀", "t": "失败笔记", "q": "按提交或 Notebook 关联记录复核", "p": "找到记录 · 是\n判定 · hidden_test_failed", "id": "R27"}, {"g": "复盘沉淀", "t": "修复关联", "q": "按提交或 Notebook 关联记录复核", "p": "上一次提交 · coderun-4e0c1692831e\n源码已变更 · 是", "id": "R28"}, {"g": "复盘沉淀", "t": "错题卡", "q": "按提交或 Notebook 关联记录复核", "p": "找到记录 · 是\n错题卡已解决 · 是", "id": "R29"}, {"g": "复盘沉淀", "t": "下一题建议", "q": "按提交或 Notebook 关联记录复核", "p": "题号 · oj-004\n推荐题目 · 范围内的人数\n推荐理由 · 【依据：学习路线】继续练习“范围内的人数”，巩固并迁移本题方法。", "id": "R30"}, {"g": "复盘沉淀", "t": "代码复盘指导", "q": "按提交或 Notebook 关联记录复核", "p": "模式 · post_pass_review\n指导 · 这道题训练的核心是：数组遍历与最大值。 请用一句话解释这个不变量：处理完前 i 个元素后，best 等于这 i 个元素的最大值。 下一步建议练习“范围内的人数”，观察哪些思路可以迁移。", "id": "R31"}, {"g": "算法导师", "t": "结合代码诊断初始化错误", "q": "用 oj-003 的失败代码询问全负数边界", "p": "模型 · qwen3-coder-flash\n回答节选 · 你的代码在处理全负数输入时输出 `0`，是因为你使用了 `max([0] + a)` 这种写法。\n\n### 原因分析：\n\n- 当输入全部为负数时，例如 `-1, -2, -3`，列表 `a = [-1, -2, -3]`；\n- 你构造的新列表是 `[0] + a = [0, -1, -2, -3]`；\n- 此时 `max([0] + a)` 实际上是在比较 `0` 和所有负数，因此返回的是 `0`，而不是真正的最大值（即 `-1`）。\n\n### 核心问题：\n你添加了一个固定值 `0` 到列表中，导致它总是参与最大值比较，而这个 `0` 在全负数情况下会“胜出”。\n\n### 正确做法应避免引入无关元素，直接对原数组求最大值即可。\n\n你可以尝试将 `max([0] + a)` 改为 `max(a)` 来解决这个问题。", "id": "R32"}, {"g": "算法导师", "t": "多轮追问边界例子", "q": "保留上一轮，追问三个负数的例子", "p": "模型 · qwen3-coder-flash\n回答节选 · 好的，我们来手动计算三个全负整数的例子，验证你当前代码 `max([0] + a)` 的行为。\n\n---\n\n### 示例 1：\n\n输入：\n```\n3\n-1 -2 -3\n```\n\n- `a = [-1, -2, -3]`\n- 构造新列表：`[0] + a = [0, -1, -2, -3]`\n- 调用 `max([0, -1, -2, -3])` → 返回 `0`\n\n✅ **实际输出：0**  \n❌ **期望输出：-1**\n\n---\n\n### 示例 2：\n\n输入：\n```\n3\n-5 -10 -7\n```\n\n- `a = [-5, -10, -7]`\n- 构造新列表：`[0] + a = [0, -5, -10, -7]`\n- 调用 `max([0, -5, -10, -7])` → 返回 `0`\n\n✅ **实际输出：0**  \n❌ **期望输出：-5**\n\n---\n\n### 示例 3：\n\n输入：\n```\n3\n-100 -200 -", "id": "R33"}, {"g": "实验室", "t": "打开目录", "q": "打开算法实验室", "p": "23 个主题、35 道题", "shot": "assets/algorithm-oj/record-r34.png", "id": "R34"}, {"g": "实验室", "t": "搜索二分", "q": "目录搜索二分", "p": "二分主题出现，冒泡排序已过滤", "id": "R35"}, {"g": "实验室", "t": "无匹配搜索", "q": "输入不存在的主题", "p": "目录无匹配主题", "id": "R36"}, {"g": "实验室", "t": "清空搜索", "q": "清空目录搜索", "p": "冒泡排序重新出现", "id": "R37"}, {"g": "实验室", "t": "单步向前", "q": "点击下一步", "p": "步数 0 → 1", "id": "R38"}, {"g": "实验室", "t": "单步向后", "q": "点击上一步", "p": "步数 1 → 0", "id": "R39"}, {"g": "实验室", "t": "连续播放", "q": "点击播放并等待", "p": "步数 0 → 1", "id": "R40"}, {"g": "实验室", "t": "暂停播放", "q": "点击暂停并观察进度", "p": "暂停前后步数 1 → 1", "id": "R41"}, {"g": "实验室", "t": "重新开始", "q": "点击重新开始", "p": "回到第 1 个动画状态", "id": "R42"}, {"g": "实验室", "t": "自定义数组", "q": "输入 5, 1 后应用", "p": "图示比较 5 和 1，未确定区间为 [0, 1]", "shot": "assets/algorithm-oj/record-r43.png", "id": "R43"}, {"g": "实验室", "t": "切换预测挑战", "q": "点击预测挑战", "p": "预测挑战，交换 0 次，当前比较 5 和 1。升序排列时，左边较大才交换。，现在是 5 和 1：需要交换吗？，需要交换，本轮有交换，本轮没有交换时提前结束", "shot": "assets/algorithm-oj/record-r44.png", "id": "R44"}];
const byId=id=>document.getElementById('ao-'+id);
const groups=['OJ 评测','算法导师','复盘沉淀','实验室'];
const modes=['实录片段','复测记录'];
const controls=[];
let group=groups[0], mode=modes[0], current;
function addButtons(id,values,read,write){
 for(const value of values){
  const button=document.createElement('button');
  button.type='button';button.textContent=value;
  controls.push(()=>button.setAttribute('aria-pressed',String(read()===value)));
  button.addEventListener('click',()=>{write(value);render();});
  byId(id).append(button);
 }
}
function show(item){
 if(current===item)return;
 current=item;
 for(const [id,value] of Object.entries({group:item.g,title:item.t,operation:item.q,proof:item.p,code:item.code,trace:item.detail})){
  const el=byId(id);el.textContent=value||'';
  if(id==='code'||id==='trace')el.hidden=!value;
 }
 const img=byId('shot'),video=byId('video');
 video.pause();
 if(video.hasAttribute('src')){video.removeAttribute('src');video.load();}
 img.removeAttribute('src');
 byId('media-error').hidden=true;
 byId('media').hidden=!item.video&&!item.shot;
 img.hidden=!item.shot;
 video.hidden=!item.video;
 if(item.shot){img.alt=item.t+'实机截图';img.src=item.shot;}
 if(item.video)video.src=item.video;
}
function render(){
 controls.forEach(update=>update());
 const items=(mode===modes[0]?clips:records).filter(x=>x.g===group);
 if(!items.includes(current))show(items[0]);
 const list=byId('list');
 list.replaceChildren();
 for(const item of items){
  const li=document.createElement('li'),button=document.createElement('button'),code=document.createElement('span');
  code.className='ao-idx';code.textContent=item.id;
  button.type='button';button.append(code,document.createTextNode(item.t));
  if(current===item)button.setAttribute('aria-current','true');
  button.addEventListener('click',()=>{
   show(item);list.querySelector('[aria-current]')?.removeAttribute('aria-current');
   button.setAttribute('aria-current','true');
  });
  li.append(button);list.append(li);
 }
}
function showMediaError(event){
 if(!event.currentTarget.hasAttribute('src'))return;
 event.currentTarget.hidden=true;byId('media-error').hidden=false;
}
byId('shot').addEventListener('error',showMediaError);
byId('video').addEventListener('error',showMediaError);
addButtons('categories',groups,()=>group,value=>{group=value;});
addButtons('sources',modes,()=>mode,value=>{mode=value;});
document.getElementById('domain-code').querySelectorAll('a[data-group]').forEach(link=>link.addEventListener('click',()=>{
 group=link.dataset.group;
 mode=modes[1];
 render();
}));
render();
})();
