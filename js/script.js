"use strict"

// ------------- preloader -------------
document.addEventListener("DOMContentLoaded", function () {
  var preloader = document.getElementById("preloader")
  setTimeout(function () {
    preloader.style.opacity = "0"
  }, 1000)
  preloader.addEventListener("transitionend", function () {
    preloader.style.display = "none"
  })
})
// ------------- END OF preloader -------------

// ------------- shrinking header on scroll -------------
// Get the header element
const headerElement = document.querySelector(".header")

// Define the callback function for the IntersectionObserver
const callback = function (entries, observer) {
  if (entries[0].isIntersecting) {
    headerElement.classList.remove("header--scrolled")
  } else {
    headerElement.classList.add("header--scrolled")
  }
}

// Create an IntersectionObserver instance with the callback function
const headerObserver = new IntersectionObserver(callback)

// Add error handling in case the header element is not found
if (headerElement) {
  // Observe the header element for changes
  headerObserver.observe(headerElement)
} else {
  console.error("Header element not found.")
}
// ------------- END OF shrinking header on scroll -------------

// ------------- search form -------------
document.addEventListener("DOMContentLoaded", function () {
  const searchIcon = document.querySelector(".search-form__icon")
  const searchForm = document.querySelector(".search-form")

  searchIcon.addEventListener("click", function () {
    searchForm.classList.toggle("_active")
  })

  document.addEventListener("click", function (e) {
    if (
      !e.target.closest(".search-form") &&
      searchForm.classList.contains("_active")
    ) {
      searchForm.classList.remove("_active")
    }
  })
})
// ------------- END OF search form -------------

// ------------- hamburger menu -------------
const iconMenu = document.querySelector(".icon-menu")
const menuBody = document.querySelector(".menu__body")
const menuLinks = document.querySelectorAll(".menu__link")
const menuSublinks = document.querySelectorAll(".menu__sublink")

if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    toggleMenu()
  })

  //event handlers for menu items
  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (iconMenu.classList.contains("_active")) {
        toggleMenu()
      }
    })
  })

  //event handlers for menu subitems
  menuSublinks.forEach((sublink) => {
    sublink.addEventListener("click", function (e) {
      if (iconMenu.classList.contains("_active")) {
        toggleMenu()
      }
    })
  })

  // toggle menu function
  function toggleMenu() {
    document.body.classList.toggle("body--lock")
    iconMenu.classList.toggle("_active")
    menuBody.classList.toggle("_active")
  }

  // close hamburger menu on device rotating
  window.addEventListener("orientationchange", function () {
    if (document.body.classList.contains("body--lock")) {
      document.body.classList.remove("body--lock")
    }
    if (iconMenu.classList.contains("_active")) {
      iconMenu.classList.remove("_active")
    }
    if (menuBody.classList.contains("_active")) {
      menuBody.classList.remove("_active")
    }
  })
}
// ------------- END OF hamburger menu -------------

// ------------- sliders -------------
window.addEventListener("load", function () {
  // slider-hero
  if (document.querySelector(".slider-hero__body")) {
    new Swiper(".slider-hero__body", {
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 32,
      loop: true,
      loopedSlides: 2,
      speed: 500,
      // effect: "fade",
      // autoplay: {
      //   delay: 3000,
      // },

      pagination: {
        el: ".controls-hero__pagination",
        // type: "bullets",
        // clickable: true,
      },

      // Navigation arrows
      navigation: {
        nextEl: ".controls-hero__arrow-next",
        prevEl: ".controls-hero__arrow-prev",
      },
    })
  }

  // slider-inspirations
  if (document.querySelector(".inspirations__slider")) {
    const swiper = new Swiper(".inspirations__slider", {
      slidesPerView: "auto",
      // slidesPerView: 1,
      speed: 500,
      spaceBetween: 24,
      loop: true,
      // loopedSlides: 2,
      // loopAdditionalSlides: 5,
      parallax: true,

      // If we need pagination
      pagination: {
        el: ".inspirations__pagination",
      },

      // Navigation arrows
      navigation: {
        nextEl: ".inspirations__arrow-next",
        prevEl: ".inspirations__arrow-prev",
      },
    })
  }

  // slider-tips
  if (document.querySelector(".slider-tips__body")) {
    new Swiper(".slider-tips__body", {
      // observeParents: true,
      // observer: true,
      // slidesPerView: "auto",
      // slidesPerView: 3,
      // centeredSlides: true,
      // spaceBetween: 32,
      loop: true,
      loopedSlides: 2,
      speed: 500,
      // effect: "fade",
      // autoplay: {
      //   delay: 3000,
      // },
      breakpoints: {
        // when window width is >=
        992: {
          slidesPerView: 3,
          spaceBetween: 32,
          centeredSlides: true,
        },
        // when window width is >=
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        // when window width is >=
        480: {
          slidesPerView: 1.05,
          spaceBetween: 15,
        },
        // when window width is >=
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
      },

      pagination: {
        el: ".slider-tips__pagination",
        // type: "bullets",
        // clickable: true,
      },

      // Navigation arrows (обращаемся через родителя .slider-hero)
      navigation: {
        nextEl: ".slider-tips__arrow-next",
        prevEl: ".slider-tips__arrow-prev",
      },
    })
  }
})
// ------------- END OF sliders -------------

