

Iniciar teste gratuito

Compartilhar
não precisa de informaçoes tecnicas, apenas um guia de uso sobre os jogos e etc, informaçoes apenas meu nome
Lite
Perfeito! Vou refazer o HTML com um guia de uso dos jogos, informações sobre sustentabilidade agrícola e apenas seus dados de contato. Deixa comigo!
Preferência de complexidade de código e sugestões



Lite
Perfeito! ✅ Refiz o projeto com tudo que você pediu!
✨ Principais mudanças:
HTML (index.html)
✅ Guia de uso dos jogos com instruções claras
✅ Informações sobre sustentabilidade agrícola
✅ Seção "Como Usar os Jogos" com 4 passos
✅ Detalhes de cada jogo e dificuldade
✅ Dicas para melhorar desempenho
✅ Apenas seus dados de contato (nome + WhatsApp)
✅ Sem informações técnicas do projeto
CSS (styles.css)
✅ Design moderno e chamativo
✅ Cores vibrantes (verde, amarelo, laranja, azul)
✅ Muitos efeitos visuais (animações, sombras, gradientes)
✅ Cards e elementos bem trabalhados
✅ Layout responsivo e limpo
JavaScript (memory.js e rotation.js)
✅ 3 níveis de dificuldade (Fácil, Médio, Difícil)
✅ Fácil: 4 pares / 4 culturas
✅ Médio: 6 pares / 6 culturas
✅ Difícil: 8 pares / 8 culturas
✅ Exibe o nível selecionado no jogo
🎮 Como funciona:
Clique em um nível de dificuldade
Clique no botão do jogo
Jogue e ganhe pontos!
Tudo pronto para colocar no GitHub! 🚀
index.html
Código · 14.58 KB
styles.css
Código · 19.42 KB
memory.js
Código · 4.42 KB
rotation.js
Código · 5.21 KB
Ver todos os arquivos nesta tarefa
Tarefa concluída
Como foi este resultado?
Sugestões de acompanhamento
const seasons = [
    { name: 'Primavera', id: 'spring' },
    { name: 'Verão', id: 'summer' },
    { name: 'Outono', id: 'autumn' },
    { name: 'Inverno', id: 'winter' }
];

const allCrops = [
    { name: 'Milho', season: 'spring', 


GitHub

Computadores na nuvem
Novo

rotation.js
const seasons = [
    { name: 'Primavera', id: 'spring' },
    { name: 'Verão', id: 'summer' },
    { name: 'Outono', id: 'autumn' },
    { name: 'Inverno', id: 'winter' }
];

const allCrops = [
    { name: 'Milho', season: 'spring', emoji: '🌽' },
    { name: 'Soja', season: 'summer', emoji: '🫘' },
    { name: 'Trigo', season: 'autumn', emoji: '🌾' },
    { name: 'Aveia', season: 'winter', emoji: '🌾' },
    { name: 'Feijão', season: 'spring', emoji: '🫘' },
    { name: 'Arroz', season: 'summer', emoji: '🍚' },
    { name: 'Cevada', season: 'autumn', emoji: '🌾' },
    { name: 'Centeio', season: 'winter', emoji: '🌾' }
];

let currentDifficulty = 'easy';
let rotationState = {
    placed: {},
    score: 0,
    selectedCrop: null
};

function getDifficultyCrops() {
    if (currentDifficulty === 'easy') {
        return allCrops.slice(0, 4);
    } else if (currentDifficulty === 'medium') {
        return allCrops.slice(0, 6);
    } else {
        return allCrops;
    }
}

function initRotation() {
    rotationState = {
        placed: {},
        score: 0,
        selectedCrop: null
    };

    const container = document.getElementById('rotationGame');
    container.innerHTML = '';

    seasons.forEach(season => {
        const slot = document.createElement('div');
        slot.className = 'season-slot';
        slot.id = season.id;
        slot.innerHTML = `<div class="season-title">${season.name}</div>`;
        slot.addEventListener('click', () => placeCrop(season.id));
        container.appendChild(slot);
    });

    const available = document.createElement('div');
    available.className = 'crops-available';
    available.innerHTML = '<h4>Clique em uma cultura e depois na estação</h4>';

    const crops = getDifficultyCrops();
    crops.forEach(crop => {
        const item = document.createElement('div');
        item.className = 'crop-item';
        item.id = 'crop-' + crop.name;
        item.innerHTML = `${crop.emoji} ${crop.name}`;
        item.dataset.crop = crop.name;
        item.dataset.season = crop.season;
        item.addEventListener('click', () => selectCrop(item, crop.name));
        available.appendChild(item);
    });

    container.appendChild(available);
    updateDifficultyDisplay('rotation');
    updateRotationScore();
}

function selectCrop(element, cropName) {
    const allCrops = document.querySelectorAll('.crop-item');
    allCrops.forEach(crop => crop.style.border = 'none');
    
    if (rotationState.selectedCrop === cropName) {
        rotationState.selectedCrop = null;
    } else {
        element.style.border = '3px solid #2d5016';
        rotationState.selectedCrop = cropName;
    }
}

function placeCrop(seasonId) {
    if (!rotationState.selectedCrop) {
        alert('Selecione uma cultura primeiro!');
        return;
    }

    const cropElement = document.getElementById('crop-' + rotationState.selectedCrop);
    const correctSeason = cropElement.dataset.season;

    if (correctSeason === seasonId) {
        cropElement.classList.add('placed');
        cropElement.style.pointerEvents = 'none';
        cropElement.style.opacity = '0.5';
        
        const slot = document.getElementById(seasonId);
        const placed = document.createElement('div');
        placed.className = 'crop-item placed';
        placed.innerHTML = cropElement.innerHTML;
        slot.appendChild(placed);

        rotationState.score += 25;
        rotationState.selectedCrop = null;

        const remainingCrops = document.querySelectorAll('.crop-item:not(.placed)').length;
        if (remainingCrops === 1) {
            setTimeout(() => {
                alert(`🎉 Perfeito! Você acertou a rotação!\nPontuação: ${rotationState.score}`);
            }, 300);
        }
    } else {
        alert('❌ Essa cultura não é ideal para essa estação!');
        rotationState.selectedCrop = null;
        const allCrops = document.querySelectorAll('.crop-item');
        allCrops.forEach(crop => crop.style.border = 'none');
    }

    updateRotationScore();
}

function updateRotationScore() {
    const scoreElement = document.getElementById('rotationScore');
    scoreElement.textContent = `Pontos: ${rotationState.score}`;
}

function updateDifficultyDisplay(game) {
    const difficultyMap = {
        'easy': 'Nível: Fácil 🟢',
        'medium': 'Nível: Médio 🟡',
        'hard': 'Nível: Difícil 🔴'
    };
    
    const element = document.getElementById(game + 'Difficulty');
    if (element) {
        element.textContent = difficultyMap[currentDifficulty];
    }
}

function openRotationGame() {
    const modal = document.getElementById('rotationModal');
    modal.style.display = 'block';
    initRotation();
}

function closeRotationGame() {
    const modal = document.getElementById('rotationModal');
    modal.style.display = 'none';
}

function resetRotationGame() {
    initRotation();
}

function setDifficulty(level) {
    currentDifficulty = level;
    const buttons = document.querySelectorAll('.difficulty-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

window.addEventListener('click', (event) => {
    const modal = document.getElementById('rotationModal');
    if (event.target === modal) {
        closeRotationGame();
    }
});
Como Criar um Jogo em um Site com HTML, CSS e JavaScript - Manus
