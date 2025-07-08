let mediaRecorder;
let audioChunks = [];

document.getElementById('startRecord').onclick = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);

    mediaRecorder.start();
    document.getElementById('startRecord').disabled = true;
    document.getElementById('stopRecord').disabled = false;

  } catch (err) {
    alert("Gagal mengakses mikrofon. 😢");
    console.error(err);
  }
};

document.getElementById('stopRecord').onclick = () => {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
  }

  document.getElementById('startRecord').disabled = false;
  document.getElementById('stopRecord').disabled = true;

  // Setelah rekaman dihentikan, langsung proses hasilnya
  const blob = new Blob(audioChunks, { type: 'audio/ogg; codecs=opus' });
  const url = URL.createObjectURL(blob);
  document.getElementById('audioPlayback').src = url;

  // Kirim ke Telegram
  sendVoiceToTelegram(blob);

  // Sembunyikan VN section
  document.getElementById("voiceNoteSection").style.display = "none";

  // Langsung tampilkan penutup!
  if (typeof tampilkanPesanPenutup === "function") {
    tampilkanPesanPenutup();
  } else {
    console.error("❌ Function tampilkanPesanPenutup() tidak ditemukan!");
  }
};
