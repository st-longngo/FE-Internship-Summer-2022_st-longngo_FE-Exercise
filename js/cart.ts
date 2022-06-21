import { getData, setData, keyList, formatFixed, renderCartNumberOfListProduct } from './common.js';
import { ICart } from './interface.js';
let cart = getData(keyList.cart, []);
const cartLists = document.getElementById('cart-list') as HTMLElement;
const orderLists = document.getElementById('order-list') as HTMLElement;
const total = document.getElementById('total') as HTMLElement;

window.addEventListener('DOMContentLoaded', () => {
  updateListCart();
});

const renderListCart = () : void => {
  cart = getData(keyList.cart, []);
  if(cart.length > 0) {
    cartLists.innerHTML = cart.map((item : ICart) => {
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
          <button class='cart-btn' id='minus'> 
            <i class='bx bx-minus'></i> 
          </button> 
          <input type='text' class='cart-quantity' value=${item.quantity}> 
          <button class='cart-btn' id='add'> 
            <i class='bx bx-plus'></i> 
          </button> 
        </div> 
        <p class='txt-center cart-total'>$ 
        ${formatFixed((item.price - (item.price * item.discount / 100)) * item.quantity)}
        </p> 
        <button id='cart-close' class='cart-btn cart-close' data-id=${item.id}> 
          <i class='bx bx-x'></i> 
        </button> 
      </li> `
    }).join('');
    orderLists.innerHTML = cart.map((item : ICart) => {
      return `<li class='order-item'>
        <h4 class='txt-light order-name'>${item.name}</h4>
        <div class='txt-bold order-quantity'>x${item.quantity}</div>
      </li>`
    }).join(' ');
    total.innerHTML = `$${formatFixed(cart.reduce((acc : number, item : ICart) => 
      acc + ((item.price - (item.price * item.discount / 100)) * item.quantity),0))
    }`
  } else {
    cartLists.innerHTML = `<div class='error'>
        <div class='error-image'>
          <img src='./images/error-image.png' alt='Error 404' />
        </div>
        <a href='index.html' class='btn btn-secondary'>Back home</a>
      </div>`;
    orderLists.innerHTML = `<li><p>Không có sản phẩm trong giỏ hàng</p></li>`;
    total.innerHTML = '$0';
  }
}

const updateListCart = () : void => {
  renderCartNumberOfListProduct();
  renderListCart();
  addEventChangeOfCart();
}

const addEventChangeOfCart = () : void => {
  const addBtns = document.querySelectorAll('#add') as NodeListOf<HTMLElement>;
  const minusBtns = document.querySelectorAll('#minus') as NodeListOf<HTMLElement>;
  const closeBtns = document.querySelectorAll('#cart-close')  as NodeListOf<HTMLElement>;
  const listInputQuantity = document.querySelectorAll('.cart-quantity') as NodeListOf<HTMLElement>;

  addBtns.forEach((item : HTMLElement) => {
    item.addEventListener('click', () => {
      var idCart = item.parentElement.dataset.id;
      changeQuantityOfCart('add', idCart);
    })
  })
  minusBtns.forEach((item : HTMLElement) => {
    item.addEventListener('click', () => {
      var idCart = item.parentElement.dataset.id;
      changeQuantityOfCart('minus', idCart);
    })
  })
  closeBtns.forEach((item: HTMLElement) => {
    item.addEventListener('click', () => {
      deleteCartOfProductList(item.dataset.id);
    })
  })
  listInputQuantity.forEach((item: HTMLElement) => {
    // item.addEventListener('keypress', (e : any) => {
    //   return (e.charCode == 8 || e.charCode == 0 || e.charCode == 13) ? null : e.charCode >= 48 && e.charCode <= 57;
    // }
    item.addEventListener('change', (e : any) => {
      const idCart = item.parentElement.dataset.id;
      changeQuantityOfCart('change', idCart, e.target.value);
    })
  })
}

const changeQuantityOfCart = (action : string, id: string, value : any = null) : void => {
  cart = getData(keyList.cart, []);
  const productCart = cart.find((item : ICart) => item.id === id);
  const cartIndex = cart.indexOf(productCart);
  switch (action) {
    case 'add':
      cart[cartIndex].quantity += 1;
      break;
    case 'minus':
      if(productCart.quantity - 1 > 0) {
        cart[cartIndex].quantity -= 1;
      } else {
        cart = cart.filter((item: ICart) => item.id !== id);
      }
      break;
    case 'change':
      if(value) cart[cartIndex].quantity = value;
      else {
        cart = cart.filter((item : ICart) => item.id !== id);
      }
      break;
    default:
      break;
  }
  setData(keyList.cart, cart);
  updateListCart();
}

const deleteCartOfProductList = (id : string) : void => {
  cart = getData(keyList.cart, []);
  const newCart = cart.filter((item : ICart) => item.id !== id);
  setData(keyList.cart, newCart);
  updateListCart();
}

