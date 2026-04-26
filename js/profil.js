import { auth, db } from "./firebase.js";
import { signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

document.addEventListener("DOMContentLoaded", async () => {

  const user = auth.currentUser;

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const uid = user.uid;

  const uidText = document.getElementById("uidText");
  const namaInput = document.getElementById("namaInput");
  const btnSimpan = document.getElementById("btnSimpan");
  const btnLogout = document.getElementById("btnLogout");

  uidText.textContent = uid;

  const ref = doc(db, "users", uid);

  const snap = await getDoc(ref);

  if (snap.exists()) {
    namaInput.value = snap.data().nama || "";
  }

  btnSimpan.addEventListener("click", async () => {
    await setDoc(ref, {
      nama: namaInput.value,
      uid: uid
    }, { merge: true });

    alert("Profil tersimpan");
  });

  btnLogout.addEventListener("click", async () => {
    await signOut(auth);
    localStorage.removeItem("uid");
    window.location.href = "index.html";
  });

});