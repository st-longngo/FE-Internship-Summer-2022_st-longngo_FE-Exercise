import { ICart, IProduct, LS_KEYS } from "./interface.js";

const cartNumber = document.querySelector('.js-cart-number') as HTMLElement;

export const getData = <T>(key: string, value: T): T => {
  const data: T = JSON.parse(localStorage.getItem(key)!);
  return data ? data : value;
}

export const setData = <T>(key: LS_KEYS, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const products: IProduct[] = getData(LS_KEYS.PRODUCTS, []);

export const renderCartNumberOfListProduct = (): void => {
  const cart: ICart[] = getData(LS_KEYS.CART, []);
  const quantityProduct: number = cart.reduce((acc: number, item: ICart) => acc + item.quantity, 0);
  if (quantityProduct) {
    cartNumber.classList.add('cart-active');
    cartNumber.innerHTML = quantityProduct + '';
  } else {
    cartNumber.classList.remove('cart-active');
    cartNumber.innerHTML = '';
  }
}

export const formatFixed = (value: number) => {
  const number = 2;
  return value.toFixed(number);
}
