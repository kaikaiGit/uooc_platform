// 课程数据 - 根据courses表结构构造
const coursesData = [
    // 计算机类课程
    {
        id: 1,
        title: 'Python编程基础入门',
        description: '零基础学Python，从环境搭建到项目实战，掌握编程思维和基础语法',
        courseIntro: '本课程专为编程初学者设计，从Python基础语法讲起，涵盖变量、数据类型、控制结构、函数等核心概念，通过实际案例和小项目帮助学员快速掌握编程思维。课程采用循序渐进的教学方式，配合大量练习，使学员能够独立完成简单程序开发，为后续学习打下坚实基础。',
        teacher_id: 1,
        category_id: 2, // 计算机
        cover_image: '../Homepage/images/courses/cs-1.jpg',
        status: 'published',
        enableNotes:'开启',
        enableComments:'开启',
        created_at: '2024-01-15T09:00:00.000Z',
        updated_at: '2024-01-20T14:30:00.000Z',
        category: '计算机',
        teacher: '张伟教授',
        registerCount: 1580,
        likes: 245,
        recommend: true,
        carouselImages: ['../Homepage/images/courses/cs-1.jpg']
    },
    {
        id: 2,
        title: 'Web前端开发实战',
        description: '全栈开发必备技能，HTML5、CSS3、JavaScript、Vue.js框架全面掌握',
        courseIntro: '本课程系统讲解现代Web前端开发技术，从HTML5语义化标签、CSS3样式设计到JavaScript编程基础，最后深入Vue.js框架应用。通过电商网站、管理后台等实战项目，学员将掌握响应式布局、组件化开发和前端工程化等核心技能，具备独立开发企业级前端应用的能力。',
        teacher_id: 2,
        category_id: 2,
        cover_image: '../Homepage/images/courses/cs-2.jpg',
        status: 'published',
        enableComments:'开启',
        enableNotes:'开启',
        created_at: '2024-01-10T10:00:00.000Z',
        updated_at: '2024-01-25T16:45:00.000Z',
        category: '计算机',
        teacher: '李明老师',
        registerCount: 2150,
        recommend: true,
        carouselImages: ['../Homepage/images/courses/cs-2.jpg']
    },
    {
        id: 3,
        title: '数据结构与算法',
        description: '计算机科学核心课程，深入理解算法思想，提升编程能力和逻辑思维',
        courseIntro: '本课程全面讲解计算机科学中的经典数据结构与算法，包括数组、链表、树、图等数据结构，以及排序、查找、动态规划等常用算法。通过理论讲解和编程实践相结合的方式，帮助学员建立系统的算法思维体系，提升解决复杂问题的能力，为技术面试和职业发展打下坚实基础。',
        teacher_id: 3,
        category_id: 2,
        cover_image: '../Homepage/images/courses/cs-3.jpg',
        status: 'published',
        enableComments:'开启',
        enableNotes:'开启',
        created_at: '2024-01-08T14:00:00.000Z',
        updated_at: '2024-01-22T11:20:00.000Z',
        category: '计算机',
        teacher: '王教授',
        registerCount: 980,
        recommend: false,
        carouselImages: ['../Homepage/images/courses/cs-3.jpg']
    },

    // 理学·工学类课程  
    {
        id: 4,
        title: '高等数学（微积分）',
        description: '大学数学基础核心课程，极限、导数、积分理论与应用',
        courseIntro: '本课程系统讲解一元函数微积分理论，包括极限、导数、微分、积分等核心概念及其应用。通过几何直观与理论推导相结合的教学方式，帮助学员理解数学本质，掌握微积分基本方法，培养抽象思维和逻辑推理能力，为后续专业课程学习提供必要的数学工具。',
        teacher_id: 4,
        category_id: 1,
        cover_image: '../Homepage/images/courses/math-1.jpg',
        status: 'published',
        enableComments:'开启',
        enableNotes:'开启',
        created_at: '2024-01-05T08:30:00.000Z',
        updated_at: '2024-01-18T13:15:00.000Z',
        category: '理学·工学',
        teacher: '陈数学教授',
        registerCount: 1200,
        recommend: true,
        carouselImages: ['../Homepage/images/courses/math-1.jpg']
    },
    {
        id: 5,
        title: '线性代数与空间解析几何',
        description: '矩阵运算、向量空间、特征值与特征向量，工程数学基础',
        courseIntro: '本课程介绍线性代数的基本概念和方法，包括矩阵运算、向量空间、线性变换和特征值问题等内容，同时结合空间解析几何知识，培养学员的代数计算和几何直观能力。课程注重理论与应用结合，为计算机图形学、机器学习等领域的深入学习奠定数学基础。',
        teacher_id: 5,
        category_id: 1,
        cover_image: '../Homepage/images/courses/math-2.jpg',
        status: 'published',
        enableComments:'开启',
        enableNotes:'开启',
        created_at: '2024-01-12T09:45:00.000Z',
        updated_at: '2024-01-28T15:30:00.000Z',
        category: '理学·工学',
        teacher: '赵几何老师',
        registerCount: 890,
        recommend: false,
        carouselImages: ['../Homepage/images/courses/math-2.jpg']
    },

    // 教育·语言类课程
    {
        id: 6,
        title: '大学英语精读',
        description: '提升英语阅读理解能力，掌握词汇语法，培养英语思维',
        courseIntro: '本课程通过精选英语文章，系统训练学员的阅读理解能力，同时扩展词汇量，巩固语法知识。课程内容涵盖文学、科技、经济等多个领域，采用精读与泛读相结合的方式，帮助学员提高英语综合应用能力，培养跨文化交际意识，为学术研究和职场发展打下语言基础。',
        teacher_id: 6,
        category_id: 3,
        cover_image: '../Homepage/images/courses/lang-1.jpg',
        status: 'published',
        enableComments:'开启',
        enableNotes:'开启',
        created_at: '2024-01-03T11:00:00.000Z',
        updated_at: '2024-01-26T10:45:00.000Z',
        category: '教育·语言',
        teacher: 'Susan老师',
        registerCount: 1680,
        recommend: true,
        carouselImages: ['../Homepage/images/courses/lang-1.jpg']
    },
    {
        id: 7,
        title: '日语零基础入门',
        description: '从五十音图开始，基础语法、日常对话，轻松入门日语学习',
        courseIntro: '本课程面向日语零基础学习者，从五十音图发音开始，逐步讲解基础语法和日常会话。通过情景对话和文化背景介绍，帮助学员快速掌握问候、购物、问路等实用表达，了解日本文化习俗，培养基本交流能力，为后续日语学习打下良好基础。',
        teacher_id: 7,
        category_id: 3,
        cover_image: '../Homepage/images/courses/lang-2.jpg',
        status: 'published',
        enableComments:'开启',
        enableNotes:'开启',
        created_at: '2024-01-14T13:20:00.000Z',
        updated_at: '2024-01-29T17:10:00.000Z',
        category: '教育·语言',
        teacher: '田中老师',
        registerCount: 750,
        recommend: false,
        carouselImages: ['../Homepage/images/courses/lang-2.jpg']
    },

    // 文学·艺术类课程
    {
        id: 8,
        title: '中国古代文学赏析',
        description: '品读经典诗词歌赋，感受中华文化魅力，提升文学素养',
        courseIntro: '本课程精选中国古代文学经典作品，从《诗经》《楚辞》到唐诗宋词、明清小说，通过文本细读和背景分析，引导学员深入理解作品的思想内涵和艺术特色。课程注重文史结合，在赏析文学作品的同时，展现中华文化的博大精深，提升学员的人文素养和审美能力。',
        teacher_id: 8,
        category_id: 4,
        cover_image: '../Homepage/images/courses/lit-1.jpg',
        status: 'published',
        enableComments:'开启',
        enableNotes:'开启',
        created_at: '2024-01-07T15:30:00.000Z',
        updated_at: '2024-01-24T12:00:00.000Z',
        category: '文学·艺术',
        teacher: '李文教授',
        registerCount: 620,
        recommend: false,
        carouselImages: ['../Homepage/images/courses/lit-1.jpg']
    },
    {
        id: 9,
        title: '现代绘画技法入门',
        description: '从素描基础到色彩搭配，培养艺术审美和创作能力',
        courseIntro: '本课程系统介绍现代绘画的基础技法，包括素描造型、色彩理论和构图原理等内容。通过静物写生、风景绘画等实践训练，帮助学员掌握绘画的基本语言，培养艺术感知力和创造力。课程强调观察与表现能力的培养，为艺术专业学习或业余创作打下基础。',
        teacher_id: 9,
        category_id: 4,
        cover_image: '../Homepage/images/courses/art-1.jpg',
        status: 'published',
        enableComments:'开启',
        enableNotes:'开启',
        created_at: '2024-01-16T10:15:00.000Z',
        updated_at: '2024-01-30T14:25:00.000Z',
        category: '文学·艺术',
        teacher: '张艺老师',
        registerCount: 480,
        recommend: false,
        carouselImages: ['../Homepage/images/courses/art-1.jpg']
    },

    // 创业·职场类课程
    {
        id: 10,
        title: '创业管理与商业模式',
        description: '从0到1创业指导，商业计划书撰写，融资策略与团队管理',
        courseIntro: '本课程系统讲解创业全过程，从创意筛选、市场分析到商业模式设计、团队组建和融资策略。通过真实案例分析和实战演练，帮助学员掌握创业核心技能，了解创业风险与机遇，学会撰写商业计划书和进行路演展示，提高创业成功率和企业管理能力。',
        teacher_id: 10,
        category_id: 5,
        cover_image: '../Homepage/images/courses/cs-1.jpg',
        status: 'published',
        enableComments:'开启',
        enableNotes:'开启',
        created_at: '2024-01-11T09:30:00.000Z',
        updated_at: '2024-01-27T16:20:00.000Z',
        category: '创业·职场',
        teacher: '刘创业导师',
        registerCount: 850,
        recommend: true,
        carouselImages: ['../Homepage/images/courses/cs-1.jpg']
    },
    {
        id: 11,
        title: '职场沟通与团队协作',
        description: '提升职场软实力，掌握沟通技巧，打造高效团队合作',
        courseIntro: '本课程针对职场人士设计，系统讲解职场沟通的核心原则和实用技巧，包括向上沟通、跨部门协作、会议主持等常见场景。通过角色扮演和案例分析，帮助学员提升表达能力、倾听能力和冲突处理能力，建立高效的团队协作关系，促进职业发展。',
        teacher_id: 11,
        category_id: 5,
        cover_image: '../Homepage/images/courses/cs-2.jpg',
        status: 'published',
        enableComments:'开启',
        enableNotes:'开启',
        created_at: '2024-01-19T14:45:00.000Z',
        updated_at: '2024-02-01T11:30:00.000Z',
        category: '创业·职场',
        teacher: '王沟通专家',
        registerCount: 720,
        recommend: false,
        carouselImages: ['../Homepage/images/courses/cs-2.jpg']
    },

    // 哲史·文化类课程
    {
        id: 12,
        title: '中国通史：从古代到近现代',
        description: '纵观中华五千年历史，理解历史发展脉络和文化传承',
        courseIntro: '本课程系统梳理中国历史发展脉络，从远古时代到明清时期，再到近现代历史变革。通过重大历史事件、重要人物和典章制度的讲解，帮助学员建立系统的历史知识框架，理解中华文明的延续与变迁，培养历史思维能力和文化认同感。',
        teacher_id: 12,
        category_id: 6,
        cover_image: '../Homepage/images/courses/hist-1.jpg',
        status: 'published',
        enableComments:'开启',
        enableNotes:'开启',
        created_at: '2024-01-06T11:20:00.000Z',
        updated_at: '2024-01-23T15:40:00.000Z',
        category: '哲史·文化',
        teacher: '史教授',
        registerCount: 950,
        recommend: false,
        carouselImages: ['../Homepage/images/courses/hist-1.jpg']
    },
    {
        id: 13,
        title: '西方哲学史导论',
        description: '从古希腊到现代，梳理西方哲学发展脉络，思辨人生智慧',
        courseIntro: '本课程介绍西方哲学发展历程，从古希腊哲学到现代哲学思潮，通过主要哲学家的核心思想和经典文本解读，引导学员思考存在、知识、价值等基本哲学问题。课程注重培养批判性思维和独立思考能力，帮助学员建立哲学视角，深化对人生和世界的理解。',
        teacher_id: 13,
        category_id: 6,
        cover_image: '../Homepage/images/courses/hist-2.jpg',
        status: 'published',
        enableComments:'开启',
        enableNotes:'开启',
        created_at: '2024-01-17T12:10:00.000Z',
        updated_at: '2024-01-31T09:50:00.000Z',
        category: '哲史·文化',
        teacher: '哲学大师',
        registerCount: 430,
        recommend: false,
        carouselImages: ['../Homepage/images/courses/hist-2.jpg']
    },

    // 经济·管理类课程
    {
        id: 14,
        title: '微观经济学原理',
        description: '市场机制、供需关系、消费者行为，经济学基础理论',
        courseIntro: '本课程系统讲解微观经济学基本原理，包括供需理论、消费者选择、生产者行为和市场结构等内容。通过理论模型和现实案例分析，帮助学员理解市场经济运行规律，掌握经济学思维方式，能够运用经济学工具分析实际问题，为后续专业学习和职业发展奠定基础。',
        teacher_id: 14,
        category_id: 7,
        cover_image: '../Homepage/images/courses/math-1.jpg',
        status: 'published',
        enableComments:'开启',
        enableNotes:'开启',
        created_at: '2024-01-09T08:45:00.000Z',
        updated_at: '2024-01-25T13:25:00.000Z',
        category: '经济·管理',
        teacher: '经济学博士',
        registerCount: 1100,
        recommend: true,
        carouselImages: ['../Homepage/images/courses/math-1.jpg']
    },
    {
        id: 15,
        title: '现代企业管理学',
        description: '组织行为、战略规划、人力资源管理，全面提升管理能力',
        courseIntro: '本课程系统介绍现代企业管理的基本理论和实践方法，涵盖战略管理、组织设计、人力资源和运营管理等内容。通过案例分析和实战演练，帮助学员掌握企业管理核心技能，了解企业运作全过程，提升管理决策能力和领导力，为未来从事管理工作做好准备。',
        teacher_id: 15,
        category_id: 7,
        cover_image: '../Homepage/images/courses/math-2.jpg',
        status: 'published',
        enableComments:'开启',
        enableNotes:'开启',
        created_at: '2024-01-13T10:30:00.000Z',
        updated_at: '2024-01-28T14:15:00.000Z',
        category: '经济·管理',
        teacher: '管理专家',
        registerCount: 820,
        recommend: false,
        carouselImages: ['../Homepage/images/courses/math-2.jpg']
    },

    // 医学类课程
    {
        id: 16,
        title: '人体解剖学基础',
        description: '系统学习人体各器官系统结构，医学专业必修基础课程',
        courseIntro: '本课程系统讲解人体各器官系统的形态结构、位置关系和功能特点，通过理论讲授和标本观察相结合的方式，帮助学员建立完整的人体结构知识体系。课程注重结构与功能的联系，强调临床应用价值，为后续生理学、病理学等医学专业课程学习打下坚实基础。',
        teacher_id: 16,
        category_id: 8,
        cover_image: '../Homepage/images/courses/cs-3.jpg',
        status: 'published',
        enableComments:'开启',
        enableNotes:'开启',
        created_at: '2024-01-04T07:30:00.000Z',
        updated_at: '2024-01-21T16:45:00.000Z',
        category: '医学',
        teacher: '医学教授',
        registerCount: 650,
        recommend: false,
        carouselImages: ['../Homepage/images/courses/cs-3.jpg']
    },
    {
        id: 17,
        title: '基础药理学',
        description: '药物作用机制、药代动力学、临床用药指导',
        courseIntro: '本课程介绍药物与机体相互作用的基本规律，包括药物效应动力学、代谢动力学和临床应用等内容。通过理论讲解和案例分析，帮助学员理解各类药物的作用机制、治疗效果和不良反应，掌握合理用药原则，为临床实践和药物研发工作提供理论基础。',
        teacher_id: 17,
        category_id: 8,
        cover_image: '../Homepage/images/courses/lit-2.jpg',
        status: 'published',
        enableComments:'开启',
        enableNotes:'开启',
        created_at: '2024-01-18T13:40:00.000Z',
        updated_at: '2024-02-02T10:20:00.000Z',
        category: '医学',
        teacher: '药理专家',
        registerCount: 380,
        recommend: false,
        carouselImages: ['../Homepage/images/courses/lit-2.jpg']
    },

    // 更多热门课程
    {
        id: 18,
        title: '人工智能与机器学习',
        description: '深度学习、神经网络、AI应用开发，掌握前沿技术',
        courseIntro: '本课程系统讲解人工智能与机器学习的核心算法和应用实践，包括监督学习、无监督学习和深度神经网络等内容。通过Python编程实现经典算法，并完成图像识别、自然语言处理等实战项目，帮助学员掌握AI技术原理和开发方法，为从事人工智能相关工作打下基础。',
        teacher_id: 18,
        category_id: 2,
        cover_image: '../Homepage/images/courses/cs-1.jpg',
        status: 'published',
        enableComments:'开启',
        enableNotes:'开启',
        created_at: '2024-01-20T15:00:00.000Z',
        updated_at: '2024-02-03T12:30:00.000Z',
        category: '计算机',
        teacher: 'AI专家',
        registerCount: 2800,
        recommend: true,
        carouselImages: ['../Homepage/images/courses/cs-1.jpg']
    },
    {
        id: 19,
        title: '大数据分析与可视化',
        description: 'Python数据分析、统计建模、数据可视化技术实战',
        courseIntro: '本课程从Python数据处理基础讲起，系统介绍数据清洗、统计分析、机器学习和可视化技术。通过真实数据集的项目实践，帮助学员掌握从数据获取到洞察发现的全流程技能，能够运用数据分析工具解决实际问题，为从事数据分析师、商业智能等职业做好准备。',
        teacher_id: 19,
        category_id: 2,
        cover_image: '../Homepage/images/courses/cs-2.jpg',
        status: 'published',
        enableComments:'开启',
        enableNotes:'开启',
        created_at: '2024-01-22T11:15:00.000Z',
        updated_at: '2024-02-04T14:50:00.000Z',
        category: '计算机',
        teacher: '数据科学家',
        registerCount: 1950,
        recommend: true,
        carouselImages: ['../Homepage/images/courses/cs-2.jpg']
    },
    {
        id: 20,
        title: '区块链技术与应用',
        description: '分布式系统、智能合约、加密货币，区块链核心技术',
        courseIntro: '本课程深入讲解区块链技术原理和应用开发，包括分布式账本、共识机制、智能合约等核心概念。通过以太坊平台的实际操作，帮助学员掌握Solidity语言和DApp开发方法，了解区块链在金融、供应链等领域的应用场景，为进入区块链行业奠定技术基础。',
        teacher_id: 20,
        category_id: 2,
        cover_image: '../Homepage/images/courses/cs-3.jpg',
        status: 'published',
        enableComments:'开启',
        enableNotes:'开启',
        created_at: '2024-01-25T16:20:00.000Z',
        updated_at: '2024-02-05T09:40:00.000Z',
        category: '计算机',
        teacher: '区块链专家',
        registerCount: 1320,
        recommend: false,
        carouselImages: ['../Homepage/images/courses/cs-3.jpg']
    }
];

