let personalities = {};
let currentPersonality = null;
let isGroup = false;
let messageCount = 0;

const EMOTIONS = {
  panic: ['panic', "can't breathe", 'heart racing', 'freaking out', 'help me', 'emergency', 'hyperventilating'],
  anxiety: ['anxious', 'worry', 'nervous', 'scared', 'fear', 'overthinking', 'dread'],
  sadness: ['sad', 'depressed', 'crying', 'empty', 'hopeless', 'lonely', 'numb', 'broken'],
  stress: ['stressed', 'overwhelmed', 'pressure', 'burnout', 'too much'],
  motivation: ['motivated', 'determined', 'focused', 'ready', "let's go", 'i will', 'strong'],
};

window.addEventListener('beforeunload', function () {
  navigator.sendBeacon('/api/session/save');
});

// Particle canvas
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const count = Math.min(Math.floor((w * h) / 18000), 80);
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
    size: Math.random() * 2 + 0.5,
    alpha: Math.random() * 0.3 + 0.1,
    phase: Math.random() * Math.PI * 2,
  }));

  function animate() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy; p.phase += 0.015;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = '#00d4ff';
      ctx.globalAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.phase));
      ctx.fill();
    }
    ctx.globalAlpha = 0.015;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = '#00d4ff';
          ctx.globalAlpha = 0.06 * (1 - dist / 100);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  animate();
})();

// Load personalities
fetch('/api/personalities')
  .then(r => r.json())
  .then(data => {
    personalities = data;
    renderSidebar();
    renderCards();
    renderGroupBadges();
  });

function renderSidebar() {
  const list = document.getElementById('personalityList');
  list.innerHTML = '';
  Object.entries(personalities).forEach(([id, p]) => {
    const div = document.createElement('div');
    div.className = 'personality-item';
    div.innerHTML = `
      <div class="personality-avatar" style="background:${p.color}15;border-color:${p.color}33;box-shadow:0 0 12px ${p.color}22;">${p.name[0]}</div>
      <div><div class="personality-name" style="color:${p.color}">${p.name}</div><div class="personality-role">${p.role}</div></div>
    `;
    div.onclick = () => openChat(id);
    list.appendChild(div);
  });
}

function renderCards() {
  const grid = document.getElementById('cardGrid');
  grid.innerHTML = '';
  Object.entries(personalities).forEach(([id, p]) => {
    const card = document.createElement('div');
    card.className = 'ai-card glass';
    card.style.setProperty('--c', p.color);
    card.innerHTML = `
      <div class="card-avatar" style="background:${p.color}15;border-color:${p.color}33;box-shadow:0 0 20px ${p.color}22;">${p.name[0]}</div>
      <div class="card-name" style="color:${p.color}">${p.name}</div>
      <div class="card-role">${p.role}</div>
      <div class="card-desc">${getDesc(id)}</div>
      <div class="card-indicator" style="color:${p.color}88">ENTER CHANNEL <span>→</span></div>
    `;
    card.onmouseenter = function () {
      this.style.borderColor = `${p.color}33`;
      this.style.boxShadow = `0 0 30px ${p.color}22`;
    };
    card.onmouseleave = function () {
      this.style.borderColor = 'rgba(255,255,255,0.04)';
      this.style.boxShadow = 'none';
    };
    card.onclick = () => openChat(id);
    grid.appendChild(card);
  });
}

function getDesc(id) {
  const descs = {
    devil: 'The shadow that speaks the truth you need to hear. Sharp, honest, and relentless.',
    angel: 'A guardian of light and hope. Warm, wise, and deeply protective.',
  };
  return descs[id] || '';
}

function renderGroupBadges() {
  const container = document.getElementById('groupBadges');
  container.innerHTML = '';
  Object.entries(personalities).forEach(([id, p]) => {
    const span = document.createElement('span');
    span.className = 'group-badge glass-light';
    span.style.cssText = `color:${p.color};border-color:${p.color}22`;
    span.textContent = p.name;
    container.appendChild(span);
  });
}

