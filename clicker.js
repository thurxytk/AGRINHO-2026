let currentDifficulty = 'easy';
let clickerState = {
    score: 0,
    timeLeft: 30,
    gameActive: false,
    timerInterval: null
};

const difficultySettings = {
    easy: { time: 30, emoji: '🌾' },
    medium: { time: 20, emoji: '🌾' },
    hard: { time: 10, emoji: '🌾' }
};

function initClicker() {
    clickerState = {
        score: 0,
        timeLeft: difficultySettings[currentDifficulty].time,
        gameActive: true,
        timerInterval: null
    };

    const container = document.getElementById('clickerGame');
    container.innerHTML = '';
    
    const timerDiv = document.createElement('div');
    timerDiv.className = 'clicker-timer';
    timerDiv.id = 'clickerTimer';
    timerDiv.textContent = `Tempo: ${clickerState.timeLeft}s`;
    
    const buttonDiv = document.createElement('div');
    const button = document.createElement('button');
    button.className = 'clicker-button';
    button.textContent = difficultySettings[currentDifficulty].emoji;
    button.onclick = () => clickCrop();
    buttonDiv.appendChild(button);
    
    container.appendChild(timerDiv);
    container.appendChild(buttonDiv);
    
    updateDifficultyDisplay('clicker');
    updateClickerScore();
    
    startClickerTimer();
}

function clickCrop() {
    if (!clickerState.gameActive) return;
    
    clickerState.score++;
    updateClickerScore();
    
    const button = document.querySelector('.clicker-button');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 100);
}

function startClickerTimer() {
    clickerState.timerInterval = setInterval(() => {
        clickerState.timeLeft--;
        
        const timerDiv = document.getElementById('clickerTimer');
        if (timerDiv) {
            timerDiv.textContent = `Tempo: ${clickerState.timeLeft}s`;
        }
        
        if (clickerState.timeLeft <= 0) {
            endClickerGame();
        }
    }, 1000);
}

function endClickerGame() {
    clickerState.gameActive = false;
    clearInterval(clickerState.timerInterval);
    
    const button = document.querySelector('.clicker-button');
    if (button) {
        button.disabled = true;
        button.style.opacity = '0.5';
    }
    
    setTimeout(() => {
        const message = `🎉 Tempo Acabou!\nVocê colheu ${clickerState.score} culturas!\nPontuação: ${clickerState.score}`;
        alert(message);
    }, 500);
}

function updateClickerScore() {
    const scoreElement = document.getElementById('clickerScore');
    scoreElement.textContent = `Pontos: ${clickerState.score} | Tempo: ${clickerState.timeLeft}s`;
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

function openClickerGame() {
    const modal = document.getElementById('clickerModal');
    modal.style.display = 'block';
    initClicker();
}

function closeClickerGame() {
    const modal = document.getElementById('clickerModal');
    modal.style.display = 'none';
    clearInterval(clickerState.timerInterval);
    clickerState.gameActive = false;
}

function resetClickerGame() {
    clearInterval(clickerState.timerInterval);
    initClicker();
}

function setDifficulty(level) {
    currentDifficulty = level;
    const buttons = document.querySelectorAll('.difficulty-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

window.addEventListener('click', (event) => {
    const modal = document.getElementById('clickerModal');
    if (event.target === modal) {
        closeClickerGame();
    }
});
