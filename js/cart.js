const products = JSON.parse(localStorage.getItem("products"));
let cart = JSON.parse(localStorage.getItem('cart'));
const storePage = document.getElementById('store-page');
const cartNumber = document.getElementById("cart-number");

function renderCartNumber() {
  const quantityProduct = cart.reduce((acc, item) => acc + item.quantity, 0);
  if (quantityProduct !== 0) {
    cartNumber.classList.add("cart-active");
    cartNumber.innerHTML = quantityProduct;
  } else {
    cartNumber.classList.remove("cart-active");
    cartNumber.innerHTML = "";
  }
}

function renderCart() {
  if(cart.length > 0) {
    storePage.innerHTML = `
    <section class="section section-store">
      <div class="container">
        <div class="row store-inner">
          <div class="col-8 col-sm-12">
            <h3 class="txt-bold txt-center cart-title">Shopping Cart</h3>
            <ul class="cart-list" id="cart-list">
              <div class="cart-row">
                <span class="txt-bold cart-body">PRODUCT</span>
                <span class="txt-bold cart-buttons">QUANTITY</span>
                <span class="txt-center txt-bold cart-total">TOTAL</span>
                <span class="cart-close"></span>
              </div>
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
                    <span class="txt-regular cart-price">$${(item.price - (item.price * item.discount / 100)).toFixed(2)}</span>
                  </div>
                </div>
                <div class="cart-buttons">
                  <button class="cart-btn" onclick={minusCart(${item.id})}>
                    <i class="bx bx-minus"></i>
                  </button>
                  <div class="cart-quantity">${item.quantity}</div>
                  <button class="cart-btn" onclick={addCart(${item.id})}>
                    <i class="bx bx-plus"></i>
                  </button>
                </div>
                <p class="txt-center cart-total">
                $${((item.price - (item.price * item.discount / 100)) * item.quantity).toFixed(2)}
                </p>
                <button id="cart-close" class="cart-btn cart-close" onclick={deleteCart(${item.id})}>
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
                ${cart.reduce((acc, item) => acc + ((item.price - (item.price * item.discount / 100)) * item.quantity), 0).toFixed(2)}
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
    </section>`;
  }
}

function updateCart() {
  cart = JSON.parse(localStorage.getItem('cart'));
  renderCartNumber();
  renderCart();
}

updateCart();
function addCart(id) {
  const product = products.find((x) => x.id === id);
  const productCart = cart.find((x) => x.id === id);
  if(!productCart) {
    const newProduct = {...product, quantity: 1};
    cart.push(newProduct);
  } else {
    cart[cart.indexOf(productCart)].quantity += 1;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

function minusCart(id) {
  const productCart = cart.find((x) => x.id === id);
  if(productCart.quantity - 1 > 0) {
    cart[cart.indexOf(productCart)].quantity -= 1;
  } else {
    cart = cart.filter((item) => item.id !== id);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

function deleteCart(id) {
  const newCart = cart.filter((item) => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(newCart));
  updateCart();
}

