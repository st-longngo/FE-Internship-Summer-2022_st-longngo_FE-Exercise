var products = getData(keyList.products, []);
var storePage = document.getElementById('store-page');

window.addEventListener('DOMContentLoaded', function(e) {
  updateListCart();
});

function renderListCart() {
  if(cart.length > 0) {
    storePage.innerHTML = `
    <section class="section section-store">
      <div class="container">
        <div class="row store-inner">
          <div class="col-8 col-sm-12">
            <h3 class="txt-bold txt-center cart-title">Shopping Cart</h3>
            <ul class="cart-list" id="cart-list">
              <li class="cart-row">
                <span class="txt-bold cart-body">PRODUCT</span>
                <span class="txt-bold cart-buttons">QUANTITY</span>
                <span class="txt-center txt-bold cart-total">TOTAL</span>
                <span class="cart-close"></span>
              </li>
            ${cart.map((item) => {
              return `                
              <li class="cart">
                <div class="cart-body">
                  <div class="cart-image">
                    <img
                      src="${item.image}"
                      alt="${item.name}"
                    />
                  </div>
                  <div class="cart-content">
                    <h4 class="typo-2 txt-light cart-name">
                      ${item.name}
                    </h4>
                    <span class="txt-regular cart-price">$${formatFixed(item.price - (item.price * item.discount / 100))}</span>
                    ${item.discount ? `<span class="txt-regular cart-discount">$${item.price}</span>`: ``}
                  </div>
                </div>
                <div class="cart-buttons">
                  <button class="cart-btn" data-id=${item.id} id="minus">
                    <i class="bx bx-minus"></i>
                  </button>
                  <div class="cart-quantity">${item.quantity}</div>
                  <button class="cart-btn" data-id=${item.id} id="add">
                    <i class="bx bx-plus"></i>
                  </button>
                </div>
                <p class="txt-center cart-total">
                $${formatFixed((item.price - (item.price * item.discount / 100)) * item.quantity)}
                </p>
                <button id="cart-close" class="cart-btn cart-close" data-id=${item.id}>
                  <i class="bx bx-x"></i>
                </button>
              </li>
              `
            }).join(' ')}
            </ul>
          </div>
          <div class="col-4 col-sm-12">
            <h3 class="txt-bold txt-center cart-title">Sub Total</h3>
            <ul class="order-list" id="order-list">
              ${cart.map((item) => {
                return `                
                <li class="order-item">
                  <h4 class="txt-light order-name">${item.name}</h4>
                  <div class="txt-bold order-quantity">x${item.quantity}</div>
                </li>`
              }).join('')}
            </ul>
            <div class="order-total">
              <p class="txt-bold">TOTAL PRICE</p>
              <span class="total" id="total">
                $${cart.reduce(function(acc, item){
                  return acc + ((item.price - (item.price * item.discount / 100)) * item.quantity)
                },0).toFixed(2)}
              </span>
            </div>
            <a href="#" class="btn btn-secondary order-btn">check out</a>
          </div>
        </div>
      </div>
    </section>
    `
  } else {
    storePage.innerHTML = `
    <section class="section section-error">
      <div class="container">
        <div class="error">
          <div class="error-image">
            <img src="./images/error-image.png" alt="Error 404" />
          </div>
          <a href="index.html" class="btn btn-secondary">Back home</a>
        </div>
      </div>
    </section>
    `;
  }
}

function updateListCart() {
  renderCartNumberOfListProduct();
  renderListCart();
  addEventChangeOfCart();
}

function addEventChangeOfCart() {
  var addBtns = document.querySelectorAll('#add');
  var minusBtns = document.querySelectorAll('#minus');
  var closeBtns = document.querySelectorAll('#cart-close');
  
  addBtns.forEach(function(item) {
    item.addEventListener('click', function(e) {
      changeQuantityOfCart('add', item.getAttribute('data-id'));
    })
  })
  minusBtns.forEach(function(item) {
    item.addEventListener('click', function(e) {
      changeQuantityOfCart('minus', item.getAttribute('data-id'));
    })
  })
  closeBtns.forEach(function(item) {
    item.addEventListener('click', function(e) {
      deleteCartOfProductList(item.getAttribute('data-id'));
    })
  })
}

function changeQuantityOfCart(action, id) {
  cart = getData(keyList.cart, []);
  var productCart = cart.find(function(item) {
    return item.id === id;
  });
  var cartIndex = cart.indexOf(productCart);
  if(action === 'add') {
    cart[cartIndex].quantity += 1;
  } 
  if(action === 'minus') {
    if(productCart.quantity - 1 > 0) {
      cart[cartIndex].quantity -= 1;
    } else {
      cart = cart.filter(function(item){
        return item.id !== id
      });
    }
  }
  setData(keyList.cart, cart);
  updateListCart();
}

function deleteCartOfProductList(id) {
  cart = getData(keyList.cart, []);
  var newCart = cart.filter(function(item) {
    return item.id !== id}
  );
  setData(keyList.cart, newCart);
  updateListCart();
}