// 分类数据
const categoriesData = [
    { id: 1, name: '理学·工学', description: '数学、物理、化学、工程等基础学科' },
    { id: 2, name: '计算机', description: '编程、软件开发、人工智能等计算机相关课程' },
    { id: 3, name: '教育·语言', description: '外语学习、教育理论、语言文学等' },
    { id: 4, name: '文学·艺术', description: '文学、艺术、设计、创作等人文艺术类' },
    { id: 5, name: '创业·职场', description: '创业指导、职业技能、商业管理等' },
    { id: 6, name: '哲史·文化', description: '哲学、历史、文化研究等' },
    { id: 7, name: '经济·管理', description: '经济学、管理学、金融等商科课程' },
    { id: 8, name: '医学', description: '医学基础、临床医学、药学等医学相关' }
];

// 教师数据
const teachersData = [
    { id: 1, name: '张伟教授', avatar: '../header-footer/images/ico.png', department: '计算机科学与技术' },
    { id: 2, name: '李明老师', avatar: '../header-footer/images/ico.png', department: '软件工程' },
    { id: 3, name: '王教授', avatar: '../header-footer/images/ico.png', department: '计算机科学与技术' },
    { id: 4, name: '陈数学教授', avatar: '../header-footer/images/ico.png', department: '数学与统计学院' },
    { id: 5, name: '赵几何老师', avatar: '../header-footer/images/ico.png', department: '数学与统计学院' },
    { id: 6, name: 'Susan老师', avatar: '../header-footer/images/ico.png', department: '外国语学院' },
    { id: 7, name: '田中老师', avatar: '../header-footer/images/ico.png', department: '外国语学院' },
    { id: 8, name: '李文教授', avatar: '../header-footer/images/ico.png', department: '文学院' },
    { id: 9, name: '张艺老师', avatar: '../header-footer/images/ico.png', department: '艺术学院' },
    { id: 10, name: '刘创业导师', avatar: '../header-footer/images/ico.png', department: '商学院' },
    { id: 11, name: '王沟通专家', avatar: '../header-footer/images/ico.png', department: '管理学院' },
    { id: 12, name: '史教授', avatar: '../header-footer/images/ico.png', department: '历史学院' },
    { id: 13, name: '哲学大师', avatar: '../header-footer/images/ico.png', department: '哲学系' },
    { id: 14, name: '经济学博士', avatar: '../header-footer/images/ico.png', department: '经济学院' },
    { id: 15, name: '管理专家', avatar: '../header-footer/images/ico.png', department: '管理学院' },
    { id: 16, name: '医学教授', avatar: '../header-footer/images/ico.png', department: '医学院' },
    { id: 17, name: '药理专家', avatar: '../header-footer/images/ico.png', department: '药学院' },
    { id: 18, name: 'AI专家', avatar: '../header-footer/images/ico.png', department: '人工智能学院' },
    { id: 19, name: '数据科学家', avatar: '../header-footer/images/ico.png', department: '计算机科学与技术' },
    { id: 20, name: '区块链专家', avatar: '../header-footer/images/ico.png', department: '计算机科学与技术' }
];


// 初始化数据到IndexedDB的函数
async function initCoursesData() {
    if (!db) {
        console.error('数据库未初始化');
        return;
    }

    try {
        // 清空现有数据（可选）
        const transaction = db.transaction(['courses'], 'readwrite');
        const store = transaction.objectStore('courses');
        
        // 检查是否已有数据
        const countRequest = store.count();
        console.log(coursesData)
        countRequest.onsuccess = function() {
            if (countRequest.result === 0) {
                // 如果没有数据，则添加课程数据
                coursesData.forEach(course => {
                    store.add(course);
                });
                console.log('课程数据初始化完成');
            } else {
                console.log('课程数据已存在，跳过初始化');
            }
        };
    } catch (error) {
        console.error('初始化课程数据失败:', error);
    }
}


// 导出数据
window.coursesData = coursesData;
window.categoriesData = categoriesData;
window.teachersData = teachersData;
window.initCoursesData = initCoursesData;

// window.commentsData = commentsData;



