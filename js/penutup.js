document.addEventListener("DOMContentLoaded", () => {
  window.tampilkanPesanPenutup = () => {
    const finalSection = document.getElementById("finalMessageSection");
    const messageTarget = document.getElementById("finalMessageText");

    if (!finalSection || !messageTarget) {
      console.error("❌ ERROR: Element penutup tidak ditemukan.");
      return;
    }

    console.log("✅ Menampilkan pesan penutup...");

    // Tampilkan section
    finalSection.style.display = "block";

    // Hapus isi lama jika ada
    messageTarget.innerHTML = "";

    // 🔁 Pilih salah satu: TypeIt ATAU teks langsung

    // ✅ PAKAI TYPEIT (AKTIFKAN jika mau efek ketikan)
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

    // ✅ ALTERNATIF (Non-TypeIt, pakai teks langsung)
    /*
    messageTarget.innerHTML = `
      Terima kasih ya... 🫶<br><br>
      Kamu udah nyempetin waktu, ngasih senyum, dan bahkan kirim suara kamu.<br><br>
      Itu semua berharga banget buat aku.<br><br>
      ❤️ Dari aku, yang selalu bersyukur pernah kenal kamu.
    `;
    */
  };
});
