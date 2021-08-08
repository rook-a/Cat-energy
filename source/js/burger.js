const nav = document.querySelector('.nav');
const navBtn = document.querySelector('.nav__button');

nav.classList.remove('nav--nojs');

navBtn.addEventListener('click', function() {
  if (nav.classList.contains('nav--close')) {
    nav.classList.remove('nav--close');
    nav.classList.add('nav--active');
  } else {
    nav.classList.add('nav--close');
    nav.classList.remove('nav--active');
  }
});
