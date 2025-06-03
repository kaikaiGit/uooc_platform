// 笔记数据
const notesData = [
    // 原有笔记
    {
        id: 1748938918872,
        courseId: 1,
        userid: "student",
        text: "axixxa",
        timestamp: "2023-12-01T14:35:18Z"
    },
    {
        id: 1748938918873,
        courseId: 1,
        userid: "student",
        text: "Python中的列表和元组区别需要重点记忆",
        timestamp: "2023-12-02T09:12:45Z"
    },
    {
        id: 1748938918874,
        courseId: 1,
        userid: "student",
        text: "函数参数传递的机制：可变对象与不可变对象",
        timestamp: "2023-12-03T16:20:30Z"
    },
    {
        id: 1748938918875,
        courseId: 2,
        userid: "student",
        text: "Vue组件通信方式总结：props/$emit, provide/inject等",
        timestamp: "2023-12-04T11:05:22Z"
    },
    {
        id: 1748938918876,
        courseId: 3,
        userid: "student",
        text: "数据库索引优化原理笔记",
        timestamp: "2023-12-05T13:40:15Z"
    },
    {
        id: 1748938918877,
        courseId: 1,
        userid: "student",
        text: "装饰器语法糖@的底层实现原理",
        timestamp: "2023-12-06T10:25:33Z"
    },

    // 新增学生笔记（userid固定为"student"）
    {
        id: 1748938918878,
        courseId: 1,
        userid: "student",
        text: "Python列表推导式笔记：\n[表达式 for 变量 in 列表 if 条件]",
        timestamp: "2023-12-07T08:15:22Z"
    },
    {
        id: 1748938918879,
        courseId: 2,
        userid: "student",
        text: "Vue生命周期钩子函数总结：\n- created: 实例创建后\n- mounted: DOM挂载后",
        timestamp: "2023-12-08T14:30:45Z"
    },
    {
        id: 1748938918880,
        courseId: 3,
        userid: "student",
        text: "SQL JOIN类型比较：\n1. INNER JOIN\n2. LEFT JOIN\n3. RIGHT JOIN",
        timestamp: "2023-12-09T10:20:33Z"
    },
    {
        id: 1748938918881,
        courseId: 1,
        userid: "student",
        text: "Python异常处理要点：\ntry-except-else-finally结构",
        timestamp: "2023-12-10T16:45:18Z"
    },
    {
        id: 1748938918882,
        courseId: 4,
        userid: "student",
        text: "机器学习常用算法：\n- 线性回归\n- 决策树\n- SVM",
        timestamp: "2023-12-11T11:10:27Z"
    },
    {
        id: 1748938918883,
        courseId: 2,
        userid: "student",
        text: "Vuex核心概念：\n- State\n- Getters\n- Mutations\n- Actions",
        timestamp: "2023-12-12T09:55:41Z"
    }
];

async function initNotesData() {
    if (!db) {
        console.error('数据库未初始化');
        return;
    }

    try {
        const transaction = db.transaction(['notes'], 'readwrite');
        const store = transaction.objectStore('notes');
        
        const countRequest = store.count();
        
        countRequest.onsuccess = function() {
            if (countRequest.result === 0) {
                notesData.forEach(note => {
                    store.add(note);
                });
                console.log('笔记数据初始化完成，共添加', notesData.length, '条笔记');
            } else {
                console.log('笔记数据已存在（现有', countRequest.result, '条），跳过初始化');
            }
        };
    } catch (error) {
        console.error('初始化笔记数据失败:', error);
    }
}

window.initNotesData = initNotesData;