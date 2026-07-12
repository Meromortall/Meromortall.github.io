// shop.js - Loja com abas por nível de esforço
class ShopUIManager {
    constructor() {
        this.currentTier = 'minimal';
        this.currentCategory = 'all';
    }

    render(container) {
        const available = State.points.getAvailable();
        const discount = State.getDiscount();

        let html = '';

        // Card de pontos disponíveis
        html += `
            <div class="glass-card" style="text-align: center; margin-bottom: 16px;">
                <div style="font-size: var(--font-xs); color: var(--text-muted);">💰 Pontos Disponíveis</div>
                <div style="font-size: var(--font-2xl); font-weight: 700; color: var(--gold);">${available}</div>
                ${discount < 1 ? `<span class="badge badge-success" style="margin-top: 4px;">🏷️ ${Math.round((1 - discount) * 100)}% off</span>` : ''}
            </div>
        `;

        // Abas de Esforço
        html += '<div class="tabs-container" style="display: flex; gap: 6px; margin-bottom: 12px; overflow-x: auto;">';
        Object.entries(CONFIG.SHOP_TIERS).forEach(([key, tier]) => {
            const isActive = this.currentTier === key;
            html += `
                <div class="tab-pill ${isActive ? 'active' : ''}"
                     onclick="ShopUI.switchTier('${key}')"
                     style="
                         padding: 8px 14px;
                         border-radius: 20px;
                         font-size: var(--font-xs);
                         font-weight: 600;
                         cursor: pointer;
                         background: ${isActive ? tier.color + '22' : 'var(--bg-card)'};
                         color: ${isActive ? tier.color : 'var(--text-muted)'};
                         border: 1px solid ${isActive ? tier.color : 'var(--border)'};
                         white-space: nowrap;
                     ">
                    ${tier.emoji} ${tier.name}
                </div>
            `;
        });
        html += '</div>';

        // Descrição do tier
        const currentTier = CONFIG.SHOP_TIERS[this.currentTier];
        html += `
            <div style="font-size: var(--font-xs); color: var(--text-muted); margin-bottom: 12px; text-align: center;">
                ${currentTier.desc}
            </div>
        `;

        // Abas de Categoria
        html += '<div class="tabs-container" style="display: flex; gap: 4px; margin-bottom: 16px; overflow-x: auto;">';
        html += `
            <div class="tab-pill ${this.currentCategory === 'all' ? 'active' : ''}"
                 onclick="ShopUI.switchCategory('all')"
                 style="padding: 4px 10px; border-radius: 12px; font-size: 10px; cursor: pointer;
                        background: ${this.currentCategory === 'all' ? 'var(--accent)' : 'var(--bg-card)'};
                        color: ${this.currentCategory === 'all' ? 'white' : 'var(--text-muted)'};">
                📦 Todos
            </div>
        `;
        Object.entries(SHOP_CATEGORIES).forEach(([key, cat]) => {
            html += `
                <div class="tab-pill ${this.currentCategory === key ? 'active' : ''}"
                     onclick="ShopUI.switchCategory('${key}')"
                     style="padding: 4px 10px; border-radius: 12px; font-size: 10px; cursor: pointer;
                            background: ${this.currentCategory === key ? 'var(--accent-light)' : 'var(--bg-card)'};
                            color: ${this.currentCategory === key ? 'white' : 'var(--text-muted)'};">
                    ${cat.emoji} ${cat.name}
                </div>
            `;
        });
        html += '</div>';

        // Itens da loja
        let items = SHOP_ITEMS.filter(i => i.tier === this.currentTier);
        if (this.currentCategory !== 'all') {
            items = items.filter(i => i.category === this.currentCategory);
        }

        if (items.length === 0) {
            html += `
                <div class="glass-card" style="text-align: center; padding: 40px;">
                    <div style="font-size: 40px;">🏪</div>
                    <div style="color: var(--text-muted);">Nenhum item nesta categoria para este tier.</div>
                </div>
            `;
        } else {
            items.forEach(item => {
                const finalCost = Math.floor(item.cost * discount);
                const canAfford = available >= finalCost;
                const costDisplay = finalCost !== item.cost
                    ? `<span style="text-decoration: line-through; color: var(--text-muted); font-size: 11px;">${item.cost}</span> <span style="color: var(--success);">${finalCost}pts</span>`
                    : `<span style="color: ${currentTier.color};">${finalCost}pts</span>`;

                html += `
                    <div class="card" onclick="ShopUI.buyItem('${item.id}')"
                         style="margin-bottom: 8px; display: flex; align-items: center; gap: 12px; opacity: ${canAfford ? '1' : '0.6'};">
                        <div style="font-size: 32px; flex-shrink: 0;">${item.emoji}</div>
                        <div style="flex: 1; min-width: 0;">
                            <div style="font-weight: 600; font-size: var(--font-sm);">${item.name}</div>
                            <div style="font-size: var(--font-xs); color: var(--text-muted);">
                                ${item.hours > 0 ? `⏱️ ${item.hours}h` : '🎉 Consumível'}
                            </div>
                        </div>
                        <div style="text-align: right; flex-shrink: 0;">
                            <div style="font-weight: 700; font-size: var(--font-sm);">${costDisplay}</div>
                            <button class="btn btn-sm ${canAfford ? 'btn-primary' : 'btn-ghost'}" 
                                    style="margin-top: 4px; font-size: 10px;"
                                    ${!canAfford ? 'disabled' : ''}>
                                ${canAfford ? 'Comprar' : 'Faltam ' + (finalCost - available)}
                            </button>
                        </div>
                    </div>
                `;
            });
        }

        // Roleta (sempre visível)
        html += `
            <div class="glass-card" style="text-align: center; margin-top: 20px; cursor: pointer;" onclick="ShopUI.rollGacha()">
                <div style="font-size: 40px;">🎰</div>
                <div style="font-weight: 700; margin: 8px 0;">Roleta de Sorteios</div>
                <div style="font-size: var(--font-xs); color: var(--text-muted);">Gaste 5 pontos para girar!</div>
                <button class="btn btn-warning btn-block" style="margin-top: 12px;">🎰 Girar (5pts)</button>
            </div>
        `;

        container.innerHTML = html;
    }

