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

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

//Nav Events

window.onscroll = function () {
  if (window.pageYOffset > 100) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

function toggleNav({ target }) {
  const expanded = target.getAttribute("aria-expanded") === "true" || false;
  navButton.setAttribute("aria-expanded", !expanded);
}

navButton.addEventListener("click", toggleNav);

//Carousel

span[1].onclick = () => {
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