function openChat(id) {
  currentPersonality = id;
  isGroup = false;
  showView('chat');
  const p = personalities[id];
  const avatar = document.getElementById('chatAvatar');
  avatar.style.cssText = `background:${p.color}15;border-color:${p.color}33;box-shadow:0 0 20px ${p.color}22;overflow:hidden;`;
  avatar.textContent = `${p.name[0]}`;
  document.getElementById('chatName').style.color = p.color;
  document.getElementById('chatName').textContent = p.name;
  document.getElementById('chatRole').textContent = p.role;
  document.getElementById('messagesList').innerHTML = '';
  document.getElementById('emptyState').style.display = 'flex';
  document.getElementById('chatInput').focus();
  updateSidebarActive(id);
}

let groupAutoStarted = false;
let autoPlaying = false;
let autoQueue = [];
let autoTimer = null;

function openGroupChat() {
  isGroup = true;
  showView('group');
  document.getElementById('groupInput').focus();
  updateSidebarActive(null);
  const existing = document.getElementById('groupMessagesList').children.length;
  if (existing === 0 && !groupAutoStarted) {
    groupAutoStarted = true;
    startAutoGroupChat();
  }
}

function startAutoGroupChat() {
  document.getElementById('groupEmptyState').style.display = 'none';
  autoPlaying = true;
  fetch('/api/chat/group/auto', { method: 'POST' })
    .then(r => r.json())
    .then(data => {
      autoQueue = data.responses || [];
      playNextAuto();
    })
    .catch(() => { autoPlaying = false; });
}

function playNextAuto() {
  if (!autoPlaying || autoQueue.length === 0) {
    autoPlaying = false;
    return;
  }
  if (document.getElementById('groupMessagesList').querySelector('.message:last-child')?.classList.contains('user')) {
    autoPlaying = false;
    autoQueue = [];
    return;
  }

  const r = autoQueue.shift();
  const typingEl = document.getElementById('groupTypingIndicator');
  const p = personalities[r.personality];
  const c = p ? p.color : '#00d4ff';
  typingEl.style.display = 'flex';
  typingEl.innerHTML = `
    <div class="message-avatar" style="background:${c}15;border-color:${c}33;">${p.name[0]}</div>
    <div class="glass-light" style="padding:0.6rem 1rem;border-radius:1rem;display:flex;align-items:center;gap:0.5rem;">
      <span style="font-size:0.65rem;color:${c};font-family:'Orbitron',sans-serif;">${p ? p.name : r.personality}</span>
      <div class="typing-dots">
        <div class="typing-dot" style="background:${c}"></div>
        <div class="typing-dot" style="background:${c}"></div>
        <div class="typing-dot" style="background:${c}"></div>
      </div>
    </div>`;
  scrollToBottom('groupMessagesList');

  const thinkTime = 800 + Math.random() * 600;
  autoTimer = setTimeout(() => {
    if (!autoPlaying) return;
    document.getElementById('groupTypingIndicator').style.display = 'none';
    addGroupMessage('ai', r.reply, r.personality);
    const pause = 300 + Math.random() * 300;
    autoTimer = setTimeout(playNextAuto, pause);
  }, thinkTime);
}

function cancelAutoPlay() {
  autoPlaying = false;
  autoQueue = [];
  if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; }
  document.getElementById('groupTypingIndicator').style.display = 'none';
}

function backToHome() {
  document.getElementById('homeScreen').style.display = 'flex';
  document.getElementById('chatView').style.display = 'none';
  document.getElementById('groupChatView').style.display = 'none';
  document.getElementById('memoriesView').style.display = 'none';
  hideEmotionBadge();
  hidePanicMode();
  updateSidebarActive(null);
}

function showView(view) {
  document.getElementById('homeScreen').style.display = 'none';
  document.getElementById('chatView').style.display = 'none';
  document.getElementById('groupChatView').style.display = 'none';
  document.getElementById('memoriesView').style.display = 'none';
  if (view === 'chat') document.getElementById('chatView').style.display = 'flex';
  else if (view === 'group') document.getElementById('groupChatView').style.display = 'flex';
  else if (view === 'memories') document.getElementById('memoriesView').style.display = 'flex';
}

function updateSidebarActive(id) {
  document.querySelectorAll('.personality-item').forEach((el, i) => {
    el.classList.toggle('active', Object.keys(personalities)[i] === id);
  });
  if (window.innerWidth <= 768) closeMobileMenu();
}

