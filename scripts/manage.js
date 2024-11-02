// manage.js

const products = JSON.parse(localStorage.getItem("products")) || [];

// 显示商品列表
function loadAdminProductList() {
    const adminProductList = document.getElementById("admin-product-list");
    adminProductList.innerHTML = '';

    products.forEach((product, index) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <h4>${product.name}</h4>
            <p>价格：¥${product.price}</p>
            <p>状态：${product.isVisible ? "上架中" : "已下架"}</p>
            <button onclick="toggleVisibility(${index})">${product.isVisible ? "下架" : "上架"}</button>
            <button onclick="removeProduct(${index})">删除</button>
        `;
        adminProductList.appendChild(productDiv);
    });
}

// 显示订单信息
function loadOrders() {
    const orderList = document.getElementById("order-list");
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {
        orderList.innerHTML = "<p>当前没有订单。</p>";
        return;
    }

    // 生成订单列表的 HTML
    orderList.innerHTML = orders.map(order => {
        const items = order.items.map(item => `<li>${item.name} - ¥${item.price}</li>`).join('');
        return `
            <div class="order">
                <h4>订单编号：${order.orderId}</h4>
                <ul>${items}</ul>
                <p>订单总价：¥${order.totalPrice}</p>
                <p>客户姓名：${order.customerName}</p>
                <p>联系电话：${order.customerPhone}</p>
                <p>收货地址：${order.customerAddress}</p>
            </div>
        `;
    }).join('');
}

// 清空所有订单
function clearOrders() {
    if (confirm("确定要清空所有订单吗？此操作无法撤销！")) {
        localStorage.removeItem("orders"); // 删除所有订单记录
        loadOrders(); // 更新订单显示
        alert("所有订单已清空！");
    }
}

// 切换商品的上架和下架状态
function toggleVisibility(index) {
    products[index].isVisible = !products[index].isVisible;
    localStorage.setItem("products", JSON.stringify(products));
    loadAdminProductList();
}

// 添加新商品
function addProduct() {
    const productName = document.getElementById("product-name").value;
    const productPrice = document.getElementById("product-price").value;

    if (productName && productPrice) {
        const newProduct = {
            id: products.length + 1,
            name: productName,
            price: Number(productPrice),
            isVisible: true
        };
        products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(products));
        loadAdminProductList();

        // 清空输入框
        document.getElementById("product-name").value = '';
        document.getElementById("product-price").value = '';
    } else {
        alert("请填写完整的商品信息！");
    }
}

// 删除商品
function removeProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    loadAdminProductList();
}

// 页面加载时显示商品列表和订单列表
window.onload = function() {
    loadAdminProductList();
    loadOrders(); // 加载并显示订单信息
};
