/* ================== THEME ================== */
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;
const saved = localStorage.getItem("theme") || "dark";
root.setAttribute("data-theme", saved);
themeToggle.innerHTML = saved === "dark"
  ? '<i class="fas fa-sun"></i>'
  : '<i class="fas fa-moon"></i>';

themeToggle.onclick = () => {
  const cur = root.getAttribute("data-theme");
  const next = cur === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  themeToggle.innerHTML = next === "dark"
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
};

/* ================== AI CHAT ================== */
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
closeChat.onclick = () => chat.style.display = "none";

function addMessage(text, type){
  const div = document.createElement("div");
  div.className = `ai-msg ${type}`;
  div.innerText = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

async function sendMessage(){
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  let botMsg = document.createElement("div");
  botMsg.className = "ai-msg bot";
  botMsg.innerText = "🤖 AI sedang bangun...";
  messages.appendChild(botMsg);
  messages.scrollTop = messages.scrollHeight;

  async function askAI(){
    const r = await fetch("https://ai.haudil-ulum.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });
    return r.json();
  }

  try {
    let d = await askAI();

    // kalau AI belum siap → tunggu → coba lagi
    if (d.reply?.includes("bangun") || d.reply?.includes("tidur")) {
      botMsg.innerText = "⏳ AI masih bangun, sebentar ya...";
      await new Promise(r => setTimeout(r, 4000));
      d = await askAI();
    }

    botMsg.innerText = d.reply || "⚠️ AI belum bisa menjawab";

  } catch {
    botMsg.innerText = "⚠️ Gagal menghubungi AI";
  }
}

sendBtn.onclick = sendMessage;
input.addEventListener("keydown", e => {
  if(e.key==="Enter") sendMessage();
});
