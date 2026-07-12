// toast.js - Sistema de notificações toast
class ToastManager {
    show(message, type = 'info', duration = 2500) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--bg-card);
            border: 1px solid var(--border-light);
            color: var(--text-primary);
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: 600;
            font-size: var(--font-sm);
            z-index: 10000;
            animation: toastIn 0.3s ease, toastOut 0.3s ease ${duration - 300}ms forwards;
            pointer-events: none;
            backdrop-filter: blur(20px);
            box-shadow: var(--shadow-lg);
            max-width: 90vw;
            text-align: center;
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), duration);
    }

    success(msg) { this.show(msg, 'success'); }
    error(msg) { this.show(msg, 'error'); }
    warning(msg) { this.show(msg, 'warning'); }
}

const Toast = new ToastManager();