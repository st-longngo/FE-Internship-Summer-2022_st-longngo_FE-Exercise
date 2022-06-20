var products = getData(keyList.products, []);
var productLists = document.querySelectorAll('.product-list');

window.addEventListener('DOMContentLoaded', function(e) {
  renderCartNumberOfListProduct();
  renderProduct();
  addEventToProduct();
});

function renderProduct() {
  var listProduct = products.map(function(item) {
      return `
        <li class="col-3 col-sm-6">
            <div class="product ${item.discount ? `product-sale` : ``}">
              <div class="product-thumnail">
                ${item.discount ? `<span class="badge badge-primary product-badge">-${item.discount}%</span>` : ""} 
                <a href="#" class="product-link">
                    <img
                    src=${item.image}
                    alt=${item.name}
                    class="product-image"
                    />
                </a>
                <div class="product-cart">
                    <button class="btn btn-secondary btn-cart" data-id=${item.id}>add to cart</button>
                </div>
              </div>
              <div class="product-content">
                <h4 class="product-name">
                    <a href="#" class="typo-2 txt-light">
                        ${item.name}
                    </a>
                </h4>
                <div class="product-price">
                    ${
                      item.discount ? `<span>$${formatFixed((item.price - (item.price * item.discount) / 100))}</span>
                      <span class="product-discount">$${item.price}</span>` : `<span>$${item.price}</span>`
                    }
                </div>
              </div>
            </div>
        </li>`;
    })
    .join("");
  productLists.forEach(function(productList) {
    productList.innerHTML = listProduct;
  });
}

function addEventToProduct() {
  var cartBtns = document.querySelectorAll('.btn-cart');
  cartBtns.forEach(function(item) {
    item.addEventListener('click', function() {
      addCart(item.dataset.id);
    });
  })
}

function addCart(id) {
  cart = getData(keyList.cart);

  var product = products.find(function(item){
    return item.id === id;
  });
  var productCart = cart.find(function(item){
    return item.id === id;
  });
  if (!productCart) {
    var newProductCart = { ...product, quantity: 1 };
    cart.push(newProductCart);
  } else {
    cart[cart.indexOf(productCart)].quantity += 1;
  }

  setData(keyList.cart, cart.sort(function(a, b){ 
    return a.id - b.id; 
  }))
  renderCartNumberOfListProduct();
}
