// missions.js - CORRIGIDO (todas basePoints mínimas = 2)
const MISSION_CATEGORIES = {
    saude: {
        emoji: '💪',
        name: 'Saúde & Corpo',
        color: '#ef4444',
        classMap: 'guerreiro',
        missions: [
            // Treinos Livres (rápidos, 10-30min)
            { id: 'free_s1', emoji: '💪', name: '50 Polichinelos', basePoints: 2, level: 'free' },
            { id: 'free_s2', emoji: '🤸', name: '50 Flexões na Parede', basePoints: 2, level: 'free' },
            { id: 'free_s3', emoji: '🦵', name: '30 Agachamentos', basePoints: 2, level: 'free' },
            { id: 'free_s4', emoji: '🧘', name: 'Alongamento 10min', basePoints: 2, level: 'free' },       // ✅ era 1
            { id: 'free_s5', emoji: '🚶', name: 'Caminhada 15min', basePoints: 2, level: 'free' },
            { id: 'free_s6', emoji: '🏃', name: 'Corrida leve 10min', basePoints: 3, level: 'free' },
            { id: 'free_s7', emoji: '🦵', name: '20 Afundos', basePoints: 2, level: 'free' },
            { id: 'free_s8', emoji: '💪', name: '30 seg Prancha', basePoints: 2, level: 'free' },         // ✅ era 1
            
            // Treinos Diários (planejados, 1h-1h30)
            { id: 'daily_s1', emoji: '💪', name: '100 Polichinelos + 100 Flexões', basePoints: 5, level: 'daily' },
            { id: 'daily_s2', emoji: '🏋️', name: 'Treino Completo (peito/braço)', basePoints: 8, level: 'daily' },
            { id: 'daily_s3', emoji: '🦵', name: 'Treino de Pernas Completo', basePoints: 8, level: 'daily' },
            { id: 'daily_s4', emoji: '🏃', name: 'Corrida 5km', basePoints: 6, level: 'daily' },
            { id: 'daily_s5', emoji: '🧘', name: 'Yoga 45min', basePoints: 4, level: 'daily' },
            { id: 'daily_s6', emoji: '🚴', name: 'Bicicleta 1h', basePoints: 6, level: 'daily' },
            
            // Treinos Inspirados (2h+, requer streak)
            { id: 'insp_s1', emoji: '🔥', name: 'Treino Full Body 2h', basePoints: 15, level: 'inspired' },
            { id: 'insp_s2', emoji: '🏃', name: 'Corrida 10km+', basePoints: 15, level: 'inspired' },
            { id: 'insp_s3', emoji: '💪', name: 'Calistenia Avançada 2h', basePoints: 18, level: 'inspired' },
            { id: 'insp_s4', emoji: '🏋️', name: 'Musculação Pesada 2h+', basePoints: 20, level: 'inspired' },
        ],
    },
    mente: {
        emoji: '🧠',
        name: 'Mente & Conhecimento',
        color: '#8b5cf6',
        classMap: 'mago',
        missions: [
            // Treinos Livres
            { id: 'free_m1', emoji: '📖', name: 'Ler 15 minutos', basePoints: 2, level: 'free' },              // ✅ era 1
            { id: 'free_m2', emoji: '🌍', name: 'Aprender 5 palavras inglês', basePoints: 2, level: 'free' }, // ✅ era 1
            { id: 'free_m3', emoji: '🧘', name: 'Meditar 5min', basePoints: 2, level: 'free' },               // ✅ era 1
            { id: 'free_m4', emoji: '🎯', name: 'Resolver 2 problemas lógica', basePoints: 2, level: 'free' },
            { id: 'free_m5', emoji: '📝', name: 'Escrever diário 10min', basePoints: 2, level: 'free' },      // ✅ era 1
            
            // Treinos Diários
            { id: 'daily_m1', emoji: '💻', name: 'Estudar Programação 1h30', basePoints: 6, level: 'daily' },
            { id: 'daily_m2', emoji: '📚', name: 'Ler 1h (livro técnico)', basePoints: 5, level: 'daily' },
            { id: 'daily_m3', emoji: '🧠', name: 'Curso Online 1h', basePoints: 6, level: 'daily' },
            { id: 'daily_m4', emoji: '🎯', name: 'Resolver 10 exercícios', basePoints: 5, level: 'daily' },
            
            // Treinos Inspirados
            { id: 'insp_m1', emoji: '🔥', name: 'Maratona de Estudos 3h', basePoints: 18, level: 'inspired' },
            { id: 'insp_m2', emoji: '💻', name: 'Projeto Pessoal 4h', basePoints: 22, level: 'inspired' },
            { id: 'insp_m3', emoji: '📚', name: 'Ler livro inteiro', basePoints: 20, level: 'inspired' },
        ],
    },
    organizacao: {
        emoji: '🏠',
        name: 'Organização',
        color: '#f59e0b',
        classMap: 'arquiteto',
        missions: [
            // Treinos Livres
            { id: 'free_o1', emoji: '🛏️', name: 'Arrumar a Cama', basePoints: 2, level: 'free' },          // ✅ era 1
            { id: 'free_o2', emoji: '🗂️', name: 'Organizar Mesa', basePoints: 2, level: 'free' },         // ✅ era 1
            { id: 'free_o3', emoji: '🧹', name: 'Varrer 1 cômodo', basePoints: 2, level: 'free' },        // ✅ era 1
            { id: 'free_o4', emoji: '👕', name: 'Dobrar 10 roupas', basePoints: 2, level: 'free' },       // ✅ era 1
            
            // Treinos Diários
            { id: 'daily_o1', emoji: '🏠', name: 'Faxina Completa 1h', basePoints: 5, level: 'daily' },
            { id: 'daily_o2', emoji: '📋', name: 'Planejar Semana', basePoints: 3, level: 'daily' },
            { id: 'daily_o3', emoji: '🪴', name: 'Cuidar do Jardim 1h', basePoints: 4, level: 'daily' },
            
            // Treinos Inspirados
            { id: 'insp_o1', emoji: '🔥', name: 'Organização Geral 3h', basePoints: 15, level: 'inspired' },
            { id: 'insp_o2', emoji: '🏠', name: 'Reforma de Cômodo', basePoints: 20, level: 'inspired' },
        ],
    },
    alimentacao: {
        emoji: '💧',
        name: 'Alimentação',
        color: '#10b981',
        classMap: 'druida',
        missions: [
            // Treinos Livres
            { id: 'free_a1', emoji: '💧', name: 'Beber 1 copo de água', basePoints: 2, level: 'free' },   // ✅ era 1
            { id: 'free_a2', emoji: '🍎', name: 'Comer uma fruta', basePoints: 2, level: 'free' },        // ✅ era 1
            { id: 'free_a3', emoji: '🥗', name: 'Comer salada', basePoints: 2, level: 'free' },           // ✅ era 1
            
            // Treinos Diários
            { id: 'daily_a1', emoji: '💧', name: 'Beber 2L de Água', basePoints: 3, level: 'daily' },
            { id: 'daily_a2', emoji: '🍳', name: 'Preparar Refeição Completa', basePoints: 5, level: 'daily' },
            { id: 'daily_a3', emoji: '🥤', name: 'Dia sem Refrigerante', basePoints: 4, level: 'daily' },
            { id: 'daily_a4', emoji: '🥗', name: 'Todas Refeições Saudáveis', basePoints: 6, level: 'daily' },
            
            // Treinos Inspirados
            { id: 'insp_a1', emoji: '🔥', name: 'Preparar Banquete Saudável', basePoints: 12, level: 'inspired' },
            { id: 'insp_a2', emoji: '📝', name: 'Planejar Cardápio Semanal', basePoints: 10, level: 'inspired' },
        ],
    },
};

