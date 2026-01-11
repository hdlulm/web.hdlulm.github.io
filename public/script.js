/* ================== THEME ================== */
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;
const saved = localStorage.getItem("theme") || "dark";
root.setAttribute("data-theme", saved);

themeToggle.innerHTML =
  saved === "dark"
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';

themeToggle.onclick = () => {
  const cur = root.getAttribute("data-theme");
  const next = cur === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  themeToggle.innerHTML =
    next === "dark"
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
};

/* ================== CHAT UI ================== */
const openChat = document.getElementById("openChat");
const closeChat = document.getElementById("closeChat");
const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");
const messages = document.getElementById("messages");

openChat.onclick = () => {
  chat.style.display = "flex";
  setTimeout(() => input.focus(), 100);
};
closeChat.onclick = () => (chat.style.display = "none");

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `ai-msg ${type}`;
  div.innerText = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

/* ================== AI DEMO LOGIC ================== */

const responses = [
  {
    keywords: ["halo", "hai", "hi"],
    reply: "Halo 👋 Senang bertemu denganmu! Ada yang ingin kamu tanyakan tentang Haudil?"
  },
  {
    keywords: ["siapa", "kamu"],
    reply:
      "Aku adalah AI Assistant demo di website Haudil 'Ulum 🤖. Aku dibuat untuk membantu pengunjung mengenal profil, pengalaman, dan keahlian Haudil."
  },
  {
    keywords: ["haudil", "ulum"],
    reply:
      "Haudil 'Ulum adalah mahasiswa S1 Teknik Elektro yang memiliki minat kuat pada teknologi, inovasi, dan pengembangan solusi berbasis sistem elektrik dan IoT."
  },
  {
    keywords: ["tentang", "profil", "bio"],
    reply:
      "Haudil adalah mahasiswa Teknik Elektro yang aktif mengembangkan kemampuan di bidang mikrokontroler, IoT, dan pengembangan sistem berbasis teknologi."
  },
  {
    keywords: ["pendidikan", "kuliah", "kampus"],
    reply:
      "Haudil saat ini menempuh pendidikan S1 Teknik Elektro di Universitas Telkom Purwokerto sejak tahun 2023."
  },
  {
    keywords: ["pengalaman", "magang", "kerja"],
    reply:
      "Haudil memiliki pengalaman magang di PT Indesso Aroma Purwokerto, terlibat dalam instalasi panel kontrol, perawatan sistem produksi, dan instalasi kelistrikan."
  },
  {
    keywords: ["organisasi"],
    reply:
      "Haudil aktif di berbagai organisasi seperti Robocomm Research Group dan Himpunan Mahasiswa Teknik Elektro, khususnya di bidang research and development."
  },
  {
    keywords: ["pelatihan", "workshop"],
    reply:
      "Haudil pernah mengikuti workshop IoT berbasis ESP32 dan MQTT, termasuk praktikum GPIO, publish–subscribe sensor, dan kendali perangkat."
  },
  {
    keywords: ["sertifikasi", "lisensi"],
    reply:
      "Haudil memiliki sertifikasi dari BNSP melalui LSP KNI Level II pada bidang Kompetensi Keahlian Teknik Elektronika Industri."
  },
  {
    keywords: ["skill", "keahlian", "kemampuan"],
    reply:
      "Keahlian Haudil meliputi mikrokontroler, mikropemroses, IoT, pneumatic, electrical wiring, serta kemampuan problem solving dan manajemen waktu."
  },
  {
    keywords: ["iot", "esp32"],
    reply:
      "Haudil memiliki pengalaman mengerjakan project IoT menggunakan ESP32, termasuk komunikasi MQTT dan kendali perangkat berbasis sensor."
  },
  {
    keywords: ["linkedin"],
    reply:
      "Kamu bisa melihat profil LinkedIn Haudil di: https://linkedin.com/in/haudilulum"
  },
  {
    keywords: ["github", "project"],
    reply:
      "Project dan repository Haudil dapat dilihat di GitHub: https://github.com/haudilulum"
  },
  {
    keywords: ["portfolio", "website"],
    reply:
      "Portfolio lengkap Haudil tersedia di website resminya: https://haudilulum.my.id"
  }
];

function getDemoReply(text) {
  const lower = text.toLowerCase();
  for (const r of responses) {
    if (r.keywords.some(k => lower.includes(k))) {
      return r.reply;
    }
  }
  return "🤔 Aku belum mengerti pertanyaan itu, tapi kamu bisa cek profil Haudil di https://haudilulum.my.id.";
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  const botMsg = document.createElement("div");
  botMsg.className = "ai-msg bot";
  botMsg.innerText = "✍️ Mengetik...";
  messages.appendChild(botMsg);
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    botMsg.innerText = getDemoReply(text);
  }, 600);
}

sendBtn.onclick = sendMessage;
input.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});
