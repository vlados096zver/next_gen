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
  let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  $(".popup").addClass("active");
  $("body").addClass("hidden");
  $("body").css("padding-right", scrollbarWidth + "px");
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

// modal

let mainForm = document.querySelector('#modal-form');


const modalWindow = document.querySelector('.popup'),
    modalBtnClose = document.querySelector('.popup__close'),
    modalInner = document.querySelector('.popup__user');


modalBtnClose.addEventListener('click', () => {
    modalWindow.classList.remove("active");
    document.body.style.paddingRight = '';
    document.body.classList.remove("hidden");

    let formTitleSuccess = document.querySelector('.popup__success');
    if (formTitleSuccess) {
        mainForm.classList.remove('modal__form--hidden');
        mainForm.reset();
        modalInner.removeChild(formTitleSuccess);
    }

});


// form valid


mainForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let nameField = mainForm.querySelector('input[name="name"]');
    let phoneField = mainForm.querySelector('input[name="phone"]');

    let nameValue = nameField.value.trim();
    let phoneValue = phoneField.value.trim();

    let isValid = true;

    clearErrors();

    let namePattern = /^[a-zA-Z]{2,15}$/;
    if (nameValue === '') {
        showError(nameField, 'Name cannot be empty');
        isValid = false;
    } else if (!namePattern.test(nameValue)) {
        showError(nameField, 'Name must contain 2 to 15 Latin letters');
        isValid = false;
    }

    let phonePattern = /^[+]?[0-9]{6,}$/;
    if (phoneValue === '') {
        showError(phoneField, 'Phone cannot be empty');
        isValid = false;
    } else if (!phonePattern.test(phoneValue)) {
        showError(phoneField, 'Phone must contain at least 6 digits and may start with a plus sign');
        isValid = false;
    }

    if (isValid) {
        console.log('form send...');
        mainForm.classList.add('modal__form--hidden');

        let successAnswer = document.createElement('h2');
        successAnswer.classList.add('popup__success');
        successAnswer.textContent = 'Form submitted successfully!';

        modalInner.appendChild(successAnswer);

        // mainForm.submit();
    }
});

function showError(input, message) {
    let error = document.createElement('span');
    error.classList.add('error-message');
    error.innerText = message;
    input.parentElement.appendChild(error);

    input.addEventListener('input', function () {
        let value = input.value.trim();
        if (value) {
            if (input === mainForm.querySelector('input[name="name"]') && /^[a-zA-Z]{2,15}$/.test(value)) {
                error.remove();
            }
            if (input === mainForm.querySelector('input[name="phone"]') && /^[+]?[0-9]{6,}$/.test(value)) {
                error.remove();
            }
        }
    });
}

function clearErrors() {
    let errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());
}