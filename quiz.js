const quizQuestions = {
    easy: [
        {
            question: 'O que é rotação de culturas?',
            options: ['Girar as plantas', 'Alternar plantios em diferentes estações', 'Colher tudo de uma vez', 'Plantar em círculo'],
            correct: 1
        },
        {
            question: 'Qual é o benefício da biodiversidade?',
            options: ['Mais trabalho', 'Atrai polinizadores', 'Gasta mais água', 'Reduz produção'],
            correct: 1
        },
        {
            question: 'Como economizar água na agricultura?',
            options: ['Regar mais', 'Usar irrigação eficiente', 'Não regar', 'Regar à noite'],
            correct: 1
        },
        {
            question: 'O que reduz emissões de carbono?',
            options: ['Mais máquinas', 'Práticas agroecológicas', 'Mais fertilizantes', 'Monocultura'],
            correct: 1
        },
        {
            question: 'Qual cultura é ideal para primavera?',
            options: ['Milho', 'Trigo', 'Centeio', 'Aveia'],
            correct: 0
        }
    ],
    medium: [
        {
            question: 'Qual é o impacto da rotação de culturas no solo?',
            options: ['Degrada o solo', 'Mantém fertilidade', 'Causa erosão', 'Aumenta salinidade'],
            correct: 1
        },
        {
            question: 'Como as certificações sustentáveis beneficiam produtores?',
            options: ['Reduzem custos', 'Aumentam valor de mercado', 'Diminuem produção', 'Complicam vendas'],
            correct: 1
        },
        {
            question: 'Qual prática reduz o uso de defensivos?',
            options: ['Monocultura', 'Rotação de culturas', 'Mais irrigação', 'Plantio denso'],
            correct: 1
        },
        {
            question: 'Qual é o benefício econômico da sustentabilidade?',
            options: ['Menor rentabilidade', 'Maior rentabilidade a longo prazo', 'Sem diferença', 'Perda total'],
            correct: 1
        },
        {
            question: 'Como a biodiversidade protege a plantação?',
            options: ['Não protege', 'Reduz pragas naturalmente', 'Aumenta pragas', 'Sem efeito'],
            correct: 1
        },
        {
            question: 'Qual estação é ideal para soja?',
            options: ['Primavera', 'Verão', 'Outono', 'Inverno'],
            correct: 1
        },
        {
            question: 'Qual é o impacto do agronegócio sustentável no clima?',
            options: ['Aumenta aquecimento', 'Reduz emissões', 'Sem impacto', 'Piora clima'],
            correct: 1
        },
        {
            question: 'Como tecnologia verde ajuda a agricultura?',
            options: ['Não ajuda', 'Monitora saúde do solo', 'Aumenta custos', 'Reduz produção'],
            correct: 1
        }
    ],
    hard: [
        {
            question: 'Qual é o ciclo ideal de rotação de culturas?',
            options: ['1 ano', '2 anos', '3-4 anos', '10 anos'],
            correct: 2
        },
        {
            question: 'Como a agroecologia melhora a sustentabilidade?',
            options: ['Aumenta químicos', 'Usa processos naturais', 'Reduz produção', 'Ignora solo'],
            correct: 1
        },
        {
            question: 'Qual é o impacto da monocultura?',
            options: ['Aumenta biodiversidade', 'Degrada solo e aumenta pragas', 'Economiza água', 'Reduz custos'],
            correct: 1
        },
        {
            question: 'Como certificações ambientais funcionam?',
            options: ['São falsas', 'Verificam práticas sustentáveis', 'Não têm valor', 'Aumentam custos'],
            correct: 1
        },
        {
            question: 'Qual é o benefício da cobertura vegetal?',
            options: ['Nenhum', 'Protege solo e reduz erosão', 'Prejudica plantação', 'Aumenta pragas'],
            correct: 1
        },
        {
            question: 'Como o agronegócio sustentável afeta mercados?',
            options: ['Reduz demanda', 'Aumenta demanda e preços', 'Sem efeito', 'Prejudica vendas'],
            correct: 1
        },
        {
            question: 'Qual prática reduz dependência de fertilizantes?',
            options: ['Aumentar fertilizantes', 'Rotação e biodiversidade', 'Monocultura', 'Sem práticas'],
            correct: 1
        },
        {
            question: 'Como água é conservada em agricultura sustentável?',
            options: ['Não é', 'Irrigação eficiente e cobertura vegetal', 'Mais irrigação', 'Sem conservação'],
            correct: 1
        },
        {
            question: 'Qual é o impacto da biodiversidade na produtividade?',
            options: ['Reduz', 'Aumenta através de polinizadores', 'Sem efeito', 'Prejudica'],
            correct: 1
        },
        {
            question: 'Como startups de agritech contribuem?',
            options: ['Não contribuem', 'Desenvolvem soluções inovadoras', 'Aumentam custos', 'Prejudicam'],
            correct: 1
        }
    ]
};

