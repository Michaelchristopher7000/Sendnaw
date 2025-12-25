document.addEventListener("DOMContentLoaded", () => {
  const chatInput = document.getElementById("chatInput");
  const sendBtn = document.getElementById("sendBtn");
  const chatBody = document.getElementById("chatBody");
  const chatModal = document.getElementById("revanlabChatModal");

  chatModal.addEventListener("shown.bs.modal", () => {
    chatInput.focus();
  });

  const sendMessage = () => {
    const message = chatInput.value.trim();
    if (!message) return;

    // User bubble
    const userBubble = document.createElement("div");
    userBubble.className = "d-flex justify-content-end mb-2";
    userBubble.innerHTML = `
      <div class="bg-primary text-white p-2 rounded-3 small">
        ${message}
      </div>
    `;
    chatBody.appendChild(userBubble);

    chatInput.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    // Auto-reply (demo)
    setTimeout(() => {
      const botBubble = document.createElement("div");
      botBubble.className = "d-flex mb-2";
      botBubble.innerHTML = `
        <div class="bg-light p-2 rounded-3 small">
          Thanks for contacting Revanlab 💜  
          Our team will respond shortly.
        </div>
      `;
      chatBody.appendChild(botBubble);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 800);
  };

  sendBtn.addEventListener("click", sendMessage);

  chatInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
});



document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('#auth-overlay');
  const triggers = document.querySelectorAll('.cta-trigger');
  const closeBtn = document.querySelector('#close-auth');
  const panels = document.querySelectorAll('.auth-panel');
  const tabs = document.querySelectorAll('.auth-tab');

  // Logic to switch between Login and Signup
  const showPanel = (type) => {
    panels.forEach(p => p.classList.add('d-none'));
    tabs.forEach(t => t.classList.remove('active'));

    const activePanel = document.getElementById(type);
    const activeTab = document.querySelector(`[data-target="${type}"]`);

    if (activePanel) activePanel.classList.remove('d-none');
    if (activeTab) activeTab.classList.add('active');
  };

  // Open the overlay
  const showAuth = (e) => {
    e.preventDefault();
    // Get 'login' or 'signup' from the clicked button's data-auth attribute
    const type = e.currentTarget.dataset.auth || 'login';
    showPanel(type);
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  const hideAuth = () => {
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
  };

  // Event Listeners
  triggers.forEach(btn => btn.addEventListener('click', showAuth));
  closeBtn.addEventListener('click', hideAuth);

  overlay.addEventListener('click', e => {
    if (e.target === overlay) hideAuth();
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => showPanel(tab.dataset.target));
  });
})



 const style = document.createElement('style');
  style.innerHTML = `
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.3); opacity: 0.7; }
      100% { transform: scale(1); opacity: 1; }
    }
  `;
  document.head.appendChild(style);