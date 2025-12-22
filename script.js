/* Typing Animation */
const roles = [
  "Full Stack Developer",
  "AI & ML Enthusiast",
  "Problem Solver"
];

let roleIndex = 0;
let charIndex = 0;
const typing = document.querySelector(".typing");

function type() {
  if (charIndex < roles[roleIndex].length) {
    typing.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 80);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (charIndex > 0) {
    typing.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 200);
  }
}

type();

/* Particle.js */
particlesJS("particles-js", {
  particles: {
    number: { value: 70 },
    color: { value: "#38bdf8" },
    size: { value: 2 },
    move: { speed: 1 },
    line_linked: {
      enable: true,
      distance: 130,
      color: "#6366f1",
      opacity: 0.3
    }
  }
});

/* Modals */
function openModal(id) {
  document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

/* EmailJS */
(function () {
  emailjs.init("UpnGcicm7bZr2-A_T");
})();

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  emailjs.sendForm("service_b00c96i", "template_u9r8upv", this)
    .then(() => alert("Message sent successfully!"),
          () => alert("Failed to send message."));
});

window.onclick = function (e) {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
};
/* Reveal on Scroll */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      section.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
function toggleMenu() {
  document.getElementById("slideMenu").classList.toggle("open");
}
