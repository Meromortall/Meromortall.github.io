// character.js - Tela de personagem (classes, conquistas, banco)
class CharacterUIManager {
    render(container) {
        let html = '';

        // Seção de Classes
        html += '<div class="section-title">⚔️ Classes</div>';
        
        Object.entries(CLASSES).forEach(([key, config]) => {
            const xp = State.state.classXP?.[key] || 0;
            const level = State.getClassLevel(key);
            const xpInLevel = xp % config.xpPerLevel;
            const xpPercent = (xpInLevel / config.xpPerLevel) * 100;
            const isDominant = State.getDominantClass() === key;

            html += `
                <div class="card" style="margin-bottom: 8px; border-color: ${isDominant ? config.color : 'var(--border)'}; 
                     ${isDominant ? 'box-shadow: 0 0 20px ' + config.color + '22;' : ''}">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="font-size: 28px; flex-shrink: 0;">${config.emoji}</div>
                        <div style="flex: 1; min-width: 0;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="font-weight: 700; color: ${config.color};">${config.name}</span>
                                <span class="badge" style="background: ${config.color}22; color: ${config.color};">${config.niveis[level - 1]}</span>
                                ${isDominant ? '<span class="badge badge-gold">👑 Principal</span>' : ''}
                            </div>
                            <div class="progress" style="margin-top: 6px; height: 6px;">
                                <div class="progress-fill" style="width: ${xpPercent}%; background: ${config.color};"></div>
                            </div>
                            <div style="font-size: var(--font-xs); color: var(--text-muted); margin-top: 4px;">
                                ${xpInLevel}/${config.xpPerLevel} XP • Nível ${level}
                            </div>
                            ${config.bonus[level] ? `
                                <div class="badge badge-info" style="margin-top: 4px; font-size: 10px;">
                                    🎯 ${config.bonus[level].desc}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        });

        // Seção de Investimentos (Banco)
        html += '<div class="section-title" style="margin-top: 20px;">🏦 Banco de Investimentos</div>';
        
        const activeInvestments = State.getActiveInvestments();
        
        if (activeInvestments.length > 0) {
            html += '<div style="font-size: var(--font-xs); color: var(--success); font-weight: 600; margin-bottom: 8px;">📈 Investimentos Ativos</div>';
            
            activeInvestments.forEach(inv => {
                const tier = INVESTMENT_TIERS[inv.tierIndex];
                const remaining = inv.endDate - Date.now();
                const daysLeft = Math.ceil(remaining / (24 * 60 * 60 * 1000));
                const progressPercent = Math.min(((Date.now() - inv.startDate) / (inv.endDate - inv.startDate)) * 100, 100);

                html += `
                    <div class="card" style="margin-bottom: 8px; border-color: var(--success);">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="font-size: 28px;">${tier.emoji}</div>
                            <div style="flex: 1;">
                                <div style="font-weight: 600; font-size: var(--font-sm);">${tier.name}</div>
                                <div style="font-size: var(--font-xs); color: var(--text-muted);">
                                    ${inv.amount}pts → <span style="color: var(--success); font-weight: 600;">+${inv.returnAmount}pts</span> (${tier.interest}%)
                                </div>
                                <div class="progress" style="margin-top: 6px; height: 6px;">
                                    <div class="progress-fill progress-success" style="width: ${progressPercent}%;"></div>
                                </div>
                                <div style="font-size: 10px; color: var(--text-muted);">${daysLeft} dias restantes</div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        // Opções de investimento
        html += '<div style="font-size: var(--font-xs); color: var(--warning); font-weight: 600; margin: 8px 0;">💼 Investir Agora</div>';
        
        INVESTMENT_TIERS.forEach((tier, index) => {
            const available = State.points.getAvailable();
            const canInvest = available >= tier.min;

            html += `
                <div class="card" onclick="CharacterUI.createInvestment(${tier.min}, ${index})" 
                     style="margin-bottom: 6px; opacity: ${canInvest ? '1' : '0.5'}; cursor: ${canInvest ? 'pointer' : 'default'};">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="font-size: 24px;">${tier.emoji}</div>
                        <div style="flex: 1;">
                            <div style="font-weight: 600; font-size: var(--font-sm);">${tier.name}</div>
                            <div style="font-size: var(--font-xs); color: var(--text-muted);">
                                Mín: ${tier.min}pts • ${tier.days} dias • Retorno: <span style="color: var(--success);">+${tier.interest}%</span>
                            </div>
                        </div>
                        <button class="btn btn-sm ${canInvest ? 'btn-primary' : 'btn-ghost'}" ${!canInvest ? 'disabled' : ''}>
                            ${canInvest ? 'Investir' : 'Sem pts'}
                        </button>
                    </div>
                </div>
            `;
        });

        if (State.state.completedInvestments > 0) {
            html += `
                <div style="font-size: var(--font-xs); color: var(--text-muted); text-align: center; margin-top: 8px;">
                    Total de investimentos concluídos: <span style="color: var(--success);">${State.state.completedInvestments}</span>
                </div>
            `;
        }

        // Seção de Conquistas
        const unlockedCount = Object.keys(State.state.achievements || {}).length;
        
        html += `
            <div class="section-title" style="margin-top: 20px;">
                🏆 Conquistas 
                <span class="badge badge-gold">${unlockedCount}/${ACHIEVEMENTS.length}</span>
            </div>
        `;

        ACHIEVEMENTS.forEach(ach => {
            const isUnlocked = State.state.achievements?.[ach.id];
            const stats = State.state.achievementStats || {};
            const currentValue = stats[ach.track] || 0;
            const percent = Math.min((currentValue / ach.target) * 100, 100);

            html += `
                <div class="card ${isUnlocked ? 'completed' : ''}" style="margin-bottom: 6px; opacity: ${isUnlocked ? '1' : '0.5'};">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="font-size: 28px;">${isUnlocked ? ach.emoji : '🔒'}</div>
                        <div style="flex: 1;">
                            <div style="font-weight: 600; font-size: var(--font-sm);">${ach.name}</div>
                            <div style="font-size: var(--font-xs); color: var(--text-muted);">${ach.desc} (${currentValue}/${ach.target})</div>
                            <div class="progress" style="margin-top: 4px; height: 4px;">
                                <div class="progress-fill" style="width: ${percent}%; background: ${isUnlocked ? 'var(--warning)' : 'var(--border-light)'};"></div>
                            </div>
                        </div>
                        <div style="font-weight: 700; color: ${isUnlocked ? 'var(--success)' : 'var(--text-muted)'};">
                            ${isUnlocked ? '✅' : '+' + ach.points}
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    createInvestment(amount, tierIndex) {
        const result = State.createInvestment(amount, tierIndex);
        if (!result) {
            Toast.error('💸 Pontos insuficientes!');
            return;
        }
        const tier = INVESTMENT_TIERS[tierIndex];
        Toast.success(`🏦 ${tier.emoji} Investido ${amount}pts! Retorno em ${tier.days} dias: +${result.returnAmount}pts`);
        this.render(document.getElementById('contentArea'));
        Header.render();
    }
}

const CharacterUI = new CharacterUIManager();