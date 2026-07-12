// missions.js - Definição das missões e categorias
const MISSION_CATEGORIES = {
    saude: {
        emoji: '💪',
        name: 'Saúde & Corpo',
        color: '#ef4444',
        missions: [
            { id: 'm1', emoji: '💪', name: '100 Polichinelos', points: 2 },
            { id: 'm2', emoji: '🤸', name: '100 Flexões na Parede', points: 2 },
            { id: 'm8', emoji: '🚶', name: '30min de Caminhada', points: 3 },
            { id: 'm9', emoji: '😴', name: 'Dormir 7h+', points: 3 },
            { id: 'm10', emoji: '🧘', name: 'Alongamento 10min', points: 1 },
        ],
    },
    mente: {
        emoji: '🧠',
        name: 'Mente & Conhecimento',
        color: '#8b5cf6',
        missions: [
            { id: 'm6', emoji: '📖', name: 'Ler 20 Minutos', points: 2 },
            { id: 'm7', emoji: '💻', name: 'Estudar Programação 1h', points: 4 },
            { id: 'm11', emoji: '🧘', name: 'Meditar 10min', points: 2 },
            { id: 'm12', emoji: '🌍', name: 'Aprender 5 palavras em inglês', points: 1 },
        ],
    },
    organizacao: {
        emoji: '🏠',
        name: 'Organização',
        color: '#f59e0b',
        missions: [
            { id: 'm3', emoji: '🛏️', name: 'Arrumar a Cama', points: 1 },
            { id: 'm13', emoji: '🏠', name: '15min de Limpeza', points: 2 },
            { id: 'm14', emoji: '📋', name: 'Planejar o dia seguinte', points: 1 },
        ],
    },
    alimentacao: {
        emoji: '💧',
        name: 'Alimentação',
        color: '#10b981',
        missions: [
            { id: 'm4', emoji: '💧', name: 'Beber 2L de Água', points: 1 },
            { id: 'm5', emoji: '🥗', name: 'Comer Refeição Saudável', points: 2 },
            { id: 'm15', emoji: '🍳', name: 'Preparar a própria comida', points: 3 },
            { id: 'm16', emoji: '🥤', name: 'Dia sem Refrigerante', points: 3 },
        ],
    },
};

// Mapeamento de missão para classe
const MISSION_CLASS_MAP = {};
Object.entries(MISSION_CATEGORIES).forEach(([categoryKey, category]) => {
    const classMap = {
        saude: 'guerreiro',
        mente: 'mago',
        organizacao: 'arquiteto',
        alimentacao: 'druida',
    };
    category.missions.forEach(m => {
        MISSION_CLASS_MAP[m.id] = classMap[categoryKey];
    });
});

// Lista plana de todas as missões
const ALL_MISSIONS = Object.values(MISSION_CATEGORIES).flatMap(c => c.missions);

// Missões surpresa
const SURPRISE_MISSIONS = [
    { emoji: '🚶', name: 'Caminhar 2 km', points: 10 },
    { emoji: '💪', name: 'Fazer 200 polichinelos', points: 12 },
    { emoji: '🏠', name: 'Organizar o quarto', points: 8 },
    { emoji: '🧠', name: 'Aprender algo novo por 1h', points: 15 },
    { emoji: '🧘', name: 'Meditar 15 minutos', points: 8 },
    { emoji: '📝', name: 'Escrever diário de gratidão', points: 10 },
];