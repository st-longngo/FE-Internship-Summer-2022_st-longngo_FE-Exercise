import { ICart, IProduct } from "./interface.js";

const cartNumber = document.querySelector('.js-cart-number') as HTMLElement;

export const getData = (key : string, value : any) : any => {
  const data : any = JSON.parse(localStorage.getItem(key)!);
  return data ? data : value;
}

export const setData = (key: string, value: any) : void => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const keyList = getData('keys', {});
let cart : ICart[] = getData(keyList.cart, []);
export const products : IProduct[] = getData(keyList.products, []);

export const renderCartNumberOfListProduct = () : void => {
  cart = getData(keyList.cart, []);
  const quantityProduct : number = cart.reduce((acc : number, item : ICart) => acc + item.quantity, 0);
  if (quantityProduct) {
    cartNumber.classList.add('cart-active');
    cartNumber.innerHTML = quantityProduct + '';
  } else {
    cartNumber.classList.remove('cart-active');
    cartNumber.innerHTML = '';
  }
}

export const formatFixed = (value : number) => {
  const number = 2;
  return value.toFixed(number);
}
