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
