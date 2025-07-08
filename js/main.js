// js/main.js

// Saat tombol 'Buka Surat' diklik
const openBtn = document.getElementById("open");
const envwrap = document.getElementById("envwrap");
const resetDiv = document.querySelector(".reset");
const modalSelfie = document.getElementById("modalSelfie");

openBtn.addEventListener("click", () => {
  // Sembunyikan tombol
  resetDiv.style.display = "none";

  // Jalankan animasi amplop
  envwrap.classList.remove("close");
  envwrap.classList.add("open");

  // Tampilkan modal kamera setelah animasi selesai (3 detik)
  setTimeout(() => {
    modalSelfie.style.display = "flex";
    startCamera();
  }, 3000);
});
