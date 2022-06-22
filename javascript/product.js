import { getData, renderCartNumberOfListProduct, products, formatFixed, setData } from './common.js';
import { LS_KEYS } from './interface.js';
const productLists = document.querySelectorAll('.js-product-list');
window.addEventListener('DOMContentLoaded', (e) => {
    renderCartNumberOfListProduct();
    renderProduct();
    addEventToProduct();
});
const renderProduct = () => {
    const listProduct = products.map((item) => {
        return `<li class='col-3 col-sm-6'>
      <div class='product ${item.discount ? `product-sale` : ``}'>
        <div class='product-thumnail'>
          ${item.discount ? `<span class='badge badge-primary product-badge'>-${item.discount}%</span>` : ''} 
          <a href='#' class='product-link'>
              <img src=${item.image} alt=${item.name} class='product-image' />
          </a>
          <div class='product-cart'>
              <button class='btn btn-secondary btn-cart js-add-product' data-id=${item.id}>add to cart</button>
          </div>
        </div>
        <div class='product-content'>
          <h4 class='product-name'>
              <a href='#' class='typo-2 txt-light'>${item.name}</a>
          </h4>
          <div class='product-price'>
              ${item.discount ? `<span>$${formatFixed((item.price - (item.price * item.discount) / 100))}</span>
                <span class='product-discount'>$${item.price}</span>` : `<span>$${item.price}</span>`}
          </div>
        </div>
      </div>
    </li>`;
        ;
    }).join(' ');
    productLists.forEach((productList) => {
        productList.innerHTML = listProduct;
    });
};
const addEventToProduct = () => {
    const cartBtns = document.querySelectorAll('.js-add-product');
    cartBtns.forEach((item) => {
        item.addEventListener('click', () => {
            addCart(item.dataset.id);
        });
    });
};
const addCart = (id) => {
    let cart = getData(LS_KEYS.CART, []);
    const product = products.find((item) => item.id === id);
    const productCart = cart.find((item) => item.id === id);
    if (!productCart) {
        const newProductCart = Object.assign(Object.assign({}, product), { quantity: 1 });
        cart.push(newProductCart);
    }
    else {
        cart[cart.indexOf(productCart)].quantity += 1;
    }
    setData(LS_KEYS.CART, cart);
    renderCartNumberOfListProduct();
};
