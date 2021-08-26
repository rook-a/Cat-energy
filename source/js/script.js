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

//---------------------------------------

const rangeInput = document.querySelector('.slider__input-range');
const dragger = document.querySelector('.slider__dragger');
const imgBefore = document.querySelector('.sample__img--before');
const imgAfter  = document.querySelector('.sample__img--after');
const btnPrev   = document.getElementById('btnPrev');
const btnNext   = document.getElementById('btnNext');

btnPrev.addEventListener('click', function() {
  if (imgAfter.classList.contains('sample__img--active')) {
    imgAfter.classList.remove('sample__img--active');
    imgBefore.classList.add('sample__img--active');
  }

  btnNext.classList.remove('sample__btn--next');
  btnPrev.classList.add('sample__btn--prev');

  dragger.style.left = 0 + '%';

  imgBefore.style.width = 100 + '%';
  imgAfter.style.width = 0 + '%';
});

btnNext.addEventListener('click', function() {
  if (imgBefore.classList.contains('sample__img--active')) {
    imgBefore.classList.remove('sample__img--active');
    imgAfter.classList.add('sample__img--active');
  }

  btnPrev.classList.remove('sample__btn--prev');
  btnNext.classList.add('sample__btn--next');

  dragger.style.left = 100 + '%';

  imgBefore.style.width = 0 + '%';
  imgAfter.style.width = 100 + '%';
});

function size() {
  dragger.style.left = rangeInput.value + '%';

  imgBefore.style.width = rangeInput.value + '%';
  imgAfter.style.width = 100 - this.value + '%';
};

rangeInput.addEventListener('input', size);

//---------------------------------------

let map, icon;

function initMap() {
  map = new google.maps.Map(document.querySelector('.contact__map'),{
    center : { lat: 59.938635, lng: 30.323118 }
  });

  setMapCenter();

  if (window.innerWidth < 768) {
    icon = {
      url: '../img/icon/pin-mobile.png'
    };
  } else {
    icon = {
      url: '../img/icon/pin.png'
    };
  };
  let marker = new google.maps.Marker({
    position: { lat: 59.9381, lng: 30.323 },
    map: map,
    title: 'Cat Energy',
    icon: icon
  });
}
window.addEventListener('resize', setMapCenter);

function setMapCenter() {
  if (window.innerWidth < 768) {
    map.setZoom(14);
  } else if (window.innerWidth > 1280) {
    map.setCenter({ lat: 59.938, lng: 30.319 })
    map.setZoom(16);
  } else {
    map.setZoom(15);
  };
}
