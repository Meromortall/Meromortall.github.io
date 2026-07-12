// notifications.js - Sistema de notificações e lembretes
class NotificationManager {
    constructor() {
        this.reminderTimeout = null;
    }

    async requestPermission() {
        if (!('Notification' in window)) return;
        if (Notification.permission === 'default') {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                Toast.show('🔔 Notificações ativadas!');
                this.scheduleReminder();
            }
        }
    }

    send(body, title = 'Life RPG') {
        if (!('Notification' in window) || Notification.permission !== 'granted') return;
        new Notification(title, {
            body,
            icon: '⚔️',
            vibrate: [200, 100, 200],
            badge: '⚔️',
        });
    }

    scheduleReminder() {
        const reminderTime = localStorage.getItem('reminderTime') || '20:00';
        const reminderEnabled = localStorage.getItem('reminderEnabled') || 'true';
        
        if (reminderEnabled !== 'true') return;
        if (this.reminderTimeout) clearTimeout(this.reminderTimeout);
        
        const [hours, minutes] = reminderTime.split(':').map(Number);
        const now = new Date();
        const reminderDate = new Date();
        reminderDate.setHours(hours, minutes, 0, 0);
        
        if (reminderDate <= now) reminderDate.setDate(reminderDate.getDate() + 1);
        
        const timeUntilReminder = reminderDate - now;
        
        this.reminderTimeout = setTimeout(() => {
            const today = State.getToday();
            const completed = State.state.completedMissions[today]?.length || 0;
            const total = ALL_MISSIONS.length;
            const remaining = total - completed;
            
            if (remaining > 0) {
                this.send(`📋 ${remaining} missões pendentes! Não perca seu streak de ${State.state.streakDays} dias! 🔥`);
                Toast.show(`📋 ${remaining} missões pendentes hoje!`);
            }
            this.scheduleReminder();
        }, timeUntilReminder);
    }
}

const Notifications = new NotificationManager();