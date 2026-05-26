const seasons = [
    { name: 'Primavera', id: 'spring' },
    { name: 'Verão', id: 'summer' },
    { name: 'Outono', id: 'autumn' },
    { name: 'Inverno', id: 'winter' }
];

const crops = [
    { name: 'Milho', season: 'spring', emoji: '🌽' },
    { name: 'Soja', season: 'summer', emoji: '🫘' },
    { name: 'Trigo', season: 'autumn', emoji: '🌾' },
    { name: 'Aveia', season: 'winter', emoji: '🌾' }
];

let rotationState = {
    selectedCrops: [],
    score: 0
};

function initRotation() {
    rotationState = {
        selectedCrops: [],
        score: 0
    };

    const container = document.getElementById('rotationGame');
    container.innerHTML = '';

    seasons.forEach(season => {
        const slot = document.createElement('div');
        slot.className = 'season-slot';
        slot.id = season.id;
        slot.innerHTML = `<div class="season-title">${season.name}</div>`;
        slot.addEventListener('drop', (e) => dropCrop(e, season.id));
        slot.addEventListener('dragover', (e) => e.preventDefault());
        container.appendChild(slot);
    });

    const available = document.createElement('div');
    available.className = 'crops-available';
    available.innerHTML = '<h4>Culturas Disponíveis</h4>';

    crops.forEach(crop => {
        const item = document.createElement('div');
        item.className = 'crop-item';
        item.draggable = true;
        item.innerHTML = `${crop.emoji} ${crop.name}`;
        item.dataset.crop = crop.name;
        item.dataset.season = crop.season;
        item.addEventListener('dragstart', (e) => e.dataTransfer.effectAllowed = 'move');
        available.appendChild(item);
    });

    container.appendChild(available);

    updateRotationScore();
}

function dropCrop(event, seasonId) {
    event.preventDefault();
    
    const item = document.querySelector(`[data-crop][data-season]`);
    
    if (!item) return;

    const isCorrect = item.dataset.season === seasonId;

    if (isCorrect) {
        const copy = item.cloneNode(true);
        copy.classList.add('placed');
        copy.draggable = false;
        document.getElementById(seasonId).appendChild(copy);
        item.remove();
        rotationState.score += 25;
        
        if (document.querySelectorAll('.crop-item:not(.placed)').length === 0) {
            setTimeout(() => {
                alert(`🎉 Perfeito! Você acertou a rotação!\nPontuação: ${rotationState.score}`);
            }, 300);
        }
    } else {
        alert('❌ Essa cultura não é ideal para essa estação!');
    }

    updateRotationScore();
}

function updateRotationScore() {
    const scoreElement = document.getElementById('rotationScore');
    scoreElement.textContent = `Pontos: ${rotationState.score}`;
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

window.addEventListener('click', (event) => {
    const modal = document.getElementById('rotationModal');
    if (event.target === modal) {
        closeRotationGame();
    }
});
