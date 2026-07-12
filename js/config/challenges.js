// challenges.js - Desafios, bosses e investimentos
const CHALLENGES = [
    { id: 'c1', emoji: '🏃', name: 'Exercício 7 dias seguidos', points: 15, target: 7 },
    { id: 'c2', emoji: '📚', name: 'Estudar 5 dias na semana', points: 20, target: 5 },
    { id: 'c3', emoji: '🥤', name: '1 semana sem refrigerante', points: 15, target: 7 },
    { id: 'c4', emoji: '😴', name: 'Dormir cedo 5 dias', points: 20, target: 5 },
];

const WEEKLY_BOSSES = [
    {
        id: 'boss1', emoji: '🐉', name: 'Dragão da Preguiça',
        desc: 'Complete 7 dias de exercício em 1 semana',
        type: 'exercise', target: 7, points: 30,
        dropEmoji: '⚡', dropName: 'Amuleto da Energia',
        dropEffect: 'Missões de exercício valem +2pts por 3 dias',
        color: '#ef4444',
    },
    {
        id: 'boss2', emoji: '🧟', name: 'Zumbi do Sedentarismo',
        desc: 'Faça exercício por 5 dias',
        type: 'exercise', target: 5, points: 25,
        dropEmoji: '👟', dropName: 'Tênis Veloz',
        dropEffect: 'Missões de caminhada valem 2x por 2 dias',
        color: '#10b981',
    },
    {
        id: 'boss3', emoji: '👻', name: 'Fantasma da Procrastinação',
        desc: 'Estude 2h+ por 5 dias',
        type: 'study', target: 5, points: 35,
        dropEmoji: '📚', dropName: 'Livro do Conhecimento',
        dropEffect: 'Missões de estudo valem +3pts por 3 dias',
        color: '#8b5cf6',
    },
    {
        id: 'boss4', emoji: '🍔', name: 'Monstro do Fast Food',
        desc: 'Fique 7 dias sem fast food',
        type: 'nofastfood', target: 7, points: 25,
        dropEmoji: '🥗', dropName: 'Escudo da Nutrição',
        dropEffect: 'Missões de alimentação valem +1pt por 5 dias',
        color: '#f59e0b',
    },
    {
        id: 'boss5', emoji: '📱', name: 'Demônio do Celular',
        desc: '7 dias com menos de 2h de tela',
        type: 'screentime', target: 7, points: 40,
        dropEmoji: '🧘', dropName: 'Cristal do Foco',
        dropEffect: 'Todas as missões valem 2x por 1 dia',
        color: '#ec4899',
    },
    {
        id: 'boss6', emoji: '😈', name: 'Lorde da Madrugada',
        desc: 'Durma antes das 23h por 5 dias',
        type: 'sleep', target: 5, points: 30,
        dropEmoji: '🌙', dropName: 'Manto do Descanso',
        dropEffect: 'Streak conta 2x por 3 dias',
        color: '#6366f1',
    },
];

const INVESTMENT_TIERS = [
    { min: 5, days: 3, interest: 15, name: 'Poupança Rápida', emoji: '🪙' },
    { min: 10, days: 5, interest: 20, name: 'CDB do RPG', emoji: '💵' },
    { min: 20, days: 7, interest: 25, name: 'Tesouro do Guerreiro', emoji: '💎' },
    { min: 50, days: 7, interest: 30, name: 'Fundo Lendário', emoji: '👑' },
];

const GACHA_REWARDS = [
    { tier: 'common', chance: 40, emoji: '💨', name: 'Nada...', points: 0, desc: 'Melhor sorte na próxima!' },
    { tier: 'common', chance: 25, emoji: '🪙', name: 'Reembolso', points: 2, desc: '+2pts de volta' },
    { tier: 'uncommon', chance: 15, emoji: '🏷️', name: 'Desconto!', points: 0, desc: '50% off na loja', discount: 50 },
    { tier: 'rare', chance: 10, emoji: '💎', name: 'Bônus!', points: 5, desc: '+5pts extras' },
    { tier: 'rare', chance: 7, emoji: '⚡', name: 'Multiplicador!', points: 0, desc: 'Missões 2x hoje', multiplier: 2 },
    { tier: 'epic', chance: 2, emoji: '🎁', name: 'Item Lendário!', points: 0, desc: 'Item grátis!', freeItem: true },
    { tier: 'legendary', chance: 1, emoji: '🌟', name: 'JACKPOT!', points: 50, desc: '+50 PONTOS!' },
];