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



////////////////////////////////

const clipbox = document.querySelector('.sample__slider');
const range   = document.querySelector('.slider__range');
const dragger = document.querySelector('.slider__dragger');
// onClick
const imgBefore = document.querySelector('.sample__img--before');
const imgAfter  = document.querySelector('.sample__img--after');
const imgActive = document.querySelector('.sample__img--active');
const btnPrev   = document.getElementById('btnPrev');
const btnNext   = document.getElementById('btnNext');

btnPrev.addEventListener('click', function() {
  if (imgAfter.classList.contains('sample__img--active')) {
    imgAfter.classList.remove('sample__img--active');
    imgBefore.classList.add('sample__img--active');
  }

  btnNext.classList.remove('sample__btn--next');
  btnPrev.classList.add('sample__btn--prev');
});

btnNext.addEventListener('click', function() {
  if (imgBefore.classList.contains('sample__img--active')) {
    imgBefore.classList.remove('sample__img--active');
    imgAfter.classList.add('sample__img--active');
  }

  btnPrev.classList.remove('sample__btn--prev');
  btnNext.classList.add('sample__btn--next');
});

//---------------------------------
let drag = false;

const draggerWidth = range.getBoundingClientRect().width;

const clipboxDimensions = {
  width: clipbox.getBoundingClientRect().width,
  left: clipbox.getBoundingClientRect().left
};

const handleStartDrag = () => {
  drag = true;
  range.style.pointerEvents = 'none';
  dragger.style.pointerEvents = 'none';
};

const handleStopDrag = () => {
  drag = false;
  range.style.pointerEvents = 'auto';
  dragger.style.pointerEvents = 'auto';
  // clipbox.style.cursor = 'auto';
};

const handleImgReveal = e => {
  e.preventDefault();
  e.offsetX = e.offsetX || e.targetTouches[0].pageX - clipboxDimensions.left;
  if(drag && e.offsetX < clipboxDimensions.width && e.offsetX > 0) {
    // clipbox.style.cursor = 'grab';
    range.style.left = e.offsetX - draggerWidth / 2 + 'px';
    imgBefore.style.width = e.offsetX + 'px';
    // imgAfter.style.width = e.offsetX + 'px';
    dragger.style.left = e.offsetX + (draggerWidth / 100 - 17) + 'px';
  }
};

range.addEventListener('mousedown', handleStartDrag);
range.addEventListener('touchstart', handleStartDrag);

clipbox.addEventListener('mouseup', handleStopDrag);
clipbox.addEventListener('touchend', handleStopDrag);

clipbox.addEventListener('mousemove', handleImgReveal);
clipbox.addEventListener('touchmove', handleImgReveal);


//////////////////////////////////////////


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
