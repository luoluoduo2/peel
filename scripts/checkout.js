// checkout.js

document.getElementById("checkout-form").onsubmit = function(e) {
    e.preventDefault();

    // 获取用户输入的信息
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const orderId = generateOrderId(); // 生成订单编号
    const cart = JSON.parse(localStorage.getItem("cart")) || []; // 获取购物车中的商品

    // 计算总价
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    // 保存订单信息到 `localStorage`
    saveOrder(orderId, cart, totalPrice, name, phone, address);

    // 根据付款方式跳转到对应二维码页面
    if (paymentMethod === "alipay") {
        window.location.href = "alipay.html";
    } else if (paymentMethod === "wechat") {
        window.location.href = "wechat.html";
    } else {
        alert("请按照提示完成付款！");
    }
};

// 生成订单编号函数
function generateOrderId() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4位随机数
    return `ORD-${year}${month}${day}-${randomNum}`;
}

// 将订单信息保存到 `localStorage`
function saveOrder(orderId, cart, totalPrice, name, phone, address) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const orderDetails = {
        orderId: orderId,
        items: cart.map(item => ({ name: item.name, price: item.price })), // 只保存商品名和单价
        totalPrice: totalPrice,
        customerName: name,
        customerPhone: phone,
        customerAddress: address
    };
    orders.push(orderDetails);
    localStorage.setItem("orders", JSON.stringify(orders));
}
