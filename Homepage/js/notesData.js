// 笔记数据
const notesData = [
    {
        id: 1748938918872,
        courseId: 1,
        userid: "2022",
        text: "axixxa",
        timestamp: "2023-12-01T14:35:18Z"
    },
    {
        id: 1748938918873,
        courseId: 1,
        userid: "2022",
        text: "Python中的列表和元组区别需要重点记忆",
        timestamp: "2023-12-02T09:12:45Z"
    },
    {
        id: 1748938918874,
        courseId: 1,
        userid: "2022",
        text: "函数参数传递的机制：可变对象与不可变对象",
        timestamp: "2023-12-03T16:20:30Z"
    },
    {
        id: 1748938918875,
        courseId: 2,
        userid: "2022",
        text: "Vue组件通信方式总结：props/$emit, provide/inject等",
        timestamp: "2023-12-04T11:05:22Z"
    },
    {
        id: 1748938918876,
        courseId: 3,
        userid: "2022",
        text: "数据库索引优化原理笔记",
        timestamp: "2023-12-05T13:40:15Z"
    },
    {
        id: 1748938918877,
        courseId: 1,
        userid: "2022",
        text: "装饰器语法糖@的底层实现原理",
        timestamp: "2023-12-06T10:25:33Z"
    }
];

async function initNotesData() {
    if (!db) {
        console.error('数据库未初始化');
        return;
    }

    try {
        // 清空现有数据（可选）
        const transaction = db.transaction(['notes'], 'readwrite');
        const store = transaction.objectStore('notes');
        
        // 检查是否已有数据
        const countRequest = store.count();
        console.log(notesData)
        countRequest.onsuccess = function() {
            if (countRequest.result === 0) {
                // 如果没有数据，则添加笔记数据
                notesData.forEach(note => {
                    store.add(note);
                });
                console.log('笔记数据初始化完成');
            } else {
                console.log('笔记数据已存在，跳过初始化');
            }
        };
    } catch (error) {
        console.error('初始化笔记数据失败:', error);
    }
}

// window.notesData=notesData
window.initNotesData=initNotesData
