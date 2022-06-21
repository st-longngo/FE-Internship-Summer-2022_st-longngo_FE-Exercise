const control = document.querySelector(".extra-control");
const menu = document.querySelector(".nav");
const header = document.getElementById("header");

window.onscroll = function () {
  if (window.scrollY > header.offsetTop) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
};

control.addEventListener("click", handleClick);

function handleClick() {
  menu.classList.toggle("nav-active");
  control.classList.toggle("extra-active");
}
