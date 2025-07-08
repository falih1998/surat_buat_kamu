// js/slideshow.js

function showGallerySlide() {
  document.getElementById("gallerySlide").style.display = "flex";
  new Swiper("#gallerySlide .mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });
}

function showTextSlide() {
  document.getElementById("gallerySlide").style.display = "none";
  document.getElementById("textSlide").style.display = "flex";
  new Swiper("#textSlide .mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });
}

function showFinalSelfie() {
  document.getElementById("textSlide").style.display = "none";
  const selfieSection = document.getElementById("finalSelfieSection");
  const img = document.getElementById("selfiePreview");
  img.src = localStorage.getItem("selfie");
  selfieSection.style.display = "flex";

  setTimeout(() => {
    document.getElementById("voiceNoteSection").style.display = "flex";
  }, 4000);
}

// Isi dummy untuk galeri (bisa diganti nanti)
const galleryWrapper = document.getElementById("galleryWrapper");
const textWrapper = document.getElementById("textWrapper");

for (let i = 1; i <= 5; i++) {
  const imgSlide = document.createElement("div");
  imgSlide.className = "swiper-slide";
  imgSlide.innerHTML = `<img src="assets/img/foto${i}.jpg" alt="foto${i}" />`;
  galleryWrapper.appendChild(imgSlide);

  const textSlide = document.createElement("div");
  textSlide.className = "swiper-slide";
  textSlide.innerHTML = `<p class='caption-text'>Kenangan ke-${i}, waktu itu lucu banget 😄</p>`;
  textWrapper.appendChild(textSlide);
}
