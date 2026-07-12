// shop.js - Tela da loja
class ShopUIManager {
    render(container) {
        const available = State.points.getAvailable();
        const discount = State.getDiscount();
        const expiring = State.points.getExpiring();

        let html = '';

        // Alerta de desconto
        if (discount < 1) {
            html += `
                <div class="glass-card" style="text-align: center; margin-bottom: 16px; border-color: var(--success);">
                    <div style="font-size: 28px;">🏷️</div>
                    <div style="color: var(--success); font-weight: 700;">
                        ${Math.round((1 - discount) * 100)}% de desconto ativo!
                    </div>
                </div>
            `;
        }

        // Tiers da loja
        Object.entries(SHOP_TIERS).forEach(([tier, tierInfo]) => {
            const items = SHOP_ITEMS.filter(i => i.tier === parseInt(tier));
            if (items.length === 0) return;

            html += `
                <div class="section-title">
                    <span>${tierInfo.emoji}</span> ${tierInfo.name}
                </div>
            `;

            items.forEach(item => {
                const finalCost = Math.floor(item.cost * discount);
                const canAfford = available >= finalCost;
                const costDisplay = finalCost !== item.cost
                    ? `<span style="text-decoration: line-through; color: var(--text-muted);">${item.cost}</span> <span style="color: var(--success); font-weight: 700;">${finalCost}pts</span>`
                    : `<span style="color: var(--warning);">${finalCost}pts</span>`;

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
                        <div style="font-size: var(--font-sm); flex-shrink: 0;">${costDisplay}</div>
                        <button class="btn btn-sm ${canAfford ? 'btn-primary' : 'btn-ghost'}" 
                                ${!canAfford ? 'disabled' : ''}>
                            ${canAfford ? 'Comprar' : 'Faltam ' + (finalCost - available)}
                        </button>
                    </div>
                `;
            });
        });

        // Roleta
        html += `
            <div class="glass-card" style="text-align: center; margin-top: 20px; cursor: pointer;" onclick="ShopUI.rollGacha()">
                <div style="font-size: 40px;">🎰</div>
                <div style="font-weight: 700; margin: 8px 0;">Roleta de Sorteios</div>
                <div style="font-size: var(--font-xs); color: var(--text-muted);">Gaste 5 pontos para girar!</div>
                <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">
                    💨40% 🪙25% 🏷️15% 💎10% ⚡7% 🎁2% 🌟1%
                </div>
                <button class="btn btn-warning btn-block" style="margin-top: 12px;">🎰 Girar Roleta (5pts)</button>
            </div>
        `;

        // Aviso de pontos expirando
        if (expiring.today > 0 || expiring.in3Days > 0) {
            html += `
                <div class="card" style="margin-top: 16px; border-color: var(--danger); background: rgba(239,68,68,0.05);">
                    <div style="font-size: var(--font-xs); color: var(--danger);">
                        ⚠️ <strong>Pontos expirando:</strong><br>
                        ${expiring.today > 0 ? `• ${expiring.today}pts <strong>hoje</strong><br>` : ''}
                        ${expiring.in3Days > 0 ? `• ${expiring.in3Days}pts em <strong>3 dias</strong>` : ''}
                    </div>
                </div>
            `;
        }

        container.innerHTML = html;
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
            Toast.success(`⏱️ ${result.hours}h de jogo iniciada!`);
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