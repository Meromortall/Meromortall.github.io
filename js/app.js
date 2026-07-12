// app.js - Inicialização do aplicativo
class App {
    static init() {
        // Renderizar sidebar e header
        Sidebar.render();
        Header.render();

        // Iniciar na tela de missões
        Sidebar.navigate('missions');

        // Inicializar notificações
        Notifications.requestPermission();
        Notifications.scheduleReminder();

        // Verificar pontos expirados a cada hora
        setInterval(() => {
            const before = State.points.getAvailable();
            const expired = State.points.clean();
            State.checkInvestments();
            
            if (expired > 0) {
                Toast.warning(`⏰ ${expired} pontos expiraram!`);
                Header.render();
                Sidebar.render();
                
                // Re-renderizar tela atual
                Sidebar.navigate(Sidebar.currentTab);
            }
        }, 3600000);

        // Atualizar timer a cada segundo
        setInterval(() => {
            if (State.state.activeTimer) {
                Timer.updateDisplay();
            }
        }, 1000);

        // Registrar service worker para PWA
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').catch(() => {});
            });
        }

        // Salvar estado antes de sair
        window.addEventListener('beforeunload', () => {
            State.save();
        });

        // Verificar mudanças de dia a cada minuto
        setInterval(() => {
            const today = State.getToday();
            if (State.state.lastActiveDate !== today) {
                State.initDay();
                Header.render();
                Sidebar.render();
            }
        }, 60000);

        console.log('⚔️ Life RPG iniciado!');
        console.log(`📅 Data: ${State.getToday()}`);
        console.log(`👤 Classe: ${CLASSES[State.getDominantClass()].name}`);
        console.log(`⭐ Nível: ${State.getLevel()}`);
        console.log(`💰 Pontos: ${State.points.getAvailable()}`);
        console.log(`🔥 Streak: ${State.state.streakDays} dias`);
    }
}

// Iniciar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});