// Mobile menu
function toggleMobileMenu() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('mobileOverlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
}
function closeMobileMenu() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('mobileOverlay').classList.remove('open');
}

// Send message
function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text || !currentPersonality) return;
  input.value = '';
  input.style.height = 'auto';
  addMessage('user', text, null);
  document.getElementById('emptyState').style.display = 'none';
  showTyping(currentPersonality);
  detectEmotion(text);

  fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: text, personality: currentPersonality }),
  })
    .then(r => r.json())
    .then(data => {
      hideTyping();
      addMessage('ai', data.reply, data.personality);
    })
    .catch(() => {
      hideTyping();
      addMessage('ai', '[Connection error. Please try again.]', currentPersonality);
    });
}

function sendGroupMessage() {
  const input = document.getElementById('groupInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  input.style.height = 'auto';
  cancelAutoPlay();
  addGroupMessage('user', text);
  document.getElementById('groupEmptyState').style.display = 'none';
  detectEmotion(text);

  document.getElementById('sendBtn').disabled = true;
  // Show all 4 typing simultaneously
  const pList = Object.entries(personalities);
  showGroupTyping('group');

  fetch('/api/chat/group', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: text }),
  })
    .then(r => r.json())
    .then(data => {
      hideGroupTyping();
      let pi = 0;
      function showNext() {
        if (pi >= data.responses.length) {
          document.getElementById('sendBtn').disabled = false;
          return;
        }
        const r = data.responses[pi];
        addGroupMessage('ai', r.reply, r.personality);
        pi++;
        setTimeout(showNext, 400 + Math.random() * 300);
      }
      showNext();
    })
    .catch(() => {
      hideGroupTyping();
      document.getElementById('sendBtn').disabled = false;
    });
}

// Message display
function addMessage(role, content, personality) {
  const container = document.getElementById('messagesList');
  const isUser = role === 'user';
  const div = document.createElement('div');
  div.className = `message ${isUser ? 'user' : 'ai'}`;

  if (!isUser && personality) {
    const p = personalities[personality];
    const c = p ? p.color : '#00d4ff';
    div.innerHTML = `
      <div style="max-width:75%">
        <div class="message-row">
          <div class="message-avatar" style="background:${c}15;border-color:${c}33;">${p.name[0]}</div>
          <div>
            <div class="message-label" style="color:${c}">${p ? p.name : personality}</div>
            <div class="message-bubble" style="border-color:${c}22;box-shadow:0 0 12px ${c}11"></div>
          </div>
        </div>
      </div>`;
    div.querySelector('.message-bubble').textContent = content;
  } else {
    div.innerHTML = `<div class="message-bubble">${escapeHtml(content)}</div>`;
  }

  container.appendChild(div);
  scrollToBottom('messagesContainer');
}

function addGroupMessage(role, content, personality) {
  const container = document.getElementById('groupMessagesList');
  const isUser = role === 'user';
  const div = document.createElement('div');
  div.className = `message ${isUser ? 'user' : 'ai'}`;

  if (!isUser && personality) {
    const p = personalities[personality];
    const c = p ? p.color : '#00d4ff';
    div.innerHTML = `
      <div style="max-width:75%">
        <div class="message-row">
          <div class="message-avatar" style="background:${c}15;border-color:${c}33;">${p.name[0]}</div>
          <div>
            <div class="message-label" style="color:${c}">${p ? p.name : personality}</div>
            <div class="message-bubble" style="border-color:${c}22;box-shadow:0 0 12px ${c}11"></div>
          </div>
        </div>
      </div>`;
    div.querySelector('.message-bubble').textContent = content;
  } else if (isUser) {
    div.innerHTML = `<div class="message-bubble">${escapeHtml(content)}</div>`;
  }

  container.appendChild(div);
  scrollToBottom('groupMessagesList');
}

function showTyping(personality) {
  const p = personalities[personality];
  const c = p ? p.color : '#00d4ff';
  const el = document.getElementById('typingIndicator');
  el.style.display = 'flex';
  el.innerHTML = `
    <div class="message-avatar" style="background:${c}15;border-color:${c}33;">${p.name[0]}</div>
    <div class="glass-light" style="padding:0.6rem 1rem;border-radius:1rem;">
      <div class="typing-dots">
        <div class="typing-dot" style="background:${c}"></div>
        <div class="typing-dot" style="background:${c}"></div>
        <div class="typing-dot" style="background:${c}"></div>
      </div>
    </div>`;
  scrollToBottom('messagesContainer');
}

