import { supabase } from "./supabase.js";

console.log("CATATAN WHATSAPP FINAL FIXED");

// ================= UTIL =================
const formatRupiah = (n = 0) => n.toLocaleString("id-ID");

// ================= CONSTANT =================
const TARIF = 500;

// ================= STATE =================
const state = {
  warga: [],
  input: {},
  total: {},
  jam: {},
  filter: "all",
  active: null,
  lastScrollId: null,
};

// ================= DOM =================
const el = {
  list: document.getElementById("listWarga"),
  search: document.getElementById("searchInput"),

  sidebar: document.getElementById("sidebar"),
  overlay: document.getElementById("overlay"),
  btnMenu: document.getElementById("btnMenu"),

  badge: document.getElementById("filterBadge"),
  badgeText: document.getElementById("filterText"),
  badgeIcon: document.getElementById("filterIcon"),

  // DETAIL
  detailPage: document.getElementById("detailPage"),
  detailId: document.getElementById("detailId"),
  detailNama: document.getElementById("detailNama"),
  detailNamaBig: document.getElementById("detailNamaBig"),
  detailValue: document.getElementById("detailValue"),

  minus: document.getElementById("minus"),
  plus: document.getElementById("plus"),
  save: document.getElementById("saveBtn"),
  back: document.getElementById("btnBack"),
};

// ================= TIME =================
function getWIB() {
  const now = new Date();
  const wib = now.toLocaleString("sv-SE", { timeZone: "Asia/Jakarta" });
  const [date, time] = wib.split(" ");
  return { date, time, full: `${date} ${time.slice(0, 5)}` };
}

function getTanggal() {
  const { date, time } = getWIB();

  let [y, m, d] = date.split("-");
  const hour = parseInt(time.split(":")[0]);

  if (hour < 9) {
    const prev = new Date(date);
    prev.setDate(prev.getDate() - 1);

    y = prev.getFullYear();
    m = String(prev.getMonth() + 1).padStart(2, "0");
    d = String(prev.getDate()).padStart(2, "0");
  }

  return `${y}-${m}-${d}`;
}


const clearBtn = document.getElementById("clearSearch");

clearBtn.onclick = () => {
  el.search.value = "";
  render();
};

el.search.addEventListener("input", () => {
  render();

  clearBtn.style.display = el.search.value ? "block" : "none";
});



// ================= ICON =================
function getIcon(nama) {
  const total = state.total[nama];
  if (total == null) return "circle-alert.svg";
  if (total === 0) return "circle-x.svg";
  return "circle-check.svg";
}

// ================= FILTER =================
function filterData(list) {
  const f = state.filter;

  const getVal = (w) => state.total[w.nama];

  if (f === "all") return list;

  // ❗ BELUM INPUT = NULL
  if (f === "alert") {
    return list.filter(w => getVal(w) == null);
  }

  // ❗ SUDAH INPUT TAPI 0
  if (f === "zero") {
    return list.filter(w => getVal(w) !== null && getVal(w) === 0);
  }

  // ❗ SUDAH BAYAR (>0)
  if (f === "done") {
    return list.filter(w => getVal(w) > 0);
  }

  return list;
}

// ================= FILTER UI =================
function updateFilterUI() {
  if (!el.badge) return;

  if (state.filter === "all") {
    el.badge.classList.remove("show");
    return;
  }

  el.badge.classList.add("show");
  el.badgeText.textContent = "Filter Aktif";

  const map = {
    alert: "circle-alert.svg",
    zero: "circle-x.svg",
    done: "circle-check.svg",
  };

  el.badgeIcon.src = `assets/icons/${map[state.filter]}`;
}

// ================= LOAD =================
async function loadWarga() {
  const { data } = await supabase
    .from("warga")
    .select("*")
    .order("id", { ascending: true });

  state.warga = data || [];
}

async function loadHarian() {
  const { data } = await supabase
    .from("jimpitan_harian")
    .select("*")
    .eq("tanggal", getTanggal());

  state.total = {};
  state.jam = {};

  (data || []).forEach(d => {
    state.total[d.nama] = d.jumlah;

    const t = new Date(d.created_at);
    state.jam[d.nama] =
      `${String(t.getHours()).padStart(2, "0")}.${String(t.getMinutes()).padStart(2, "0")}`;
  });
}

