const productLists = document.querySelectorAll(".product-list");
const products = JSON.parse(localStorage.getItem("products"));

function renderProduct() {
  const listProduct = products
    .map((item) => {
      return `
        <li class="col-3 col-sm-6">
            <div class="product ${item.discont ? `product-sale` : ``}">
                <div class="product-thumnail">
                ${item.discount ? `<span class="badge badge-primary product-badge">-${item.discount}%</span>` : ''} 
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
                    ${item.discount ? 
                      `<span>$${item.price * (100 - item.discount) / 100}</span>
                      <span class="product-discount">$${item.price}</span>` : 
                      `<span>$${item.price}</span>`}
                </div>
                </div>
            </div>
        </li>`;
    })
    .join("");
  productLists.forEach((productList) => (productList.innerHTML = listProduct));
}

renderProduct();

