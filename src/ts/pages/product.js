// @ts-nocheck
import { addToCart } from '../utils/addToCart';
const swiperElement = document.querySelector(
  'swiper-container',
);
const swiperParams = {
  on: {
    init() {
      const numberOfSlides =
        swiperElement.swiper.slides.length;

      const rightBtn =
        document.querySelector('.swipe-right');
      const leftBtn = document.querySelector('.swipe-left');

      rightBtn.addEventListener('click', () => {
        const currentSlide =
          swiperElement.swiper.activeIndex + 1;
        if (currentSlide >= numberOfSlides) {
          swiperElement.swiper.slideTo(0);
        } else {
          swiperElement.swiper.slideTo(currentSlide + 1);
        }
      });

      leftBtn.addEventListener('click', () => {
        const currentSlide =
          swiperElement.swiper.activeIndex;
        if (currentSlide <= 0) {
          swiperElement.swiper.slideTo(numberOfSlides - 1);
        } else {
          swiperElement.swiper.slideTo(currentSlide - 1);
        }
      });
    },
  },
};

Object.assign(swiperElement, swiperParams);
swiperElement.initialize();

const productForm = document.querySelector('#product-form');

productForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.querySelector(
    '#product-form input[name="id"]',
  ).value;

  await addToCart(id);
});
