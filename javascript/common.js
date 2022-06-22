import { LS_KEYS } from "./interface.js";
const cartNumber = document.querySelector('.js-cart-number');
export const getData = (key, value) => {
    const data = JSON.parse(localStorage.getItem(key));
    return data ? data : value;
};
export const setData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};
export const products = getData(LS_KEYS.PRODUCTS, []);
export const renderCartNumberOfListProduct = () => {
    const cart = getData(LS_KEYS.CART, []);
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
