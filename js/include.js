var cartNumber = document.getElementById("cart-number");

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



