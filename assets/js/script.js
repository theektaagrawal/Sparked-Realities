'use strict';



/**
 * add Event on elements
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header & back top btn show when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 80) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);


// video segment functionality

const leftRoll = document.getElementById('left-roll');
const rightRoll = document.getElementById('right-roll');
const carouselTrack = document.querySelector('.carousel-track');
const carouselItems = document.querySelectorAll('.carousel-item');
const dotsContainer = document.querySelector('.carousel-dots');

let currentIndex = 0; 
const visibleItems = 4;
const totalItems = carouselItems.length;

// Create Dot Indicators
function createDots() {
  for (let i = 0; i < totalItems - visibleItems + 1; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  }
}
createDots();

const dots = document.querySelectorAll('.dot');

// Update Dots
function updateDots() {
  dots.forEach((dot, index) => dot.classList.toggle('active', index === currentIndex));
}

function moveCarousel(direction) {
  const maxIndex = totalItems - visibleItems;
  currentIndex += direction;

  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex > maxIndex) currentIndex = maxIndex;

  const offset = -currentIndex * (carouselItems[0].offsetWidth + 20);
  carouselTrack.style.transform = `translateX(${offset}px)`;
  updateDots();
}

dots.forEach((dot, index) => dot.addEventListener('click', () => {
  currentIndex = index;
  moveCarousel(0);
}));

leftRoll.addEventListener('click', () => moveCarousel(-1));
rightRoll.addEventListener('click', () => moveCarousel(1));
