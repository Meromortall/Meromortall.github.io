// missions.js - Tela de missões
class MissionsUIManager {
    render(container) {
        const today = State.getToday();
        const completed = State.state.completedMissions[today] || [];
        const multiplier = State.getMissionMultiplier();

        let html = `
            <!-- Card de Streak -->
            <div class="glass-card" style="text-align: center; margin-bottom: 20px;">
                <div class="streak-fire" style="font-size: 40px;">🔥</div>
                <div style="font-size: var(--font-xl); font-weight: 700; color: var(--warning);">${State.state.streakDays} dias</div>
                <div style="font-size: var(--font-xs); color: var(--text-muted);">Complete ao menos 1 missão por dia</div>
                ${multiplier > 1 ? '<span class="badge badge-warning" style="margin-top: 4px;">⚡ Multiplicador ' + multiplier + 'x ativo!</span>' : ''}
            </div>
        `;

        // Categorias de missões
        Object.entries(MISSION_CATEGORIES).forEach(([key, category]) => {
            const allCompleted = category.missions.every(m => completed.includes(m.id));
            const someCompleted = category.missions.some(m => completed.includes(m.id));

            html += `
                <div class="section-title">
                    <span>${category.emoji}</span> ${category.name}
                    ${allCompleted ? '<span class="badge badge-success">✓</span>' : ''}
                </div>
            `;

            category.missions.forEach(mission => {
                const isCompleted = completed.includes(mission.id);
                let points = mission.points * multiplier;

                const className = MISSION_CLASS_MAP[mission.id];
                if (className) {
                    const classLevel = State.getClassLevel(className);
                    const bonus = CLASSES[className].bonus[classLevel];
                    if (bonus?.apply) points = bonus.apply(points);
                }

                const pointsDisplay = points !== mission.points
                    ? `<span style="text-decoration: line-through; font-size: 11px; color: var(--text-muted);">${mission.points}</span> <span style="color: var(--warning); font-weight: 700;">+${points}</span>`
                    : `<span style="color: var(--accent-light); font-weight: 700;">+${points}</span>`;

                html += `
                    <div class="card ${isCompleted ? 'completed' : ''}" 
                         onclick="MissionsUI.toggleMission('${mission.id}')"
                         style="margin-bottom: 8px; display: flex; align-items: center; gap: 12px;">
                        <div style="font-size: 28px; flex-shrink: 0;">${mission.emoji}</div>
                        <div style="flex: 1; min-width: 0;">
                            <div style="font-weight: 600; font-size: var(--font-sm);">${mission.name}</div>
                        </div>
                        <div style="font-size: var(--font-sm); flex-shrink: 0;">${pointsDisplay}</div>
                        <div class="check-circle ${isCompleted ? 'checked' : ''}" style="
                            width: 28px; height: 28px;
                            border: 2px solid ${isCompleted ? 'var(--success)' : 'var(--border-light)'};
                            border-radius: 50%;
                            display: flex; align-items: center; justify-content: center;
                            flex-shrink: 0;
                            transition: all 0.3s ease;
                            background: ${isCompleted ? 'rgba(34,197,94,0.2)' : 'transparent'};
                        ">
                            ${isCompleted ? '<span class="check-animate" style="color: var(--success);">✓</span>' : ''}
                        </div>
                    </div>
                `;
            });
        });

        container.innerHTML = html;
    }

    toggleMission(missionId) {
        const result = State.toggleMission(missionId);
        if (result.added) {
            const multiplier = State.getMissionMultiplier();
            let msg = `✅ +${result.points} pontos!`;
            if (multiplier > 1) msg += ` (${multiplier}x!)`;
            Toast.success(msg);
        } else {
            Toast.show('❌ Missão desmarcada');
        }
        this.render(document.getElementById('contentArea'));
        Header.render();
        Sidebar.render();
    }
}

const MissionsUI = new MissionsUIManager();