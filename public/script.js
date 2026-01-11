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

/* ================== AI IN BROWSER ================== */

let generator;
let aiReady = false;

async function initAI() {
  addMessage("🤖 AI sedang dimuat di browser...", "bot");

  generator = await window.transformers.pipeline(
    "text-generation",
    "Xenova/distilgpt2"
  );

  aiReady = true;
  messages.lastChild.remove();
  addMessage("✅ AI siap! Silakan tanya apa saja.", "bot");
}

// Panggil sekali saat halaman dibuka
initAI();

async function sendMessage(){
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  if (!aiReady) {
    addMessage("⏳ AI masih loading, tunggu sebentar...", "bot");
    return;
  }

  const botMsg = document.createElement("div");
  botMsg.className = "ai-msg bot";
  botMsg.innerText = "✍️ AI sedang berpikir...";
  messages.appendChild(botMsg);
  messages.scrollTop = messages.scrollHeight;

  try {
    const output = await generator(text, {
      max_new_tokens: 60,
      temperature: 0.8
    });

    botMsg.innerText =
      output[0]?.generated_text || "⚠️ AI tidak bisa menjawab";

  } catch (err) {
    botMsg.innerText = "⚠️ Terjadi error di AI browser";
    console.error(err);
  }
}

sendBtn.onclick = sendMessage;
input.addEventListener("keydown", e => {
  if(e.key==="Enter") sendMessage();
});
