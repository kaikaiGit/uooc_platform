const commentsData = [
    // 原有评论
    {
        id: 1,
        courseId: 1, // Python课程
        userid: "student",
        text: "这门Python课程讲解得非常清晰，特别适合零基础学习者！"
    },
    {
        id: 2,
        courseId: 1,
        userid: "student",
        text: "希望能多讲一些实战项目案例"
    },
    {
        id: 3,
        courseId: 2, // Web前端课程
        userid: "student",
        text: "Vue.js部分讲得深入浅出，收获很大"
    },
    
    // 新增学生评论（userid固定为"student"）
    {
        id: 4,
        courseId: 1,
        userid: "student",
        text: "老师讲的循环部分让我茅塞顿开！"
    },
    {
        id: 5,
        courseId: 1,
        userid: "student",
        text: "课后练习有点难度，但很有挑战性"
    },
    {
        id: 6,
        courseId: 2,
        userid: "student",
        text: "希望增加更多Vue3的实战案例"
    },
    {
        id: 7,
        courseId: 3, // 新增的数据库课程
        userid: "student",
        text: "SQL语法讲得很系统，适合打基础"
    },
    {
        id: 8,
        courseId: 3,
        userid: "student",
        text: "数据库设计部分可以再多些示例"
    },
    {
        id: 9,
        courseId: 4, // 新增的机器学习课程
        userid: "student",
        text: "数学公式推导如果能更详细就好了"
    }
];

async function initCommentsData() {
    console.log('评论初始化函数被调用');
    if(!db){
        console.error('数据库未初始化');
        return ;
    }
    try{
        const transaction=db.transaction(['comments'],'readwrite');
        const store=transaction.objectStore('comments');
        const countRequest=store.count();
        
        countRequest.onsuccess=function(){
            if(countRequest.result===0){
                commentsData.forEach(comment=>{
                    store.add(comment);
                });
                console.log('评论数据初始化完成，共添加', commentsData.length, '条评论');
            } else {
                console.log('评论数据已存在（现有', countRequest.result, '条），跳过初始化');
            }
        }
    } catch(error){
        console.error('初始化评论数据失败:', error);
    }
}

window.initCommentsData=initCommentsData;