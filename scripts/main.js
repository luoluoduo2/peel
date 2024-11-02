// scripts/main.js

// 简单的本地存储用户数据示例
function saveUser(user) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

// 登录功能
document.getElementById("login-form").onsubmit = function (e) {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        alert("登录成功");
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "index.html";
    } else {
        alert("用户名或密码错误");
    }
};

// 注册功能
document.getElementById("register-form").onsubmit = function (e) {
    e.preventDefault();
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    saveUser({ username, password, balance: 0 });
    alert("注册成功，请登录！");
};
