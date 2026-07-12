// foods.js - Banco de alimentos com calorias e índice de saúde
const FOODS_DB = {
    // 🥚 Ovos e proteínas
    'ovo': { emoji: '🥚', name: 'Ovo', kcal: 70, unit: 'unidade', health: 85 },
    'ovos': { emoji: '🥚', name: 'Ovos', kcal: 70, unit: 'unidade', health: 85 },
    'carne': { emoji: '🥩', name: 'Carne', kcal: 250, unit: 'pedaço (100g)', health: 60 },
    'frango': { emoji: '🍗', name: 'Frango', kcal: 165, unit: 'pedaço (100g)', health: 75 },
    'peixe': { emoji: '🐟', name: 'Peixe', kcal: 200, unit: 'pedaço (100g)', health: 90 },
    'bife': { emoji: '🥩', name: 'Bife', kcal: 250, unit: 'unidade', health: 60 },
    'atum': { emoji: '🐟', name: 'Atum', kcal: 130, unit: 'lata', health: 80 },
    'sardinha': { emoji: '🐟', name: 'Sardinha', kcal: 150, unit: 'lata', health: 75 },
    'camarão': { emoji: '🦐', name: 'Camarão', kcal: 100, unit: 'porção (100g)', health: 85 },
    'camarao': { emoji: '🦐', name: 'Camarão', kcal: 100, unit: 'porção (100g)', health: 85 },

    // 🍞 Carboidratos
    'pão': { emoji: '🍞', name: 'Pão', kcal: 130, unit: 'fatia', health: 40 },
    'pao': { emoji: '🍞', name: 'Pão', kcal: 130, unit: 'fatia', health: 40 },
    'pão integral': { emoji: '🍞', name: 'Pão Integral', kcal: 100, unit: 'fatia', health: 65 },
    'arroz': { emoji: '🍚', name: 'Arroz', kcal: 170, unit: 'porção (100g)', health: 50 },
    'arroz integral': { emoji: '🍚', name: 'Arroz Integral', kcal: 160, unit: 'porção (100g)', health: 70 },
    'macarrão': { emoji: '🍝', name: 'Macarrão', kcal: 350, unit: 'prato', health: 30 },
    'macarrao': { emoji: '🍝', name: 'Macarrão', kcal: 350, unit: 'prato', health: 30 },
    'batata': { emoji: '🥔', name: 'Batata', kcal: 160, unit: 'unidade', health: 50 },
    'batata doce': { emoji: '🍠', name: 'Batata Doce', kcal: 120, unit: 'unidade', health: 75 },
    'purê': { emoji: '🥔', name: 'Purê', kcal: 200, unit: 'porção', health: 45 },
    'pure': { emoji: '🥔', name: 'Purê', kcal: 200, unit: 'porção', health: 45 },

    // 🍪 Biscoitos e bolachas
    'bolacha': { emoji: '🍪', name: 'Bolacha', kcal: 50, unit: 'unidade', health: 5 },
    'bolachas': { emoji: '🍪', name: 'Bolacha', kcal: 50, unit: 'unidade', health: 5 },
    'biscoito': { emoji: '🍪', name: 'Biscoito', kcal: 50, unit: 'unidade', health: 5 },
    'biscoitos': { emoji: '🍪', name: 'Biscoito', kcal: 50, unit: 'unidade', health: 5 },
    'torrada': { emoji: '🍞', name: 'Torrada', kcal: 80, unit: 'unidade', health: 35 },
    'torradas': { emoji: '🍞', name: 'Torrada', kcal: 80, unit: 'unidade', health: 35 },
    'tapioca': { emoji: '🫓', name: 'Tapioca', kcal: 180, unit: 'unidade', health: 55 },
    'cuscuz': { emoji: '🍚', name: 'Cuscuz', kcal: 150, unit: 'porção', health: 55 },

    // 🍰 Doces e sobremesas
    'bolo': { emoji: '🍰', name: 'Bolo', kcal: 280, unit: 'fatia', health: 20 },
    'bolo caseiro': { emoji: '🍰', name: 'Bolo Caseiro', kcal: 250, unit: 'fatia', health: 35 },
    'bolo de massa pronta': { emoji: '🍰', name: 'Bolo Massa Pronta', kcal: 280, unit: 'fatia', health: 20 },
    'bolo pré-ponto': { emoji: '🍰', name: 'Bolo Pré-Ponto', kcal: 280, unit: 'fatia', health: 20 },
    'bolo recheado': { emoji: '🎂', name: 'Bolo Recheado', kcal: 450, unit: 'fatia', health: 3 },
    'bolo de aniversário': { emoji: '🎂', name: 'Bolo de Aniversário', kcal: 500, unit: 'fatia', health: 2 },
    'bolo de chocolate': { emoji: '🍫', name: 'Bolo de Chocolate', kcal: 400, unit: 'fatia', health: 8 },
    'chocolate': { emoji: '🍫', name: 'Chocolate', kcal: 250, unit: 'barra (100g)', health: 10 },
    'sorvete': { emoji: '🍦', name: 'Sorvete', kcal: 200, unit: 'bola', health: 5 },
    'doce': { emoji: '🍬', name: 'Doce', kcal: 100, unit: 'unidade', health: 8 },
    'açúcar': { emoji: '🍬', name: 'Açúcar', kcal: 50, unit: 'colher', health: 0 },
    'acucar': { emoji: '🍬', name: 'Açúcar', kcal: 50, unit: 'colher', health: 0 },
    'mel': { emoji: '🍯', name: 'Mel', kcal: 64, unit: 'colher', health: 40 },
    'brigadeiro': { emoji: '🍫', name: 'Brigadeiro', kcal: 80, unit: 'unidade', health: 5 },
    'brigadeiros': { emoji: '🍫', name: 'Brigadeiro', kcal: 80, unit: 'unidade', health: 5 },
    'pudim': { emoji: '🍮', name: 'Pudim', kcal: 300, unit: 'fatia', health: 5 },
    'mousse': { emoji: '🍫', name: 'Mousse', kcal: 250, unit: 'taça', health: 5 },

    // 🍕 Fast food e industrializados
    'pizza': { emoji: '🍕', name: 'Pizza', kcal: 300, unit: 'fatia', health: 10 },
    'hamburguer': { emoji: '🍔', name: 'Hambúrguer', kcal: 550, unit: 'unidade', health: 8 },
    'hambúrguer': { emoji: '🍔', name: 'Hambúrguer', kcal: 550, unit: 'unidade', health: 8 },
    'batata frita': { emoji: '🍟', name: 'Batata Frita', kcal: 350, unit: 'porção', health: 5 },
    'cachorro quente': { emoji: '🌭', name: 'Cachorro Quente', kcal: 300, unit: 'unidade', health: 5 },
    'salgadinho': { emoji: '🥨', name: 'Salgadinho', kcal: 250, unit: 'pacote', health: 2 },
    'salgadinhos': { emoji: '🥨', name: 'Salgadinho', kcal: 250, unit: 'pacote', health: 2 },
    'nugget': { emoji: '🍗', name: 'Nugget', kcal: 50, unit: 'unidade', health: 10 },
    'nuggets': { emoji: '🍗', name: 'Nugget', kcal: 50, unit: 'unidade', health: 10 },
    'pastel': { emoji: '🥟', name: 'Pastel', kcal: 300, unit: 'unidade', health: 10 },
    'pastéis': { emoji: '🥟', name: 'Pastel', kcal: 300, unit: 'unidade', health: 10 },
    'pasteis': { emoji: '🥟', name: 'Pastel', kcal: 300, unit: 'unidade', health: 10 },
    'coxinha': { emoji: '🍗', name: 'Coxinha', kcal: 200, unit: 'unidade', health: 10 },

    // 🥗 Verduras e legumes
    'salada': { emoji: '🥗', name: 'Salada', kcal: 50, unit: 'prato', health: 100 },
    'alface': { emoji: '🥬', name: 'Alface', kcal: 15, unit: 'porção', health: 100 },
    'tomate': { emoji: '🍅', name: 'Tomate', kcal: 22, unit: 'unidade', health: 95 },
    'cenoura': { emoji: '🥕', name: 'Cenoura', kcal: 40, unit: 'unidade', health: 95 },
    'brócolis': { emoji: '🥦', name: 'Brócolis', kcal: 55, unit: 'porção', health: 100 },
    'brocolis': { emoji: '🥦', name: 'Brócolis', kcal: 55, unit: 'porção', health: 100 },
    'couve': { emoji: '🥬', name: 'Couve', kcal: 30, unit: 'porção', health: 100 },
    'espinafre': { emoji: '🥬', name: 'Espinafre', kcal: 25, unit: 'porção', health: 100 },
    'pepino': { emoji: '🥒', name: 'Pepino', kcal: 15, unit: 'unidade', health: 100 },
    'beterraba': { emoji: '🫒', name: 'Beterraba', kcal: 45, unit: 'unidade', health: 90 },
    'abobrinha': { emoji: '🥒', name: 'Abobrinha', kcal: 30, unit: 'unidade', health: 95 },

    // 🍎 Frutas
    'fruta': { emoji: '🍎', name: 'Fruta', kcal: 80, unit: 'unidade', health: 90 },
    'frutas': { emoji: '🍎', name: 'Fruta', kcal: 80, unit: 'unidade', health: 90 },
    'banana': { emoji: '🍌', name: 'Banana', kcal: 105, unit: 'unidade', health: 85 },
    'bananas': { emoji: '🍌', name: 'Banana', kcal: 105, unit: 'unidade', health: 85 },
    'maçã': { emoji: '🍎', name: 'Maçã', kcal: 95, unit: 'unidade', health: 90 },
    'maça': { emoji: '🍎', name: 'Maçã', kcal: 95, unit: 'unidade', health: 90 },
    'laranja': { emoji: '🍊', name: 'Laranja', kcal: 62, unit: 'unidade', health: 90 },
    'laranjas': { emoji: '🍊', name: 'Laranja', kcal: 62, unit: 'unidade', health: 90 },
    'uva': { emoji: '🍇', name: 'Uva', kcal: 70, unit: 'cacho pequeno', health: 85 },
    'uvas': { emoji: '🍇', name: 'Uva', kcal: 70, unit: 'cacho pequeno', health: 85 },
    'mamão': { emoji: '🍈', name: 'Mamão', kcal: 120, unit: 'fatia', health: 85 },
    'mamao': { emoji: '🍈', name: 'Mamão', kcal: 120, unit: 'fatia', health: 85 },
    'melancia': { emoji: '🍉', name: 'Melancia', kcal: 90, unit: 'fatia', health: 90 },
    'abacaxi': { emoji: '🍍', name: 'Abacaxi', kcal: 80, unit: 'fatia', health: 85 },
    'morango': { emoji: '🍓', name: 'Morango', kcal: 5, unit: 'unidade', health: 90 },
    'morangos': { emoji: '🍓', name: 'Morango', kcal: 5, unit: 'unidade', health: 90 },
    'kiwi': { emoji: '🥝', name: 'Kiwi', kcal: 45, unit: 'unidade', health: 90 },
    'abacate': { emoji: '🥑', name: 'Abacate', kcal: 240, unit: 'unidade', health: 80 },

    // 🥛 Laticínios
    'leite': { emoji: '🥛', name: 'Leite', kcal: 120, unit: 'copo', health: 70 },
    'iogurte': { emoji: '🥛', name: 'Iogurte', kcal: 100, unit: 'unidade', health: 75 },
    'iogurtes': { emoji: '🥛', name: 'Iogurte', kcal: 100, unit: 'unidade', health: 75 },
    'queijo': { emoji: '🧀', name: 'Queijo', kcal: 100, unit: 'fatia', health: 50 },
    'queijos': { emoji: '🧀', name: 'Queijo', kcal: 100, unit: 'fatia', health: 50 },
    'manteiga': { emoji: '🧈', name: 'Manteiga', kcal: 70, unit: 'colher', health: 20 },
    'requeijão': { emoji: '🧀', name: 'Requeijão', kcal: 70, unit: 'colher', health: 25 },
    'requeijao': { emoji: '🧀', name: 'Requeijão', kcal: 70, unit: 'colher', health: 25 },
    'margarina': { emoji: '🧈', name: 'Margarina', kcal: 50, unit: 'colher', health: 10 },
    'cream cheese': { emoji: '🧀', name: 'Cream Cheese', kcal: 80, unit: 'colher', health: 30 },
    'leite condensado': { emoji: '🥛', name: 'Leite Condensado', kcal: 130, unit: 'colher', health: 2 },
    'creme de leite': { emoji: '🥛', name: 'Creme de Leite', kcal: 100, unit: 'colher', health: 15 },

    // 🥤 Bebidas
    'refrigerante': { emoji: '🥤', name: 'Refrigerante', kcal: 150, unit: 'lata', health: 0 },
    'refri': { emoji: '🥤', name: 'Refrigerante', kcal: 150, unit: 'lata', health: 0 },
    'coca': { emoji: '🥤', name: 'Coca-Cola', kcal: 150, unit: 'lata', health: 0 },
    'suco': { emoji: '🧃', name: 'Suco', kcal: 100, unit: 'copo', health: 60 },
    'suco natural': { emoji: '🧃', name: 'Suco Natural', kcal: 90, unit: 'copo', health: 80 },
    'café': { emoji: '☕', name: 'Café', kcal: 5, unit: 'xícara', health: 70 },
    'cafe': { emoji: '☕', name: 'Café', kcal: 5, unit: 'xícara', health: 70 },
    'água': { emoji: '💧', name: 'Água', kcal: 0, unit: 'copo', health: 100 },
    'agua': { emoji: '💧', name: 'Água', kcal: 0, unit: 'copo', health: 100 },
    'chá': { emoji: '🫖', name: 'Chá', kcal: 5, unit: 'xícara', health: 85 },
    'cha': { emoji: '🫖', name: 'Chá', kcal: 5, unit: 'xícara', health: 85 },
    'cerveja': { emoji: '🍺', name: 'Cerveja', kcal: 150, unit: 'lata', health: 2 },
    'vinho': { emoji: '🍷', name: 'Vinho', kcal: 120, unit: 'taça', health: 15 },
    'energético': { emoji: '⚡', name: 'Energético', kcal: 110, unit: 'lata', health: 0 },
    'energetico': { emoji: '⚡', name: 'Energético', kcal: 110, unit: 'lata', health: 0 },

    // 🍳 Refeições completas e mistas
    'omelete': { emoji: '🍳', name: 'Omelete', kcal: 250, unit: 'unidade', health: 65 },
    'sanduíche': { emoji: '🥪', name: 'Sanduíche', kcal: 400, unit: 'unidade', health: 25 },
    'sanduiche': { emoji: '🥪', name: 'Sanduíche', kcal: 400, unit: 'unidade', health: 25 },
    'sopa': { emoji: '🍜', name: 'Sopa', kcal: 150, unit: 'prato', health: 70 },
    'feijão': { emoji: '🫘', name: 'Feijão', kcal: 130, unit: 'porção', health: 70 },
    'feijao': { emoji: '🫘', name: 'Feijão', kcal: 130, unit: 'porção', health: 70 },
    'lasanha': { emoji: '🍝', name: 'Lasanha', kcal: 450, unit: 'pedaço', health: 20 },
    'panqueca': { emoji: '🥞', name: 'Panqueca', kcal: 200, unit: 'unidade', health: 25 },
    'panquecas': { emoji: '🥞', name: 'Panqueca', kcal: 200, unit: 'unidade', health: 25 },
    'estrogonofe': { emoji: '🍛', name: 'Estrogonofe', kcal: 400, unit: 'prato', health: 30 },
    'churrasco': { emoji: '🥩', name: 'Churrasco', kcal: 600, unit: 'porção', health: 35 },
    'feijoada': { emoji: '🫘', name: 'Feijoada', kcal: 500, unit: 'prato', health: 30 },

    // 🌰 Oleaginosas e snacks
    'amendoim': { emoji: '🥜', name: 'Amendoim', kcal: 160, unit: 'porção', health: 60 },
    'nozes': { emoji: '🌰', name: 'Nozes', kcal: 180, unit: 'porção', health: 75 },
    'castanha': { emoji: '🌰', name: 'Castanha', kcal: 170, unit: 'porção', health: 75 },
    'castanhas': { emoji: '🌰', name: 'Castanha', kcal: 170, unit: 'porção', health: 75 },
    'pipoca': { emoji: '🍿', name: 'Pipoca', kcal: 100, unit: 'pacote pequeno', health: 40 },
    'barrinha': { emoji: '🍫', name: 'Barrinha de Cereal', kcal: 90, unit: 'unidade', health: 45 },
};