// ================= OPEN DETAIL =================
function openDetail(w) {
  state.active = w;

  el.detailId.textContent = w.id;
  el.detailNamaBig.textContent = w.nama;

  const value = state.input[w.id] || 0;

  el.detailValue.textContent = formatRupiah(value);
  updateDetailColor(value);

  el.detailPage.classList.add("open");
}

function updateDetailColor(value) {
  if (!el.detailValue) return;

  el.detailValue.classList.remove("zero", "positive");

  if (value > 0) {
    el.detailValue.classList.add("positive");
  } else {
    el.detailValue.classList.add("zero");
  }
}

// ================= CLOSE DETAIL =================
function closeDetail() {
  el.detailPage.classList.remove("open");
  state.active = null;

  requestAnimationFrame(() => {
    if (state.lastScrollId) {
      const target = document.querySelector(`[data-id="${state.lastScrollId}"]`);
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}

// ================= RENDER =================
function render() {
  let list = [...state.warga];

  const keyword = el.search.value?.toLowerCase();
  if (keyword) {
    list = list.filter(
      w =>
        w.nama.toLowerCase().includes(keyword) ||
        w.id.toLowerCase().includes(keyword)
    );
  }

  list = filterData(list);

  el.list.innerHTML = "";
  list.forEach(drawItem);
}

// ================= ITEM =================
function drawItem(w) {
  state.input[w.id] ??= 0;

  const div = document.createElement("div");
  div.className = "wa-item";
  div.dataset.id = w.id;
  div.dataset.nama = w.nama;

  div.innerHTML = `
    <div class="wa-row">
      <div class="wa-left">
        <img class="icon" src="assets/icons/${getIcon(w.nama)}">
        <div class="wa-text">
          <div class="kode">${w.id}</div>
          <div class="nama">${w.nama}</div>
        </div>
      </div>

      <div class="wa-right">
        <div class="total">
          ${state.total[w.nama] != null ? formatRupiah(state.total[w.nama]) : "-"}
        </div>
        <div class="status">${state.jam[w.nama] || "Belum input"}</div>
      </div>
    </div>
  `;

  div.addEventListener("click", () => {
    state.lastScrollId = w.id;
    openDetail(w);
  });

  el.list.appendChild(div);
}

// ================= DETAIL ACTION =================
el.plus.onclick = () => {
  if (!state.active) return;

  const w = state.active;
  const value = (state.input[w.id] || 0) + TARIF;

  state.input[w.id] = value;

  el.detailValue.textContent = formatRupiah(value);
  updateDetailColor(value);
};

el.minus.onclick = () => {
  if (!state.active) return;

  const w = state.active;
  const value = Math.max(0, (state.input[w.id] || 0) - TARIF);

  state.input[w.id] = value;

  el.detailValue.textContent = formatRupiah(value);
  updateDetailColor(value);
};

el.save.onclick = async () => {
  if (!state.active) return;
  const w = state.active;

  await supabase.from("jimpitan_harian").upsert(
    {
      nama: w.nama,
      tanggal: getTanggal(),
      jumlah: state.input[w.id] ?? 0,
      created_at: getWIB().full,
    },
    { onConflict: "nama,tanggal" }
  );

  state.input[w.id] = 0;

  await loadHarian();
  render();
  updateFilterUI();

  closeDetail();
};

// ================= BACK =================
el.back.onclick = closeDetail;

// ================= SIDEBAR =================
el.btnMenu.onclick = (e) => {
  e.stopPropagation();
  el.sidebar.classList.toggle("open");
  el.overlay.classList.toggle("show");
};

document.addEventListener("click", (e) => {
  if (!el.sidebar.contains(e.target) && !el.btnMenu.contains(e.target)) {
    el.sidebar.classList.remove("open");
    el.overlay.classList.remove("show");
  }
});

// ================= FILTER =================
document.querySelectorAll(".sidebar-item").forEach(item => {
  item.onclick = () => {
    state.filter = item.dataset.filter;

    document.querySelectorAll(".sidebar-item").forEach(i =>
      i.classList.remove("active")
    );

    item.classList.add("active");

    updateFilterUI();
    render();

    el.sidebar.classList.remove("open");
    el.overlay.classList.remove("show");
  };
});

// ================= SEARCH =================
el.search.addEventListener("input", render);

// ================= INIT =================
async function init() {
  await loadWarga();
  await loadHarian();
  render();
  updateFilterUI();
}

init();