// Mapeamento de missão para classe (automático)
const MISSION_CLASS_MAP = {};
Object.entries(MISSION_CATEGORIES).forEach(([categoryKey, category]) => {
    category.missions.forEach(m => {
        MISSION_CLASS_MAP[m.id] = category.classMap;
    });
});

// Lista plana de todas as missões
const ALL_MISSIONS = Object.values(MISSION_CATEGORIES).flatMap(c => c.missions);

// Missões por nível
const MISSIONS_BY_LEVEL = {
    free: ALL_MISSIONS.filter(m => m.level === 'free'),
    daily: ALL_MISSIONS.filter(m => m.level === 'daily'),
    inspired: ALL_MISSIONS.filter(m => m.level === 'inspired'),
};

// Missões surpresa
const SURPRISE_MISSIONS = [
    { emoji: '🚶', name: 'Caminhar 2 km', points: 10 },
    { emoji: '💪', name: 'Fazer 200 polichinelos', points: 12 },
    { emoji: '🏠', name: 'Organizar o quarto', points: 8 },
    { emoji: '🧠', name: 'Aprender algo novo por 1h', points: 15 },
    { emoji: '🧘', name: 'Meditar 15 minutos', points: 8 },
    { emoji: '📝', name: 'Escrever diário de gratidão', points: 10 },
];