let currentDifficulty = 'easy';
let quizState = {
    questions: [],
    currentQuestion: 0,
    score: 0,
    correct: 0,
    answered: false
};

function getDifficultyQuestions() {
    return quizQuestions[currentDifficulty];
}

function initQuiz() {
    quizState = {
        questions: getDifficultyQuestions(),
        currentQuestion: 0,
        score: 0,
        correct: 0,
        answered: false
    };

    const container = document.getElementById('quizGame');
    container.innerHTML = '';
    
    displayQuestion();
    updateDifficultyDisplay('quiz');
    updateQuizScore();
}

function displayQuestion() {
    const container = document.getElementById('quizGame');
    container.innerHTML = '';

    if (quizState.currentQuestion >= quizState.questions.length) {
        showQuizResults();
        return;
    }

    const question = quizState.questions[quizState.currentQuestion];
    
    const questionDiv = document.createElement('div');
    questionDiv.className = 'quiz-question';
    questionDiv.innerHTML = `<h4>Pergunta ${quizState.currentQuestion + 1}/${quizState.questions.length}: ${question.question}</h4>`;
    
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'quiz-options';
    
    question.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'quiz-option';
        optionBtn.textContent = option;
        optionBtn.onclick = () => selectAnswer(index, question.correct);
        optionsDiv.appendChild(optionBtn);
    });
    
    questionDiv.appendChild(optionsDiv);
    container.appendChild(questionDiv);
}

function selectAnswer(selected, correct) {
    if (quizState.answered) return;
    
    quizState.answered = true;
    
    const options = document.querySelectorAll('.quiz-option');
    
    if (selected === correct) {
        options[selected].classList.add('correct');
        quizState.score += 10;
        quizState.correct++;
    } else {
        options[selected].classList.add('incorrect');
        options[correct].classList.add('correct');
    }
    
    options.forEach(opt => opt.style.pointerEvents = 'none');
    
    updateQuizScore();
    
    setTimeout(() => {
        quizState.currentQuestion++;
        quizState.answered = false;
        displayQuestion();
    }, 1500);
}

function showQuizResults() {
    const container = document.getElementById('quizGame');
    container.innerHTML = '';
    
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'quiz-question';
    resultsDiv.innerHTML = `
        <h4>🎉 Quiz Concluído!</h4>
        <p style="font-size: 1.2rem; margin: 1rem 0;"><strong>Acertos: ${quizState.correct}/${quizState.questions.length}</strong></p>
        <p style="font-size: 1rem;"><strong>Pontuação Final: ${quizState.score}</strong></p>
        <p style="margin-top: 1rem; font-size: 0.95rem;">Parabéns por testar seus conhecimentos sobre sustentabilidade agrícola!</p>
    `;
    
    container.appendChild(resultsDiv);
}

function updateQuizScore() {
    const scoreElement = document.getElementById('quizScore');
    scoreElement.textContent = `Pontos: ${quizState.score} | Acertos: ${quizState.correct}`;
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

function openQuizGame() {
    const modal = document.getElementById('quizModal');
    modal.style.display = 'block';
    initQuiz();
}

function closeQuizGame() {
    const modal = document.getElementById('quizModal');
    modal.style.display = 'none';
}

function resetQuizGame() {
    initQuiz();
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
    const modal = document.getElementById('quizModal');
    if (event.target === modal) {
        closeQuizGame();
    }
});
