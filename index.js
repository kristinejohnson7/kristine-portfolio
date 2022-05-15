const dataFilter = "[data-filter]";
const aboutData = "[data-item]";
const active = "active";

const filterLink = document.querySelectorAll(dataFilter);
const aboutItems = document.querySelectorAll(aboutData);

const navButton = document.querySelector("button[aria-expanded");
const nav = document.getElementById("topNav");

var span = document.querySelectorAll(".scroll-arrows");
var div = document.querySelectorAll(".projects-scroll");
var l = 0;

//Hero Flower Animation

const tl = gsap.timeline({
  repeat: -1,
  defaults: { ease: "sine.inOut", duration: 3 },
});
gsap.fromTo(
  ".flower",
  { rotation: -1 },
  {
    duration: 2,
    rotation: 1,
    yoyo: true,
    repeat: -1,
    transformOrigin: "center bottom",
    ease: "sine.inOut",
  }
);
//Parallax

var image = document.getElementsByClassName("para");
new simpleParallax(image, {
  delay: 0.7,
  transition: "cubic-bezier(0,0,0,1)",
});

// Full Page Scroll Animations

// function reveal() {
//   var reveals = document.querySelectorAll(".reveal");

//   for (var i = 0; i < reveals.length; i++) {
//     var windowHeight = window.innerHeight;
//     var elementTop = reveals[i].getBoundingClientRect().top;
//     var elementVisible = 150;

//     if (elementTop < windowHeight - elementVisible) {
//       reveals[i].classList.add("active");
//     } else {
//       reveals[i].classList.remove("active");
//     }
//   }
// }

// window.addEventListener("scroll", reveal);

//Nav Events

window.onscroll = function () {
  if (window.pageYOffset > 100) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

// function toggleNav({ target }) {
//   const expanded = target.getAttribute("aria-expanded") === "true" || false;
//   navButton.setAttribute("aria-expanded", !expanded);
// }

// navButton.addEventListener("click", toggleNav);

//Carousel

span[1].onclick = () => {
  console.log("Span being clicked");
  l++;
  for (var i of div) {
    if (l == 0) {
      i.style.left = "0px";
    }
    if (l == 1) {
      i.style.left = "-740px";
    }
    if (l == 2) {
      i.style.left = "-1480px";
    }
    if (l == 3) {
      i.style.left = "-2220px";
    }
    if (l == 4) {
      i.style.left = "-2960px";
    }
    if (l > 4) {
      l = 4;
    }
  }
};
span[0].onclick = () => {
  l--;
  for (var i of div) {
    if (l == 0) {
      i.style.left = "0px";
    }
    if (l == 1) {
      i.style.left = "-740px";
    }
    if (l == 2) {
      i.style.left = "-1480px";
    }
    if (l == 3) {
      i.style.left = "-2220px";
    }
    if (l < 0) {
      l = 0;
    }
  }
};

// About Me Filter

const setActive = (elm, selector) => {
  if (document.querySelector(`${selector}.${active}`) !== null) {
    document.querySelector(`${selector}.${active}`).classList.remove(active);
  }
  elm.classList.add(active);
};

for (const link of filterLink) {
  link.addEventListener("click", function () {
    setActive(link, ".filter-link");
    const filter = this.dataset.filter;
    aboutItems.forEach((card) => {
      if (card.dataset.item.includes(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}

// Project Modal

// var modal = document.getElementById("myModal");
// var btn = document.querySelectorAll(".project-popup-btn");
// console.log(btn);
// var span = document.getElementsByClassName("close")[0];
// btn.forEach((button) => {
//   console.log(button);
//   button.addEventListener("click", () => {
//     onsole.log("I'm clicking on mybtn");
//     modal.style.display = "block";
//   });
// });

// span.onclick = function () {
//   modal.style.display = "none";
// };

// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };

const open = "open";
// const active = "active";

const modalOpen = "[data-open]";
const modalClose = "[data-close]";
const isVisible = "is-visible";

const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

for (const elm of openModal) {
  elm.addEventListener("click", function () {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
}

for (const elm of closeModal) {
  elm.addEventListener("click", function () {
    this.parentElement.parentElement.classList.remove(isVisible);
  });
}

// Modal

document.addEventListener("click", (e) => {
  if (e.target === document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});