// Sinônimos para busca
const FOOD_SYNONYMS = {
    'biscoito': 'bolacha',
    'biscoitos': 'bolacha',
    'pao': 'pão',
    'macarrao': 'macarrão',
    'mamao': 'mamão',
    'maça': 'maçã',
    'requeijao': 'requeijão',
    'cafe': 'café',
    'refri': 'refrigerante',
    'sanduiche': 'sanduíche',
    'feijao': 'feijão',
    'acucar': 'açúcar',
    'brocolis': 'brócolis',
    'agua': 'água',
    'pure': 'purê',
    'cha': 'chá',
    'energetico': 'energético',
    'coca cola': 'coca',
    'hamburguer': 'hambúrguer',
    'pasteis': 'pastel',
};

// Feedback baseado em kcal + saúde
const FEEDBACK_MESSAGES = [
    { max: 500, emoji: '⚠️', text: 'Comeu quase nada! Tá tentando sumir? Coma mais, mas comida de verdade.' },
    { max: 1000, emoji: '✅', text: 'Tá no caminho certo! Refeições balanceadas, continue assim.' },
    { max: 1500, emoji: '👍', text: 'Bom volume de comida. Só cuidado com os doces, hein?' },
    { max: 2000, emoji: '🤔', text: 'Tá comendo bem... até demais? Olha os carboidratos aí.' },
    { max: 2500, emoji: '😅', text: 'Rapaiz... Calma na janta! Tá comendo por dois?' },
    { max: 3000, emoji: '😰', text: 'Irmão... o bolo era pra ser uma fatia, não o bolo inteiro.' },
    { max: 4000, emoji: '💀', text: 'RAPAIZ... CE VAI MORRER! Faz 200 flexões AGORA pra compensar!' },
    { max: Infinity, emoji: '⚰️', text: 'MEU DEUS! Que isso, um banquete medieval? Corre 10km amanhã!' },
];

