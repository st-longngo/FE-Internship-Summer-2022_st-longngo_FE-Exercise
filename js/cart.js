var products = getData(keyList.products, []);
var storePage = document.getElementById('store-page');
var cartLists = document.getElementById('cart-list');
var orderLists = document.getElementById('order-list');
var total = document.getElementById('total');

window.addEventListener('DOMContentLoaded', function(e) {
  updateListCart();
});

function renderListCart() {
  if(cart.length > 0) {
    cartLists.innerHTML = cart.map(function(item){
      return "<li class='cart'>" +
        "<div class='cart-body'>" +
          "<div class='cart-image'>" +
            "<img src=" + item.image + " alt='" + item.name + "'/>" +
          "</div>" +
          "<div class='cart-content'>" +
            "<h4 class='typo-2 txt-light cart-name'>" + item.name + "</h4>" +
            "<span class='txt-regular cart-price'>$" + formatFixed(item.price - (item.price * item.discount / 100)) + "</span>" +
            (item.discount ? "<span class='txt-regular cart-discount'>$" + item.price + "</span>": "") +
          "</div>" +
        "</div>" +
        "<div class='cart-buttons' data-id=" + item.id + ">" +
          "<button class='cart-btn' id='minus'>" +
            "<i class='bx bx-minus'></i>" +
          "</button>" +
          "<input type='text' class='cart-quantity' value=" + item.quantity + ">" +
         " <button class='cart-btn' id='add'>" +
            "<i class='bx bx-plus'></i>" +
          "</button>" +
        "</div>" +
        "<p class='txt-center cart-total'>$" +
        formatFixed((item.price - (item.price * item.discount / 100)) * item.quantity) +
        "</p>" +
        "<button id='cart-close' class='cart-btn cart-close' data-id=" + item.id + ">" +
          "<i class='bx bx-x'></i>" +
        "</button>" +
      "</li>" 
    }).join(' ');
    orderLists.innerHTML = cart.map(function(item){
      return "<li class='order-item'>" +
        "<h4 class='txt-light order-name'>" + item.name + "</h4>" +
        "<div class='txt-bold order-quantity'>x" + item.quantity + "</div>" +
      "</li>"
    }).join(' ');
    total.innerHTML = "$" + formatFixed(cart.reduce(function(acc, item){
      return acc + ((item.price - (item.price * item.discount / 100)) * item.quantity)
    },0));
  } else {
    storePage.innerHTML = `
    <section class='section section-error'>
      <div class='container'>
        <div class='error'>
          <div class='error-image'>
            <img src='./images/error-image.png' alt='Error 404' />
          </div>
          <a href='index.html' class='btn btn-secondary'>Back home</a>
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
  var listInputQuantity = document.querySelectorAll('.cart-quantity');

  addBtns.forEach(function(item) {
    item.addEventListener('click', function(e) {
      var idCart = item.parentElement.dataset.id;
      changeQuantityOfCart('add', idCart);
    })
  })
  minusBtns.forEach(function(item) {
    item.addEventListener('click', function(e) {
      var idCart = item.parentElement.dataset.id;
      changeQuantityOfCart('minus', idCart);
    })
  })
  closeBtns.forEach(function(item) {
    item.addEventListener('click', function(e) {
      deleteCartOfProductList(item.getAttribute('data-id'));
    })
  })
  listInputQuantity.forEach(function(item) {
    item.onkeypress = function(e) {
      return (e.charCode == 8 || e.charCode == 0 || e.charCode == 13) ? null : e.charCode >= 48 && e.charCode <= 57;
    }
    item.addEventListener('change', function(e) {
      var idCart = item.parentElement.dataset.id;
      changeQuantityOfCart('change', idCart, Number(e.target.value));
    })
  })
}

function changeQuantityOfCart(action, id, value = undefined) {
  cart = getData(keyList.cart, []);
  var productCart = cart.find(function(item) {
    return item.id === id;
  });
  var cartIndex = cart.indexOf(productCart);
  switch (action) {
    case 'add':
      cart[cartIndex].quantity += 1;
      break;
    case 'minus':
      if(productCart.quantity - 1 > 0) {
        cart[cartIndex].quantity -= 1;
      } else {
        cart = cart.filter(function(item){
          return item.id !== id;
        });
      }
      break;
    case 'change':
      if(value) cart[cartIndex].quantity = value;
      else {
        cart = cart.filter(function(item){
          return item.id !== id;
        });
      }
      break;
    default:
      break;
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

