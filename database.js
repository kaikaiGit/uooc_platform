//初始化localStorage
const admin = {
    userid: 'admin',// 学号/邮箱
    username: 'admin',// 用户名
    phone: '12345678901',// 手机号
    password: '39dd43af',// 密码:admin
    avatar: '../header-footer/images/ico.png', // 头像URL
    identity: 'admin',// 身份
    status: true, // 状态: 启用
}
//TODO 教师在首页注册
const teacher = {
    userid: 'teacher',// 学号/邮箱
    username: 'teacher',// 用户名
    phone: '12345678901',// 手机号
    password: '6aba2a57',// 密码:teacher
    avatar: '../header-footer/images/ico.png', // 头像URL
    identity: 'teacher',// 身份
    status: true, // 状态: 启用
    allowRegister: true,// 学生自主注册功能,默认开启
}
const student = {
    userid: 'student',          // 学号/邮箱
    username: 'student',               // 学生姓名
    phone: '13800138000',           // 手机号
    password: '5f366c91',           // 密码: student123 (示例哈希值)
    avatar: '../header-footer/images/ico.png', // 头像URL
    identity: 'student',            // 身份标识
    status: true,                   // 状态: 启用
    enrollmentDate: '2023-09-01',   // 入学日期（学生特有字段）
    class: '计算机科学与技术1班',   // 所属班级（学生特有字段）
    major: '计算机科学与技术'       // 专业（学生特有字段）
};
if (!localStorage.getItem(admin.userid)) {
    localStorage.setItem(admin.userid, JSON.stringify(admin));//userid为键
}
if (!localStorage.getItem(teacher.userid)) {
    localStorage.setItem(teacher.userid, JSON.stringify(teacher));//userid为键
}
if(!localStorage.getItem(student.userid)) {
    localStorage.setItem(student.userid,JSON.stringify(student))
}