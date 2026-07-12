// constants.js - Constantes e configurações base do sistema
const CONFIG = {
    XP_PER_LEVEL: 100,
    LEVEL_NAMES: ['Iniciante', 'Aprendiz', 'Guerreiro', 'Veterano', 'Mestre', 'Lenda', 'Herói', 'Lorde', 'Imperador', 'Deus'],

    POINT_VALIDITY: {
        daily: 7,
        streak: 14,
        challenge: 30,
        surprise: 7,
        penalty: 7,
        gacha: 14,
        boss: 30,
        investment: 30,
    },

    STREAK_BONUSES: { 7: 10, 15: 25, 30: 60 },

    COLORS: {
        guerreiro: '#ef4444',
        mago: '#8b5cf6',
        arquiteto: '#f59e0b',
        druida: '#10b981',
    },

    NAV_ITEMS: [
        { id: 'missions', icon: '📋', label: 'Missões' },
        { id: 'shop', icon: '🛒', label: 'Loja' },
        { id: 'challenges', icon: '🏆', label: 'Desafios' },
        { id: 'character', icon: '⚔️', label: 'Personagem' },
        { id: 'analytics', icon: '📊', label: 'Stats' },
        { id: 'config', icon: '⚙️', label: 'Config' },
    ],

    getLevelName(level) {
        return this.LEVEL_NAMES[Math.min(level - 1, this.LEVEL_NAMES.length - 1)];
    },
};