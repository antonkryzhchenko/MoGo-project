// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

import Splide, { LOOP } from "@splidejs/splide";

document.addEventListener("DOMContentLoaded", () => {
  // header
  let header = document.querySelector(".header");

  document.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 1) {
      header.classList.add("header_has-bg");
    } else {
      header.classList.remove("header_has-bg");
    }
  });

  // Animation
  AOS.init();

  // Slider

  const revSliderSettings = {
    type: "loop",
    gap: "40px",
    classes: {
      arrow: "splide__arrow review-slider__arrow",
    },
    pagination: false,
    breakpoints: {
      560: {
        pagination: true,
        arrows: false,
        classes: {
          pagination: 'splide__pagination review-slider__pagination',
        },
    },
  }
}

  new Splide("#review-slider", revSliderSettings).mount();

  new Splide("#author-review", revSliderSettings).mount();


  // mobile menu

  const headerBurger = document.querySelector(".header__burger");
  const headerNav = document.querySelector(".header__nav");

    headerBurger.addEventListener("click", function (event) {
    headerBurger.classList.toggle("burger_closed");
    headerNav.classList.toggle("header__nav_opened");
  });

});

