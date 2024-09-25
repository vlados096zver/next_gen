$(document).on("click", ".header__link, .footer__link", function () {
  let target = $(this).attr("href");
  let pos = target.indexOf("#");
  if (pos !== -1) {
    target = target.substring(pos)
    let coordsScroll = $(target).offset().top
    $("html, body").animate(
      {
        scrollTop: coordsScroll,
      },
      800,
    )
    if ($(window).width() <= 840 && $(this).hasClass("header__link")) {
      $(".header__list").slideUp()
      $(".line-burger").removeClass("line-active")
    }
    return false
  }
})

$(document).ready(function () {
  $(".mobile-wrap").on("click", function () {
    $(".line-burger").toggleClass("line-active")
    $(".header__list").slideToggle()
  })

  $(window).resize(function () {
    if ($(window).width() > 840) {
      $(".header__list").attr("style", "")
      $(".line-burger").removeClass("line-active")
    }
  })
  AOS.init({
    duration: 600,
  })
})

document.addEventListener("DOMContentLoaded", function () {
  const videoWrap = document.querySelector(".video__wrap")
  const video = videoWrap.querySelector("video")
  const btn = videoWrap.querySelector(".video__btn")

  videoWrap.addEventListener("click", function () {
    if (video.paused) {
      video.play()
      btn.style.display = "none"
    } else {
      video.pause()
      btn.style.display = "flex"
    }
  })

  videoWrap.addEventListener("dblclick", function () {
    if (video.requestFullscreen) {
      video.requestFullscreen()
    } else if (video.mozRequestFullScreen) {
      // Firefox
      video.mozRequestFullScreen()
    } else if (video.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      video.webkitRequestFullscreen()
    } else if (video.msRequestFullscreen) {
      // IE/Edge
      video.msRequestFullscreen()
    }
  })
})

$(".show-popup").on("click", function () {
  $(".popup").addClass("active")
  $("body").addClass("hidden")
})
$(".popup__close").on("click", function () {
  $(".popup").removeClass("active")
  $("body").removeClass("hidden")
})
$(document).on("click", ".gallery__btn", function () {
  var $this = $(this)
  $this.addClass("active")
  setTimeout(function () {
    $this.removeClass("active")
  }, 2500)
})

const sliderProducts = document.querySelector(".products-wrap")

if (sliderProducts) {
  new Swiper(".products-wrap", {
    slidesPerView: 3,
    spaceBetween: 60,
    swipe: true,
    navigation: {
      nextEl: ".products .swiper__next",
      prevEl: ".products .swiper__prev",
    },
    breakpoints: {
      1023: {
        slidesPerView: 3,
        spaceBetween: 60,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    },
  })
}

const sliderReviews = document.querySelector(".reviews-slider")

if (sliderReviews) {
  new Swiper(".reviews-slider", {
    slidesPerView: 1,
    swipe: true,
    navigation: {
      nextEl: ".reviews .swiper__next",
      prevEl: ".reviews .swiper__prev",
    },
  })
}

const serviceItems = document.querySelectorAll(".services__item"),
  servicesItemTxt = document.querySelectorAll(".services__text p")

serviceItems.forEach((selectedItem, i) => {
  selectedItem.addEventListener("click", () => {
    if (selectedItem.classList.contains("active")) return

    servicesItemTxt.forEach((item) => (item.style.maxHeight = `0px`))
    serviceItems.forEach((item) => item.classList.remove("active"))

    selectedItem.classList.add("active")
    servicesItemTxt[i].style.maxHeight = `${servicesItemTxt[i].scrollHeight}px`
  })
})