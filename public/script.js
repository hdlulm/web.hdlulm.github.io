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
    reply: "Halo 👋 Senang bertemu denganmu! Ada yang ingin kamu tanyakan?"
  },
  {
    keywords: ["siapa", "kamu"],
    reply:
      "Aku adalah AI Assistant demo di website Haudil 'Ulum 🤖. Aku dibuat untuk membantu pengunjung mengenal Haudil."
  },
  {
    keywords: ["haudil", "ulum"],
    reply:
      "Haudil 'Ulum adalah mahasiswa Electrical Engineering dengan minat di teknologi, IoT, dan pengembangan web."
  },
  {
    keywords: ["skill", "keahlian"],
    reply:
      "Keahlian Haudil meliputi: IoT, embedded system, web development, dan project berbasis teknologi."
  },
  {
    keywords: ["linkedin"],
    reply:
      "Kamu bisa cek LinkedIn Haudil di sini: https://linkedin.com/in/haudilulum"
  },
  {
    keywords: ["github"],
    reply:
      "Repo dan project Haudil ada di GitHub: https://github.com/haudilulum"
  },
  {
    keywords: ["instagram", "ig"],
    reply:
      "Instagram Haudil: https://instagram.com/hdlulm"
  },
  {
    keywords: ["portfolio", "website"],
    reply:
      "Portfolio Haudil bisa kamu lihat di https://haudilulum.my.id"
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

/* ================== GREETING ================== */
addMessage("Halo 👋 Ada yang bisa saya bantu?", "bot");
