// analytics.js - Tela de estatísticas e gráficos
class AnalyticsUIManager {
    render(container) {
        const today = State.getToday();
        const completedToday = State.state.completedMissions[today]?.length || 0;

        // Dados dos últimos 7 dias
        const last7Days = [];
        const last7Points = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            const dayName = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][d.getDay()];
            last7Days.push(dayName);
            last7Points.push(State.state.dailyPointsHistory[dateStr] || 0);
        }

        const maxPoints = Math.max(...last7Points, 1);
        const totalPointsWeek = last7Points.reduce((a, b) => a + b, 0);

        // Contagem por categoria (7 dias)
        const categoryCount = { 'Saúde': 0, 'Mente': 0, 'Organização': 0, 'Alimentação': 0 };
        const categoryColors = { 'Saúde': '#ef4444', 'Mente': '#8b5cf6', 'Organização': '#f59e0b', 'Alimentação': '#10b981' };
        
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            const missions = State.state.completedMissions[dateStr] || [];
            missions.forEach(id => {
                if (['m1', 'm2', 'm8', 'm9', 'm10'].includes(id)) categoryCount['Saúde']++;
                else if (['m6', 'm7', 'm11', 'm12'].includes(id)) categoryCount['Mente']++;
                else if (['m3', 'm13', 'm14'].includes(id)) categoryCount['Organização']++;
                else if (['m4', 'm5', 'm15', 'm16'].includes(id)) categoryCount['Alimentação']++;
            });
        }

        const maxCategory = Math.max(...Object.values(categoryCount), 1);
        const totalMissionsWeek = Object.values(categoryCount).reduce((a, b) => a + b, 0);

        let html = '';

        // Cards de resumo
        html += `
            <div class="grid-2" style="margin-bottom: 20px;">
                <div class="glass-card" style="text-align: center;">
                    <div style="font-size: var(--font-xs); color: var(--text-muted);">📋 Missões (7d)</div>
                    <div style="font-size: var(--font-2xl); font-weight: 700; color: var(--accent-light);">${totalMissionsWeek}</div>
                </div>
                <div class="glass-card" style="text-align: center;">
                    <div style="font-size: var(--font-xs); color: var(--text-muted);">⭐ Pontos (7d)</div>
                    <div style="font-size: var(--font-2xl); font-weight: 700; color: var(--gold);">${totalPointsWeek}</div>
                </div>
                <div class="glass-card" style="text-align: center;">
                    <div style="font-size: var(--font-xs); color: var(--text-muted);">📅 Hoje</div>
                    <div style="font-size: var(--font-2xl); font-weight: 700;">${completedToday}</div>
                    <div style="font-size: 10px; color: var(--text-muted);">missões</div>
                </div>
                <div class="glass-card" style="text-align: center;">
                    <div style="font-size: var(--font-xs); color: var(--text-muted);">🔥 Streak</div>
                    <div style="font-size: var(--font-2xl); font-weight: 700; color: var(--warning);">${State.state.streakDays}</div>
                    <div style="font-size: 10px; color: var(--text-muted);">dias</div>
                </div>
            </div>
        `;

        // Gráfico de barras
        html += '<div class="section-title">📈 Pontos por Dia</div>';
        html += '<div class="glass-card" style="padding: 16px;">';
        html += '<div style="display: flex; align-items: flex-end; gap: 6px; height: 120px;">';
        
        last7Points.forEach((points, index) => {
            const height = maxPoints > 0 ? (points / maxPoints) * 100 : 0;
            const isToday = index === 6;
            html += `
                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; height: 100%; justify-content: flex-end;">
                    <div style="font-size: 10px; color: var(--text-muted); font-weight: ${isToday ? '700' : '400'};">${points}</div>
                    <div style="width: 100%; height: ${Math.max(height, 2)}%; background: ${isToday ? 'var(--accent)' : 'var(--border-light)'}; 
                         border-radius: 4px 4px 0 0; transition: height 0.5s ease;"></div>
                    <div style="font-size: 10px; color: ${isToday ? 'var(--text-primary)' : 'var(--text-muted)'}; font-weight: ${isToday ? '700' : '400'};">
                        ${last7Days[index]}
                    </div>
                </div>
            `;
        });
        
        html += '</div></div>';

        // Categorias
        html += '<div class="section-title" style="margin-top: 20px;">🎯 Por Categoria (7 dias)</div>';
        
        Object.entries(categoryCount).forEach(([cat, count]) => {
            const barWidth = maxCategory > 0 ? (count / maxCategory) * 100 : 0;
            html += `
                <div style="margin-bottom: 10px;">
                    <div style="display: flex; justify-content: space-between; font-size: var(--font-xs); margin-bottom: 4px;">
                        <span style="color: var(--text-secondary);">${cat}</span>
                        <span style="color: ${categoryColors[cat]}; font-weight: 600;">${count}</span>
                    </div>
                    <div class="progress" style="height: 8px;">
                        <div class="progress-fill" style="width: ${barWidth}%; background: ${categoryColors[cat]};"></div>
                    </div>
                </div>
            `;
        });

        // Recordes
        html += '<div class="section-title" style="margin-top: 20px;">🏅 Recordes</div>';
        html += `
            <div class="glass-card">
                <div style="font-size: var(--font-sm); color: var(--text-secondary); line-height: 2;">
                    <div>• Maior streak: <span style="color: var(--warning); font-weight: 600;">${State.state.maxStreak || State.state.streakDays} dias</span></div>
                    <div>• Nível atual: <span style="color: var(--accent-light); font-weight: 600;">${State.getLevel()} - ${CONFIG.getLevelName(State.getLevel())}</span></div>
                    <div>• Total de pontos ganhos: <span style="color: var(--gold); font-weight: 600;">${State.state.totalEarned}</span></div>
                    <div>• Total de pontos gastos: <span style="color: var(--text-secondary); font-weight: 600;">${State.state.totalSpent}</span></div>
                    <div>• Investimentos concluídos: <span style="color: var(--success); font-weight: 600;">${State.state.completedInvestments || 0}</span></div>
                    <div>• Conquistas: <span style="color: var(--warning); font-weight: 600;">${Object.keys(State.state.achievements || {}).length}/${ACHIEVEMENTS.length}</span></div>
                    <div>• Classe principal: <span style="color: ${CLASSES[State.getDominantClass()].color}; font-weight: 600;">${CLASSES[State.getDominantClass()].name} ${CLASSES[State.getDominantClass()].emoji}</span></div>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }
}

const AnalyticsUI = new AnalyticsUIManager();