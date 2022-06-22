const control = document.querySelector('.extra-control');
const menu = document.querySelector('.nav');
const header = document.getElementById('header');
window.onscroll = () => {
    if (window.scrollY > header.offsetTop + 90) {
        header.classList.add('sticky');
    }
    else {
        header.classList.remove('sticky');
    }
};
const handleClick = () => {
    menu.classList.toggle('nav-active');
    control.classList.toggle('extra-active');
};
control.addEventListener('click', handleClick);