// Sugestão de exercício PÓS-REFEIÇÃO (leve e realista)
function getExerciseSuggestion(totalKcal) {
    // Não sugere exercício se comeu pouco
    if (totalKcal <= 800) return null;
    
    // Treinos leves pós-refeição (queima ~5-10% das kcal ingeridas)
    if (totalKcal <= 1200) {
        return { 
            emoji: '🚶', 
            text: 'Caminhada 15min ou 30 polichinelos', 
            points: 2,
            kcalBurn: Math.round(totalKcal * 0.05),
        };
    }
    if (totalKcal <= 1800) {
        return { 
            emoji: '💪', 
            text: '50 polichinelos + 30 agachamentos', 
            points: 3,
            kcalBurn: Math.round(totalKcal * 0.06),
        };
    }
    if (totalKcal <= 2500) {
        return { 
            emoji: '🏃', 
            text: 'Caminhada 30min ou 100 polichinelos', 
            points: 5,
            kcalBurn: Math.round(totalKcal * 0.07),
        };
    }
    if (totalKcal <= 3500) {
        return { 
            emoji: '🔥', 
            text: 'Corrida 3km ou 150 polichinelos + 50 flexões', 
            points: 8,
            kcalBurn: Math.round(totalKcal * 0.08),
        };
    }
    if (totalKcal <= 5000) {
        return { 
            emoji: '💀', 
            text: 'Corrida 5km ou 200 polichinelos + 100 flexões', 
            points: 12,
            kcalBurn: Math.round(totalKcal * 0.08),
        };
    }
    return { 
        emoji: '⚰️', 
        text: 'Treino Full Body 1h + Corrida 5km', 
        points: 18,
        kcalBurn: Math.round(totalKcal * 0.10),
    };
}

