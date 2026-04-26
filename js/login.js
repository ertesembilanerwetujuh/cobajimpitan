if (localStorage.getItem("login") === "true") {
  window.location.href = "app.html";
}

import { supabase } from "./supabase.js";

// ================= DEVICE ID =================
function getDeviceId() {
  let id = localStorage.getItem("device_id");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("device_id", id);
  }

  return id;
}

// ================= FORMAT WAKTU =================
function getNowTime() {
  return Date.now();
}

// ================= CLICK LANJUTKAN =================
document.getElementById("btnLanjutkan").onclick = async () => {

  const device_id = getDeviceId();
  const start_time = getNowTime();

  // simpan session lokal
  localStorage.setItem("login", "true");
  localStorage.setItem("device_id", device_id);
  localStorage.setItem("start_time", start_time);

  // optional: kirim log masuk ke Supabase
  const { error } = await supabase.from("device_session").insert([
    {
      device_id,
      date: new Date().toLocaleDateString("id-ID"),
      start_time: new Date(start_time).toTimeString().slice(0, 5)
    }
  ]);

  if (error) {
    console.error("Gagal log session:", error);
  }

  // masuk app
  window.location.href = "app.html";
};