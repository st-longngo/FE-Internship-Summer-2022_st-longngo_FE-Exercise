"use strict";
exports.__esModule = true;
exports.formatFixed = exports.renderCartNumberOfListProduct = exports.setData = exports.getData = exports.products = exports.keyList = void 0;
var cartNumber = document.getElementById("cart-number");
exports.keyList = getData('keys', {});
var cart = getData(exports.keyList.cart, []);
exports.products = getData(exports.keyList.products, []);
function getData(key, value) {
    var data = JSON.parse(localStorage.getItem(key));
    if (data) {
        return data;
    }
    return value;
}
exports.getData = getData;
function setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
exports.setData = setData;
function renderCartNumberOfListProduct() {
    cart = getData(exports.keyList.cart, []);
    var quantityProduct = cart.reduce(function (acc, item) { return (acc + item.quantity, 0); });
    if (quantityProduct) {
        cartNumber.classList.add("cart-active");
        cartNumber.innerHTML = quantityProduct;
    }
    else {
        cartNumber.classList.remove("cart-active");
        cartNumber.innerHTML = "";
    }
}
exports.renderCartNumberOfListProduct = renderCartNumberOfListProduct;
function formatFixed(value) {
    var number = 2;
    return value.toFixed(number);
}
exports.formatFixed = formatFixed;
