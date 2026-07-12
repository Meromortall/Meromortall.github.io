// header.js - Cabeçalho do personagem
class HeaderManager {
    render() {
        const header = document.getElementById('topHeader');
        if (!header) return;

        const level = State.getLevel();
        const xpInLevel = State.state.totalXP % CONFIG.XP_PER_LEVEL;
        const xpPercent = (xpInLevel / CONFIG.XP_PER_LEVEL) * 100;
        const available = State.points.getAvailable();
        const expiring = State.points.getExpiring();
        const dominantClass = State.getDominantClass();
        const classConfig = CLASSES[dominantClass];
        const className = State.getClassName(dominantClass);
        const multiplier = State.getMissionMultiplier();
        const hasTimer = !!State.state.activeTimer;

        let warnings = [];
        if (expiring.today > 0) warnings.push(`⚠️ ${expiring.today}pts expiram hoje`);
        if (multiplier > 1) warnings.push(`⚡ Missões ${multiplier}x`);
        if (State.state.activeBossEffect) warnings.push(`${State.state.currentBoss?.dropEmoji || '✨'} Buff ativo`);

        header.innerHTML = `
            <div class="header-content" style="display: flex; align-items: center; gap: 16px; width: 100%;">
                <div class="avatar-header" style="
                    width: 44px; height: 44px;
                    background: linear-gradient(135deg, ${classConfig.color}, ${classConfig.color}88);
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 22px;
                    flex-shrink: 0;
                    border: 2px solid ${classConfig.color};
                    ${hasTimer ? 'animation: timerPulse 1s infinite;' : ''}
                ">${classConfig.emoji}</div>
                
                <div style="flex: 1; min-width: 0;">
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <span style="font-weight: 700; font-size: var(--font-sm); color: ${classConfig.color};">${className}</span>
                        <span class="badge badge-info">Nv.${level}</span>
                    </div>
                    <div class="progress" style="margin-top: 6px; height: 6px;">
                        <div class="progress-fill progress-accent" style="width: ${xpPercent}%;"></div>
                    </div>
                </div>

                <div style="display: flex; gap: 12px; flex-shrink: 0;">
                    <div style="text-align: center;">
                        <div style="font-size: var(--font-xs); color: var(--text-muted);">💰</div>
                        <div style="font-weight: 700; color: var(--gold); font-size: var(--font-base);">${available}</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: var(--font-xs); color: var(--text-muted);">🔥</div>
                        <div style="font-weight: 700; color: var(--warning); font-size: var(--font-base);">${State.state.streakDays}</div>
                    </div>
                </div>
            </div>
            ${warnings.length > 0 ? `
                <div style="display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap;">
                    ${warnings.map(w => `<span class="badge badge-warning" style="font-size: 10px;">${w}</span>`).join('')}
                </div>
            ` : ''}
        `;
    }
}

const Header = new HeaderManager();