// ------------- 2-levels menu  (menu + submenu) -------------
document.addEventListener("DOMContentLoaded", () => {
  const menuBtns = document.querySelectorAll(".menu__btn")
  const drops = document.querySelectorAll(".menu__sublist")

  menuBtns.forEach((el) => {
    el.addEventListener("click", (e) => {
      let currentBtn = e.currentTarget
      let drop = currentBtn
        .closest(".menu__item")
        .querySelector(".menu__sublist")

      menuBtns.forEach((el) => {
        if (el !== currentBtn) {
          el.classList.remove("menu__btn--active")
        }
      })

      drops.forEach((el) => {
        if (el !== drop) {
          el.classList.remove("menu__sublist--active")
        }
      })

      drop.classList.toggle("menu__sublist--active")
      currentBtn.classList.toggle("menu__btn--active")
    })
  })

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".menu")) {
      menuBtns.forEach((el) => {
        el.classList.remove("menu__btn--active")
      })

      drops.forEach((el) => {
        el.classList.remove("menu__sublist--active")
      })
    }
  })
})
// ------------- END OF 2-levels menu  (menu + submenu) -------------

// ------------- spoilers -------------
const spoilersArray = document.querySelectorAll("[data-spoilers]")
if (spoilersArray.length > 0) {
  const spoilersRegular = Array.from(spoilersArray).filter(function (
    item,
    index,
    self
  ) {
    return !item.dataset.spoilers.split(",")[0]
  })

  if (spoilersRegular.length > 0) {
    initSpoilers(spoilersRegular)
  }

  const spoilersMedia = Array.from(spoilersArray).filter(function (
    item,
    index,
    self
  ) {
    return item.dataset.spoilers.split(",")[0]
  })

  if (spoilersMedia.length > 0) {
    const breakpointsArray = []
    spoilersMedia.forEach((item) => {
      const params = item.dataset.spoilers
      const breakpoint = {}
      const paramsArray = params.split(",")
      breakpoint.value = paramsArray[0]
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max"
      breakpoint.item = item
      breakpointsArray.push(breakpoint)
    })

    let mediaQueries = breakpointsArray.map(function (item) {
      return (
        "(" +
        item.type +
        "-width: " +
        item.value +
        "px)," +
        item.value +
        "," +
        item.type
      )
    })
    mediaQueries = mediaQueries.filter(function (item, index, self) {
      return self.indexOf(item) === index
    })

    mediaQueries.forEach((breakpoint) => {
      const paramsArray = breakpoint.split(",")
      const mediaBreakpoint = paramsArray[1]
      const mediaType = paramsArray[2]
      const matchMedia = window.matchMedia(paramsArray[0])

      const spoilersArray = breakpointsArray.filter(function (item) {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true
        }
      })

      matchMedia.addListener(function () {
        initSpoilers(spoilersArray, matchMedia)
      })
      initSpoilers(spoilersArray, matchMedia)
    })
  }

  function initSpoilers(spoilersArray, matchMedia = false) {
    spoilersArray.forEach((spoilersBlock) => {
      spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock
      if (matchMedia.matches || !matchMedia) {
        spoilersBlock.classList.add("_init")
        initSpoilerBody(spoilersBlock)
        spoilersBlock.addEventListener("click", setSpoilerAction)
      } else {
        spoilersBlock.classList.remove("_init")
        initSpoilerBody(spoilersBlock, false)
        spoilersBlock.removeEventListener("click", setSpoilerAction)
      }
    })
  }

  function initSpoilerBody(spoilersBlock, hideSpoilerBody = true) {
    const spoilerTitles = spoilersBlock.querySelectorAll("[data-spoiler]")
    if (spoilerTitles.length > 0) {
      spoilerTitles.forEach((spoilerTitle) => {
        if (hideSpoilerBody) {
          spoilerTitle.removeAttribute("tabindex")
          if (!spoilerTitle.classList.contains("_active")) {
            spoilerTitle.nextElementSibling.hidden = true
          }
        } else {
          spoilerTitle.setAttribute("tabindex", "-1")
          spoilerTitle.nextElementSibling.hidden = false
        }
      })
    }
  }
  function setSpoilerAction(e) {
    const el = e.target
    if (el.hasAttribute("data-spoiler") || el.closest("[data-spoiler]")) {
      const spoilerTitle = el.hasAttribute("data-spoiler")
        ? el
        : el.closest("[data-spoiler]")
      const spoilersBlock = spoilerTitle.closest("[data-spoilers]")
      const oneSpoiler = spoilersBlock.hasAttribute("data-one-spoiler")
        ? true
        : false
      if (!spoilersBlock.querySelectorAll("._slide").length) {
        if (oneSpoiler && !spoilerTitle.classList.contains("_active")) {
          hideSpoilersBody(spoilersBlock)
        }
        spoilerTitle.classList.toggle("_active")
        _slideToggle(spoilerTitle.nextElementSibling, 300)
      }
      e.preventDefault()
    }
  }
  function hideSpoilersBody(spoilersBlock) {
    const spoilerActiveTitle = spoilersBlock.querySelector(
      "[data-spoiler]._active"
    )
    if (spoilerActiveTitle) {
      spoilerActiveTitle.classList.remove("_active")
      _slideUp(spoilerActiveTitle.nextElementSibling, 300)
    }
  }
}
//SlideToggle
let _slideUp = (target, duration = 300) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide")
    target.style.transitionProperty = "height, margin, padding"
    target.style.transitionDuration = duration + "ms"
    target.style.height = target.offsetHeight + "px"
    target.offsetHeight
    target.style.overflow = "hidden"
    target.style.height = 0
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    window.setTimeout(() => {
      target.hidden = true
      target.style.removeProperty("height")
      target.style.removeProperty("padding-top")
      target.style.removeProperty("padding-bottom")
      target.style.removeProperty("margin-top")
      target.style.removeProperty("margin-bottom")
      target.style.removeProperty("overflow")
      target.style.removeProperty("transition-duration")
      target.style.removeProperty("transition-property")
      target.classList.remove("_slide")
    }, duration)
  }
}
let _slideDown = (target, duration = 300) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide")
    if (target.hidden) {
      target.hidden = false
    }
    let height = target.offsetHeight
    target.style.overflow = "hidden"
    target.style.height = 0
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    target.offsetHeight
    target.style.transitionProperty = "height, margin, padding"
    target.style.transitionDuration = duration + "ms"
    target.style.height = height + "px"
    target.style.removeProperty("padding-top")
    target.style.removeProperty("padding-bottom")
    target.style.removeProperty("margin-top")
    target.style.removeProperty("margin-bottom")
    window.setTimeout(() => {
      target.style.removeProperty("height")
      target.style.removeProperty("overflow")
      target.style.removeProperty("transition-duration")
      target.style.removeProperty("transition-property")
      target.classList.remove("_slide")
    }, duration)
  }
}
let _slideToggle = (target, duration = 300) => {
  if (target.hidden) {
    return _slideDown(target, duration)
  } else {
    return _slideUp(target, duration)
  }
}
// ------------- END OF spoilers -------------
