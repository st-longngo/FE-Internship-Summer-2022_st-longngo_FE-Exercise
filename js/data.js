var PRODUCTS = [
  {
    id: 1,
    name: "T-Shirt Summer Vibes",
    image: "./images/image.png",
    price: 119.99,
    discount: 30
  },
  {
    id: 2,
    name: "Loose Knit 3/4 Sleeve",
    image: "./images/image-2.png",
    price: 119.99,
    discount: 0
  },
  {
    id: 3,
    name: "Basic Slim Fit T-Shirt",
    image: "./images/image-3.png",
    price: 79.99,
    discount: 0
  },
  {
    id: 4,
    name: "Loose Textured T-Shirt",
    image: "./images/image-4.png",
    price: 119.99,
    discount: 0
  },
];

var KEYS = {
  products: "products",
  cart: "cart",
};

var CART = [];

setData('keys', KEYS);

var KEYS = getData('keys', {});

setData(KEYS.products, PRODUCTS);
setData(KEYS.cart, CART);
