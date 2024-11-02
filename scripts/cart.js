// cart.js

// 从 localStorage 获取购物车商品数据
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// 显示购物车商品
function displayCart() {
    const cartList = document.getElementById("cart-list");
    const totalPriceEl = document.getElementById("total-price");
    cartList.innerHTML = '';

    // 计算总价
    let totalPrice = 0;

    cart.forEach((product, index) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("cart-item");
        productDiv.innerHTML = `
            <h4>${product.name}</h4>
            <p>价格：¥${product.price}</p>
            <button onclick="removeFromCart(${index})">删除</button> <!-- 删除按钮 -->
        `;
        cartList.appendChild(productDiv);
        totalPrice += product.price;
    });

    totalPriceEl.textContent = `总价：¥${totalPrice}`;
}

// 从购物车中删除指定商品
function removeFromCart(index) {
    cart.splice(index, 1); // 从数组中移除商品
    localStorage.setItem("cart", JSON.stringify(cart)); // 更新 localStorage
    displayCart(); // 重新显示购物车内容
}

// 结算功能
function checkout() {
    if (cart.length === 0) {
        alert("购物车为空，无法结算！");
        return;
    }
    window.location.href = "checkout.html"; // 跳转到结算页面
}

// 页面加载时显示购物车内容
window.onload = displayCart;
