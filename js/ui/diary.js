// diary.js - Diário de Rotina com calculadora de Kcal e índice de saúde
class DiaryUIManager {
    constructor() {
        this.entries = this.loadEntries();
    }

    loadEntries() {
        const saved = localStorage.getItem('lifeRpgDiary');
        return saved ? JSON.parse(saved) : {};
    }

    saveEntries() {
        localStorage.setItem('lifeRpgDiary', JSON.stringify(this.entries));
    }

    render(container) {
        const today = State.getToday();
        const todayEntries = this.entries[today] || [];
        
        // Calcular totais
        const totalKcal = todayEntries.reduce((sum, e) => sum + e.totalKcal, 0);
        const allItems = todayEntries.flatMap(e => e.items);
        const avgHealth = allItems.length > 0 
            ? Math.round(allItems.reduce((sum, i) => sum + (i.health || 50), 0) / allItems.length)
            : 50;
        
        const feedback = this.getFeedback(totalKcal);
        const healthRating = getHealthRating(avgHealth);
        const exercise = getExerciseSuggestion(totalKcal);

        let html = '';

        // Card de resumo do dia
        html += `
            <div class="glass-card" style="text-align: center; margin-bottom: 16px;">
                <div style="font-size: 48px;">${feedback.emoji}</div>
                
                <div style="display: flex; justify-content: center; gap: 20px; margin: 12px 0;">
                    <div>
                        <div style="font-size: var(--font-xs); color: var(--text-muted);">Calorias</div>
                        <div style="font-size: var(--font-xl); font-weight: 700; color: ${totalKcal > 2500 ? 'var(--danger)' : totalKcal > 1500 ? 'var(--warning)' : 'var(--success)'};">
                            ${totalKcal}
                        </div>
                        <div style="font-size: 10px; color: var(--text-muted);">kcal</div>
                    </div>
                    <div style="width: 1px; background: var(--border);"></div>
                    <div>
                        <div style="font-size: var(--font-xs); color: var(--text-muted);">Saúde</div>
                        <div style="font-size: var(--font-xl); font-weight: 700; color: ${healthRating.color};">
                            ${avgHealth}
                        </div>
                        <div style="font-size: 10px; color: ${healthRating.color};">${healthRating.emoji} ${healthRating.label}</div>
                    </div>
                    <div style="width: 1px; background: var(--border);"></div>
                    <div>
                        <div style="font-size: var(--font-xs); color: var(--text-muted);">Refeições</div>
                        <div style="font-size: var(--font-xl); font-weight: 700; color: var(--accent-light);">
                            ${todayEntries.length}
                        </div>
                        <div style="font-size: 10px; color: var(--text-muted);">hoje</div>
                    </div>
                </div>

                <div style="font-size: var(--font-sm); color: var(--text-secondary); padding: 8px; background: rgba(255,255,255,0.03); border-radius: var(--radius-sm);">
                    ${feedback.text}
                </div>
                
                ${exercise ? `
                    <div class="badge badge-warning" style="margin-top: 10px; font-size: 12px; padding: 10px 16px; cursor: pointer;" 
                         onclick="Sidebar.navigate('missions')">
                        ${exercise.emoji} Sugestão: ${exercise.text} (+${exercise.points}pts) → Fazer agora
                    </div>
                ` : ''}
            </div>
        `;

        // Botão de adicionar refeição
        html += `
            <button class="btn btn-primary btn-block" onclick="DiaryUI.showAddForm()" style="margin-bottom: 12px;">
                🍽️ Registrar Refeição
            </button>
        `;

        // Formulário (oculto)
        html += `
            <div id="diaryForm" style="display: none;" class="glass-card" style="margin-bottom: 16px;">
                <div class="section-title">🍽️ Nova Refeição</div>
                <div style="margin-bottom: 10px;">
                    <label style="font-size: var(--font-xs); color: var(--text-muted); display: block; margin-bottom: 4px;">
                        O que você comeu?
                    </label>
                    <textarea id="foodInput" 
                              placeholder="Ex: 2 ovos, 6 bolachas, 1 prato de macarrão, 4 pedaços de carne..." 
                              style="width: 100%; padding: 12px; background: var(--bg-card); border: 1px solid var(--border); 
                                     color: var(--text-primary); border-radius: var(--radius-sm); min-height: 80px; 
                                     font-size: var(--font-sm); resize: vertical;"></textarea>
                </div>
                <div style="margin-bottom: 10px;">
                    <label style="font-size: var(--font-xs); color: var(--text-muted); display: block; margin-bottom: 4px;">
                        Horário
                    </label>
                    <input type="time" id="mealTime" value="${this.getCurrentTime()}" 
                           style="width: 100%; padding: 10px; background: var(--bg-card); border: 1px solid var(--border); 
                                  color: var(--text-primary); border-radius: var(--radius-sm); font-size: var(--font-sm);">
                </div>
                <div style="display: flex; gap: 8px;">
                    <button class="btn btn-success" onclick="DiaryUI.addMeal()" style="flex: 1;">✅ Registrar</button>
                    <button class="btn btn-ghost" onclick="DiaryUI.hideAddForm()">Cancelar</button>
                </div>
                <div style="font-size: 10px; color: var(--text-muted); margin-top: 8px;">
                    💡 Ex: "2 ovos, 1 fatia de bolo, 1 prato de macarrão, 4 pedaços de carne"
                </div>
            </div>
        `;

        // Histórico de refeições
        html += '<div class="section-title">📅 Refeições de Hoje</div>';

        if (todayEntries.length === 0) {
            html += `
                <div class="glass-card" style="text-align: center; padding: 40px;">
                    <div style="font-size: 48px;">🍽️</div>
                    <div style="color: var(--text-muted); margin: 8px 0;">Nenhuma refeição registrada hoje.</div>
                    <div style="font-size: var(--font-xs); color: var(--text-muted);">
                        Registre suas refeições para acompanhar calorias e receber feedback!
                    </div>
                </div>
            `;
        } else {
            todayEntries.sort((a, b) => a.time.localeCompare(b.time)).forEach((entry, index) => {
                const entryHealth = entry.items.length > 0
                    ? Math.round(entry.items.reduce((sum, i) => sum + (i.health || 50), 0) / entry.items.length)
                    : 50;
                const entryRating = getHealthRating(entryHealth);
                const postMealExercise = getPostMealExercise(entry.totalKcal);
                
                html += `
                    <div class="card" style="margin-bottom: 8px;">
                        <div style="display: flex; align-items: flex-start; gap: 10px;">
                            <div style="font-size: 24px; flex-shrink: 0;">🍽️</div>
                            <div style="flex: 1; min-width: 0;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <span style="font-weight: 600; font-size: var(--font-sm);">${entry.time}</span>
                                    <span class="badge" style="font-size: 10px; background: ${entryRating.color}22; color: ${entryRating.color};">
                                        ${entryRating.emoji} ${entryRating.label}
                                    </span>
                                </div>
                                <div style="font-size: var(--font-xs); color: var(--text-secondary); margin-top: 4px;">
                                    ${entry.items.map(i => `${i.emoji} ${i.name} x${i.quantity} (${i.kcal}kcal)`).join('<br>')}
                                </div>
                                ${postMealExercise ? `
                                    <div style="margin-top: 6px; padding: 4px 8px; background: rgba(99,102,241,0.08); border-radius: 6px; 
                                                font-size: 10px; color: var(--accent-light); cursor: pointer; display: inline-block;"
                                        onclick="Sidebar.navigate('missions')">
                                        ${postMealExercise.emoji} ${postMealExercise.text} 
                                        <span style="color: var(--text-muted);">(~${postMealExercise.kcalBurn} kcal)</span>
                                    </div>
                                ` : ''}
                            </div>
                            <div style="text-align: right; flex-shrink: 0;">
                                <div style="font-weight: 700; color: var(--warning);">${entry.totalKcal} kcal</div>
                                <button class="btn btn-sm btn-ghost" onclick="DiaryUI.deleteMeal(${index})" 
                                        style="font-size: 10px; padding: 2px 8px; margin-top: 4px; color: var(--danger);">
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        // Resumo semanal rápido
        html += '<div class="section-title" style="margin-top: 20px;">📊 Últimos 7 Dias</div>';
        html += '<div class="glass-card">';
        
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            const dayEntries = this.entries[dateStr] || [];
            const dayKcal = dayEntries.reduce((sum, e) => sum + e.totalKcal, 0);
            last7Days.push({ date: dateStr, kcal: dayKcal, count: dayEntries.length });
        }
        
        const maxKcal = Math.max(...last7Days.map(d => d.kcal), 1);
        
        html += '<div style="display: flex; align-items: flex-end; gap: 6px; height: 80px;">';
        last7Days.forEach((day, index) => {
            const d = new Date(day.date + 'T00:00:00');
            const dayName = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][d.getDay()];
            const height = (day.kcal / maxKcal) * 100;
            const isToday = index === 6;
            
            html += `
                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px; height: 100%; justify-content: flex-end;">
                    <div style="font-size: 9px; color: var(--text-muted);">${day.kcal > 0 ? day.kcal : ''}</div>
                    <div style="width: 100%; height: ${Math.max(height, 2)}%; background: ${isToday ? 'var(--accent)' : 'var(--border-light)'}; 
                         border-radius: 3px 3px 0 0; min-height: 2px; ${day.count === 0 ? 'opacity: 0.3;' : ''}"></div>
                    <div style="font-size: 9px; color: ${isToday ? 'var(--text-primary)' : 'var(--text-muted)'}; font-weight: ${isToday ? '700' : '400'};">
                        ${dayName}
                    </div>
                </div>
            `;
        });
        html += '</div></div>';

        container.innerHTML = html;
    }

    getCurrentTime() {
        const now = new Date();
        return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    }

    showAddForm() {
        const form = document.getElementById('diaryForm');
        if (form) {
            form.style.display = 'block';
            setTimeout(() => document.getElementById('foodInput')?.focus(), 100);
        }
    }

    hideAddForm() {
        const form = document.getElementById('diaryForm');
        if (form) form.style.display = 'none';
    }

    addMeal() {
        const input = document.getElementById('foodInput')?.value?.trim();
        const time = document.getElementById('mealTime')?.value;

        if (!input) {
            Toast.error('🍽️ Escreva o que você comeu!');
            return;
        }

        const items = this.parseFood(input);
        
        if (items.length === 0) {
            Toast.error('🤔 Não entendi. Tente: "2 ovos, 3 bolachas"');
            return;
        }

        const totalKcal = items.reduce((sum, i) => sum + i.kcal, 0);
        const avgHealth = Math.round(items.reduce((sum, i) => sum + (i.health || 50), 0) / items.length);
        const healthRating = getHealthRating(avgHealth);
        
        const today = State.getToday();

        if (!this.entries[today]) this.entries[today] = [];
        this.entries[today].push({
            time,
            items,
            totalKcal,
            avgHealth,
            rawText: input,
        });

        this.saveEntries();
        this.hideAddForm();
        
        // Limpar campo
        const foodInput = document.getElementById('foodInput');
        if (foodInput) foodInput.value = '';
        
        Toast.show(`${healthRating.emoji} ${totalKcal} kcal • ${healthRating.label}`);
        this.render(document.getElementById('contentArea'));
    }

    deleteMeal(index) {
        const today = State.getToday();
        if (this.entries[today]) {
            this.entries[today].splice(index, 1);
            this.saveEntries();
            this.render(document.getElementById('contentArea'));
            Toast.show('🗑️ Refeição removida');
        }
    }

    parseFood(text) {
        const items = [];
        const normalizedText = ' ' + text.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '') + ' ';
        
        // Regex melhorada para capturar: "2 ovos", "1 prato de macarrão", "3 fatias de bolo", "4 pedaços de carne"
        const patterns = [
            /(\d+)\s+(prato(?:s)?\s+de\s+)?(fatia(?:s)?\s+de\s+)?(pedaço(?:s)?\s+de\s+)?(copo(?:s)?\s+de\s+)?(colher(?:es)?\s+de\s+)?(xícara(?:s)?\s+de\s+)?(garfo(?:s)?\s+de\s+)?([a-záàâãéèêíïóôõöúçñ\s]+?)(?=\s*,|\s*$|\s+e\s|\s+com\s)/gi,
        ];
        
        let match;
        while ((match = patterns[0].exec(normalizedText)) !== null) {
            const quantity = parseInt(match[1]);
            let foodName = match[9]?.trim();
            
            if (!foodName || foodName.length < 2) continue;
            
            // Remover palavras extras
            foodName = foodName.replace(/\s+(inteiro|inteira|grande|pequeno|médio|medio|caseiro|industrializado|frito|cozido|assado|grelhado)$/g, '');
            
            const food = this.findFood(foodName);
            
            if (food) {
                items.push({
                    emoji: food.emoji,
                    name: food.name,
                    quantity,
                    kcal: food.kcal * quantity,
                    health: food.health,
                    unit: food.unit,
                });
            }
        }

        return items;
    }

    findFood(name) {
        const cleanName = name.trim().toLowerCase();
        
        // Busca direta
        if (FOODS_DB[cleanName]) return FOODS_DB[cleanName];
        
        // Busca por sinônimo
        if (FOOD_SYNONYMS[cleanName] && FOODS_DB[FOOD_SYNONYMS[cleanName]]) {
            return FOODS_DB[FOOD_SYNONYMS[cleanName]];
        }
        
        // Busca parcial (a palavra está contida no nome do alimento)
        for (const [key, food] of Object.entries(FOODS_DB)) {
            if (cleanName.includes(key) || key.includes(cleanName)) {
                return food;
            }
        }
        
        return null;
    }

    getFeedback(totalKcal) {
        for (const msg of FEEDBACK_MESSAGES) {
            if (totalKcal <= msg.max) return msg;
        }
        return FEEDBACK_MESSAGES[FEEDBACK_MESSAGES.length - 1];
    }
}

const DiaryUI = new DiaryUIManager();