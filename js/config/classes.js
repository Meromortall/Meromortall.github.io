// classes.js - Sistema de classes e conquistas
const CLASSES = {
    guerreiro: {
        emoji: '⚔️', name: 'Guerreiro', color: '#ef4444',
        niveis: ['Recruta', 'Soldado', 'Guerreiro', 'Campeão', 'Lorde'],
        xpPerLevel: 50,
        bonus: {
            2: { desc: 'Missões de exercício +1pt', apply: (p) => p + 1 },
            3: { desc: 'Streak de exercício conta 2x', apply: null },
            4: { desc: '1pt extra por qualquer missão', apply: (p) => p + 1 },
        },
    },
    mago: {
        emoji: '🧙', name: 'Mago', color: '#8b5cf6',
        niveis: ['Aprendiz', 'Feiticeiro', 'Mago', 'Arquimago', 'Sábio'],
        xpPerLevel: 50,
        bonus: {
            2: { desc: 'Missões de mente +50%', apply: (p) => Math.floor(p * 1.5) },
            3: { desc: 'Streak de estudo bônus 2x', apply: null },
            4: { desc: 'Ganhe 2pts por login', apply: null },
        },
    },
    arquiteto: {
        emoji: '🏗️', name: 'Arquiteto', color: '#f59e0b',
        niveis: ['Ajudante', 'Construtor', 'Arquiteto', 'Mestre', 'Visionário'],
        xpPerLevel: 50,
        bonus: {
            2: { desc: 'Missões de organização +50%', apply: (p) => Math.floor(p * 1.5) },
            3: { desc: 'Desconto 20% na loja', apply: null },
            4: { desc: '+2pts por 3 missões de org', apply: null },
        },
    },
    druida: {
        emoji: '🌿', name: 'Druida', color: '#10b981',
        niveis: ['Coletor', 'Herbalista', 'Druida', 'Guardião', 'Ancião'],
        xpPerLevel: 50,
        bonus: {
            2: { desc: 'Itens de comida 30% off', apply: null },
            3: { desc: 'Missões de alimentação +2pts', apply: (p) => p + 2 },
            4: { desc: '1 refeição livre/semana', apply: null },
        },
    },
};

const ACHIEVEMENTS = [
    { id: 'ach1', emoji: '📚', name: 'Bibliotecário', desc: 'Ler por 30 dias seguidos', target: 30, track: 'readStreak', points: 25 },
    { id: 'ach2', emoji: '💪', name: 'Maromba', desc: '1000 flexões acumuladas', target: 1000, track: 'totalPushups', points: 25 },
    { id: 'ach3', emoji: '🛏️', name: 'Minimalista', desc: '30 dias arrumando a cama', target: 30, track: 'bedStreak', points: 25 },
    { id: 'ach4', emoji: '💧', name: 'Hidromaster', desc: '50 dias bebendo 2L de água', target: 50, track: 'waterDays', points: 25 },
    { id: 'ach5', emoji: '🍳', name: 'Chef Iniciante', desc: '20 refeições preparadas', target: 20, track: 'mealsCooked', points: 25 },
    { id: 'ach6', emoji: '🧘', name: 'Zen', desc: '50 meditações', target: 50, track: 'meditations', points: 25 },
    { id: 'ach7', emoji: '🌅', name: 'Madrugador', desc: '20 dias acordando cedo', target: 20, track: 'earlyRiser', points: 25 },
    { id: 'ach8', emoji: '🌍', name: 'Poliglota', desc: '500 palavras novas', target: 500, track: 'wordsLearned', points: 25 },
    { id: 'ach9', emoji: '🔥', name: 'Fênix', desc: 'Streak de 30 dias', target: 30, track: 'maxStreak', points: 30 },
    { id: 'ach10', emoji: '👑', name: 'Rei do RPG', desc: 'Alcançar nível 10', target: 10, track: 'maxLevel', points: 50 },
];