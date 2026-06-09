

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

memory.js
const cardsData = [
    { id: 1, emoji: '🌾' },
    { id: 2, emoji: '💧' },
    { id: 3, emoji: '🌍' },
    { id: 4, emoji: '🐝' },
    { id: 5, emoji: '🚜' },
    { id: 6, emoji: '🌱' },
    { id: 7, emoji: '☀️' },
    { id: 8, emoji: '🌳' }
];

let currentDifficulty = 'easy';
let memoryState = {
    cards: [],
    flipped: [],
    matched: [],
    score: 0,
    moves: 0
};

function getDifficultyCards() {
    if (currentDifficulty === 'easy') {
        return [...cardsData.slice(0, 4), ...cardsData.slice(0, 4)];
    } else if (currentDifficulty === 'medium') {
        return [...cardsData.slice(0, 6), ...cardsData.slice(0, 6)];
    } else {
        return [...cardsData, ...cardsData];
    }
}

function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function initMemory() {
    memoryState = {
        cards: shuffle(getDifficultyCards()),
        flipped: [],
        matched: [],
        score: 0,
        moves: 0
    };

    const container = document.getElementById('memoryGame');
    container.innerHTML = '';

    memoryState.cards.forEach((card, index) => {
        const element = document.createElement('div');
        element.className = 'memory-card';
        element.dataset.index = index;
        element.dataset.id = card.id;
        element.innerHTML = '?';
        element.addEventListener('click', () => flipCard(index, element));
        container.appendChild(element);
    });

    updateDifficultyDisplay('memory');
    updateScore();
}

function flipCard(index, element) {
    if (memoryState.flipped.includes(index) || 
        memoryState.matched.includes(index) ||
        memoryState.flipped.length >= 2) {
        return;
    }

    element.classList.add('flipped');
    element.innerHTML = memoryState.cards[index].emoji;
    memoryState.flipped.push(index);

    if (memoryState.flipped.length === 2) {
        memoryState.moves++;
        checkMatch();
    }
}

function checkMatch() {
    const [index1, index2] = memoryState.flipped;
    const card1 = memoryState.cards[index1];
    const card2 = memoryState.cards[index2];

    if (card1.id === card2.id) {
        memoryState.matched.push(index1, index2);
        memoryState.score += 10;

        const allCards = document.querySelectorAll('.memory-card');
        allCards[index1].classList.add('matched');
        allCards[index2].classList.add('matched');

        memoryState.flipped = [];

        if (memoryState.matched.length === memoryState.cards.length) {
            setTimeout(() => {
                alert(`🎉 Parabéns! Você venceu em ${memoryState.moves} movimentos!\nPontuação: ${memoryState.score}`);
            }, 500);
        }
    } else {
        setTimeout(() => {
            const allCards = document.querySelectorAll('.memory-card');
            allCards[index1].classList.remove('flipped');
            allCards[index2].classList.remove('flipped');
            allCards[index1].innerHTML = '?';
            allCards[index2].innerHTML = '?';
            memoryState.flipped = [];
        }, 1000);
    }

    updateScore();
}

function updateScore() {
    const scoreElement = document.getElementById('memoryScore');
    scoreElement.textContent = `Pontos: ${memoryState.score} | Movimentos: ${memoryState.moves}`;
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

function openMemoryGame() {
    const modal = document.getElementById('memoryModal');
    modal.style.display = 'block';
    initMemory();
}

function closeMemoryGame() {
    const modal = document.getElementById('memoryModal');
    modal.style.display = 'none';
}

function resetMemoryGame() {
    initMemory();
}

function setDifficulty(level) {
    currentDifficulty = level;
    const buttons = document.querySelectorAll('.difficulty-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

window.addEventListener('click', (event) => {
    const modal = document.getElementById('memoryModal');
    if (event.target === modal) {
        closeMemoryGame();
    }
});
Como Criar um Jogo em um Site com HTML, CSS e JavaScript - Manus
