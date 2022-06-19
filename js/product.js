const productLists = document.querySelectorAll(".product-list");
const products = JSON.parse(localStorage.getItem("products"));
const cart = JSON.parse(localStorage.getItem("cart"));
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

function renderProduct() {
  const listProduct = products
    .map((item) => {
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
                    <button class="btn btn-secondary btn-cart" onclick={addCart(${item.id})}>add to cart</button>
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
                      item.discount ? `<span>$${(item.price - (item.price * item.discount) / 100).toFixed(2)}</span>
                      <span class="product-discount">$${item.price}</span>` : `<span>$${item.price}</span>`
                    }
                </div>
                </div>
            </div>
        </li>`;
    })
    .join("");
  productLists.forEach((productList) => (productList.innerHTML = listProduct));
}

renderCartNumber();
renderProduct();

function addCart(id) {
  const product = products.find((x) => x.id === id);
  const productCart = cart.find((x) => x.id === id);
  if (!productCart) {
    const newProduct = { ...product, quantity: 1 };
    cart.push(newProduct);
  } else {
    // console.log(cart.indexOf(searchProduct));
    cart[cart.indexOf(productCart)].quantity += 1;
  }
  localStorage.setItem("cart", JSON.stringify(cart.sort((a, b) => a.id - b.id)));
  renderCartNumber();
}