function hideTyping() {
  document.getElementById('typingIndicator').style.display = 'none';
}

function showGroupTyping(mode) {
  const el = document.getElementById('groupTypingIndicator');
  el.style.display = 'flex';
  if (mode === 'group') {
    el.innerHTML = Object.entries(personalities).map(([id, p]) => `
      <div class="message-avatar" style="background:${p.color}15;border-color:${p.color}33;width:1.8rem;height:1.8rem;">${p.name[0]}</div>
    `).join('');
  } else {
    const p = personalities[mode];
    const c = p ? p.color : '#00d4ff';
    el.innerHTML = `
      <div class="message-avatar" style="background:${c}15;border-color:${c}33;">${p.name[0]}</div>
      <div class="glass-light" style="padding:0.6rem 1rem;border-radius:1rem;display:flex;align-items:center;gap:0.5rem;">
        <span style="font-size:0.65rem;color:${c};font-family:'Orbitron',sans-serif;">${p ? p.name : mode}</span>
        <div class="typing-dots">
          <div class="typing-dot" style="background:${c}"></div>
          <div class="typing-dot" style="background:${c}"></div>
          <div class="typing-dot" style="background:${c}"></div>
        </div>
      </div>`;
  }
  scrollToBottom('groupMessagesList');
}

function hideGroupTyping() {
  document.getElementById('groupTypingIndicator').style.display = 'none';
}

function scrollToBottom(containerId) {
  const container = document.getElementById(containerId);
  setTimeout(() => { container.scrollTop = container.scrollHeight; }, 50);
}

// Emotion detection
function detectEmotion(text) {
  const t = text.toLowerCase();
  let detected = null;
  let max = 0;
  for (const [emotion, keywords] of Object.entries(EMOTIONS)) {
    const score = keywords.filter(k => t.includes(k)).length;
    if (score > max) { max = score; detected = emotion; }
  }
  if (detected) showEmotionBadge(detected);
  if (detected === 'panic') showPanicMode();
}

function showEmotionBadge(emotion) {
  const colors = { panic: '#ff69b4', anxiety: '#00d4ff', sadness: '#bb86fc', stress: '#ffa500', motivation: '#00ff41' };
  const labels = { panic: 'PANIC DETECTED', anxiety: 'ANXIETY', sadness: 'SADNESS', stress: 'STRESS', motivation: 'MOTIVATION' };
  const c = colors[emotion] || '#00d4ff';
  const badge = document.getElementById('emotionBadge');
  badge.style.display = 'block';
  badge.style.cssText += `background:${c}15;border-color:${c}44;color:${c};box-shadow:0 0 20px ${c}22`;
  badge.textContent = labels[emotion] || emotion.toUpperCase();
  setTimeout(hideEmotionBadge, 8000);
}

function hideEmotionBadge() {
  document.getElementById('emotionBadge').style.display = 'none';
}

function showPanicMode() {
  const overlay = document.getElementById('panicOverlay');
  overlay.style.display = 'flex';
  const phases = [
    { label: 'Breathe In', scale: 1.35, duration: 4000 },
    { label: 'Hold', scale: 1.35, duration: 4000 },
    { label: 'Breathe Out', scale: 0.85, duration: 4000 },
  ];
  let pi = 0, startTime = Date.now();

  function animateBreathing() {
    if (overlay.style.display === 'none') return;
    const phase = phases[pi];
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / phase.duration, 1);

    document.getElementById('breathingLabel').textContent = phase.label;
    const inner = document.getElementById('breathingInner');
    const currentScale = 0.85 + (phase.scale - 0.85) * (phase.name === 'exhale' ? 1 - progress : progress);
    inner.style.transform = `scale(${currentScale})`;
    document.getElementById('breathingBar').style.width = `${progress * 100}%`;

    if (elapsed >= phase.duration) {
      pi = (pi + 1) % phases.length;
      startTime = Date.now();
    }
    requestAnimationFrame(animateBreathing);
  }
  animateBreathing();

  setTimeout(() => { overlay.style.display = 'none'; }, 60000);
}

