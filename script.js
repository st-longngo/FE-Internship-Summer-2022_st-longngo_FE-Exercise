const control = document.querySelector(".extra-control"),
  menu = document.querySelector(".nav");

control.addEventListener("click", handleClick);

function handleClick() {
  menu.classList.toggle("nav-active");
  control.classList.toggle("extra-active");
}
