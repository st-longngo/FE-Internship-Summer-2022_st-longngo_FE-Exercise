import { getData, keyList, renderCartNumberOfListProduct, products, formatFixed, setData } from './common.js';
import { IProduct, ICart } from './interface.js';
const productLists = document.querySelectorAll('.product-list');
let cart = getData(keyList.cart, []);

window.addEventListener('DOMContentLoaded', function(e) {
  renderCartNumberOfListProduct();
  renderProduct();
  addEventToProduct();
});

const renderProduct = () : void => {
  const listProduct = products.map((item : IProduct) => {
    return `<li class='col-3 col-sm-6'>
      <div class='product ${item.discount ? `product-sale` : ``}'>
        <div class='product-thumnail'>
          ${item.discount ? `<span class='badge badge-primary product-badge'>-${item.discount}%</span>` : ''} 
          <a href='#' class='product-link'>
              <img src=${item.image} alt=${item.name} class='product-image' />
          </a>
          <div class='product-cart'>
              <button class='btn btn-secondary btn-cart' data-id=${item.id}>add to cart</button>
          </div>
        </div>
        <div class='product-content'>
          <h4 class='product-name'>
              <a href='#' class='typo-2 txt-light'>${item.name}</a>
          </h4>
          <div class='product-price'>
              ${
                item.discount ? `<span>$${formatFixed((item.price - (item.price * item.discount) / 100))}</span>
                <span class='product-discount'>$${item.price}</span>` : `<span>$${item.price}</span>`
              }
          </div>
        </div>
      </div>
    </li>`;;
  }).join(' ');
  productLists.forEach((productList : any) => {
    productList.innerHTML = listProduct;
  });
}

const addEventToProduct = () :void => {
  const cartBtns = document.querySelectorAll('.btn-cart') as NodeListOf<HTMLElement>;
  cartBtns.forEach((item : any) => {
    item.addEventListener('click', () => {
      addCart(item.dataset.id!);
    });
  })
}

const addCart = (id: string) : void => {
  cart = getData(keyList.cart, []);

  const product = products.find((item: IProduct) => item.id === id);
  const productCart = cart.find((item: ICart) => item.id === id);
  if (!productCart) {
    const newProductCart = { ...product, quantity: 1 };
    cart.push(newProductCart);
  } else {
    cart[cart.indexOf(productCart)].quantity += 1;
  }
  setData(keyList.cart, cart)
  renderCartNumberOfListProduct();
}
