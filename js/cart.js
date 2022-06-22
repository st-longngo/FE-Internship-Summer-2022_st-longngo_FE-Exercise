import { getData, setData, keyList, formatFixed, renderCartNumberOfListProduct } from './common.js';
var cart = getData(keyList.cart, []);
var cartLists = document.getElementById('cart-list');
var orderLists = document.getElementById('order-list');
var total = document.getElementById('total');
window.addEventListener('DOMContentLoaded', function () {
    updateListCart();
});
var renderListCart = function () {
    cart = getData(keyList.cart, []);
    cartLists.innerHTML = "\n    <li class=\"cart-row\">\n      <span class=\"txt-bold cart-body\">PRODUCT</span>\n      <span class=\"txt-bold cart-buttons\">QUANTITY</span>\n      <span class=\"txt-center txt-bold cart-total\">TOTAL</span>\n      <span class=\"cart-close\"></span>\n    </li>";
    if (cart.length > 0) {
        cartLists.innerHTML += cart.map(function (item) {
            return "<li class='cart'> \n        <div class='cart-body'> \n          <div class='cart-image'> \n            <img src= ".concat(item.image, " alt=").concat(item.name, "/> \n          </div> \n          <div class='cart-content'> \n            <h4 class='typo-2 txt-light cart-name'>").concat(item.name, "</h4> \n            <span class='txt-regular cart-price'>$").concat(formatFixed(item.price - (item.price * item.discount / 100)), "</span> \n            ").concat((item.discount ? "<span class='txt-regular cart-discount'>$ ".concat(item.price, "</span>") : ' '), " \n          </div> \n        </div> \n        <div class='cart-buttons' data-id=").concat(item.id, "> \n          <button class='cart-btn' id='minus'> \n            <i class='bx bx-minus'></i> \n          </button> \n          <input type='text' class='cart-quantity' value=").concat(item.quantity, "> \n          <button class='cart-btn' id='add'> \n            <i class='bx bx-plus'></i> \n          </button> \n        </div> \n        <p class='txt-center cart-total'>$ \n        ").concat(formatFixed((item.price - (item.price * item.discount / 100)) * item.quantity), "\n        </p> \n        <button id='cart-close' class='cart-btn cart-close' data-id=").concat(item.id, "> \n          <i class='bx bx-x'></i> \n        </button> \n      </li> ");
        }).join('');
        orderLists.innerHTML = cart.map(function (item) {
            return "<li class='order-item'>\n        <h4 class='txt-light order-name'>".concat(item.name, "</h4>\n        <div class='txt-bold order-quantity'>x").concat(item.quantity, "</div>\n      </li>");
        }).join(' ');
        total.innerHTML = "$".concat(formatFixed(cart.reduce(function (acc, item) {
            return acc + ((item.price - (item.price * item.discount / 100)) * item.quantity);
        }, 0)));
    }
    else {
        cartLists.innerHTML += "<div class='error'>\n        <div class='error-image'>\n          <img src='./images/error-image.png' alt='Error 404' />\n        </div>\n        <a href='index.html' class='btn btn-secondary'>Back home</a>\n      </div>";
        orderLists.innerHTML = "<li><p>Kh\u00F4ng c\u00F3 s\u1EA3n ph\u1EA9m trong gi\u1ECF h\u00E0ng</p></li>";
        total.innerHTML = '$0';
    }
};
var updateListCart = function () {
    renderCartNumberOfListProduct();
    renderListCart();
    addEventChangeOfCart();
};
var addEventChangeOfCart = function () {
    var addBtns = document.querySelectorAll('#add');
    var minusBtns = document.querySelectorAll('#minus');
    var closeBtns = document.querySelectorAll('#cart-close');
    var listInputQuantity = document.querySelectorAll('.cart-quantity');
    addBtns.forEach(function (item) {
        item.addEventListener('click', function () {
            var idCart = item.parentElement.dataset.id;
            changeQuantityOfCart('add', idCart);
        });
    });
    minusBtns.forEach(function (item) {
        item.addEventListener('click', function () {
            var idCart = item.parentElement.dataset.id;
            changeQuantityOfCart('minus', idCart);
        });
    });
    closeBtns.forEach(function (item) {
        item.addEventListener('click', function () {
            deleteCartOfProductList(item.dataset.id);
        });
    });
    listInputQuantity.forEach(function (item) {
        item.onkeypress = function (e) {
            return (e.charCode == 8 || e.charCode == 0 || e.charCode == 13) ? null : e.charCode >= 48 && e.charCode <= 57;
        };
        item.addEventListener('change', function (e) {
            var idCart = item.parentElement.dataset.id;
            changeQuantityOfCart('change', idCart, Number(e.target.value));
        });
    });
};
var changeQuantityOfCart = function (action, id, value) {
    if (value === void 0) { value = null; }
    cart = getData(keyList.cart, []);
    var productCart = cart.find(function (item) { return item.id === id; });
    var cartIndex = cart.indexOf(productCart);
    switch (action) {
        case 'add':
            cart[cartIndex].quantity += 1;
            break;
        case 'minus':
            if (productCart.quantity - 1 > 0) {
                cart[cartIndex].quantity -= 1;
            }
            else {
                cart = cart.filter(function (item) { return item.id !== id; });
            }
            break;
        case 'change':
            console.log('hello');
            if (value)
                cart[cartIndex].quantity = value;
            else {
                cart = cart.filter(function (item) { return item.id !== id; });
            }
            break;
        default:
            break;
    }
    setData(keyList.cart, cart);
    updateListCart();
};
var deleteCartOfProductList = function (id) {
    cart = getData(keyList.cart, []);
    var newCart = cart.filter(function (item) { return item.id !== id; });
    setData(keyList.cart, newCart);
    updateListCart();
};
