var control = document.querySelector('.extra-control');
var menu = document.querySelector('.nav');
var header = document.getElementById('header');
window.onscroll = function () {
    if (window.scrollY > header.offsetTop) {
        header.classList.add('sticky');
    }
    else {
        header.classList.remove('sticky');
    }
};
var handleClick = function () {
    menu.classList.toggle('nav-active');
    control.classList.toggle('extra-active');
};
control.addEventListener('click', handleClick);
