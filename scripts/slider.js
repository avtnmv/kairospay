let swiper = new Swiper('.mySwiper', {
    slidesPerView: 6,  // Добавляем отображение двух слайдов
    spaceBetween: 10,  // Задаем расстояние между слайдами
    navigation: {
        nextEl: '.custom-next',
        prevEl: '.custom-prev',
    },
    pagination: {
        el: '.custom-swiper-pagination',
        type: 'progressbar',
    },
    breakpoints: {
      320: {
          slidesPerView: 2, // 2 слайда на мобильных
          spaceBetween: 5
      },
      420:{
          slidesPerView: 2, // 2 слайда на экранах до 576px
          spaceBetween: 10
      },
      576: {
          slidesPerView: 3, // 2 слайда на экранах до 576px
          spaceBetween: 15
      },
      768: {
          slidesPerView: 3, // 3 слайда на экранах до 768px
          spaceBetween: 15
      },
      950: {
          slidesPerView: 5, // 4 слайда на экранах до 950px
          spaceBetween: 20
      }
  },
    on: {
        init: function() {
            updateNavButtons(this);
        },
        slideChange: function() {
            updateNavButtons(this);
        }
    }
  });
  
  function updateNavButtons(swiper) {
    const prevButton = document.querySelector('.custom-prev');
    const nextButton = document.querySelector('.custom-next');
  
    if (swiper.isBeginning) {
        prevButton.classList.add('inactive');
    } else {
        prevButton.classList.remove('inactive');
    }
  
    if (swiper.isEnd) {
        nextButton.classList.add('inactive');
    } else {
        nextButton.classList.remove('inactive');
    }
  }
  