var cartNumber = document.getElementById("cart-number");
var keyList = getData('keys', {});
var cart = getData(keyList.cart, []);

function getData(key, value) {
  var data = JSON.parse(localStorage.getItem(key));
  if(data) {
    return data;
  }
  return value; 
}

function setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function renderCartNumberOfListProduct() {
  cart = getData(keyList.cart);
  var quantityProduct = cart.reduce(function(acc, item){
    return acc + item.quantity;
  },0);
  if (quantityProduct) {
    cartNumber.classList.add("cart-active");
    cartNumber.innerHTML = quantityProduct;
  } else {
    cartNumber.classList.remove("cart-active");
    cartNumber.innerHTML = "";
  }
}

function formatFixed(value) {
  var number = 2;
  return value.toFixed(number);
}



