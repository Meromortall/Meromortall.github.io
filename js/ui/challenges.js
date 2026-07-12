// challenges.js - Tela de desafios e missão surpresa
class ChallengesUIManager {
    render(container) {
        let html = '';

        // Desafios ativos
        html += '<div class="section-title">🏆 Desafios</div>';
        
        CHALLENGES.forEach(challenge => {
            const data = State.state.completedChallenges[challenge.id] || { progress: 0, completed: false };
            const percent = Math.min((data.progress / challenge.target) * 100, 100);

            html += `
                <div class="card ${data.completed ? 'completed' : ''}" style="margin-bottom: 8px;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="font-size: 28px;">${challenge.emoji}</div>
                        <div style="flex: 1;">
                            <div style="font-weight: 600; font-size: var(--font-sm);">${challenge.name}</div>
                            <div style="font-size: var(--font-xs); color: var(--text-muted);">${data.progress}/${challenge.target}</div>
                            <div class="progress" style="margin-top: 6px; height: 6px;">
                                <div class="progress-fill progress-success" style="width: ${percent}%;"></div>
                            </div>
                        </div>
                        <div style="font-weight: 700; color: ${data.completed ? 'var(--success)' : 'var(--accent-light)'};">
                            ${data.completed ? '✅' : '+' + challenge.points}
                        </div>
                    </div>
                </div>
            `;
        });

        // Boss da Semana
        const boss = State.state.currentBoss;
        if (boss) {
            const progress = State.state.currentBossProgress || 0;
            const percent = Math.min((progress / boss.target) * 100, 100);
            const isCompleted = State.state.bossCompleted;

            html += `
                <div class="section-title" style="margin-top: 20px;">🐉 Boss da Semana</div>
                <div class="glass-card" style="text-align: center; border-color: ${boss.color};">
                    <div style="font-size: 56px;">${boss.emoji}</div>
                    <div style="font-size: var(--font-lg); font-weight: 700; color: ${boss.color};">${boss.name}</div>
                    <div style="font-size: var(--font-sm); color: var(--text-secondary); margin: 4px 0;">${boss.desc}</div>
                    <div class="progress" style="margin: 12px 0; height: 10px;">
                        <div class="progress-fill" style="width: ${percent}%; background: ${boss.color};"></div>
                    </div>
                    <div style="font-size: var(--font-xs); color: var(--text-muted);">${progress}/${boss.target}</div>
                    ${isCompleted ? `
                        <div style="margin-top: 12px; padding: 12px; background: rgba(34,197,94,0.1); border-radius: var(--radius);">
                            <div style="font-size: 32px;">${boss.dropEmoji}</div>
                            <div style="font-weight: 700; color: var(--success);">${boss.dropName}</div>
                            <div style="font-size: var(--font-xs); color: var(--text-muted);">${boss.dropEffect}</div>
                        </div>
                    ` : `
                        <div style="font-size: var(--font-lg); font-weight: 700; color: var(--warning); margin-top: 8px;">
                            +${boss.points}pts
                        </div>
                    `}
                </div>
            `;
        }

        // Missão Surpresa
        html += '<div class="section-title" style="margin-top: 20px;">🎲 Missão Surpresa</div>';
        
        let surpriseHtml = '';
        if (State.state.surpriseMission && !State.state.surpriseMissionCompleted) {
            const sm = State.state.surpriseMission;
            surpriseHtml = `
                <div class="glass-card" style="text-align: center; border-color: var(--accent);">
                    <div style="font-size: 36px;">${sm.emoji}</div>
                    <div style="font-weight: 700;">${sm.name}</div>
                    <div style="color: var(--warning); font-weight: 700; margin: 8px 0;">+${sm.points} pontos</div>
                    <button class="btn btn-success btn-block" onclick="ChallengesUI.completeSurprise()">✅ Completar Missão</button>
                </div>
            `;
        } else if (State.state.surpriseMissionCompleted) {
            surpriseHtml = `
                <div class="card completed" style="text-align: center;">
                    <div style="font-size: 36px;">✅</div>
                    <div style="font-weight: 600;">Missão surpresa já completada!</div>
                </div>
            `;
        } else {
            surpriseHtml = `
                <div class="glass-card" style="text-align: center;">
                    <div style="font-size: 36px;">🎲</div>
                    <div style="color: var(--text-muted);">Sorteie uma missão extra!</div>
                </div>
            `;
        }

        html += surpriseHtml;
        html += `
            <button class="btn btn-primary btn-block" onclick="ChallengesUI.rollSurprise()" 
                    style="margin-top: 12px;" ${State.state.surpriseMissionCompleted ? 'disabled' : ''}>
                🎯 Sortear Missão Surpresa
            </button>
        `;

        container.innerHTML = html;
    }

    rollSurprise() {
        if (State.state.surpriseMissionCompleted) {
            Toast.show('🎲 Já completada esta semana!');
            return;
        }
        State.state.surpriseMission = SURPRISE_MISSIONS[Math.floor(Math.random() * SURPRISE_MISSIONS.length)];
        State.save();
        this.render(document.getElementById('contentArea'));
    }

    completeSurprise() {
        if (!State.state.surpriseMission || State.state.surpriseMissionCompleted) return;
        State.points.add(State.state.surpriseMission.points, 'surprise');
        State.state.surpriseMissionCompleted = true;
        State.save();
        Toast.success(`🎲 +${State.state.surpriseMission.points} pontos!`);
        this.render(document.getElementById('contentArea'));
        Header.render();
    }
}

const ChallengesUI = new ChallengesUIManager();