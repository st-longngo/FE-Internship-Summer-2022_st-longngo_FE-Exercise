var cartNumber = document.getElementById('cart-number');
export var getData = function (key, value) {
    var data = JSON.parse(localStorage.getItem(key));
    return data ? data : value;
};
export var setData = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};
export var keyList = getData('keys', {});
var cart = getData(keyList.cart, []);
export var products = getData(keyList.products, []);
export var renderCartNumberOfListProduct = function () {
    cart = getData(keyList.cart, []);
    var quantityProduct = cart.reduce(function (acc, item) { return acc + item.quantity; }, 0);
    if (quantityProduct) {
        cartNumber.classList.add('cart-active');
        cartNumber.innerHTML = quantityProduct;
    }
    else {
        cartNumber.classList.remove('cart-active');
        cartNumber.innerHTML = '';
    }
};
export var formatFixed = function (value) {
    var number = 2;
    return value.toFixed(number);
};