// NOVO: Sugestão por refeição individual (leve, pós-refeição)
function getPostMealExercise(mealKcal) {
    if (mealKcal <= 300) return null;
    
    if (mealKcal <= 500) {
        return { emoji: '🚶', text: '20 polichinelos ou 5min caminhada', kcalBurn: Math.round(mealKcal * 0.04) };
    }
    if (mealKcal <= 800) {
        return { emoji: '💪', text: '30 polichinelos + 20 agachamentos', kcalBurn: Math.round(mealKcal * 0.05) };
    }
    if (mealKcal <= 1200) {
        return { emoji: '🏃', text: '50 polichinelos + 30 flexões', kcalBurn: Math.round(mealKcal * 0.06) };
    }
    return { emoji: '🔥', text: '100 polichinelos ou 15min caminhada', kcalBurn: Math.round(mealKcal * 0.07) };
}

// Classificação de saúde da refeição
function getHealthRating(healthScore) {
    if (healthScore >= 90) return { emoji: '💚', label: 'Muito Saudável!', color: '#22c55e' };
    if (healthScore >= 70) return { emoji: '👍', label: 'Saudável', color: '#10b981' };
    if (healthScore >= 50) return { emoji: '😐', label: 'Regular', color: '#f59e0b' };
    if (healthScore >= 30) return { emoji: '🤔', label: 'Meia-boca', color: '#f97316' };
    if (healthScore >= 10) return { emoji: '😰', label: 'Porcaria', color: '#ef4444' };
    return { emoji: '💀', label: 'LIXO TÓXICO', color: '#7f1d1d' };
}
