// 课程数据 - 根据courses表结构构造
const coursesData = [
    // 计算机类课程
    {
        id: 1,
        title: 'Python编程基础入门',
        description: '零基础学Python，从环境搭建到项目实战，掌握编程思维和基础语法',
        teacher_id: 1,
        category_id: 2, // 计算机
        cover_image: '../Homepage/images/courses/cs-1.jpg',
        status: 'published',
        created_at: '2024-01-15T09:00:00.000Z',
        updated_at: '2024-01-20T14:30:00.000Z',
        category: '计算机',
        teacher: '张伟教授',
        registerCount: 1580,
        recommend: true,
        carouselImages: ['../Homepage/images/courses/cs-1.jpg']
    },
    {
        id: 2,
        title: 'Web前端开发实战',
        description: '全栈开发必备技能，HTML5、CSS3、JavaScript、Vue.js框架全面掌握',
        teacher_id: 2,
        category_id: 2,
        cover_image: '../Homepage/images/courses/cs-2.jpg',
        status: 'published',
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
        teacher_id: 3,
        category_id: 2,
        cover_image: '../Homepage/images/courses/cs-3.jpg',
        status: 'published',
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
        teacher_id: 4,
        category_id: 1,
        cover_image: '../Homepage/images/courses/math-1.jpg',
        status: 'published',
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
        teacher_id: 5,
        category_id: 1,
        cover_image: '../Homepage/images/courses/math-2.jpg',
        status: 'published',
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
        teacher_id: 6,
        category_id: 3,
        cover_image: '../Homepage/images/courses/lang-1.jpg',
        status: 'published',
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
        teacher_id: 7,
        category_id: 3,
        cover_image: '../Homepage/images/courses/lang-2.jpg',
        status: 'published',
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
        teacher_id: 8,
        category_id: 4,
        cover_image: '../Homepage/images/courses/lit-1.jpg',
        status: 'published',
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
        teacher_id: 9,
        category_id: 4,
        cover_image: '../Homepage/images/courses/art-1.jpg',
        status: 'published',
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
        teacher_id: 10,
        category_id: 5,
        cover_image: '../Homepage/images/courses/cs-1.jpg',
        status: 'published',
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
        teacher_id: 11,
        category_id: 5,
        cover_image: '../Homepage/images/courses/cs-2.jpg',
        status: 'published',
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
        teacher_id: 12,
        category_id: 6,
        cover_image: '../Homepage/images/courses/hist-1.jpg',
        status: 'published',
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
        teacher_id: 13,
        category_id: 6,
        cover_image: '../Homepage/images/courses/hist-2.jpg',
        status: 'published',
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
        teacher_id: 14,
        category_id: 7,
        cover_image: '../Homepage/images/courses/math-1.jpg',
        status: 'published',
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
        teacher_id: 15,
        category_id: 7,
        cover_image: '../Homepage/images/courses/math-2.jpg',
        status: 'published',
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
        teacher_id: 16,
        category_id: 8,
        cover_image: '../Homepage/images/courses/cs-3.jpg',
        status: 'published',
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
        teacher_id: 17,
        category_id: 8,
        cover_image: '../Homepage/images/courses/lit-2.jpg',
        status: 'published',
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
        teacher_id: 18,
        category_id: 2,
        cover_image: '../Homepage/images/courses/cs-1.jpg',
        status: 'published',
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
        teacher_id: 19,
        category_id: 2,
        cover_image: '../Homepage/images/courses/cs-2.jpg',
        status: 'published',
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
        teacher_id: 20,
        category_id: 2,
        cover_image: '../Homepage/images/courses/cs-3.jpg',
        status: 'published',
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