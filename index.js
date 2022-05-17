const dataFilter = "[data-filter]";
const aboutData = "[data-item]";
const active = "active";

const filterLink = document.querySelectorAll(dataFilter);
const aboutItems = document.querySelectorAll(aboutData);

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

const navButton = document.querySelector("button[aria-expanded");

function toggleNav({ target }) {
  const expanded = target.getAttribute("aria-expanded") === "true" || false;
  navButton.setAttribute("aria-expanded", !expanded);
}

navButton.addEventListener("click", toggleNav);

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

//Modal
const open = "open";
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

//Contact Form

const containers = document.querySelectorAll(".input-container");
const form = document.querySelector("form");

const timeline = gsap.timeline({ defaults: { duration: 1 } });

//Line
const start =
  "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";
const end =
  "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";

//Elastic

containers.forEach((container) => {
  const input = container.querySelector(".input");
  const line = container.querySelector(".elastic-line");
  const placeholder = container.querySelector(".placeholder");
  input.addEventListener("focus", () => {
    if (!input.value) {
      timeline.fromTo(
        line,
        { attr: { d: start } },
        { attr: { d: end }, ease: "Power2.easeOut", duration: 0.75 }
      );
      timeline.to(
        line,
        { attr: { d: start }, ease: "elastic.out(3, 0.5)" },
        "<50%"
      );
      timeline.to(
        placeholder,
        {
          top: -15,
          left: 0,
          scale: 0.7,
          duration: 0.5,
          ease: "Power2.easeOut",
        },
        "<15%"
      );
    }
  });
});

form.addEventListener("click", () => {
  containers.forEach((container) => {
    const input = container.querySelector(".input");
    const line = container.querySelector(".elastic-line");
    const placeholder = container.querySelector(".placeholder");

    if (document.activeElement !== input) {
      if (!input.value) {
        gsap.to(placeholder, {
          top: 0,
          left: 0,
          scale: 1,
          duration: 0.5,
          ease: "Power2.easeOut",
        });
      }
    }
    input.addEventListener("input", (e) => {
      if (e.target.type === "text") {
        let inputText = e.target.value;
        if (inputText.length > 2) {
          colorize("#C3D0C1", line, placeholder);
        } else {
          colorize("#DDAF9D", line, placeholder);
        }
      }
      if (e.target.type === "email") {
        let valid = validateEmail(e.target.value);
        if (valid) {
          colorize("#C3D0C1", line, placeholder);
        } else {
          colorize("#DDAF9D", line, placeholder);
        }
      }
      if (e.target.type === "tel") {
        let valid = validatePhone(e.target.value);
        if (valid) {
          colorize("#C3D0C1", line, placeholder);
        } else {
          colorize("#DDAF9D", line, placeholder);
        }
      }
    });
  });
});

// checking email validation

function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}
function validatePhone(phone) {
  let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(phone);
}

function colorize(color, line, placeholder) {
  gsap.to(line, { stroke: color, duration: 0.75 });
  gsap.to(placeholder, { color: color, duration: 0.75 });
}

//Animating Character
gsap.set("#eye", { transformOrigin: "center" });
gsap.fromTo(
  "#eye",
  { scaleY: 1 },
  {
    scaleY: 0.3,
    repeat: -1,
    yoyo: true,
    repeatDelay: 0.5,
    ease: "Power2.easeOut",
  }
);

gsap.fromTo(
  "#eyebrow",
  { y: 0 },
  { y: -1, repeat: -1, yoyo: true, repeatDelay: 0.5, ease: "Power2.easeOut" }
);

const submitButton = document.querySelector(".contact-sbt-btn");
const timelineThree = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  timelineThree.to(".contact-right, .contact-left", {
    y: 30,
    opacity: 0,
    pointerEvents: "none",
  });
  timelineThree.to("form", { scale: 0.8 }, "<");
  timelineThree.fromTo(
    ".submitted",
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0 }
  );
  gsap.set("#hand", { transformOrigin: "left" });
  gsap.fromTo(
    "#hand",
    { rotation: 0, y: 0 },
    { rotation: -10, y: 2, ease: "elastic(3,0.3)", duration: 2, delay: 1 }
  );
});

gsap.to("#star", 1, {
  scale: 0.1,
  y: 60,
  yoyo: true,
  repeat: -1,
  ease: "power1.inOut",
  delay: 1,
});

var element = document.getElementById("heart");

TweenMax.to(element, 0.1, { x: "+=20", yoyo: true, repeat: -1 });
TweenMax.to(element, 0.1, { x: "-=20", yoyo: true, repeat: -1 });
