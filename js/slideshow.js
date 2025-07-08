function showGallerySlide() {
  document.getElementById("modalSelfie").style.display = "none";
  document.getElementById("gallerySlide").style.display = "block";

  const gallery = document.getElementById("galleryWrapper");
  const textWrapper = document.getElementById("textWrapper");

  // Bersihkan isi sebelumnya
  gallery.innerHTML = "";
  textWrapper.innerHTML = "";

  const totalImages = 17;

  for (let i = 1; i <= totalImages; i++) {
    const num = i.toString().padStart(3, '0'); // 001, 002, ...
    const filename = `assets/img/Foto old_${num}.png`;

    // Tambahkan slide gambar
    const imgSlide = document.createElement("div");
    imgSlide.className = "swiper-slide";
    imgSlide.innerHTML = `<img src="${filename}" alt="foto${i}" style="max-width:100%; border-radius:10px;">`;
    gallery.appendChild(imgSlide);

    // Tambahkan slide teks
    const textSlide = document.createElement("div");
    textSlide.className = "swiper-slide";
    textSlide.innerHTML = `<p class="caption-text">Kenangan ke-${i}, waktu itu lucu banget 😄</p>`;
    textWrapper.appendChild(textSlide);
  }

  // Init Swiper untuk gambar
  new Swiper("#gallerySlide .mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

function showTextSlide() {
  document.getElementById("gallerySlide").style.display = "none";
  document.getElementById("textSlide").style.display = "flex";

  new Swiper("#textSlide .mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
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
