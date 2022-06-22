import { getData, setData, formatFixed, renderCartNumberOfListProduct } from './common.js';
import { LS_KEYS } from './interface.js';
const cartLists = document.getElementById('js-cart-list');
const orderLists = document.getElementById('js-order-list');
const total = document.getElementById('js-total');
window.addEventListener('DOMContentLoaded', () => {
    updateListCart();
});
const renderListCart = () => {
    const cart = getData(LS_KEYS.CART, []);
    cartLists.innerHTML = `
    <li class="cart-row">
      <span class="txt-bold cart-body">PRODUCT</span>
      <span class="txt-bold cart-buttons">QUANTITY</span>
      <span class="txt-center txt-bold cart-total">TOTAL</span>
      <span class="cart-close"></span>
    </li>`;
    if (cart.length > 0) {
        cartLists.innerHTML += cart.map((item) => {
            return `<li class='cart'> 
        <div class='cart-body'> 
          <div class='cart-image'> 
            <img src= ${item.image} alt=${item.name}/> 
          </div> 
          <div class='cart-content'> 
            <h4 class='typo-2 txt-light cart-name'>${item.name}</h4> 
            <span class='txt-regular cart-price'>$${formatFixed(item.price - (item.price * item.discount / 100))}</span> 
            ${(item.discount ? `<span class='txt-regular cart-discount'>$ ${item.price}</span>` : ' ')} 
          </div> 
        </div> 
        <div class='cart-buttons' data-id=${item.id}> 
          <button class='cart-btn js-minus-cart' id='minus'> 
            <i class='bx bx-minus'></i> 
          </button> 
          <input type='text' class='cart-quantity js-input-cart' value=${item.quantity}> 
          <button class='cart-btn js-add-cart' id='add'> 
            <i class='bx bx-plus'></i> 
          </button> 
        </div> 
        <p class='txt-center cart-total'>$ 
        ${formatFixed((item.price - (item.price * item.discount / 100)) * item.quantity)}
        </p> 
        <button id='cart-close' class='cart-btn cart-close js-delete-cart' data-id=${item.id}> 
          <i class='bx bx-x'></i> 
        </button> 
      </li> `;
        }).join('');
        orderLists.innerHTML = cart.map((item) => {
            return `<li class='order-item'>
        <h4 class='txt-light order-name'>${item.name}</h4>
        <div class='txt-bold order-quantity'>x${item.quantity}</div>
      </li>`;
        }).join('');
        total.innerHTML = `$${formatFixed(cart.reduce((acc, item) => acc + ((item.price - (item.price * item.discount / 100)) * item.quantity), 0))}`;
    }
    else {
        cartLists.innerHTML +=
            `<div class='error'>
        <div class='error-image'>
          <img src='./images/error-image.png' alt='Error 404' />
        </div>
        <a href='index.html' class='btn btn-secondary'>Back home</a>
      </div>`;
        orderLists.innerHTML = `<li><p>Không có sản phẩm trong giỏ hàng</p></li>`;
        total.innerHTML = '$0';
    }
};
const updateListCart = () => {
    renderCartNumberOfListProduct();
    renderListCart();
    addEventChangeOfCart();
};
const addEventChangeOfCart = () => {
    const addBtns = document.querySelectorAll('.js-add-cart');
    const minusBtns = document.querySelectorAll('.js-minus-cart');
    const closeBtns = document.querySelectorAll('.js-delete-cart');
    const listInputQuantity = document.querySelectorAll('.js-input-cart');
    addBtns.forEach((item) => {
        item.addEventListener('click', () => {
            const idCart = item.parentElement.dataset.id;
            changeQuantityOfCart('add', idCart);
        });
    });
    minusBtns.forEach((item) => {
        item.addEventListener('click', () => {
            const idCart = item.parentElement.dataset.id;
            changeQuantityOfCart('minus', idCart);
        });
    });
    closeBtns.forEach((item) => {
        item.addEventListener('click', () => {
            deleteCartOfProductList(item.dataset.id);
        });
    });
    listInputQuantity.forEach((item) => {
        item.addEventListener('keypress', (e) => {
            return (e.charCode == 8 || e.charCode == 0 || e.charCode == 13) ? null : e.charCode >= 48 && e.charCode <= 57;
        });
        item.addEventListener('change', (e) => {
            const idCart = item.parentElement.dataset.id;
            changeQuantityOfCart('change', idCart, Number(e.target.value));
        });
    });
};
const changeQuantityOfCart = (action, id, value = null) => {
    let cart = getData(LS_KEYS.CART, []);
    const productCart = cart.find((item) => item.id === id);
    const cartIndex = cart.indexOf(productCart);
    switch (action) {
        case 'add':
            cart[cartIndex].quantity += 1;
            break;
        case 'minus':
            if (productCart.quantity - 1 > 0) {
                cart[cartIndex].quantity -= 1;
            }
            else {
                cart = cart.filter((item) => item.id !== id);
            }
            break;
        case 'change':
            if (value)
                cart[cartIndex].quantity = value;
            else {
                cart = cart.filter((item) => item.id !== id);
            }
            break;
        default:
            break;
    }
    setData(LS_KEYS.CART, cart);
    updateListCart();
};
const deleteCartOfProductList = (id) => {
    const cart = getData(LS_KEYS.CART, []);
    const newCart = cart.filter((item) => item.id !== id);
    setData(LS_KEYS.CART, newCart);
    updateListCart();
};
