
// Loader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').style.display = 'none';
  }, 1500);
});

// ============================
// THREE.JS PARTICLE BACKGROUND
// ============================
import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('bg'), alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);

const particles = new THREE.BufferGeometry();
const count = 3000;
const pos = new Float32Array(count * 3);
for(let i=0;i<count*3;i++) pos[i]=(Math.random()-0.5)*200;
particles.setAttribute('position', new THREE.BufferAttribute(pos,3));

const mat = new THREE.PointsMaterial({color:0xff2b2b, size:0.7});
const mesh = new THREE.Points(particles, mat);
scene.add(mesh);
camera.position.z = 80;

function animate(){
  requestAnimationFrame(animate);
  mesh.rotation.y += 0.0005;
  renderer.render(scene,camera);
}
animate();

window.addEventListener('resize',()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ============================
// SOUND EFFECTS
// ============================
const hoverSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3');
const clickSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-modern-click-box-check-1120.mp3');

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => hoverSound.play());
  el.addEventListener('click', () => clickSound.play());
});

// ============================
// DARK / LIGHT MODE
// ============================
const toggle = document.getElementById('themeToggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  toggle.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
});

// ============================
// AI ASSISTANT (OPENAI API + MEMORY)
// ============================
let conversation = JSON.parse(localStorage.getItem('aiMemory')) || [
  { role: 'system', content: 'You are a personal AI assistant for Haudil Ulum. Answer professionally, friendly, and concisely.' }
];
// ============================
const aiBtn = document.getElementById('ai-btn');
const aiChat = document.getElementById('ai-chat');
const aiSend = document.getElementById('aiSend');
const aiInput = document.getElementById('aiInput');
const aiMessages = document.getElementById('aiMessages');

aiBtn.onclick = ()=>{
  aiChat.style.display = aiChat.style.display === 'flex' ? 'none' : 'flex';
};

aiSend.onclick = sendMessage;
aiInput.addEventListener('keypress',e=>{if(e.key==='Enter')sendMessage();});

async function sendMessage(){
  const msg = aiInput.value;
  if(!msg) return;
  aiMessages.innerHTML += `<div><b>You:</b> ${msg}</div>`;
  aiInput.value = '';

  const res = await fetch('https://api.openai.com/v1/chat/completions',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'Authorization':'Bearer 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'
    },
    body:JSON.stringify({
      model:'gpt-4o-mini',
      messages: conversation.concat([{ role:'user', content: msg }])
    })
  });

  const data = await res.json();
  const reply = data.choices[0].message.content;

conversation.push({ role:'user', content: msg });
conversation.push({ role:'assistant', content: reply });
localStorage.setItem('aiMemory', JSON.stringify(conversation));
  aiMessages.innerHTML += `<div><b>AI:</b> ${reply}</div>`;
  aiMessages.scrollTop = aiMessages.scrollHeight;
}

// ============================
// SMOOTH SCROLL + MOBILE GESTURE
// ============================
document.documentElement.style.scrollBehavior = 'smooth';

let startY = 0;
window.addEventListener('touchstart', e => startY = e.touches[0].clientY);
window.addEventListener('touchmove', e => {
  const moveY = e.touches[0].clientY;
  window.scrollBy(0, startY - moveY);
});

// ============================
// Scroll Animation
const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));