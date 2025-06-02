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
};

request.onerror = function(event) {
    console.log('IndexedDB error:', event.target.errorCode);
};

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    let category = urlParams.get('category');
    let search = urlParams.get('search');
    let currentSortField = 'publishTime';
    let currentSortOrder = 'desc';
    if(db){
        if (search) {
            searchCourses(search, currentSortField, currentSortOrder);
        } else if (category) {
            loadCoursesByCategory(category, currentSortField, currentSortOrder);
            highlightSelectedCategory(category);
        } else {
            loadAllCourses(currentSortField, currentSortOrder);
        }
    }else {
        request.onsuccess = function(event) {
            db = event.target.result;
            if (search) {
                searchCourses(search, currentSortField, currentSortOrder);
            } else if (category) {
                loadCoursesByCategory(category, currentSortField, currentSortOrder);
                highlightSelectedCategory(category);
            } else {
                loadAllCourses(currentSortField, currentSortOrder);
            }
        }
    }
    
    // 添加分类选项的点击事件监听器
    const categoryButtons = document.querySelectorAll('.category-option');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function(event) {

            category=button.getAttribute('data-category');

            search=document.getElementById('searchInput').value;
            currentSortField = event.target.getAttribute('data-sort');
            if (search) {
                searchCourses(search, currentSortField, currentSortOrder);
            } else if (category && category !== '全部') {
                loadCoursesByCategory(category, currentSortField, currentSortOrder);
            } else {
                loadAllCourses(currentSortField, currentSortOrder);
            }
            highlightSelectedSortField(currentSortField);
        });
    });

    // 添加排序选项的点击事件监听器
    const sortButtons = document.querySelectorAll('.sort-option');
    sortButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            category=document.querySelector('.category-option.active').getAttribute('data-category');
            search=document.getElementById('searchInput').value;
            currentSortField = event.target.getAttribute('data-sort');
            if (search) {
                searchCourses(search, currentSortField, currentSortOrder);
            } else if (category && category !== '全部') {
                loadCoursesByCategory(category, currentSortField, currentSortOrder);
            } else {
                loadAllCourses(currentSortField, currentSortOrder);
            }
            highlightSelectedSortField(currentSortField);
        });
    });

    // 添加排序顺序切换按钮的点击事件监听器
    const toggleSortOrderButton = document.getElementById('toggleSortOrder');
    toggleSortOrderButton.addEventListener('click', function() {
        category=document.querySelector('.category-option.active').getAttribute('data-category');
        search=document.getElementById('searchInput').value;
        currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
        toggleSortOrderButton.textContent = currentSortOrder === 'asc' ? '升序' : '降序';
        if (search) {
            searchCourses(search, currentSortField, currentSortOrder);
        } else if (category && category !== '全部') {
            loadCoursesByCategory(category, currentSortField, currentSortOrder);
        } else {
            loadAllCourses(currentSortField, currentSortOrder);
        }
    });

    // 添加搜索按钮点击事件监听器
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', function() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        searchCourses(searchInput, currentSortField, currentSortOrder);
    });
});

// 展示课程列表
function loadCoursesByCategory(category, sortField, sortOrder) {
    const transaction = db.transaction(['courses'], 'readonly');
    const objectStore = transaction.objectStore('courses');
    const request = objectStore.getAll();
    
    request.onsuccess = function(event) {
        let courses = event.target.result.filter(course => course.category == category);
        courses = sortCourses(courses, sortField, sortOrder);
        displayCourses(courses);
    };
    
    request.onerror = function(event) {
        console.error('IndexedDB error:', event.target.errorCode);
    };
}

function loadAllCourses(sortField, sortOrder) {
    const transaction = db.transaction(['courses'], 'readonly');
    const objectStore = transaction.objectStore('courses');
    const request = objectStore.getAll();

    request.onsuccess = function(event) {
        let courses = event.target.result;
        courses = sortCourses(courses, sortField, sortOrder);
        displayCourses(courses);
    };

    request.onerror = function(event) {
        console.error('IndexedDB error:', event.target.errorCode);
    };
}

function displayCourses(courses) {
    const courseList = document.querySelector('.courses-container .course-list');
    const tem=document.querySelector('.courses-container');
    tem.classList.add('content');
    if(!courseList) {
        console.log('找不到课程列表');
        return;
    }
    courseList.innerHTML = ''; // 清空课程列表

    if(courses.length === 0) {
        var noCourse = document.createElement('div');
        noCourse.classList.add('message');
        noCourse.innerHTML = `
            <img src="../student/images/smile.png" alt="笑脸图片">
            <p class="message">目前还没有任何课程</p>
        `;
        courseList.appendChild(noCourse);
        courseList.classList.add('tabs-content');
    }else {
        courses.forEach(course => {
            const courseItem = document.createElement('div');
            courseItem.classList.add('registered');
            courseItem.id = course.id;
            courseItem.innerHTML = `
                <div class="course-image"><img src="${course.carouselImages[0]}" alt="课程封面"></div>
                    <div class="course-info">
                        <br>
                        <h2>${course.title}</h2>
                        <p class="course-description">${course.description}</p>
                        <button id="preview-course" onclick="previewCourse(${course.id})">查看详情</button>
                    </div>
                </div>
            `;
            
            courseList.appendChild(courseItem);
        });
        courseList.classList.add('tabs-content');
    }
}

function highlightSelectedCategory(category) {
    const buttons = document.querySelectorAll('.category-option');
    buttons.forEach(button => {
        if (button.getAttribute('data-category') === category) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// 高亮当前排序字段
function highlightSelectedSortField(field) {
    const sortButtons = document.querySelectorAll('.sort-option');
    sortButtons.forEach(button => {
        if (button.getAttribute('data-sort') === field) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// 根据字段和排序顺序对课程进行排序
function sortCourses(courses, field, order) {
    return courses.sort((a, b) => {
        let aValue = a[field];
        let bValue = b[field];

        if (field === 'publishTime' || field === 'updateTime') {
            aValue = new Date(aValue).getTime();
            bValue = new Date(bValue).getTime();
        }

        if (order === 'asc') {
            return aValue - bValue;
        } else {
            return bValue - aValue;
        }
    });
}

//为“查看详情”添加点击事件
function previewCourse(id) {
    window.open(`../course/course.html?courseId=${id}`, '_blank');
}

function searchCourses(searchInput, sortField, sortOrder) {
    const transaction = db.transaction(['courses'], 'readonly');
    const objectStore = transaction.objectStore('courses');
    const request = objectStore.getAll();

    request.onsuccess = function(event) {
        let courses = event.target.result.filter(course => {
            const titleMatch = course.title.toLowerCase().includes(searchInput);
            const category = document.querySelector('.category-option.active').getAttribute('data-category');
            const categoryMatch = category === '全部' || course.category === category;
            return titleMatch && categoryMatch;
        });
        courses = sortCourses(courses, sortField, sortOrder);
        displayCourses(courses);
    };

    request.onerror = function(event) {
        console.error('IndexedDB error:', event.target.errorCode);
    };
}
