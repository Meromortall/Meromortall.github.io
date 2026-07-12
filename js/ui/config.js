// config.js - Tela de configurações
class ConfigUIManager {
    render(container) {
        const today = State.getToday();
        const completed = State.state.completedMissions[today]?.length || 0;
        const reminderTime = localStorage.getItem('reminderTime') || '20:00';
        const reminderEnabled = localStorage.getItem('reminderEnabled') || 'true';
        const available = State.points.getAvailable();
        const expiring = State.points.getExpiring();

        let html = '';

        // Configurações de lembrete
        html += `
            <div class="section-title">⏰ Lembretes</div>
            <div class="glass-card" style="margin-bottom: 16px;">
                <div style="margin-bottom: 12px;">
                    <label style="font-size: var(--font-xs); color: var(--text-muted); display: block; margin-bottom: 4px;">Horário do lembrete diário</label>
                    <input type="time" id="reminderTime" value="${reminderTime}" 
                           style="width: 100%; padding: 10px; background: var(--bg-card); border: 1px solid var(--border); 
                                  color: var(--text-primary); border-radius: var(--radius-sm); font-size: var(--font-base);">
                </div>
                <div style="margin-bottom: 12px;">
                    <label style="font-size: var(--font-xs); color: var(--text-muted); display: block; margin-bottom: 4px;">Lembrete de missões pendentes</label>
                    <select id="reminderEnabled" 
                            style="width: 100%; padding: 10px; background: var(--bg-card); border: 1px solid var(--border); 
                                   color: var(--text-primary); border-radius: var(--radius-sm); font-size: var(--font-base);">
                        <option value="true" ${reminderEnabled === 'true' ? 'selected' : ''}>Ativado</option>
                        <option value="false" ${reminderEnabled === 'false' ? 'selected' : ''}>Desativado</option>
                    </select>
                </div>
                <button class="btn btn-primary btn-block" onclick="ConfigUI.saveConfig()">💾 Salvar Configurações</button>
            </div>
        `;

        // Resumo do sistema
        html += `
            <div class="section-title">📊 Resumo do Sistema</div>
            <div class="glass-card" style="margin-bottom: 16px;">
                <div style="font-size: var(--font-sm); color: var(--text-secondary); line-height: 2;">
                    <div>• Missões completadas hoje: <span style="color: var(--accent-light); font-weight: 600;">${completed}</span></div>
                    <div>• Pontos disponíveis: <span style="color: var(--gold); font-weight: 600;">${available}</span></div>
                    <div>• Total ganho: <span style="color: var(--success); font-weight: 600;">${State.state.totalEarned}</span></div>
                    <div>• Total gasto: <span style="color: var(--text-secondary); font-weight: 600;">${State.state.totalSpent}</span></div>
                    <div>• Streak atual: <span style="color: var(--warning); font-weight: 600;">${State.state.streakDays} dias</span></div>
                    <div>• Nível: <span style="color: var(--accent-light); font-weight: 600;">${State.getLevel()}</span></div>
                </div>
            </div>
        `;

        // Pontos expirando
        html += `
            <div class="section-title">📅 Pontos Expirando</div>
            <div class="glass-card" style="margin-bottom: 16px;">
                <div style="display: flex; gap: 12px;">
                    <div style="flex: 1; text-align: center; padding: 12px; background: ${expiring.today > 0 ? 'rgba(239,68,68,0.1)' : 'var(--bg-card)'}; border-radius: var(--radius-sm);">
                        <div style="font-size: var(--font-xs); color: var(--text-muted);">Hoje</div>
                        <div style="font-size: var(--font-xl); font-weight: 700; color: ${expiring.today > 0 ? 'var(--danger)' : 'var(--text-muted)'};">${expiring.today}</div>
                    </div>
                    <div style="flex: 1; text-align: center; padding: 12px; background: ${expiring.in3Days > 0 ? 'rgba(245,158,11,0.1)' : 'var(--bg-card)'}; border-radius: var(--radius-sm);">
                        <div style="font-size: var(--font-xs); color: var(--text-muted);">3 dias</div>
                        <div style="font-size: var(--font-xl); font-weight: 700; color: ${expiring.in3Days > 0 ? 'var(--warning)' : 'var(--text-muted)'};">${expiring.in3Days}</div>
                    </div>
                    <div style="flex: 1; text-align: center; padding: 12px; background: var(--bg-card); border-radius: var(--radius-sm);">
                        <div style="font-size: var(--font-xs); color: var(--text-muted);">7 dias</div>
                        <div style="font-size: var(--font-xl); font-weight: 700; color: var(--text-muted);">${expiring.in7Days}</div>
                    </div>
                </div>
            </div>
        `;

        // Botão de reset
        html += `
            <div class="section-title">🔄 Zona de Perigo</div>
            <div class="glass-card" style="border-color: var(--danger);">
                <div style="font-size: var(--font-xs); color: var(--text-muted); margin-bottom: 12px;">
                    Isso irá apagar TODO o seu progresso permanentemente.
                </div>
                <button class="btn btn-danger btn-block" onclick="ConfigUI.resetAll()">🔄 Resetar Tudo</button>
            </div>
        `;

        container.innerHTML = html;
    }

    saveConfig() {
        const timeInput = document.getElementById('reminderTime');
        const enabledInput = document.getElementById('reminderEnabled');
        
        if (timeInput) localStorage.setItem('reminderTime', timeInput.value);
        if (enabledInput) localStorage.setItem('reminderEnabled', enabledInput.value);
        
        Notifications.scheduleReminder();
        Toast.success('⚙️ Configurações salvas!');
    }

    resetAll() {
        if (confirm('Tem certeza que deseja resetar TUDO? Esta ação não pode ser desfeita!')) {
            State.reset();
            Toast.show('🔄 Tudo resetado!');
            Sidebar.navigate('missions');
        }
    }
}

const ConfigUI = new ConfigUIManager();