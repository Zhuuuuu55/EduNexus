/* Feature pages inserted after PPT generation; original deck data stays unchanged. */
(() => {
  const additions = {
  "diagrams": {
    "public-affairs": {
      "zh": [
        [
          "明确适用范围",
          "届别、专业、班型与办理对象"
        ],
        [
          "检索后回读原文",
          "培养方案、政策与办事资料"
        ],
        [
          "交付可核对建议",
          "结论、原文位置与待确认事项"
        ],
        "条件不完整时先补问；依据有缺口时保留核实入口。"
      ],
      "en": [
        [
          "Clarify the scope",
          "Cohort, major, program and applicant"
        ],
        [
          "Retrieve and inspect",
          "Curricula, policies and procedures"
        ],
        [
          "Deliver traceable advice",
          "Conclusions, sources and open questions"
        ],
        "Ask for missing conditions and keep unsupported details open for verification."
      ]
    },
    "algorithm-tutor": {
      "zh": [
        [
          "读懂当前卡点",
          "题目、已知条件与学生尝试"
        ],
        [
          "按需展开推理",
          "补问、提示、手推与反例"
        ],
        [
          "形成理解与复盘",
          "复述理由、边界自查与新练习"
        ],
        "静态分析说明推理；涉及实现时，再用实际运行或评测核对。"
      ],
      "en": [
        [
          "Understand the obstacle",
          "Problem, constraints and current attempt"
        ],
        [
          "Guide the next step",
          "Questions, hints, traces and counterexamples"
        ],
        [
          "Reflect and transfer",
          "Explain reasons and check new cases"
        ],
        "Reasoning explains the idea. Executed tests verify the implementation."
      ]
    }
  },
  "slides": [
    {
      "id": "public-affairs-home",
      "chapter": "demo",
      "type": "feature-cover",
      "label": "公共事务 · 首页",
      "name": "公共事务",
      "title": "查清适用规定，\n再给出办理建议",
      "subtitle": "从培养方案、项目政策到办事流程，按届别、专业和办理对象查找依据，让结论能够回到原文。",
      "demo": "public-affairs",
      "poster": "public-affairs/02-cross-major.jpg",
      "alt": "公共事务跨专业培养方案核对实录",
      "demoLinks": [
        [
          0,
          "先补问，再续答",
          "保留已知条件，补足专业与班型"
        ],
        [
          1,
          "跨专业查原表",
          "清单、学分与页码分别核对"
        ],
        [
          5,
          "查项目政策",
          "区分参与对象和适用通知"
        ],
        [
          7,
          "查办事流程",
          "辨别服务对象与材料缺口"
        ]
      ],
      "topCrop": false
    },
    {
      "id": "public-affairs",
      "chapter": "demo",
      "type": "demo",
      "label": "公共事务 · 演示",
      "title": "公共事务｜先确认适用范围，再回查原文",
      "subtitle": "10 个实录案例覆盖培养方案、项目政策与办事流程，逐项查看原问题和核对点。",
      "items": [
        [
          "01-clarification",
          "01 缺少专业时先补问",
          "public-affairs/01-clarification.mp4",
          "public-affairs/01-clarification.jpg",
          "缺少专业时先补问",
          "补充普通计科的专业与班型后，沿用已输入的 2025 级并续答课表。",
          [
            [
              "原问题",
              "25级课程"
            ],
            [
              "核对方式",
              "查看适用对象、资料版本与原文出处；资料未覆盖的事项继续核实。"
            ]
          ]
        ],
        [
          "02-cross-major",
          "02 跨专业核对培养方案",
          "public-affairs/02-cross-major.mp4",
          "public-affairs/02-cross-major.jpg",
          "跨专业核对培养方案",
          "普通计科 37 门、普通数科 33 门，共有 32 门。两套清单分别标注 PDF 第 7、8 页和第 39、40 页。",
          [
            [
              "原问题",
              "2025级普通计科和普通数科的专业选修课全部列出来，给课程名称、代码、学分、学时和学期。"
            ],
            [
              "核对方式",
              "查看适用对象、资料版本与原文出处；资料未覆盖的事项继续核实。"
            ]
          ]
        ],
        [
          "program-version",
          "03 同名班型核对",
          "public-affairs/program-version.mp4",
          "public-affairs/program-version.jpg",
          "同名班型核对",
          "识别 2025 级材料使用合并班型名称，避免把一张选修表拆成两套对比。",
          [
            [
              "原问题",
              "25级图灵班和启明班的专业选修有什么差异，只列各自不同的。"
            ],
            [
              "核对方式",
              "查看适用对象、资料版本与原文出处；资料未覆盖的事项继续核实。"
            ]
          ]
        ],
        [
          "course-fields",
          "04 精准查课程字段",
          "public-affairs/course-fields.mp4",
          "public-affairs/course-fields.jpg",
          "精准查课程字段",
          "用明确届别和班型查课程代码、性质、学分、学时及开课学期。",
          [
            [
              "原问题",
              "请按2023级计算机科学与技术普通班培养方案核对，数据结构是必修吗？给课程代码、学分、学时和开课学期。"
            ],
            [
              "核对方式",
              "查看适用对象、资料版本与原文出处；资料未覆盖的事项继续核实。"
            ]
          ]
        ],
        [
          "credit-rules",
          "05 毕业学分与 CSP 认定",
          "public-affairs/credit-rules.mp4",
          "public-affairs/credit-rules.jpg",
          "毕业学分与 CSP 认定",
          "同一问题拆开核对毕业总要求和 CSP 的课外学分认定，保留文件的区间口径。",
          [
            [
              "原问题",
              "我23级普通计科的，毕业最低要修多少课内和课外学分？另外，CSP考到200到500分，课外学分能认多少？"
            ],
            [
              "核对方式",
              "查看适用对象、资料版本与原文出处；资料未覆盖的事项继续核实。"
            ]
          ]
        ],
        [
          "innovation",
          "06 大创申报限项",
          "public-affairs/innovation.mp4",
          "public-affairs/innovation.jpg",
          "大创申报限项",
          "分列学生主持、成员参与与教师指导的口径，并对应年度通知和项目管理办法。",
          [
            [
              "原问题",
              "申报大创时，学生可以参加几个项目？同一个指导教师当年能带几个？"
            ],
            [
              "核对方式",
              "查看适用对象、资料版本与原文出处；资料未覆盖的事项继续核实。"
            ]
          ]
        ],
        [
          "exam-page",
          "07 考试规则按页核对",
          "public-affairs/exam-page.mp4",
          "public-affairs/exam-page.jpg",
          "考试规则按页核对",
          "从指定手册原页核对停笔与离场规则，保留监考允许等条件。",
          [
            [
              "原问题",
              "根据《2023版本科生学生手册》第100页，考试结束铃响后考生应当怎么做？"
            ],
            [
              "核对方式",
              "查看适用对象、资料版本与原文出处；资料未覆盖的事项继续核实。"
            ]
          ]
        ],
        [
          "student-seal",
          "08 学生证盖章辨别办理对象",
          "public-affairs/student-seal.mp4",
          "public-affairs/student-seal.jpg",
          "学生证盖章辨别办理对象",
          "识别面向教工的用印事项与学生个人需求，说明材料缺口和核实去向。",
          [
            [
              "原问题",
              "华中科技大学的学生证盖章在哪里办？需要带什么材料？"
            ],
            [
              "核对方式",
              "查看适用对象、资料版本与原文出处；资料未覆盖的事项继续核实。"
            ]
          ]
        ],
        [
          "return-study",
          "09 因病休学后申请复学",
          "public-affairs/return-study.mp4",
          "public-affairs/return-study.jpg",
          "因病休学后申请复学",
          "查找复学健康审核依据，区分医疗证明与学校的办理环节。",
          [
            [
              "原问题",
              "华中科技大学本科生因病休学后，复学需要准备什么健康证明，找谁办理？"
            ],
            [
              "核对方式",
              "查看适用对象、资料版本与原文出处；资料未覆盖的事项继续核实。"
            ]
          ]
        ],
        [
          "exchange",
          "10 校级交流项目查入口",
          "public-affairs/exchange.mp4",
          "public-affairs/exchange.jpg",
          "校级交流项目查入口",
          "从手册提取项目发布和报名入口，并按资料说明适用时间。",
          [
            [
              "原问题",
              "学校交流项目在哪个平台看，报名大概怎么走？"
            ],
            [
              "核对方式",
              "查看适用对象、资料版本与原文出处；资料未覆盖的事项继续核实。"
            ]
          ]
        ]
      ],
      "extended": true,
      "preload": "metadata"
    },
    {
      "id": "public-affairs-tech",
      "chapter": "demo",
      "type": "tech",
      "label": "公共事务 · 技术",
      "title": "公共事务｜把适用范围接到原文依据",
      "subtitle": "检索提供候选资料，继续核对对象、版本与条款，再组织可回查的建议。",
      "figure": "public-affairs",
      "diagramFormat": "svg",
      "cards": [
        [
          "范围确认",
          "缺少条件时先补问",
          "围绕届别、专业、班型和事项确认适用范围。补充条件后沿用已知信息，继续核对。"
        ],
        [
          "资料路径",
          "查原表，也回读政策条款",
          "培养方案定位课程字段和跨页清单；政策与流程按配置查询本地资料或 WeKnora，再核对原文。"
        ],
        [
          "回答交付",
          "结论保留出处与缺口",
          "提供适用结论、文件位置和下一步建议。资料未覆盖的窗口、材料或期限列为待确认事项。"
        ]
      ],
      "source": "资料依据 · 公共事务技术说明与 10 个实录案例"
    },
    {
      "id": "algorithm-tutor-home",
      "chapter": "demo",
      "type": "feature-cover",
      "label": "算法导师 · 首页",
      "name": "算法导师",
      "title": "先想明白，\n再写出代码",
      "subtitle": "从题意、已有想法或错误代码开始，用补问、提示、手推和反例，把卡住的步骤讲清楚。",
      "demo": "algorithm-tutor",
      "poster": "../algorithm-tutor/demo-09.png",
      "alt": "算法导师递归讲解对话预览",
      "demoLinks": [
        [
          0,
          "题意与启发式带学",
          "先明确条件，留下思考的下一步"
        ],
        [
          2,
          "调试与复杂度",
          "追踪状态，核对操作次数"
        ],
        [
          5,
          "推导与反例",
          "把状态转移和适用条件写出来"
        ],
        [
          9,
          "学习复盘",
          "从错误现象回到思考过程"
        ]
      ],
      "topCrop": true
    },
    {
      "id": "algorithm-tutor",
      "chapter": "demo",
      "type": "demo",
      "label": "算法导师 · 演示",
      "title": "算法导师｜把推理过程展开给学生",
      "subtitle": "10 张原始对话长截图。固定框内上下滚动，支持放大、回到顶部和查看原图。",
      "items": [
        [
          "1",
          "01 题意澄清",
          "",
          "../algorithm-tutor/demo-01.png",
          "题意澄清：面对不完整需求，先问清楚",
          "从数组中选出 k 个数使和最大，排序后取最大的 k 个一定对吗？先找出还需要确认的条件。",
          [
            [
              "辅导观察点",
              "核对 k 的范围、是否必须连续、能否重复选取，先明确问题再选择算法。"
            ],
            [
              "核对提示",
              "固定选择 k 个、不要求连续且不重复使用时，负数本身不改变“取最大的 k 个”的最优性。"
            ]
          ],
          null,
          {
            "kind": "long-image"
          }
        ],
        [
          "2",
          "02 启发式带学",
          "",
          "../algorithm-tutor/demo-02.png",
          "启发式带学：逐步提示，不直接给答案",
          "刚学数组，想做“两数之和”。每次给一个提示或问题，等我回答后再继续。",
          [
            [
              "辅导观察点",
              "从学生已有的两层循环思路出发，追问枚举位置和下标关系，保留学生自己推导的空间。"
            ],
            [
              "理解检查",
              "提示与学生当前思路衔接，学生能解释为什么从 i + 1 开始枚举。"
            ]
          ],
          null,
          {
            "kind": "long-image"
          }
        ],
        [
          "3",
          "03 代码调试",
          "",
          "../algorithm-tutor/demo-03.png",
          "代码调试：定位死循环与空输入错误",
          "二分查找有时一直不结束，空数组也会报错。先手推 [1,3]、target=3，再做小范围修改。",
          [
            [
              "辅导观察点",
              "逐轮记录 left、right、mid，找出区间没有收缩的位置，再检查空数组和边界返回值。"
            ],
            [
              "理解检查",
              "能复现错误原因，并用空输入、单元素和目标不存在等样例核对修复。"
            ]
          ],
          null,
          {
            "kind": "long-image"
          }
        ],
        [
          "4",
          "04 复杂度分析",
          "",
          "../algorithm-tutor/demo-04.png",
          "复杂度分析：纠正“两层循环就是平方级”的误解",
          "代码里有 for 和 while，为什么未必是 O(n²)？把 j = 0 移进外层循环后又会怎样？",
          [
            [
              "辅导观察点",
              "统计指针在整个程序中的总移动次数，对比不回退的扫描与每轮重新开始的扫描。"
            ],
            [
              "理解检查",
              "能从总操作数解释 O(n)，并构造重置指针后达到 O(n²) 的情况。"
            ]
          ],
          null,
          {
            "kind": "long-image"
          }
        ],
        [
          "5",
          "05 算法选型",
          "",
          "../algorithm-tutor/demo-05.png",
          "算法选型：根据规模和操作选择数据结构",
          "长度 20 万的数组，要做 20 万次单点增加和区间求和。前缀和、树状数组、线段树怎么选？",
          [
            [
              "辅导观察点",
              "把数据规模、更新方式、查询需求与实现成本放在一起比较，再给出适合该任务的方案。"
            ],
            [
              "理解检查",
              "能解释动态更新为何影响前缀和方案，并比较树状数组与线段树的操作成本。"
            ]
          ],
          null,
          {
            "kind": "long-image"
          }
        ],
        [
          "6",
          "06 动态规划推导",
          "",
          "../algorithm-tutor/demo-06.png",
          "动态规划推导：把状态变化讲清楚",
          "0/1 背包为什么倒序遍历容量？用重量 [1,3,4]、价值 [15,20,30]、容量 4 展开状态变化。",
          [
            [
              "辅导观察点",
              "先定义状态，再逐件查看表格，理解一维压缩后为什么需要读取上一轮的状态。"
            ],
            [
              "核对提示",
              "正序误用可从重量为 1 的物品核对：同一轮更新 dp[2] 时，会读到已经更新的 dp[1]。"
            ]
          ],
          null,
          {
            "kind": "long-image"
          }
        ],
        [
          "7",
          "07 反例与证明",
          "",
          "../algorithm-tutor/demo-07.png",
          "反例与证明：检验贪心策略是否成立",
          "硬币面值 [1,3,4]，凑出 6 且硬币数最少，每次拿不超过剩余金额的最大硬币可行吗？",
          [
            [
              "辅导观察点",
              "把直觉写成选择过程，用 4 + 1 + 1 与 3 + 3 对照，找到反例后重新组织解题思路。"
            ],
            [
              "理解检查",
              "能给出推翻策略的具体反例，并说明一个例子成立不等于策略普遍成立。"
            ]
          ],
          null,
          {
            "kind": "long-image"
          }
        ],
        [
          "8",
          "08 图算法",
          "",
          "../algorithm-tutor/demo-08.png",
          "图算法：区分最少边数与最小总权重",
          "有向图中 A→B=4、A→C=1、C→B=2、B→D=1、C→D=5，求 A 到 D 的最短耗时，BFS 合适吗？",
          [
            [
              "辅导观察点",
              "先辨认优化目标与边权条件，再逐步更新距离，区分经过的边数和累加的总耗时。"
            ],
            [
              "核对提示",
              "A→B→D 是 2 条边、总耗时 5；A→C→B→D 是 3 条边、总耗时 4。"
            ]
          ],
          null,
          {
            "kind": "long-image"
          }
        ],
        [
          "9",
          "09 原理逐步演示",
          "",
          "../algorithm-tutor/demo-09.png",
          "原理逐步演示：1-5的递归直观演示",
          "用 1 + 2 + 3 + 4 + 5 解释递归：怎样调用、何时停止、如何返回？再与循环写法对照。",
          [
            [
              "辅导观察点",
              "沿 sum(5) 到 sum(1) 展开调用，再按返回顺序逐层累加，连接终止条件、调用过程与结果。"
            ],
            [
              "理解检查",
              "能说清调用与返回的不同顺序，解释终止条件，并得到总和 15。"
            ]
          ],
          null,
          {
            "kind": "long-image"
          }
        ],
        [
          "10",
          "10 学习复盘",
          "",
          "../algorithm-tutor/demo-10.png",
          "学习复盘：从做错的结果回到思考过程",
          "二分死循环、背包重复选取、带权图选错方法，这些错误反映了哪些思考习惯？给我三道递进练习。",
          [
            [
              "辅导观察点",
              "按“错误现象—背后的误解—下次如何自查”整理，把修正一题延伸为可迁移的检查习惯。"
            ],
            [
              "理解检查",
              "能把错误对应到区间收缩、状态依赖与优化目标，并用新题检验理解。"
            ]
          ],
          null,
          {
            "kind": "long-image"
          }
        ]
      ],
      "extended": true,
      "preload": "metadata"
    },
    {
      "id": "algorithm-tutor-tech",
      "chapter": "demo",
      "type": "tech",
      "label": "算法导师 · 技术",
      "title": "算法导师｜先定位卡点，再推进理解",
      "subtitle": "从学生已经走到的步骤出发，组织可复述、可核对的解释。",
      "figure": "algorithm-tutor",
      "diagramFormat": "svg",
      "cards": [
        [
          "理解当前尝试",
          "补问与提示衔接上下文",
          "先明确目标和约束，再回应当前思路。可以要求逐步提示、暂不展示完整代码或换一个更小的例子。"
        ],
        [
          "展开中间过程",
          "让状态与理由可见",
          "通过指针追踪、状态表、递归调用顺序和反例说明关键步骤，并检查算法适用条件。"
        ],
        [
          "复盘与验证",
          "把解释带回实际检查",
          "整理错误现象、误解和自查方法。静态推导与执行结果分开看，代码还需运行或提交评测。"
        ]
      ],
      "source": "资料依据 · 10 张原始算法导师对话截图与对应理解检查点"
    }
  ]
};
  Object.assign(window.eduDeck.diagrams, additions.diagrams);
  const afterPpt = window.eduDeck.slides.findIndex(page => page.id === "ppt-tech");
  if (afterPpt < 0) throw new Error("PPT section not found");
  window.eduDeck.slides.splice(afterPpt + 1, 0, ...additions.slides);
})();
