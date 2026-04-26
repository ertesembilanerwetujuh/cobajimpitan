import { db } from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const data = {
  grup1: {
    nama: "GRUP 1",
    petugas: ["AGUS PURBOYONO", "AGUS SUHERMAN", "ALI IMRON", "BUDI B. SANTOSO", "DASUKI", "SUBCHAN"]
  },
  grup2: {
    nama: "GRUP 2",
    petugas: ["AGUNG TRIARSO", "AHMAD J. FARID", "ALI FATAH", "RISTANTO ARIS S.", "UMAR SADLI", "WIDODO"]
  },
  grup3: {
    nama: "GRUP 3",
    petugas: ["MARIYO", "RAGIL SANTOSO", "RIZKI AGUNG U.", "SUWITO", "AZIZ LATIF", "GILANG BAGUS"]
  },
  grup4: {
    nama: "GRUP 4",
    petugas: ["AMIN SETYONO", "FAIZIN", "GIANTO ZAINI", "KOZIN", "SUGIYANTO", "YUSUF LUKMAN H."]
  },
  grup5: {
    nama: "GRUP 5",
    petugas: ["HARTOPO", "NUR AZIS", "NUR KHOLISH", "SLAMET UTOMO", "SUPRIYANTO", "-"]
  },
  grup6: {
    nama: "GRUP 6",
    petugas: ["KUSNADI", "PAULUS IRAWAN", "ROS HARMANTO", "SARJO", "YOGA", "-"]
  },
  grup7: {
    nama: "GRUP 7",
    petugas: ["ARIS SAMITIO", "PURWANTO", "SOLEKAN", "SUJONO", "WAHYU IRAWAN", "-"]
  },
  grup8: {
    nama: "GRUP 8",
    petugas: ["BENNY", "M. ALY MAS AD", "NGALI", "SLAMET", "SUPRIYADI", "-"]
  }
};

async function seedData() {
  for (const id in data) {
    await setDoc(doc(db, "grup", id), data[id]);
    console.log("✔", id, "berhasil");
  }
}

seedData();