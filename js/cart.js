const cartNumber = document.getElementById('cart-number');
// const products = JSON.parse(localStorage.getItem("products"));
const cart = JSON.parse(localStorage.getItem('cart'));
// const cart = []
// localStorage.setItem('cart', JSON.stringify(cart));
updateCart();

function updateCart() {
  renderCartNumber();
}

function addCart(id) {
  const product = products.find((x) => x.id === id);
  const searchProduct = cart.find((x) => x.id === id);
  if(!searchProduct) {
    const newProduct = {...product, quantity: 1};
    cart.push(newProduct);
  } else {
    // console.log(cart.indexOf(searchProduct));
    cart[cart.indexOf(searchProduct)].quantity += 1;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

function renderCartNumber(){
  const quantityProduct = cart.reduce((acc, item) => acc + item.quantity, 0);
  if(quantityProduct !== 0) {
    cartNumber.classList.add('cart-active');
    cartNumber.innerHTML = quantityProduct;
  } else {
    cartNumber.classList.remove('cart-active');
    cartNumber.innerHTML = '';
  }
}
