// missions.js - Tela de missões com abas por nível de treino
class MissionsUIManager {
    constructor() {
        this.currentLevel = 'free'; // Aba padrão: Treino Livre
        this.currentCategory = 'saude'; // Categoria padrão
    }

    render(container) {
        const today = State.getToday();
        const completedDaily = State.state.completedMissions[today] || [];
        const freeMissions = State.state.freeMissions?.[today] || {};
        const multiplier = State.getMissionMultiplier();
        const streak = State.state.streakDays;

        let html = '';

        // Card de Status
        html += `
            <div class="glass-card" style="text-align: center; margin-bottom: 16px;">
                <div style="display: flex; justify-content: center; gap: 16px; align-items: center;">
                    <div>
                        <div class="streak-fire" style="font-size: 32px;">🔥</div>
                        <div style="font-weight: 700; color: var(--warning);">${streak} dias</div>
                    </div>
                    <div style="width: 1px; height: 40px; background: var(--border);"></div>
                    <div>
                        <div style="font-size: 32px;">🔄</div>
                        <div style="font-weight: 700; color: var(--success);">${Object.values(freeMissions).reduce((a, b) => a + b, 0)} livres</div>
                    </div>
                    <div style="width: 1px; height: 40px; background: var(--border);"></div>
                    <div>
                        <div style="font-size: 32px;">📋</div>
                        <div style="font-weight: 700; color: var(--accent-light);">${completedDaily.length} diárias</div>
                    </div>
                </div>
                ${multiplier > 1 ? '<span class="badge badge-warning" style="margin-top: 8px;">⚡ Multiplicador ' + multiplier + 'x ativo!</span>' : ''}
            </div>
        `;

        // Abas de Nível de Treino
        html += '<div class="tabs-container" style="display: flex; gap: 6px; margin-bottom: 12px; overflow-x: auto;">';
        Object.entries(CONFIG.TRAINING_LEVELS).forEach(([key, level]) => {
            const isLocked = key === 'inspired' && streak < (level.requiresStreak || 0);
            html += `
                <div class="tab-pill ${this.currentLevel === key ? 'active' : ''} ${isLocked ? 'locked' : ''}"
                     onclick="${isLocked ? '' : "MissionsUI.switchLevel('" + key + "')"}"
                     style="
                         padding: 8px 14px;
                         border-radius: 20px;
                         font-size: var(--font-xs);
                         font-weight: 600;
                         cursor: ${isLocked ? 'default' : 'pointer'};
                         background: ${this.currentLevel === key ? level.color + '22' : 'var(--bg-card)'};
                         color: ${this.currentLevel === key ? level.color : 'var(--text-muted)'};
                         border: 1px solid ${this.currentLevel === key ? level.color : 'var(--border)'};
                         white-space: nowrap;
                         opacity: ${isLocked ? '0.5' : '1'};
                         transition: all 0.2s ease;
                     ">
                    ${level.emoji} ${level.name}
                    ${isLocked ? '🔒' : ''}
                </div>
            `;
        });
        html += '</div>';

        // Descrição do nível atual
        const currentLevel = CONFIG.TRAINING_LEVELS[this.currentLevel];
        html += `
            <div style="font-size: var(--font-xs); color: var(--text-muted); margin-bottom: 12px; text-align: center;">
                ${currentLevel.desc} • 
                <span style="color: ${currentLevel.color};">${Math.round(currentLevel.pointMultiplier * 100)}% dos pontos</span>
            </div>
        `;

        // Abas de Categoria
        html += '<div class="tabs-container" style="display: flex; gap: 6px; margin-bottom: 16px; overflow-x: auto;">';
        Object.entries(MISSION_CATEGORIES).forEach(([key, cat]) => {
            html += `
                <div class="tab-pill ${this.currentCategory === key ? 'active' : ''}"
                     onclick="MissionsUI.switchCategory('${key}')"
                     style="
                         padding: 6px 12px;
                         border-radius: 16px;
                         font-size: var(--font-xs);
                         cursor: pointer;
                         background: ${this.currentCategory === key ? cat.color + '22' : 'var(--bg-card)'};
                         color: ${this.currentCategory === key ? cat.color : 'var(--text-muted)'};
                         border: 1px solid ${this.currentCategory === key ? cat.color : 'var(--border)'};
                         white-space: nowrap;
                     ">
                    ${cat.emoji} ${cat.name}
                </div>
            `;
        });
        html += '</div>';

        // Missões da categoria e nível selecionados
        const category = MISSION_CATEGORIES[this.currentCategory];
        const categoryMissions = category.missions.filter(m => m.level === this.currentLevel);

        if (categoryMissions.length === 0) {
            html += `
                <div class="glass-card" style="text-align: center; padding: 40px;">
                    <div style="font-size: 40px;">📭</div>
                    <div style="color: var(--text-muted);">Nenhuma missão neste nível para esta categoria.</div>
                </div>
            `;
        } else {
            categoryMissions.forEach(mission => {
                const isDailyCompleted = completedDaily.includes(mission.id);
                const freeCount = freeMissions[mission.id] || 0;
                const points = Math.floor(mission.basePoints * currentLevel.pointMultiplier * multiplier);

                // Aplicar bônus de classe
                let finalPoints = points;
                const className = MISSION_CLASS_MAP[mission.id];
                if (className) {
                    const classLevel = State.getClassLevel(className);
                    const bonus = CLASSES[className].bonus[classLevel];
                    if (bonus?.apply) finalPoints = bonus.apply(finalPoints);
                }

                const isLocked = this.currentLevel === 'inspired' && streak < (currentLevel.requiresStreak || 0);

                html += `
                    <div class="card ${isDailyCompleted && this.currentLevel === 'daily' ? 'completed' : ''}" 
                         style="margin-bottom: 8px; opacity: ${isLocked ? '0.5' : '1'};">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="font-size: 28px; flex-shrink: 0;">${mission.emoji}</div>
                            <div style="flex: 1; min-width: 0;">
                                <div style="font-weight: 600; font-size: var(--font-sm);">${mission.name}</div>
                                <div style="font-size: var(--font-xs); color: var(--text-muted);">
                                    ${this.currentLevel === 'free' ? '🔄 Ilimitado' : '📋 1x por dia'}
                                    ${freeCount > 0 && this.currentLevel === 'free' ? ` • ${freeCount}x hoje` : ''}
                                </div>
                            </div>
                            <div style="text-align: right; flex-shrink: 0;">
                                <div style="font-weight: 700; color: ${currentLevel.color}; font-size: var(--font-sm);">+${finalPoints}pts</div>
                                ${!isLocked ? `
                                    <button class="btn btn-sm" 
                                            onclick="event.stopPropagation(); MissionsUI.completeMission('${mission.id}', '${this.currentLevel}')"
                                            style="margin-top: 4px; font-size: 10px; padding: 4px 10px;
                                                   background: ${currentLevel.color}22;
                                                   color: ${currentLevel.color};
                                                   border: 1px solid ${currentLevel.color}44;">
                                        ${currentLevel.emoji} Completar
                                    </button>
                                ` : `
                                    <span class="badge" style="font-size: 10px; margin-top: 4px;">🔒 Streak ${currentLevel.requiresStreak}+</span>
                                `}
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        container.innerHTML = html;
    }

    switchLevel(level) {
        this.currentLevel = level;
        this.render(document.getElementById('contentArea'));
    }

    switchCategory(category) {
        this.currentCategory = category;
        this.render(document.getElementById('contentArea'));
    }

        // js/ui/missions.js - MÉTODO CORRIGIDO
    completeMission(missionId, level) {
        let result;
        
        if (level === 'daily') {
            // Missão diária: usa toggleMission normal
            result = State.toggleMission(missionId);
        } else {
            // Treino livre ou inspirado: adiciona pontos diretamente
            result = this.completeFreeMission(missionId, level);
        }
        
        if (result && result.added) {
            const mission = ALL_MISSIONS.find(m => m.id === missionId);
            const levelConfig = CONFIG.TRAINING_LEVELS[level];
            Toast.success(`${levelConfig.emoji} ${mission?.name || 'Missão'} +${result.points}pts!`);
        }
        
        this.render(document.getElementById('contentArea'));
        Header.render();
        Sidebar.render();
    }

    completeFreeMission(missionId, level) {
        const today = State.getToday();
        const mission = ALL_MISSIONS.find(m => m.id === missionId);
        
        if (!mission) return { added: false, points: 0 };
        
        const levelConfig = CONFIG.TRAINING_LEVELS[level];
        if (!levelConfig) return { added: false, points: 0 };
        
        if (level === 'inspired') {
            const streak = State.state.streakDays;
            if (streak < (levelConfig.requiresStreak || 0)) {
                Toast.error(`🔒 Precisa de ${levelConfig.requiresStreak} dias de streak!`);
                return { added: false, points: 0 };
            }
        }
        
        const basePoints = mission.basePoints || mission.points || 0;
        
        // ✅ CORRIGIDO: mínimo de 1 ponto GARANTIDO
        let points = Math.max(1, Math.floor(basePoints * (levelConfig.pointMultiplier || 0.5)));
        
        const multiplier = State.getMissionMultiplier();
        if (multiplier > 1) points = Math.max(1, Math.floor(points * multiplier));
        
        const className = MISSION_CLASS_MAP[missionId];
        if (className) {
            const classLevel = State.getClassLevel(className);
            const bonus = CLASSES[className].bonus[classLevel];
            if (bonus?.apply) {
                points = bonus.apply(points);
                // ✅ Garantir mínimo mesmo após bônus
                points = Math.max(1, points);
            }
            State.state.classXP[className] = (State.state.classXP[className] || 0) + Math.max(1, Math.ceil(basePoints * 0.5));
        }
        
        const validityType = levelConfig.validity || 'free';
        State.points.add(points, validityType);
        
        State.state.freeMissions[today] = State.state.freeMissions[today] || {};
        State.state.freeMissions[today][missionId] = (State.state.freeMissions[today][missionId] || 0) + 1;
        
        State.updateAchievementStats(missionId);
        State.updateBossProgress();
        State.updateAnalytics();
        State.updateChallenges();
        State.checkAchievements();
        State.save();
        
        const count = State.state.freeMissions[today][missionId];
        return { added: true, points, count };
    }
}

const MissionsUI = new MissionsUIManager();