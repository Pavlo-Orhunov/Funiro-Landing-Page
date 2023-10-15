"use strict"

// Прелоадер
window.onload = function () {
  setTimeout(function () {
    var preloader = document.getElementById("preloader")
    preloader.style.opacity = "0"
    setTimeout(function () {
      preloader.style.display = "none"
    }, 1000)
  }, 1000)

  // после загрузки работаем с формой поиска
  document.addEventListener("click", documentActions)

  // делегирование события click
  function documentActions(e) {
    const targetElement = e.target
    if (targetElement.classList.contains("search-form__icon")) {
      document.querySelector(".search-form").classList.toggle("_active")
    } else if (
      !targetElement.closest(".search-form") &&
      document.querySelector(".search-form._active")
    ) {
      document.querySelector(".search-form").classList.remove("_active")
    }
  }
}

// код для подменю второго уровня
window.addEventListener("load", windowLoad)

function windowLoad() {
  // определяем "мобильность" девайса
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i)
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i)
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i)
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i)
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i)
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      )
    },
  }
  // присваиваем menu__item--clicked при нажатии на menu__arrow
  if (isMobile.any()) {
    const menuArrows = document.querySelectorAll(".menu__arrow")
    const openMenuItems = new Set()

    menuArrows.forEach((menuArrow) => {
      menuArrow.addEventListener("click", (e) => {
        e.stopPropagation()
        const clickedItem = menuArrow.parentElement
        clickedItem.classList.toggle("menu__item--clicked")
        if (openMenuItems.has(clickedItem)) {
          openMenuItems.delete(clickedItem)
        } else {
          openMenuItems.add(clickedItem)
        }
      })
    })
    // закрываем меню при клике “в другое место” (отбираем menu__item--clicked при нажатии не на стрелку и не на подменю)
    document.addEventListener("click", (e) => {
      if (openMenuItems.size > 0) {
        const isClickInside = Array.from(openMenuItems).some((openMenuItem) =>
          openMenuItem.contains(e.target)
        )
        if (!isClickInside) {
          openMenuItems.forEach((openMenuItem) =>
            openMenuItem.classList.remove("menu__item--clicked")
          )
          openMenuItems.clear()
        }
      }
    })
  }

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

      // Navigation arrows (обращаемся через родителя .slider-hero)
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
}

// -----Уменьшающийся при скролле header--------------
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

// Гамбургер-меню
const iconMenu = document.querySelector(".icon-menu")
const menuBody = document.querySelector(".menu__body")
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("body--lock")
    iconMenu.classList.toggle("_active")
    menuBody.classList.toggle("_active")
  })
}

// Spoilers
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
