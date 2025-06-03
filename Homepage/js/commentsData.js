const commentsData = [
    {
        id: 1,
        courseId: 1, // 关联的课程ID
        userid: "2022", // 评论用户ID
        text: "这门Python课程讲解得非常清晰，特别适合零基础学习者！"
    },
    {
        id: 2,
        courseId: 1,
        userid: "2022",
        text: "希望能多讲一些实战项目案例"
    },
    {
        id: 3,
        courseId: 2, // Web前端课程的评论
        userid: "2022",
        text: "Vue.js部分讲得深入浅出，收获很大"
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
                console.log('评论数据初始化完成');
            } else {
                console.log('评论数据已存在，跳过初始化');
            }
        }
    } catch(error){
        console.error('初始化评论数据失败:', error);
    }
}

window.initCommentsData=initCommentsData;