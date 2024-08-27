const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const frames = {
  currentIndex: 0,
  maxIndex: 1345,
};

const images = [];
let imgsLoaded = 0;

function preloadImgs() {
  for (var i = 1; i <= frames.maxIndex; i++) {
    const imgUrl = `./assets/frame_${i.toString().padStart(4, "0")}.jpeg`;
    const img = new Image();
    img.src = imgUrl;
    img.onload = function () {
      imgsLoaded++;
      if (imgsLoaded === frames.maxIndex) {
        loadImg(frames.currentIndex);
        startAnimation();
      }
    };
    images.push(img);
  }
}

function loadImg(index) {
  if (index >= 0 && index <= frames.maxIndex) {
    const img = images[index];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;
    const scale = Math.max(scaleX, scaleY);

    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    const offsetX = (canvas.width - newWidth) / 2;
    const offsetY = (canvas.height - newHeight) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

    frames.currentIndex = index;
  }
}

function startAnimation() {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".parent",
      start: "top top",
      scrub: 2,
      end: "bottom bottom",
    },
  });

  function updateFrame(index) {
    return {
      currentIndex: index,
      ease: "linear",
      onUpdate: function () {
        loadImg(Math.floor(frames.currentIndex));
      },
    };
  }

  tl.to(frames, updateFrame(100), "a")
    .to(".animate1", { opacity: 0, ease: "linear" }, "a")

    .to(frames, updateFrame(200), "b")
    .to(".animate2", { opacity: 1, ease: "linear" }, "b")

    .to(frames, updateFrame(300), "c")
    .to(".animate2", { opacity: 1, ease: "linear" }, "c")

    .to(frames, updateFrame(400), "d")
    .to(".animate2", { opacity: 0, ease: "linear" }, "d")

    .to(frames, updateFrame(500), "e")
    .to(".animate3", { opacity: 1, ease: "linear" }, "e")

    .to(frames, updateFrame(600), "f")
    .to(".animate3", { opacity: 1, ease: "linear" }, "f")

    .to(frames, updateFrame(650), "g")
    .to(".animate3", { opacity: 0, ease: "linear" }, "g")

    .to(frames, updateFrame(750), "h")
    .to(".panel", { x: "0%", ease: "expo" }, "h")

    .to(frames, updateFrame(850), "i")
    .to(".panel", { x: "0%", ease: "expo" }, "i")

    .to(frames, updateFrame(900), "j")
    .to(".panel", { x: "100%", ease: "linear" }, "j")

    .to(frames, updateFrame(950), "k")
    .to("canvas", { scale: 0.5, ease: "linear" }, "k")

    .to(frames, updateFrame(1000), "l")
    .to(".panelism", { opacity: 1, ease: "expo" }, "l")

    .to(frames, updateFrame(1050), "l")
    .to(".panelism span", { width: 200, ease: "expo" }, "l")

    .to(frames, updateFrame(1100), "m")
    .to("canvas", { scale: 1, ease: "linear" }, "m")

    .to(frames, updateFrame(1250), "n")
    .to(".panelism", { scale: 2, ease: "circ" }, "n")

    .to(frames, updateFrame(1300), "p")
    .to(".panelism", { opacity: 0, ease: "circ" }, "p")

    .to(frames, updateFrame(1320), "o")
    .to(".panelism", { scale: 2, ease: "circ" }, "o");
}

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
preloadImgs();

window.addEventListener("resize", function () {
  loadImg(Math.floor(frames.currentIndex));
});

document.querySelectorAll(".headings h3").forEach(function (elem) {
  gsap.from(elem, {
    scrollTrigger: {
      trigger: elem,
      start: "top 90%",
      end: "bottom 20%",
      scrub: 2,
    },
    opacity: 0.3,
  });
});

function startLoader() {
  let counterElement = document.querySelector(".counter");
  let currentValue = 0;

  function updateCounter() {
    if (currentValue === 100) {
      return;
    }

    currentValue += Math.floor(Math.random() * 10) + 1;

    if (currentValue > 100) {
      currentValue = 100;
    }

    counterElement.textContent = currentValue;

    let delay = Math.floor(Math.random() * 200) + 50;
    setTimeout(updateCounter, delay);
  }

  updateCounter();
}

startLoader();

gsap.to(".counter", 0.25, {
  delay: 3.5,
  opacity: 0,
});


gsap.to('.bar', 1.5,{
  delay: 3.5,
  height: 0,
  stagger:{
    amount: 0.5
  },
  ease: "power4.inOut"
})