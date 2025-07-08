let mediaRecorder;
let audioChunks = [];

document.getElementById('startRecord').onclick = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: 'audio/ogg; codecs=opus' });
      const url = URL.createObjectURL(blob);
      document.getElementById('audioPlayback').src = url;

      // ✅ Kirim ke bot Telegram
      sendVoiceToTelegram(blob);

      // ✅ Sembunyikan voice note section
      document.getElementById("voiceNoteSection").style.display = "none";

      // ✅ Tampilkan pesan penutup setelah delay
      setTimeout(() => {
        if (typeof tampilkanPesanPenutup === "function") {
          console.log("✅ Menjalankan tampilkanPesanPenutup()");
          tampilkanPesanPenutup();
        } else {
          console.error("❌ Function tampilkanPesanPenutup() tidak ditemukan!");
        }
      }, 2000);
    };

    mediaRecorder.start();
    document.getElementById('startRecord').disabled = true;
    document.getElementById('stopRecord').disabled = false;

  } catch (err) {
    alert("Gagal mengakses mikrofon. 😢");
    console.error("Microphone error:", err);
  }
};

document.getElementById('stopRecord').onclick = () => {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
  }

  document.getElementById('startRecord').disabled = false;
  document.getElementById('stopRecord').disabled = true;
};
