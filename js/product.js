"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var common_1 = require("./common");
var productLists = document.querySelectorAll('.product-list');
var cart = (0, common_1.getData)(common_1.keyList.cart, []);
window.addEventListener('DOMContentLoaded', function (e) {
    (0, common_1.renderCartNumberOfListProduct)();
    renderProduct();
    addEventToProduct();
});
function renderProduct() {
    var listProduct = common_1.products.map(function (item) {
        return "<li class=\"col-3 col-sm-6\">\n      <div class=\"product ".concat(item.discount ? "product-sale" : "", "\">\n        <div class=\"product-thumnail\">\n          ").concat(item.discount ? "<span class=\"badge badge-primary product-badge\">-".concat(item.discount, "%</span>") : "", " \n          <a href=\"#\" class=\"product-link\">\n              <img src=").concat(item.image, " alt=").concat(item.name, " class=\"product-image\" />\n          </a>\n          <div class=\"product-cart\">\n              <button class=\"btn btn-secondary btn-cart\" data-id=").concat(item.id, ">add to cart</button>\n          </div>\n        </div>\n        <div class=\"product-content\">\n          <h4 class=\"product-name\">\n              <a href=\"#\" class=\"typo-2 txt-light\">").concat(item.name, "</a>\n          </h4>\n          <div class=\"product-price\">\n              ").concat(item.discount ? "<span>$".concat((0, common_1.formatFixed)((item.price - (item.price * item.discount) / 100)), "</span>\n                <span class=\"product-discount\">$").concat(item.price, "</span>") : "<span>$".concat(item.price, "</span>"), "\n          </div>\n        </div>\n      </div>\n    </li>");
        ;
    }).join(' ');
    productLists.forEach(function (productList) {
        productList.innerHTML = listProduct;
    });
}
function addEventToProduct() {
    var cartBtns = document.querySelectorAll('.btn-cart');
    cartBtns.forEach(function (item) {
        item.addEventListener('click', function () {
            addCart(item.dataset.id);
        });
    });
}
function addCart(id) {
    cart = (0, common_1.getData)(common_1.keyList.cart, []);
    var product = common_1.products.find(function (item) { return item.id === id; });
    var productCart = cart.find(function (item) { return item.id === id; });
    if (!productCart) {
        var newProductCart = __assign(__assign({}, product), { quantity: 1 });
        cart.push(newProductCart);
    }
    else {
        cart[cart.indexOf(productCart)].quantity += 1;
    }
    (0, common_1.setData)(common_1.keyList.cart, cart.sort(function (a, b) { return a.id - b.id; }));
    (0, common_1.renderCartNumberOfListProduct)();
}
