/* Local, dependency-free presentation controls. */
(function () {
  'use strict';
  var flow = document.querySelector('[data-tr-flow]');
  if (!flow) return;
  var steps = [
    ['先明确这次要完成什么', '解释概念、分析资料或制作课件，需要的处理方式不同。系统结合当前目标选择所需能力。', '示例目标：结合课件理解虚拟内存'],
    ['选择与目标有关的资料', '课程课件、用户附件和相关历史，为本次任务提供背景。需要依据资料回答时，先查找对应内容。', '本例：查找虚拟内存相关课件内容'],
    ['由专业能力完成处理', '知识任务组织解释，代码任务结合评测辅导，课件任务形成逐页方案；按目标采用相应流程。', '本例：解释概念、原理与易错点'],
    ['核对答案与产物', '资料回答应能回到来源，代码结论应依据实际评测，文件交付应对应真实生成结果。', '本例：附上支持解释的资料来源'],
    ['让结果进入下一步学习', '继续追问，或把有用内容保存为个人笔记；生成的课件可预览、下载并继续编辑。', '本例：保存为笔记，整理到自己的笔记本']
  ];
  var index = 0;
  function select(next) {
    index = next;
    flow.querySelectorAll('[data-tr-step]').forEach(function (button, i) { button.setAttribute('aria-pressed', String(i === index)); });
    flow.querySelector('[data-tr-step-title]').textContent = steps[index][0];
    flow.querySelector('[data-tr-step-copy]').textContent = steps[index][1];
    flow.querySelector('[data-tr-step-code]').textContent = steps[index][2];
    flow.querySelector('[data-tr-step-count]').textContent = (index + 1) + ' / ' + steps.length;
    flow.querySelector('[data-tr-next]').textContent = index === steps.length - 1 ? '回到第一步 ↺' : '下一步 →';
  }
  flow.querySelectorAll('[data-tr-step]').forEach(function (button) {
    button.addEventListener('click', function () { select(Number(button.getAttribute('data-tr-step'))); });
  });
  flow.querySelector('[data-tr-next]').addEventListener('click', function () { select((index + 1) % steps.length); });
}());
