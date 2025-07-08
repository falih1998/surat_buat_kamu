let mediaRecorder;
let audioChunks = [];

document.getElementById("startRecord").onclick = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = (e) => {
      audioChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: "audio/ogg; codecs=opus" });
      const url = URL.createObjectURL(blob);

      // Tampilkan hasil rekaman
      const audio = document.getElementById("audioPlayback");
      audio.src = url;

      // Kirim ke bot
      sendVoiceToTelegram(blob);

      // Sembunyikan VN
      document.getElementById("voiceNoteSection").style.display = "none";

      // TAMPILKAN PENUTUP
      if (typeof tampilkanPesanPenutup === "function") {
        tampilkanPesanPenutup();
      } else {
        console.error("❌ tampilkanPesanPenutup() tidak ditemukan");
      }
    };

    // Start rekaman
    mediaRecorder.start();
    document.getElementById("startRecord").disabled = true;
    document.getElementById("stopRecord").disabled = false;
  } catch (error) {
    console.error("Microphone error:", error);
    alert("Mikrofon tidak bisa diakses 😢");
  }
};

document.getElementById("stopRecord").onclick = () => {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    document.getElementById("startRecord").disabled = false;
    document.getElementById("stopRecord").disabled = true;
  }
};
