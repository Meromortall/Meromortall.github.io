// timer.js - Gerenciamento do timer de horas compradas
class GameTimer {
    constructor() {
        this.interval = null;
    }

    start(hours, itemName) {
        this.stop();
        State.state.activeTimer = {
            endTime: Date.now() + (hours * 3600000),
            hours,
            itemName,
        };
        State.save();
        
        const timeUntilEnd = hours * 3600000;
        setTimeout(() => {
            if (State.state.activeTimer) {
                Toast.show('⏰ Tempo de jogo acabou!');
                Notifications.send('⏰ Seu tempo de jogo acabou! Hora de voltar à rotina.');
                this.stop();
            }
        }, timeUntilEnd);
        
        this.interval = setInterval(() => this.updateDisplay(), 1000);
        this.showOverlay(true);
        Header.render();
    }

    stop() {
        if (this.interval) clearInterval(this.interval);
        this.interval = null;
        State.state.activeTimer = null;
        State.save();
        this.showOverlay(false);
        Header.render();
    }

    updateDisplay() {
        if (!State.state.activeTimer) return;
        
        const remaining = State.state.activeTimer.endTime - Date.now();
        const display = document.getElementById('timerDisplay');
        if (!display) return;
        
        if (remaining <= 0) {
            display.textContent = '00:00:00';
            this.stop();
            return;
        }
        
        const h = Math.floor(remaining / 3600000);
        const m = Math.floor((remaining % 3600000) / 60000);
        const s = Math.floor((remaining % 60000) / 1000);
        display.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }

    showOverlay(show) {
        const overlay = document.getElementById('timerOverlay');
        if (overlay) overlay.style.display = show ? 'flex' : 'none';
    }

    getRemaining() {
        if (!State.state.activeTimer) return null;
        return Math.max(0, State.state.activeTimer.endTime - Date.now());
    }
}

const Timer = new GameTimer();