function hidePanicMode() {
  document.getElementById('panicOverlay').style.display = 'none';
}

// Input handlers
function handleInputKey(e) {
  const ta = e.target;
  ta.style.height = 'auto';
  ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
}

function handleGroupInputKey(e) {
  const ta = e.target;
  ta.style.height = 'auto';
  ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendGroupMessage(); }
}

function saveSession() {
  fetch('/api/session/save', { method: 'POST' })
    .then(r => r.json())
    .then(data => {
      const badge = document.getElementById('emotionBadge');
      badge.style.display = 'block';
      badge.style.cssText = 'background:rgba(0,255,65,0.1);border-color:rgba(0,255,65,0.3);color:#00ff41;box-shadow:0 0 20px rgba(0,255,65,0.1)';
      badge.textContent = `SAVED ${data.saved.length} CHAT FILE(S)`;
      setTimeout(hideEmotionBadge, 3000);
    });
}

function clearSession() {
  if (!confirm('Clear all current chat messages? (Saved files will not be deleted)')) return;
  fetch('/api/session/clear', { method: 'POST' })
    .then(() => {
      document.getElementById('messagesList').innerHTML = '';
      document.getElementById('groupMessagesList').innerHTML = '';
      document.getElementById('emptyState').style.display = 'flex';
      document.getElementById('groupEmptyState').style.display = 'flex';
      groupAutoStarted = false;
    });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ── Memories ──

function showMemories() {
  showView('memories');
  updateSidebarActive(null);
  const list = document.getElementById('memoriesList');
  list.innerHTML = '<div style="text-align:center;padding:2rem;color:rgba(255,255,255,0.3)">Loading memories...</div>';
  fetch('/api/memories')
    .then(r => r.json())
    .then(data => {
      list.innerHTML = '';
      if (data.count === 0) {
        list.innerHTML = '<div style="text-align:center;padding:2rem;color:rgba(255,255,255,0.3)">// No memories yet. Save a session to create memories.</div>';
        return;
      }
      data.memories.forEach(mem => {
        const colors = { emotion: '#ff69b4', desire: '#00d4ff', thought: '#bb86fc' };
        const c = colors[mem.type] || '#00d4ff';
        const labels = { emotion: 'FEELING', desire: 'DESIRE', thought: 'THOUGHT' };
        const label = labels[mem.type] || 'NOTE';
        const div = document.createElement('div');
        div.className = 'memory-card glass';
        div.style.cssText = `border-left:3px solid ${c};padding:0.8rem 1rem;margin:0.5rem 1rem;border-radius:0.5rem;`;
        div.innerHTML = `
          <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.3rem;">
            <span style="font-size:0.55rem;font-family:'Orbitron',sans-serif;letter-spacing:0.1em;color:${c}">${label}</span>
            <span style="font-size:0.55rem;color:rgba(255,255,255,0.2)">|</span>
            <span style="font-size:0.55rem;color:${personalities[mem.personality] ? personalities[mem.personality].color : 'rgba(255,255,255,0.3)'}">${mem.personality}</span>
          </div>
          <div style="font-size:0.85rem;color:rgba(255,255,255,0.8);margin-bottom:0.3rem;">${escapeHtml(mem.content)}</div>
          ${mem.response ? `<div style="font-size:0.75rem;color:rgba(255,255,255,0.4);border-top:1px solid rgba(255,255,255,0.05);padding-top:0.3rem;margin-top:0.3rem;">→ ${escapeHtml(mem.response)}</div>` : ''}
        `;
        list.appendChild(div);
      });
    })
    .catch(() => {
      list.innerHTML = '<div style="text-align:center;padding:2rem;color:#ff0040">Error loading memories.</div>';
    });
}

function deleteAllMemories() {
  if (!confirm('Delete all stored memories? The AIs will forget everything about you.')) return;
  fetch('/api/memories', { method: 'DELETE' })
    .then(r => r.json())
    .then(() => {
      document.getElementById('memoriesList').innerHTML = '<div style="text-align:center;padding:2rem;color:rgba(255,255,255,0.3)">// All memories deleted.</div>';
    });
}
