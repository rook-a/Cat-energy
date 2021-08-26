const rangeInput = document.querySelector('.slider__input-range');
const dragger = document.querySelector('.slider__dragger');
const imgBefore = document.querySelector('.sample__img--before');
const imgAfter  = document.querySelector('.sample__img--after');
const btnPrev   = document.getElementById('btnPrev');
const btnNext   = document.getElementById('btnNext');

btnPrev.addEventListener('click', function() {
  dragger.style.left = 0 + '%';

  imgBefore.style.width = 0 + '%';
  imgAfter.style.width = 100 + '%';
});

btnNext.addEventListener('click', function() {
  dragger.style.left = 100 + '%';

  imgBefore.style.width = 100 + '%';
  imgAfter.style.width = 0 + '%';
});

function size() {
  dragger.style.left = rangeInput.value + '%';

  imgBefore.style.width = rangeInput.value + '%';
  imgAfter.style.width = 100 - this.value + '%';
};

rangeInput.addEventListener('input', size);
