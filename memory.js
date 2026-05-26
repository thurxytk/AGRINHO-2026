const cards = [
    { id: 1, emoji: '🌾' },
    { id: 2, emoji: '💧' },
    { id: 3, emoji: '🌍' },
    { id: 4, emoji: '🐝' },
    { id: 1, emoji: '🌾' },
    { id: 2, emoji: '💧' },
    { id: 3, emoji: '🌍' },
    { id: 4, emoji: '🐝' }
];

let memoryState = {
    cards: [],
    flipped: [],
    matched: [],
    score: 0,
    moves: 0
};

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
        cards: shuffle(cards),
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

window.addEventListener('click', (event) => {
    const modal = document.getElementById('memoryModal');
    if (event.target === modal) {
        closeMemoryGame();
    }
});
