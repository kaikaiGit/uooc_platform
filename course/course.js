let db;
const request = indexedDB.open('WebDB', 1); // 更新数据库版本号

request.onupgradeneeded = function (event) {
    db = event.target.result;
    if (!db.objectStoreNames.contains('courses')) {
        const objectStore = db.createObjectStore('courses', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('userId', 'userId', { unique: false });
    }

    if (!db.objectStoreNames.contains('comments')) {
        const objectStore = db.createObjectStore('comments', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('courseId', 'courseId', { unique: false });
        objectStore.createIndex('userid', 'userid', { unique: false });
    }
    if (!db.objectStoreNames.contains('notes')) {
        const objectStore = db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('courseId', 'courseId', { unique: false });
        objectStore.createIndex('userid', 'userid', { unique: false });
    }

    if (!db.objectStoreNames.contains('assignments')) {
        const objectStore = db.createObjectStore('assignments', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('courseId', 'courseId', { unique: false });
    }

    if (!db.objectStoreNames.contains('coursewares')) {
        const objectStore = db.createObjectStore('coursewares', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('name', 'name', { unique: false });
        objectStore.createIndex('userid', 'userid', { unique: false });
        objectStore.createIndex('courseId', 'courseId', { unique: false });
    }
    if (!db.objectStoreNames.contains('homework')) {
        const objectStore = db.createObjectStore('homework', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('studentId', 'studentId', { unique: false });
    }
    if (!db.objectStoreNames.contains('ref_student_course')) {
        const objectStore = db.createObjectStore('ref_student_course', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('courseId', 'courseId', { unique: false });
        objectStore.createIndex('studentId', 'studentId', { unique: false });
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

function loadCourse(courseId) {
    const transaction = db.transaction(['courses'], 'readonly');
    const objectStore = transaction.objectStore('courses');
    const request = objectStore.get(courseId);

    request.onsuccess = function(event) {
        const course = event.target.result;
        if (course) {
            console.log(course)
            displayCourse(course);
        } else {
            console.error('Course not found');
        }
    };

    request.onerror = function(event) {
        console.error('IndexedDB error:', event.target.errorCode);
    };
}

function displayCourse(course) {
    const previewContainer = document.getElementById('coursePreview');
    previewContainer.innerHTML = `
        <div class="course-content">
            <div class="carousel-container">

                <div class="carousel-slide">
                    ${(Array.isArray(course.carouselImages) ? course.carouselImages : []).map(src => `
                        <div class="carousel-item">
                            <img src="${src}" class="carousel-image">
                        </div>
                    `).join('')}
                </div>

                <div class="carousel-buttons">
                    <button class="carousel-button" id="prevBtn">&#10094;</button>
                    <button class="carousel-button" id="nextBtn">&#10095;</button>
                </div>

            </div>
            <div class="course-details">
                <h2>${course.title}</h2>
                <p>类别: ${course.category}</p>
                <p>${course.description}</p>
                <button id="temp" onclick="registerCourse(${course.id})">注册课程</button>
                
                <div class="like-section">
                    <button onclick="likeCourse(${course.id})" id="likeButton"></button>
                    <span id="likeCount">${course.likes || 0}</span>个点赞
                </div>
            
            </div>
        </div>

    `;

    // 课程简介
    const intro = document.getElementById('Intro');
    intro.innerHTML = `
        <p>${course.courseIntro}</p>
    `;

    //评论区
    const comment = document.getElementById('comment');
    comment.innerHTML = `
        <p>评论区: ${course.enableComments ? '开启' : '已关闭'}</p>
        <div class="comments-section" style="display: ${course.enableComments ? 'block' : 'none'};">
            <h3 class="section=-title">评论区</h3>
            <ul id="commentsList" class="comments-list"></ul>
            <textarea id="newComment" placeholder="添加评论" class="comment-input"></textarea>
            <button onclick="addComment(${course.id})" >提交评论</button>
        </div>
    `;
    
    const note = document.getElementById('note');
    let currentUser = localStorage.getItem('token');
    let enable=course.enableNotes;
    if(!currentUser){
        enable=false;
    }
    note.innerHTML = `
        <p>笔记区: ${enable ? '开启' : '已关闭'}</p>
        <div class="notes-section" style="display: ${enable ? 'block' : 'none'};">
            <h3 class="section=-title">笔记区</h3>
            <ul id="notesList" class="notes-list"></ul>
            <textarea id="newNote" placeholder="添加笔记" class="note-input"></textarea>
            <button onclick="addNote(${course.id})" >提交笔记</button>
        </div>
    `;      
    
    const courseware = document.getElementById('courseware');
    courseware.innerHTML = `
        <ul id="savedCoursewares"></ul>
    `;

    // 加载历史评论和笔记
    loadComments(course.id);
    loadNotes(course.id);
    updateSavedCoursewaresList(course.id);  

    requestAnimationFrame(() => {
        const slide = document.querySelector('.carousel-slide');
        const images = document.querySelectorAll('.carousel-item');
        if (images.length === 0) return; // 确保有图片元素
        let counter = 0;
        const size = images[0].clientWidth;

        function moveToNextSlide() {
            if (counter >= images.length - 1) {
                counter = -1;
            }
            slide.style.transition = 'transform 0.5s ease-in-out';
            counter++;
            slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }

        function moveToPrevSlide() {
            if (counter <= 0) {
                counter = images.length;
            }
            slide.style.transition = 'transform 0.5s ease-in-out';
            counter--;
            slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }

        document.getElementById('nextBtn').addEventListener('click', moveToNextSlide);
        document.getElementById('prevBtn').addEventListener('click', moveToPrevSlide);

        // 定时轮播
        setInterval(moveToNextSlide, 2500); // 每2.5秒切换一次
    });

}

function getCurrentUserId() {
    return localStorage.getItem('token');
}

// 评论
function loadComments(courseId) {
    
    const transaction = db.transaction(['comments'], 'readonly');
    const objectStore = transaction.objectStore('comments');
    const index = objectStore.index('courseId');
    const request = index.getAll(courseId);

    request.onsuccess = function(event) {
        const comments = event.target.result;
        console.log(comments);
        const commentsList = document.getElementById('commentsList');
        commentsList.innerHTML = '';
        comments.forEach(comment => {
            let listItem = document.createElement('li');
            let avatar = document.createElement('img');
            let body=document.createElement('div');
            let username = document.createElement('span');
            let text=document.createElement('p');

            let tem=JSON.parse(localStorage.getItem(comment.userid));
            avatar.src = tem.avatar;
            avatar.className = 'avatarUnder';

            username.textContent = tem.username;
            username.className = 'nameUnder';

            text.textContent = comment.text;
            text.className = 'contentUnder';

            body.className = 'bodyUnder';
            listItem.className = 'liUnder';

            body.appendChild(username);
            body.appendChild(text);
            listItem.appendChild(avatar);
            listItem.appendChild(body);

            commentsList.appendChild(listItem);
        });
    };

    request.onerror = function(event) {
        console.error('IndexedDB error:', event.target.errorCode);
    };
}

function addComment(courseId) {

    const currentUser = localStorage.getItem('token'); // 获取当前用户
    if (!currentUser) {
        alert('游客不能评论');
        return;
    }

    const commentText = document.getElementById('newComment').value;
    if (!commentText) return;

    const transaction = db.transaction(['comments'], 'readwrite');
    const objectStore = transaction.objectStore('comments');
    const comment = {
        courseId,
        text: commentText,
        id: Date.now(),
        userid: getCurrentUserId()
    };
    const request = objectStore.add(comment);

    request.onsuccess = function() {
        document.getElementById('newComment').value = '';
        loadComments(courseId);
    };

    request.onerror = function(event) {
        console.error('IndexedDB error:', event.target.errorCode);
    };
}

// 笔记
function loadNotes(courseId) {

    const transaction = db.transaction(['notes'], 'readonly');
    const objectStore = transaction.objectStore('notes');
    const index = objectStore.index('courseId');
    const request = index.getAll(courseId);

    request.onsuccess = function(event) {
        const notes = event.target.result;
        const notesList = document.getElementById('notesList');
        notesList.innerHTML = '';
        notes.forEach(note => {
            let listItem = document.createElement('li');
            let avatar = document.createElement('img');
            let body=document.createElement('div');
            let username = document.createElement('span');
            let text=document.createElement('p');

            let tem=JSON.parse(localStorage.getItem(note.userid));
            avatar.src = tem.avatar;
            avatar.className = 'avatarUnder';

            username.textContent = tem.username;
            username.className = 'nameUnder';

            text.textContent = note.text;
            text.className = 'contentUnder';

            body.className = 'bodyUnder';
            listItem.className = 'liUnder';

            body.appendChild(username);
            body.appendChild(text);
            listItem.appendChild(avatar);
            listItem.appendChild(body);

            notesList.appendChild(listItem);
        });
    };

    request.onerror = function(event) {
        console.error('IndexedDB error:', event.target.errorCode);
    };
}

function addNote(courseId) {
    const noteText = document.getElementById('newNote').value;
    if (!noteText) return;

    const transaction = db.transaction(['notes'], 'readwrite');
    const objectStore = transaction.objectStore('notes');
    const note = {
        courseId,
        text: noteText,
        id: Date.now(),
        userid: getCurrentUserId()
    };
    const request = objectStore.add(note);

    request.onsuccess = function() {
        document.getElementById('newNote').value = '';
        loadNotes(courseId);
    };

    request.onerror = function(event) {
        console.error('IndexedDB error:', event.target.errorCode);
    };
}

// 课件
function updateSavedCoursewaresList(courseId) {
    const savedCoursewaresList = document.getElementById('savedCoursewares');
    savedCoursewaresList.innerHTML = ''; // 清空列表

    getSavedCoursewares(courseId,function(coursewares) {
        const categorizedCoursewares = categorizeCoursewares(coursewares);
        renderCoursewares(categorizedCoursewares, savedCoursewaresList);
    });
}

function getSavedCoursewares(courseId,callback) {
    const coursewaresTransaction = db.transaction(['coursewares'], 'readwrite');
    const coursewaresStore = coursewaresTransaction.objectStore('coursewares');
    const coursewaresIndex = coursewaresStore.index('courseId');
    const request = coursewaresIndex.getAll(courseId); // 获取所有courseId的课件

    request.onsuccess = function(event) {
        callback(event.target.result);
    };

    request.onerror = function(event) {
        console.error('IndexedDB error:', event.target.errorCode);
    };
}

function categorizeCoursewares(coursewares) {
    const root = [];

    coursewares.forEach(courseware => {
        const pathParts = courseware.categoryPath.split('/');
        let currentLevel = root;

        pathParts.forEach((part, index) => {
            let existingCategory = currentLevel.find(item => item.name === part);

            if (!existingCategory) {
                existingCategory = {
                    name: part,
                    children: []
                };
                currentLevel.push(existingCategory);
            }

            if (index === pathParts.length - 1) {
                existingCategory.children.push(courseware);
            } else {
                currentLevel = existingCategory.children;
            }
        });
    });

    return root;
}

function renderCoursewares(coursewares, parentElement) {
    coursewares.forEach(courseware => {
        const listItem = document.createElement('li');
        
        if (courseware.children && courseware.children.length > 0) {
            const expandButton = document.createElement('button');
            expandButton.textContent = '+';
            expandButton.className = 'expand-button';
            expandButton.onclick = function(event) {
                event.preventDefault();
                toggleExpand(listItem, courseware);
            };
            listItem.appendChild(expandButton);
        }

        const tagNameSpan = document.createElement('span');
        tagNameSpan.textContent = courseware.name;
        listItem.appendChild(tagNameSpan);
        
        if (courseware.fileData) {
            const previewLink = document.createElement('a');
            previewLink.href = courseware.fileData;
            previewLink.textContent = '下载查看';
            previewLink.target = '_blank';
            previewLink.style.marginLeft = '10px';
            previewLink.download = courseware.name; // 设置下载属性
            listItem.appendChild(previewLink);
        }
        
        parentElement.appendChild(listItem);
    });
}

function toggleExpand(listItem, courseware) {
    if (listItem.querySelector('ul')) {
        listItem.removeChild(listItem.querySelector('ul'));
    } else {
        const childList = document.createElement('ul');
        renderCoursewares(courseware.children || [], childList);
        listItem.appendChild(childList);
    }
}

// 
document.addEventListener('DOMContentLoaded', function() {
    if (db) {
        const urlParams = new URLSearchParams(window.location.search);
        const courseId = Number(urlParams.get('courseId'));
        if (courseId) {
            loadCourse(courseId);
        }
    } else {
        request.onsuccess = function(event) {
            db = event.target.result;
            const urlParams = new URLSearchParams(window.location.search);
            const courseId = Number(urlParams.get('courseId'));
            if (courseId) {
                loadCourse(courseId);
            }
        };
    }
    // 为选项卡添加点击事件
    var tabsItems = document.querySelectorAll('.tabs-item');
    tabsItems.forEach(function (item) {
        item.addEventListener('click', function (event) {
            event.preventDefault(); // 阻止默认的链接跳转行为
            showTabContent(item.getAttribute('href').split('/')[1]);
        });
    });

    // 默认显示第一个选项卡内容并添加.active
    var tabsItems = document.querySelectorAll('.tabs-item');
    if (tabsItems.length > 0) {
        showTabContent(tabsItems[0].getAttribute('href').split('/')[1]);
    }

    // 添加搜索按钮点击事件监听器
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', searchCourses);
});

// 显示选项卡内容
function showTabContent(className) {
    // 隐藏所有选项卡内容
    var tabsContents = document.querySelectorAll('.tabs-content > div');
    tabsContents.forEach(function (content) {
        content.style.display = 'none';
    });

    // 显示选中的选项卡内容
    var selectedContent = document.getElementsByClassName(className);
    if (selectedContent[0]) {
        selectedContent[0].style.display = 'flex';
    }

    // 更新选项卡的选中状态
    var tabsItems = document.querySelectorAll('.tabs-item');
    tabsItems.forEach(function (item) {
        if (item.getAttribute('href').split('/')[1] === className) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// 注册课程
function registerCourse(courseId) {
    if (!db) {
        request.onsuccess = function(event) {
            db = event.target.result;
            checkAndRegisterCourse(courseId);
        };
    } else {
        checkAndRegisterCourse(courseId);
    }
}

function checkAndRegisterCourse(courseId) {
    const transaction = db.transaction(['ref_student_course'], 'readwrite');
    const objectStore = transaction.objectStore('ref_student_course');
    const request = objectStore.openCursor();
    let isRegistered = false;

    request.onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
            const record = cursor.value;
            if (record.courseId === courseId && record.studentId === getCurrentUserId()) {
                isRegistered = true;
                alert('已注册该课程');
                return;
            }
            cursor.continue();
        } else {
            if (!isRegistered) {
                const ref = {
                    courseId,
                    studentId: getCurrentUserId(),
                    id: Date.now()
                };

                const registerRequest = objectStore.add(ref);

                registerRequest.onsuccess = function() {
                    alert('注册成功');
                };

                document.getElementById('temp').innerHTML = '开始学习';
                
                updateCourseRegisterCount(courseId);

                registerRequest.onerror = function(event) {
                    console.error('IndexedDB error:', event.target.errorCode);
                };
            }
        }
    };

    request.onerror = function(event) {
        console.error('IndexedDB error:', event.target.errorCode);
    };
}

// 点赞
function likeCourse(courseId) {
    const transaction = db.transaction(['courses'], 'readwrite');
    const objectStore = transaction.objectStore('courses');
    const request = objectStore.get(courseId);

    request.onsuccess = function(event) {
        const course = event.target.result;
        if (course) {
            course.likes = (course.likes || 0) + 1;
            const updateRequest = objectStore.put(course);

            updateRequest.onsuccess = function() {
                document.getElementById('likeCount').textContent = course.likes;
            };

            updateRequest.onerror = function(event) {
                console.error('IndexedDB error:', event.target.errorCode);
            };
        } else {
            console.error('Course not found');
        }
    };

    request.onerror = function(event) {
        console.error('IndexedDB error:', event.target.errorCode);
    };
}

// 更新课程注册人数
function updateCourseRegisterCount(courseId) {
    const transaction = db.transaction(['courses'], 'readwrite');
    const objectStore = transaction.objectStore('courses');
    const getRequest = objectStore.get(courseId);

    getRequest.onsuccess = function(event) {
        const course = event.target.result;
        if (course) {
            course.registerCount = (course.registerCount || 0) + 1;
            course.updateTime = Date.now();
            const updateRequest = objectStore.put(course);

            updateRequest.onsuccess = function() {
                console.log('课程注册人数更新成功');
            };

            updateRequest.onerror = function(event) {
                console.error('IndexedDB error:', event.target.errorCode);
            };
        }
    };

    getRequest.onerror = function(event) {
        console.error('IndexedDB error:', event.target.errorCode);
    };
}

function searchCourses() {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (!searchInput) {
        alert('请输入搜索关键词');
        document.getElementById('searchInput').focus();
        return;
    }
    window.location.href = `../Homepage/courseList.html?search=${encodeURIComponent(searchInput.toLowerCase())}`;
}