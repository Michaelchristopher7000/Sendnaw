const TOAST_CONFIGS = {
  success: {
    accent: '#10B981',
    iconBg: '#D1FAE5',
    iconColor: '#065F46',
    icon: '✓',
  },
  error: {
    accent: '#EF4444',
    iconBg: '#FEE2E2',
    iconColor: '#991B1B',
    icon: '✕',
  },
  warning: {
    accent: '#F59E0B',
    iconBg: '#FEF3C7',
    iconColor: '#92400E',
    icon: '!',
  },
  info: {
    accent: '#4F46E5',
    iconBg: '#EDE9FE',
    iconColor: '#3730A3',
    icon: 'i',
  },
};

function getOrCreateContainer() {
  let container = document.getElementById('snw-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'snw-toast-container';
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
      max-width: 360px;
      width: calc(100% - 40px);
    `;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes snw-in {
        from { opacity: 0; transform: translateX(60px) scale(0.95); }
        to   { opacity: 1; transform: translateX(0) scale(1); }
      }
      @keyframes snw-out {
        from { opacity: 1; transform: translateX(0) scale(1); max-height: 120px; }
        to   { opacity: 0; transform: translateX(60px) scale(0.95); max-height: 0; padding: 0; margin: 0; }
      }
      @keyframes snw-progress {
        from { width: 100%; }
        to   { width: 0%; }
      }
      .snw-toast {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 14px 16px;
        border-radius: 16px;
        pointer-events: all;
        position: relative;
        overflow: hidden;
        animation: snw-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        background: #fff;
        border: 1px solid rgba(0,0,0,0.08);
        box-shadow: 0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06);
        font-family: 'DM Sans', 'Segoe UI', sans-serif;
      }
      .snw-toast.leaving {
        animation: snw-out 0.25s ease forwards;
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(container);
  }
  return container;
}

function dismissToast(toast) {
  if (!toast || toast.classList.contains('leaving')) return;
  clearTimeout(toast._timer);
  toast.classList.add('leaving');
  setTimeout(() => toast.remove(), 280);
}

export function showNotification(title, body, type = 'info') {
  const c = TOAST_CONFIGS[type] || TOAST_CONFIGS.info;
  const duration = 4000;
  const container = getOrCreateContainer();

  const now = new Date().toLocaleTimeString('en-NG', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const toast = document.createElement('div');
  toast.className = 'snw-toast';
  toast.innerHTML = `
    <div style="position:absolute;left:0;top:0;bottom:0;width:4px;background:${c.accent};border-radius:16px 0 0 16px"></div>
    <div style="width:36px;height:36px;border-radius:50%;background:${c.iconBg};color:${c.iconColor};display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700;font-size:14px;margin-left:4px">${c.icon}</div>
    <div style="flex:1;min-width:0">
      <div style="font-size:13px;font-weight:700;color:#111827;margin-bottom:2px;line-height:1.3">${title}</div>
      <div style="font-size:12.5px;color:#6B7280;line-height:1.45">${body}</div>
      <div style="font-size:10px;color:#9CA3AF;margin-top:4px">${now}</div>
    </div>
    <button onclick="this.parentElement._dismiss()" style="width:22px;height:22px;border-radius:50%;border:none;background:rgba(0,0,0,0.06);display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;font-size:11px;color:#6B7280;margin-top:1px;font-family:inherit">✕</button>
    <div style="position:absolute;bottom:0;left:0;height:2px;background:${c.accent};border-radius:0 0 16px 16px;animation:snw-progress ${duration}ms linear forwards"></div>
  `;

  toast._dismiss = () => dismissToast(toast);
  toast._timer = setTimeout(() => dismissToast(toast), duration);

  container.appendChild(toast);
}

export async function requestNotificationPermission() {
  return true;
}