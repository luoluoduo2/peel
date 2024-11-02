// products.js

const products = JSON.parse(localStorage.getItem("products")) || [];

// 显示商品列表
function generateProductList() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = '';

    products.forEach(product => {
        if (product.isVisible) { // 仅显示上架中的商品
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");
            productDiv.innerHTML = `
                <img src="${product.image || 'images/default.png'}" alt="${product.name}" style="width: 100px; height: 100px;">
                <h4>${product.name}</h4>
                <p>价格：¥${product.price}</p>
                <button onclick="addToCart(${product.id})">加入购物车</button>
            `;
            productList.appendChild(productDiv);
        }
    });
}

// 添加到购物车
function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("已添加到购物车");
}

window.onload = generateProductList;
