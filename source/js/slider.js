const imgBefore = document.querySelector('.sample__img--before');
      const imgAfter = document.querySelector('.sample__img--after');
      const imgActive = document.querySelector('.sample__img--active');
      const btnPrev = document.getElementById('btnPrev');
      const btnNext = document.getElementById('btnNext');

      btnPrev.addEventListener('click', function() {
        if (imgAfter.classList.contains('sample__img--active')) {
          imgAfter.classList.remove('sample__img--active');
          imgBefore.classList.add('sample__img--active');
        }
      });

      btnNext.addEventListener('click', function() {
        if (imgBefore.classList.contains('sample__img--active')) {
          imgBefore.classList.remove('sample__img--active');
          imgAfter.classList.add('sample__img--active');
        }
      });
