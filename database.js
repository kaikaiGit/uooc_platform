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
if (!localStorage.getItem(admin.userid)) {
    localStorage.setItem(admin.userid, JSON.stringify(admin));//userid为键
}
if (!localStorage.getItem(teacher.userid)) {
    localStorage.setItem(teacher.userid, JSON.stringify(teacher));//userid为键
}