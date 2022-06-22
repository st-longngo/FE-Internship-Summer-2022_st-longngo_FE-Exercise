export interface IProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  discount: number;
}

export interface ICart {
  id: string;
  name: string;
  image: string;
  price: number;
  discount: number;
  quantity: number;
}

export enum LS_KEYS {
  CART = 'cart',
  PRODUCTS = 'products'
}
