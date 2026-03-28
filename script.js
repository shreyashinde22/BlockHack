// ─── STARS ───
const starsEl = document.getElementById('stars');
for (let i = 0; i < 120; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  const size = Math.random() < 0.3 ? 4 : 2;
  s.style.cssText = `
    width:${size}px;height:${size}px;
    left:${Math.random()*100}%;
    top:${Math.random()*80}%;
    --dur:${2 + Math.random()*3}s;
    animation-delay:${Math.random()*3}s;
    border-radius:0;
  `;
  starsEl.appendChild(s);
}

// ─── FLOATING BLOCKS ───
const blockEmojis = ['🧱','🌿','💎','⛏','🔴','🪨','⚙️','🔥','💡'];
const floatContainer = document.getElementById('floating-blocks');
blockEmojis.forEach((emoji, i) => {
  const b = document.createElement('div');
  b.className = 'fblock';
  b.textContent = emoji;
  b.style.cssText = `
    left:${5 + i*10}%;
    top:${10 + Math.random()*60}%;
    font-size:${1.5 + Math.random()}rem;
    --fdur:${3 + Math.random()*3}s;
    animation-delay:${i*0.4}s;
  `;
  floatContainer.appendChild(b);
});

// ─── TERRAIN ───
const terrainEl = document.getElementById('terrain');
const terrainColors = [
  ['#5d9e3f','#3d7a26'], // grass
  ['#8B6340','#7a5530'], // dirt
  ['#8e8e8e','#5a5a5a'], // stone
];
for (let i = 0; i < 40; i++) {
  const block = document.createElement('div');
  block.className = 'terrain-block';
  const h = 32 + Math.floor(Math.random()*64);
  const tc = terrainColors[Math.floor(Math.random()*terrainColors.length)];
  block.style.cssText = `
    width:32px;height:${h}px;
    background:${tc[0]};
    border-right:4px solid ${tc[1]};
    border-top:4px solid rgba(255,255,255,0.15);
    flex-shrink:0;
  `;
  terrainEl.appendChild(block);
}

// ─── PARTICLES ───
const particlesEl = document.getElementById('particles');
for (let i = 0; i < 20; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.cssText = `
    left:${Math.random()*100}%;
    top:-20px;
    --pdur:${8+Math.random()*8}s;
    --pdelay:${Math.random()*8}s;
    width:${4+Math.floor(Math.random()*3)*4}px;
    height:${4+Math.floor(Math.random()*3)*4}px;
    background:${['#5d9e3f','#5de8f0','#FFD700','#ff3a3a'][Math.floor(Math.random()*4)]};
    opacity:0;
  `;
  particlesEl.appendChild(p);
}

// ─── COUNTDOWN ───
function updateCountdown() {
  const target = new Date('2026-04-24T09:00:00');
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) {
    ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => document.getElementById(id).textContent = '00');
    return;
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  const pad = n => String(n).padStart(2, '0');
  document.getElementById('cd-days').textContent = pad(days);
  document.getElementById('cd-hours').textContent = pad(hours);
  document.getElementById('cd-mins').textContent = pad(mins);
  document.getElementById('cd-secs').textContent = pad(secs);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ─── FAQ ───
function toggleFaq(el) {
  const item = el.parentElement;
  item.classList.toggle('open');
}

// ─── HOTBAR ───
document.querySelectorAll('.hotbar-slot').forEach((slot, i) => {
  slot.addEventListener('click', () => {
    document.querySelectorAll('.hotbar-slot').forEach(s => s.classList.remove('active'));
    slot.classList.add('active');
  });
});

// ─── SCROLL REVEAL ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.track-card, .stat-card, .tl-content, .faq-item, .sponsor-logo, .prize-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ─── PIXEL ICON BUILDER ───
function makePixelIcon(containerId, colors, pattern) {
  const el = document.getElementById(containerId);
  if (!el) return;
  pattern.forEach((row) => {
    row.forEach((col) => {
      const cell = document.createElement('div');
      cell.style.cssText = `
        background:${colors[col]};
        width:100%;height:100%;
        display:block;
      `;
      el.appendChild(cell);
    });
  });
}

// Grass block icon
makePixelIcon('grass-icon',
  ['#5d9e3f','#3d7a26','#8B6340','transparent'],
  [
    [0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,1,0],
    [0,0,0,0,0,0,0,0],
    [0,0,1,0,0,1,0,0],
    [2,2,2,2,2,2,2,2],
    [3,2,2,3,2,2,3,2],
    [2,3,2,2,3,2,2,3],
    [3,2,3,2,2,3,2,3],
  ]
);

// Diamond icon
makePixelIcon('diamond-icon',
  ['#5de8f0','#2a9aa5','#a8f5ff','transparent'],
  [
    [3,3,0,0,0,0,3,3],
    [3,0,1,0,0,1,0,3],
    [0,2,2,0,0,2,2,0],
    [0,0,2,0,0,2,0,0],
    [3,0,0,2,2,0,0,3],
    [3,3,0,0,0,0,3,3],
    [3,3,3,0,0,3,3,3],
    [3,3,3,3,3,3,3,3],
  ]
);

// ─── SMOOTH NAV SHRINK ON SCROLL ───
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 80) {
    nav.style.height = '48px';
    nav.style.borderBottomWidth = '2px';
  } else {
    nav.style.height = '64px';
    nav.style.borderBottomWidth = '4px';
  }
});
