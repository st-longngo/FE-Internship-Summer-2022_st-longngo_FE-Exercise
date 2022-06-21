const cartNumber = document.getElementById("cart-number") as HTMLElement;
export const keyList = getData('keys', {});
let cart = getData(keyList.cart, []);
export const products = getData(keyList.products, []);

export function getData(key : string, value : any) : any{
  const data : any = JSON.parse(localStorage.getItem(key)!);
  if(data) {
    return data;
  }
  return value; 
}

export function setData(key: string, value: any) : void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function renderCartNumberOfListProduct() : void {
  cart = getData(keyList.cart, []);
  var quantityProduct = cart.reduce((acc : any, item : any) => (acc + item.quantity ,0));
  if (quantityProduct) {
    cartNumber.classList.add("cart-active");
    cartNumber.innerHTML = quantityProduct;
  } else {
    cartNumber.classList.remove("cart-active");
    cartNumber.innerHTML = "";
  }
}

export function formatFixed(value : number) {
  var number = 2;
  return value.toFixed(number);
}





