const CONFIG = {
    XP_PER_LEVEL: 100,
    LEVEL_NAMES: ['Iniciante', 'Aprendiz', 'Guerreiro', 'Veterano', 'Mestre', 'Lenda', 'Herói', 'Lorde', 'Imperador', 'Deus'],

    POINT_VALIDITY: {
        free: 3,        // Treino livre: 3 dias
        daily: 7,       // Missão diária: 7 dias
        inspired: 14,   // Treino inspirado: 14 dias
        streak: 14,
        challenge: 30,
        surprise: 7,
        penalty: 7,
        gacha: 14,
        boss: 30,
        investment: 30,
    },

    // Níveis de treino
    TRAINING_LEVELS: {
        free: {
            emoji: '🔄',
            name: 'Treino Livre',
            desc: 'Rápido e fácil (10-30min)',
            color: '#22c55e',
            pointMultiplier: 0.5,  // 50% dos pontos base
            validity: 'free',
        },
        daily: {
            emoji: '📋',
            name: 'Treino Diário',
            desc: 'Planejado (1h-1h30)',
            color: '#6366f1',
            pointMultiplier: 1.0,  // 100% dos pontos base
            validity: 'daily',
            limitPerDay: 1,
        },
        inspired: {
            emoji: '🔥',
            name: 'Treino Inspirado',
            desc: 'Modo determinação (2h+)',
            color: '#f59e0b',
            pointMultiplier: 2.5,  // 250% dos pontos base
            validity: 'inspired',
            limitPerDay: 1,
            requiresStreak: 3,  // Precisa de 3 dias de streak
        },
    },

    // Tiers da loja por esforço
    SHOP_TIERS: {
        minimal: {
            emoji: '🪙',
            name: 'Esforço Mínimo',
            desc: '0 a 100 pontos',
            color: '#9ca3af',
            range: [0, 100],
        },
        moderate: {
            emoji: '💎',
            name: 'Esforço Moderado',
            desc: '100 a 500 pontos',
            color: '#6366f1',
            range: [100, 500],
        },
        maximum: {
            emoji: '👑',
            name: 'Esforço Máximo',
            desc: '500+ pontos',
            color: '#fbbf24',
            range: [500, Infinity],
        },
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
        { id: 'diary', icon: '🍽️', label: 'Diário' },     // ← NOVO
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