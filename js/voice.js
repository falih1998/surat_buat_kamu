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

      // ✅ Kirim ke Telegram
      sendVoiceToTelegram(blob);

      // ✅ Sembunyikan VN section
      document.getElementById("voiceNoteSection").style.display = "none";

      // ✅ Tampilkan penutup dengan efek ketikan
      setTimeout(() => {
        const finalSection = document.getElementById("finalMessageSection");
        const messageTarget = document.getElementById("finalMessageText");

        console.log("▶️ Menjalankan TypeIt...");
        console.log("✅ finalMessageSection:", finalSection);
        console.log("✅ finalMessageText span:", messageTarget);

        if (!finalSection || !messageTarget) {
          console.error("❌ ERROR: Element penutup tidak ditemukan di HTML");
          return;
        }

        finalSection.style.display = "block";
        messageTarget.innerHTML = ""; // bersihkan isi awal kalau ada

        new TypeIt("#finalMessageText", {
          speed: 45,
          cursor: true,
          waitUntilVisible: true,
        })
          .type("Terima kasih ya... 🫶<br>")
          .pause(400)
          .type("Kamu udah nyempetin waktu, ngasih senyum, dan bahkan kirim suara kamu.<br>")
          .pause(400)
          .type("Itu semua berharga banget buat aku.<br><br>")
          .type("❤️ Dari aku, yang selalu bersyukur pernah kenal kamu.")
          .go();
      }, 2000);
    };

    mediaRecorder.start();
    document.getElementById('startRecord').disabled = true;
    document.getElementById('stopRecord').disabled = false;

  } catch (err) {
    alert("❌ Mikrofon tidak bisa diakses.");
    console.error(err);
  }
};

document.getElementById('stopRecord').onclick = () => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }

  document.getElementById('startRecord').disabled = false;
  document.getElementById('stopRecord').disabled = true;
};
