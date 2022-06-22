const control = document.querySelector('.extra-control') as HTMLElement;
const menu = document.querySelector('.nav') as HTMLElement;
const header = document.getElementById('header') as HTMLElement;

window.onscroll = () => {
  if (window.scrollY > header.offsetTop + 90) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
};

const handleClick = () : void => {
  menu.classList.toggle('nav-active');
  control.classList.toggle('extra-active');
}

control.addEventListener('click', handleClick);

