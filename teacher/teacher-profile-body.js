var activeSidebar


// 显示侧边栏内容
function showContent(id) {
    // 隐藏所有内容
    var contents = document.querySelectorAll('.content > div');
    contents.forEach(function (content) {
        content.style.display = 'none';
    });

    // 显示选中的内容
    var selectedContent = document.getElementById(id);
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }

    // 更新侧边栏的选中状态
    var sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(function (item) {
        if (item.getAttribute('href').substring(1) === id) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });


    // 默认显示第一个选项卡内容并添加.active
    var tabsItems = document.querySelectorAll('#' + id + ' .tabs-item');
    if (tabsItems.length > 0) {
        showTabContent(tabsItems[0].getAttribute('href').split('/')[1]);
    }

}

// 显示选项卡内容
function showTabContent(className) {

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

document.addEventListener('DOMContentLoaded', function () {
    // 为侧边栏的链接添加点击事件
    var sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(function (item) {
        item.addEventListener('click', function (event) {
            event.preventDefault(); // 阻止默认的链接跳转行为
            showContent(item.getAttribute('href').substring(1));
            // localStorage.setItem('activeTab', className);
        });
    });

    showContent('courses'); // 默认显示第一个侧边栏内容

    // 为选项卡添加点击事件
    var tabsItems = document.querySelectorAll('.tabs-item');
    tabsItems.forEach(function (item) {
        item.addEventListener('click', function (event) {
            event.preventDefault(); // 阻止默认的链接跳转行为
            showTabContent(item.getAttribute('href').split('/')[1]);
        });
    });
});
