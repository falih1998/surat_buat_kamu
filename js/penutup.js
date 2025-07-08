function tampilkanPesanPenutup() {
  const finalSection = document.getElementById("finalMessageSection");
  const messageTarget = document.getElementById("finalMessageText");

  if (!finalSection || !messageTarget) {
    console.error("❌ ERROR: Elemen penutup tidak ditemukan.");
    return;
  }

  finalSection.style.display = "block";
  messageTarget.innerHTML = ""; // Pastikan kosong

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
}
