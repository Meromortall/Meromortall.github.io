// shop.js - Loja organizada por tiers de esforço
const SHOP_ITEMS = [
    // ========== ESFORÇO MÍNIMO (0-100pts) ==========
    // 🎮 Lazer Digital
    { id: 's1', emoji: '🎮', name: '30min de jogo casual', cost: 2, hours: 0.5, tier: 'minimal', category: 'lazer' },
    { id: 's2', emoji: '📱', name: '30min de redes sociais', cost: 2, hours: 0.5, tier: 'minimal', category: 'lazer' },
    { id: 's3', emoji: '🎬', name: '1 episódio de série', cost: 3, hours: 0, tier: 'minimal', category: 'lazer' },
    { id: 's4', emoji: '🎵', name: '1h de música/podcast', cost: 2, hours: 0, tier: 'minimal', category: 'lazer' },
    { id: 's5', emoji: '📺', name: '2 episódios de série', cost: 5, hours: 0, tier: 'minimal', category: 'lazer' },
    
    // 🍫 Comidas & Bebidas
    { id: 's10', emoji: '🍫', name: 'Chocolate pequeno', cost: 3, hours: 0, tier: 'minimal', category: 'comida' },
    { id: 's11', emoji: '☕', name: 'Café especial', cost: 2, hours: 0, tier: 'minimal', category: 'comida' },
    { id: 's12', emoji: '🍪', name: 'Biscoito recheado', cost: 4, hours: 0, tier: 'minimal', category: 'comida' },
    { id: 's13', emoji: '🧃', name: 'Suco natural', cost: 2, hours: 0, tier: 'minimal', category: 'comida' },
    { id: 's14', emoji: '🍦', name: 'Sorvete', cost: 5, hours: 0, tier: 'minimal', category: 'comida' },
    
    // 😴 Pequenos Prazeres
    { id: 's20', emoji: '😴', name: 'Soneca de 30min', cost: 3, hours: 0.5, tier: 'minimal', category: 'prazer' },
    { id: 's21', emoji: '🛁', name: 'Banho relaxante longo', cost: 4, hours: 0, tier: 'minimal', category: 'prazer' },
    { id: 's22', emoji: '📖', name: 'Ler por prazer 30min', cost: 2, hours: 0, tier: 'minimal', category: 'prazer' },

    // ========== ESFORÇO MODERADO (100-500pts) ==========
    // 🎮 Lazer Digital
    { id: 's30', emoji: '🎮', name: '3h de jogos', cost: 15, hours: 3, tier: 'moderate', category: 'lazer' },
    { id: 's31', emoji: '🎬', name: 'Filme completo + pipoca', cost: 10, hours: 0, tier: 'moderate', category: 'lazer' },
    { id: 's32', emoji: '📺', name: 'Maratonar 4 episódios', cost: 18, hours: 0, tier: 'moderate', category: 'lazer' },
    { id: 's33', emoji: '🎮', name: 'Noite de jogos (4h)', cost: 20, hours: 4, tier: 'moderate', category: 'lazer' },
    
    // 🍕 Comidas & Bebidas
    { id: 's40', emoji: '🍕', name: 'Pedir pizza', cost: 20, hours: 0, tier: 'moderate', category: 'comida' },
    { id: 's41', emoji: '🍔', name: 'Hambúrguer artesanal', cost: 15, hours: 0, tier: 'moderate', category: 'comida' },
    { id: 's42', emoji: '🍣', name: 'Rodízio de sushi', cost: 35, hours: 0, tier: 'moderate', category: 'comida' },
    { id: 's43', emoji: '🎂', name: 'Bolo inteiro', cost: 12, hours: 0, tier: 'moderate', category: 'comida' },
    
    // 😴 Prazeres
    { id: 's50', emoji: '😴', name: 'Dormir 2h mais tarde', cost: 25, hours: 0, tier: 'moderate', category: 'prazer' },
    { id: 's51', emoji: '🛍️', name: 'Comprar algo até R$50', cost: 20, hours: 0, tier: 'moderate', category: 'prazer' },
    { id: 's52', emoji: '🎲', name: 'Noite de jogos de tabuleiro', cost: 15, hours: 0, tier: 'moderate', category: 'prazer' },

    // ========== ESFORÇO MÁXIMO (500+ pts) ==========
    // 🎮 Lazer Digital
    { id: 's60', emoji: '🎮', name: 'Maratona de jogos (8h)', cost: 60, hours: 8, tier: 'maximum', category: 'lazer' },
    { id: 's61', emoji: '🎮', name: 'Comprar jogo novo (R$200)', cost: 80, hours: 0, tier: 'maximum', category: 'lazer' },
    { id: 's62', emoji: '📺', name: 'Maratonar temporada inteira', cost: 50, hours: 0, tier: 'maximum', category: 'lazer' },
    
    // 🍕 Comidas & Bebidas
    { id: 's70', emoji: '🍽️', name: 'Jantar em restaurante', cost: 60, hours: 0, tier: 'maximum', category: 'comida' },
    { id: 's71', emoji: '🍖', name: 'Churrasco completo', cost: 45, hours: 0, tier: 'maximum', category: 'comida' },
    
    // 🎉 Grandes Recompensas
    { id: 's80', emoji: '🎉', name: 'Dia livre total', cost: 50, hours: 0, tier: 'maximum', category: 'prazer' },
    { id: 's81', emoji: '🏖️', name: 'Passeio especial', cost: 80, hours: 0, tier: 'maximum', category: 'prazer' },
    { id: 's82', emoji: '🛍️', name: 'Comprar algo até R$200', cost: 70, hours: 0, tier: 'maximum', category: 'prazer' },
    { id: 's83', emoji: '✈️', name: 'Viagem de fim de semana', cost: 150, hours: 0, tier: 'maximum', category: 'prazer' },
];

// Categorias da loja
const SHOP_CATEGORIES = {
    lazer: { emoji: '🎮', name: 'Lazer Digital' },
    comida: { emoji: '🍕', name: 'Comidas & Bebidas' },
    prazer: { emoji: '😴', name: 'Pequenos Prazeres' },
};