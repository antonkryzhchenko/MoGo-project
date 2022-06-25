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
          pagination: "splide__pagination review-slider__pagination",
        },
      },
    },
  };

  new Splide("#review-slider", revSliderSettings).mount();

  new Splide("#author-review", revSliderSettings).mount();

  // Promo slider
  const promoSlides = document.querySelectorAll("[data-slide-title]");
  let slideTitles = [];

  promoSlides.forEach(function (slide) {
    slideTitles.push(slide.dataset.slideTitle);
  });

  // console.log(slideTitles);

  const promoSlider = new Splide(".promo__slider", {
    type: "loop",
    arrows: false,
    drag: false,
    autoplay: true,
    interval: 3000,
    classes: {
      pagination: "splide__pagination promo__pagination",
    },
  });

  promoSlider.on("pagination:mounted", function (data) {
    // You can add your class to the UL element
    data.list.classList.add("splide__pagination--custom");

    // `items` contains all dot items
    data.items.forEach(function (item) {
      // item.button.textContent = String( item.page + 1 );
      item.button.textContent = `${slideTitles[item.page]}`;
    });
  });

  promoSlider.mount();

  // mobile menu

  const headerBurger = document.querySelector(".header__burger");
  const headerNav = document.querySelector(".header__nav");

  headerBurger.addEventListener("click", function (event) {
    headerBurger.classList.toggle("burger_closed");
    headerNav.classList.toggle("header__nav_opened");
  });
});

// Accordion
class ItcAccordion {
  constructor(target, config) {
    this._el =
      typeof target === "string" ? document.querySelector(target) : target;
    const defaultConfig = {
      alwaysOpen: true,
      duration: 350,
    };
    this._config = Object.assign(defaultConfig, config);
    this.addEventListener();
  }
  addEventListener() {
    this._el.addEventListener("click", (e) => {
      const elHeader = e.target.closest(".accordion__header");
      if (!elHeader) {
        return;
      }
      if (!this._config.alwaysOpen) {
        const elOpenItem = this._el.querySelector(".accordion__item_show");
        if (elOpenItem) {
          elOpenItem !== elHeader.parentElement
            ? this.toggle(elOpenItem)
            : null;
        }
      }
      this.toggle(elHeader.parentElement);
    });
  }
  show(el) {
    const elBody = el.querySelector(".accordion__body");
    if (
      elBody.classList.contains("collapsing") ||
      el.classList.contains("accordion__item_show")
    ) {
      return;
    }
    elBody.style["display"] = "block";
    const height = elBody.offsetHeight;
    elBody.style["height"] = 0;
    elBody.style["overflow"] = "hidden";
    elBody.style["transition"] = `height ${this._config.duration}ms ease`;
    elBody.classList.add("collapsing");
    el.classList.add("accordion__item_slidedown");
    elBody.offsetHeight;
    elBody.style["height"] = `${height}px`;
    window.setTimeout(() => {
      elBody.classList.remove("collapsing");
      el.classList.remove("accordion__item_slidedown");
      elBody.classList.add("collapse");
      el.classList.add("accordion__item_show");
      elBody.style["display"] = "";
      elBody.style["height"] = "";
      elBody.style["transition"] = "";
      elBody.style["overflow"] = "";
    }, this._config.duration);
  }
  hide(el) {
    const elBody = el.querySelector(".accordion__body");
    if (
      elBody.classList.contains("collapsing") ||
      !el.classList.contains("accordion__item_show")
    ) {
      return;
    }
    elBody.style["height"] = `${elBody.offsetHeight}px`;
    elBody.offsetHeight;
    elBody.style["display"] = "block";
    elBody.style["height"] = 0;
    elBody.style["overflow"] = "hidden";
    elBody.style["transition"] = `height ${this._config.duration}ms ease`;
    elBody.classList.remove("collapse");
    el.classList.remove("accordion__item_show");
    elBody.classList.add("collapsing");
    window.setTimeout(() => {
      elBody.classList.remove("collapsing");
      elBody.classList.add("collapse");
      elBody.style["display"] = "";
      elBody.style["height"] = "";
      elBody.style["transition"] = "";
      elBody.style["overflow"] = "";
    }, this._config.duration);
  }
  toggle(el) {
    el.classList.contains("accordion__item_show")
      ? this.hide(el)
      : this.show(el);
  }
}