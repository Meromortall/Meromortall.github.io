// shop.js - Definição da loja e tiers
const SHOP_TIERS = {
    1: { emoji: '🪙', name: 'Básico', color: '#9ca3af' },
    2: { emoji: '🪙🪙', name: 'Médio', color: '#6366f1' },
    3: { emoji: '💎', name: 'Avançado', color: '#8b5cf6' },
    4: { emoji: '👑', name: 'Lendário', color: '#fbbf24' },
};

const SHOP_ITEMS = [
    // Tier 1 - Básico
    { id: 's1', emoji: '🎮', name: '1 hora de lazer no PC', cost: 1, hours: 1, tier: 1 },
    { id: 's7', emoji: '📱', name: '30min de redes sociais', cost: 1, hours: 0.5, tier: 1 },
    { id: 's8', emoji: '🎬', name: '1 episódio de série', cost: 2, hours: 0, tier: 1 },
    { id: 's14', emoji: '🍫', name: 'Chocolate', cost: 3, hours: 0, tier: 1 },

    // Tier 2 - Médio
    { id: 's2', emoji: '🎮', name: '+3 horas extras de jogo', cost: 6, hours: 3, tier: 2 },
    { id: 's5', emoji: '🎬', name: 'Filme com pipoca', cost: 5, hours: 0, tier: 2 },
    { id: 's15', emoji: '☕', name: 'Café especial', cost: 4, hours: 0, tier: 2 },

    // Tier 3 - Avançado
    { id: 's6', emoji: '🎮', name: 'Maratona de jogos (5h)', cost: 15, hours: 5, tier: 3 },
    { id: 's9', emoji: '🍕', name: 'Pedir uma pizza', cost: 12, hours: 0, tier: 3 },
    { id: 's10', emoji: '📺', name: 'Maratonar série (4 eps)', cost: 22, hours: 0, tier: 3 },
    { id: 's11', emoji: '😴', name: 'Dormir 1h mais tarde', cost: 18, hours: 0, tier: 3 },

    // Tier 4 - Lendário
    { id: 's12', emoji: '🎉', name: 'Dia livre total', cost: 30, hours: 0, tier: 4 },
    { id: 's13', emoji: '🏖️', name: 'Passeio especial', cost: 40, hours: 0, tier: 4 },
];