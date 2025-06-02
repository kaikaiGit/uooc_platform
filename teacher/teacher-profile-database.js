let db;
const request = indexedDB.open('courseDB', 1); // 更新数据库版本号

request.onupgradeneeded = function(event) {
    db = event.target.result;

    if (!db.objectStoreNames.contains('courses')) {
        const objectStore = db.createObjectStore('courses', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('userId', 'userId', { unique: false });
    }
};

request.onsuccess = function(event) {
    db = event.target.result;
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = Number(urlParams.get('courseId'));
    if (courseId) {
        loadCourse(courseId);
    }
};

request.onerror = function(event) {
    console.error('IndexedDB error:', event.target.errorCode);
};

document.addEventListener('DOMContentLoaded', function () {
    //为申请退课链接添加点击事件
    var dropout = document.getElementById('drop-out');
    dropout.addEventListener('click', function (event) {
        event.preventDefault();
        if (confirm("确定要退课吗？")) {
            alert("退课成功！");
        }
        var transaction = db.transaction(['courses'], 'readwrite');
        var objectStore = transaction.objectStore('courses');
        var request = objectStore.delete(courseId);
        request.onsuccess = function (event) {
            console.log('Course deleted');
        };
    });
});
