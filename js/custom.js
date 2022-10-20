"use strict";

/////////////////////////////////////////////////////////////
// Elements
/////////////////////////////////////////////////////////////

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnsOpenModal = document.querySelectorAll(".btn-show-modal");
const btnCloseModal = document.querySelector(".btn-close-modal");
const nav = document.querySelector(".nav");
const navLinks = document.querySelector(".nav-links");
const toggleBtn = document.querySelector(".nav-toggle");
const header = document.querySelector(".header");
const btnScrollTo = document.querySelector(".btn-scroll-to");
const allSections = document.querySelectorAll(".section");
const section1 = document.querySelector("#section-1");
const btnNow = document.querySelector(".btn");

const cutBtn = document.querySelector(".cut");
const select = document.querySelector(".select");
const button = document.querySelector(".cart");

/////////////////////////////////////////////////////////////
//  reveal section
/////////////////////////////////////////////////////////////

function revealSection(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
}

const sectionObs = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
  rootMargin: "200px",
});

allSections.forEach((section) => {
  sectionObs.observe(section);
  section.classList.add("section-hidden");
});

////////////////////////////////////////////////////////////////
// Modal show
////////////////////////////////////////////////////////////////
function openModal(e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// submodal window

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

///////////////////////////////////////////////////////////
// Toggle navbar
////////////////////////////////////////////////////////////
toggleBtn.addEventListener("click", function () {
  if (navLinks.classList.contains("nav-open")) {
    navLinks.classList.remove("nav-open");
    document.querySelector("html").style.overflow = "visible";
  } else {
    navLinks.classList.add("nav-open");
    document.querySelector("html").style.overflow = "hidden";
  }
});

navLinks.addEventListener("click", function () {
  navLinks.classList.contains("nav-open") &&
    navLinks.classList.remove("nav-open");
  document.querySelector("html").style.overflow = "visible";
});

/////////////////////////////////////////////////////
//add to cart
///////////////////////////////////////////////////////

function addCurt(button) {
  button.addEventListener("click", (e) => {
    let add = Number(cutBtn.getAttribute("data-count") || 0);
    cutBtn.setAttribute("data-count", add + 1);
    cutBtn.classList.add("zero");

    let image = e.target.parentNode.querySelector("img");
    let span = e.target.parentNode.querySelector("span");
    let s_image = image.cloneNode(false);
    span.appendChild(s_image);
    span.classList.add("active");
    setTimeout(() => {
      span.classList.remove("active");
      span.removeChild(s_image);
    }, 500);

    let parent = e.target.parentNode;
    let clone = parent.cloneNode(true);
    select.appendChild(clone);
    clone.lastElementChild.innerText = "Buy-now";

    if (clone) {
      cutBtn.onclick = () => {
        select.classList.toggle("display");
      };
    }
  });
}
