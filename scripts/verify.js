// verify.js

document.getElementById("verify-form").onsubmit = function(e) {
    e.preventDefault();
    const inputText = document.getElementById("verify-input").value;
    const requiredText = "我承诺付款完成后利用这唯一的一次机会去截图订单编号";

    if (inputText === requiredText) {
        alert("验证成功，正在跳转到结算页面...");
        window.location.href = "checkout.html"; // 跳转到结算页面
    } else {
        alert("输入错误，请确认后再试！");
    }
};
