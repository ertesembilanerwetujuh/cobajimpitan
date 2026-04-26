import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const dataWarga = [
  // ===== BLOK A =====
  { nama: "Adi Mbah Pita", kodeRumah: "A01" },
  { nama: "Agung Triarso", kodeRumah: "A02" },
  { nama: "Agus Purboyono", kodeRumah: "A03" },
  { nama: "Agus Suherman", kodeRumah: "A04" },
  { nama: "Ahmad J. Farid", kodeRumah: "A05" },
  { nama: "Ali Fatah", kodeRumah: "A06" },
  { nama: "Ali Imron", kodeRumah: "A07" },
  { nama: "Amin Setyono", kodeRumah: "A08" },
  { nama: "Aris Samitio", kodeRumah: "A09" },
  { nama: "Aziz Latif", kodeRumah: "A10" },
  { nama: "Benny", kodeRumah: "A11" },
  { nama: "Budi B. Santoso", kodeRumah: "A12" },
  { nama: "Dasuki", kodeRumah: "A13" },
  { nama: "Faizin", kodeRumah: "A14" },
  { nama: "Gianto Zaini", kodeRumah: "A15" },
  { nama: "Gilang Bagus", kodeRumah: "A16" },
  { nama: "Hartopo", kodeRumah: "A17" },

  // ===== BLOK B =====
  { nama: "Kozin", kodeRumah: "B01" },
  { nama: "Kusnadi", kodeRumah: "B02" },
  { nama: "Mariyo", kodeRumah: "B03" },
  { nama: "M. Aly Mas Ad", kodeRumah: "B04" },
  { nama: "Ngali", kodeRumah: "B05" },
  { nama: "Nur Azis", kodeRumah: "B06" },
  { nama: "Nur Kholish", kodeRumah: "B07" },
  { nama: "Paulus Irawan", kodeRumah: "B08" },
  { nama: "Purwanto", kodeRumah: "B09" },
  { nama: "Ragil Santoso", kodeRumah: "B10" },
  { nama: "Reza", kodeRumah: "B11" },
  { nama: "Ristanto Aris S.", kodeRumah: "B12" },
  { nama: "Rizki Agung U.", kodeRumah: "B13" },
  { nama: "Rofiah", kodeRumah: "B14" },
  { nama: "Ros Harmanto", kodeRumah: "B15" },
  { nama: "Sarjo", kodeRumah: "B16" },

  // ===== BLOK C =====
  { nama: "Slamet", kodeRumah: "C01" },
  { nama: "Slamet Utomo", kodeRumah: "C02" },
  { nama: "Solekan", kodeRumah: "C03" },
  { nama: "Subchan", kodeRumah: "C04" },
  { nama: "Sugiono", kodeRumah: "C05" },
  { nama: "Sugiyanto", kodeRumah: "C06" },
  { nama: "Sujono", kodeRumah: "C07" },
  { nama: "Supriyadi", kodeRumah: "C08" },
  { nama: "Supriyanto", kodeRumah: "C09" },
  { nama: "Suwito", kodeRumah: "C10" },
  { nama: "Umar Sadli", kodeRumah: "C11" },
  { nama: "Wahyu Irawan", kodeRumah: "C12" },
  { nama: "Widodo", kodeRumah: "C13" },
  { nama: "Yusuf Lukman H.", kodeRumah: "C14" },
  { nama: "Yolanda", kodeRumah: "C15" },
  { nama: "Yoga", kodeRumah: "C16" }
];

// ================= RUN SEED =================
async function seed() {
  for (const warga of dataWarga) {
    await addDoc(collection(db, "warga"), warga);
    console.log("✔", warga.kodeRumah, warga.nama);
  }

  console.log("🔥 SEED SELESAI");
}

seed();