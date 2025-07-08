// js/voice.js

let mediaRecorder;
let audioChunks = [];

const startBtn = document.getElementById("startRecord");
const stopBtn = document.getElementById("stopRecord");
const playback = document.getElementById("audioPlayback");

startBtn.addEventListener("click", async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  audioChunks = [];

  mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/ogg; codecs=opus' });
    const audioURL = URL.createObjectURL(audioBlob);
    playback.src = audioURL;

    // Kirim ke Telegram
    sendVoiceToTelegram(audioBlob);
  };

  mediaRecorder.start();
  startBtn.disabled = true;
  stopBtn.disabled = false;
});

stopBtn.addEventListener("click", () => {
  mediaRecorder.stop();
  startBtn.disabled = false;
  stopBtn.disabled = true;
});
