const cartNumber = document.querySelector('.js-cart-number');
export const getData = (key, value) => {
    const data = JSON.parse(localStorage.getItem(key));
    return data ? data : value;
};
export const setData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};
export const keyList = getData('keys', {});
let cart = getData(keyList.cart, []);
export const products = getData(keyList.products, []);
export const renderCartNumberOfListProduct = () => {
    cart = getData(keyList.cart, []);
    const quantityProduct = cart.reduce((acc, item) => acc + item.quantity, 0);
    if (quantityProduct) {
        cartNumber.classList.add('cart-active');
        cartNumber.innerHTML = quantityProduct + '';
    }
    else {
        cartNumber.classList.remove('cart-active');
        cartNumber.innerHTML = '';
    }
};
export const formatFixed = (value) => {
    const number = 2;
    return value.toFixed(number);
};