    switchTier(tier) {
        this.currentTier = tier;
        this.render(document.getElementById('contentArea'));
    }

    switchCategory(category) {
        this.currentCategory = category;
        this.render(document.getElementById('contentArea'));
    }

    buyItem(itemId) {
        const result = State.buyItem(itemId);
        if (!result) {
            const available = State.points.getAvailable();
            const item = SHOP_ITEMS.find(i => i.id === itemId);
            const discount = State.getDiscount();
            const finalCost = item ? Math.floor(item.cost * discount) : 0;
            Toast.error(`💸 Faltam ${finalCost - available}pts`);
            return;
        }

        if (result.hours > 0) {
            Timer.start(result.hours, result.name);
            Toast.success(`⏱️ ${result.hours}h iniciada!`);
        } else {
            Toast.success(`🎉 ${result.name} comprado!`);
        }
        this.render(document.getElementById('contentArea'));
        Header.render();
        Sidebar.render();
    }

    rollGacha() {
        const result = State.rollGacha();
        if (!result) {
            Toast.error('💸 5 pontos necessários!');
            return;
        }
        let msg = `${result.emoji} ${result.name}! ${result.desc}`;
        if (result.points > 0) msg += ` +${result.points}pts`;
        if (result.discount) msg += ' (50% off!)';
        if (result.multiplier) msg += ' (Missões 2x hoje!)';
        Toast.show(msg);
        this.render(document.getElementById('contentArea'));
        Header.render();
    }
}

const ShopUI = new ShopUIManager();