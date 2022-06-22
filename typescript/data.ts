import { setData, getData } from './common.js';
import { ICart, LS_KEYS } from './interface.js';

const PRODUCTS = [
  {
    id: '1',
    name: 'T-Shirt Summer Vibes',
    image: './images/image.png',
    price: 119.99,
    discount: 30
  },
  {
    id: '2',
    name: 'Loose Knit 3/4 Sleeve',
    image: './images/image-2.png',
    price: 119.99,
    discount: 0
  },
  {
    id: '3',
    name: 'Basic Slim Fit T-Shirt',
    image: './images/image-3.png',
    price: 79.99,
    discount: 0
  },
  {
    id: '4',
    name: 'Loose Textured T-Shirt',
    image: './images/image-4.png',
    price: 119.99,
    discount: 0
  },
];

const CART: ICart[] = [];

setData(LS_KEYS.PRODUCTS, PRODUCTS);
if(!getData(LS_KEYS.CART, null)) {
  setData<ICart[]>(LS_KEYS.CART, CART);
}

  