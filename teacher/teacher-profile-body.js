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

function publishManualExam() {
    // 验证表单数据
    const examTitle = document.getElementById('examTitle').value;
    const examDuration = document.getElementById('examDuration').value;
    const examTotalScore = document.getElementById('examTotalScore').value;
    
    if (!examTitle || !examDuration || !examTotalScore) {
        alert('请填写完整的试卷信息');
        return;
    }
    
    const questions = [];
    document.querySelectorAll('.question-item').forEach(q => {
        const id = q.getAttribute('data-id');
        const type = document.getElementById(`questionType${id}`).value;
        const text = document.getElementById(`questionText${id}`).value;
        const score = document.getElementById(`questionScore${id}`).value;
        
        if (!text || !score) {
            alert(`试题 #${id} 的内容或分值未填写完整`);
            return;
        }
        
        const question = { id, type, text, score };
        
        if (type !== 'fill_blank' && type !== 'short_answer') {
            const options = [];
            q.querySelectorAll('.option-item input').forEach((input, i) => {
                options.push({
                    id: i,
                    text: input.value || `选项${String.fromCharCode(65 + i)}`
                });
            });
            question.options = options;
        }
        
        questions.push(question);
    });
    
    if (questions.length === 0) {
        alert('请至少添加一道试题');
        return;
    }
    
    // 构建试卷对象
    const examData = {
        title: examTitle,
        duration: parseInt(examDuration),
        totalScore: parseInt(examTotalScore),
        questions: questions,
        createdAt: new Date().toISOString(),
        createdBy: JSON.parse(localStorage.getItem('teacher')).username
    };
    
    // 在实际应用中，这里应该将试卷数据保存到数据库
    console.log('发布的试卷数据:', examData);
    alert('试卷发布成功！');
    
    // 重置表单
    document.getElementById('manualExamForm').reset();
    document.getElementById('questionList').innerHTML = '';
    document.getElementById('examPreview').style.display = 'none';
}
