// Listening Game for clothing in English

const clothingItems = [
    { id: 'shirt', english: 'Shirt', russian: 'Рубашка' },
    { id: 'pants', english: 'Pants', russian: 'Брюки' },
    { id: 'dress', english: 'Dress', russian: 'Платье' },
    { id: 'skirt', english: 'Skirt', russian: 'Юбка' },
    { id: 'jacket', english: 'Jacket', russian: 'Куртка' },
    { id: 'coat', english: 'Coat', russian: 'Пальто' },
    { id: 'hat', english: 'Hat', russian: 'Шляпа' },
    { id: 'shoes', english: 'Shoes', russian: 'Обувь' },
    { id: 'socks', english: 'Socks', russian: 'Носки' },
    { id: 'gloves', english: 'Gloves', russian: 'Перчатки' },
    { id: 'scarf', english: 'Scarf', russian: 'Шарф' },
    { id: 't-shirt', english: 'T‑shirt', russian: 'Футболка' }
];

// Game state
let currentQuestion = 1;
const totalQuestions = clothingItems.length;
let score = 0;
let timerInterval = null;
let seconds = 0;
let correctItem = null;
let gameActive = true;
let usedItems = [];

// DOM elements
const playButton = document.getElementById('play-button');
const optionsContainer = document.getElementById('options-container');
const scoreElement = document.getElementById('score');
const questionCounterElement = document.getElementById('question-counter');
const timerElement = document.getElementById('timer');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const questionArea = document.querySelector('.question-area');

// Initialize game
function initGame() {
    currentQuestion = 1;
    score = 0;
    seconds = 0;
    gameActive = true;
    usedItems = [];
    updateScore();
    updateQuestionCounter();
    startTimer();
    generateQuestion();
    nextButton.style.display = 'none';
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
    if (questionArea) questionArea.style.display = '';
}

// Start timer
function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        seconds++;
        updateTimerDisplay();
    }, 1000);
}

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Update score display
function updateScore() {
    scoreElement.textContent = score;
}

// Update question counter
function updateQuestionCounter() {
    questionCounterElement.textContent = `${currentQuestion} / ${totalQuestions}`;
}

// Generate a random integer between min and max inclusive
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Speak a clothing item using audio files
function speakItem(item) {
    // Сопоставление идентификаторов слов с именами файлов
    const audioFiles = {
        'shirt': 'pronunciation_en_shirt.mp3',
        'pants': 'pronunciation_en_pants.mp3',
        'dress': 'pronunciation_en_dress.mp3',
        'skirt': 'pronunciation_en_skirt.mp3',
        'jacket': 'pronunciation_en_jacket.mp3',
        'coat': 'pronunciation_en_coat.mp3',
        'hat': 'pronunciation_en_hat.mp3',
        'shoes': 'pronunciation_en_shoes.mp3',
        'socks': 'pronunciation_en_socks.mp3',
        'gloves': 'pronunciation_en_gloves.mp3',
        'scarf': 'pronunciation_en_scarf.mp3',
        't-shirt': 'pronunciation_en_t-shirt.mp3'
    };

    const audioFile = audioFiles[item.id];
    if (!audioFile) {
        console.error('Аудиофайл не найден для слова:', item.id);
        // Fallback на Web Speech API
        const speech = new SpeechSynthesisUtterance();
        speech.text = item.english;
        speech.lang = 'en-US';
        speech.rate = 0.8;
        speech.pitch = 1;
        speech.volume = 1;
        window.speechSynthesis.speak(speech);
        return;
    }

    const audioPath = `clothingsounds/${audioFile}`;
    const audio = new Audio(audioPath);
    
    // Визуальная обратная связь для кнопки воспроизведения
    const playButton = document.getElementById('play-button');
    if (playButton) {
        playButton.style.backgroundColor = '#4CAF50';
        playButton.style.color = 'white';
        setTimeout(() => {
            playButton.style.backgroundColor = '';
            playButton.style.color = '';
        }, 500);
    }
    
    audio.play().catch(error => {
        console.error('Ошибка воспроизведения аудио:', error);
        // Fallback на Web Speech API если аудиофайл не загрузился
        const speech = new SpeechSynthesisUtterance();
        speech.text = item.english;
        speech.lang = 'en-US';
        speech.rate = 0.8;
        speech.pitch = 1;
        speech.volume = 1;
        window.speechSynthesis.speak(speech);
    });
}

// Get a random item that hasn't been used yet
function getRandomUnusedItem() {
    const availableItems = clothingItems.filter(item => !usedItems.includes(item.id));
    if (availableItems.length === 0) return null;
    const randomIndex = getRandomInt(0, availableItems.length - 1);
    return availableItems[randomIndex];
}

// Generate a question with options
function generateQuestion() {
    if (!gameActive) return;
    
    // Get a random unused item
    correctItem = getRandomUnusedItem();
    if (!correctItem) {
        endGame();
        return;
    }
    
    usedItems.push(correctItem.id);
    
    // Create array of wrong options (all items except correct one)
    const wrongItems = clothingItems.filter(item => item.id !== correctItem.id);
    
    // Shuffle wrong items and pick 3
    const shuffledWrong = [...wrongItems].sort(() => Math.random() - 0.5).slice(0, 3);
    
    // Combine correct and wrong options
    const options = [correctItem, ...shuffledWrong];
    
    // Shuffle the options
    options.sort(() => Math.random() - 0.5);
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create option buttons
    options.forEach(item => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = item.russian;
        button.dataset.id = item.id;
        button.addEventListener('click', () => checkAnswer(item.id));
        optionsContainer.appendChild(button);
    });
    
    // Speak the correct item automatically after a short delay
    setTimeout(() => {
        if (correctItem) {
            speakItem(correctItem);
        }
    }, 500);
    
    // Enable all buttons
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('correct', 'incorrect', 'disabled');
    });
    
    // Update UI
    updateQuestionCounter();
}

// Check the selected answer
function checkAnswer(selectedId) {
    if (!gameActive) return;
    
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled');
        
        if (btn.dataset.id === correctItem.id) {
            btn.classList.add('correct');
        } else if (btn.dataset.id === selectedId && selectedId !== correctItem.id) {
            btn.classList.add('incorrect');
        }
    });
    
    if (selectedId === correctItem.id) {
        score++;
        updateScore();
        feedbackElement.textContent = '✅ Правильно!';
        feedbackElement.className = 'feedback correct';
    } else {
        feedbackElement.textContent = `❌ Неправильно. Правильный ответ: ${correctItem.russian}`;
        feedbackElement.className = 'feedback incorrect';
    }
    
    gameActive = false;
    nextButton.style.display = 'inline-block';
}

// Move to next question
function nextQuestion() {
    if (currentQuestion >= totalQuestions) {
        endGame();
        return;
    }
    
    currentQuestion++;
    gameActive = true;
    nextButton.style.display = 'none';
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
    generateQuestion();
}

// End the game
function endGame() {
    gameActive = false;
    clearInterval(timerInterval);
    
    const percentage = Math.round((score / totalQuestions) * 100);
    let message = `Игра завершена! Ваш результат: ${score} из ${totalQuestions} (${percentage}%)`;
    
    if (percentage === 100) {
        message += ' 🎉 Отличный результат! Вы знаете всю одежду!';
    } else if (percentage >= 80) {
        message += ' 👍 Хорошая работа!';
    } else if (percentage >= 60) {
        message += ' 😊 Неплохо, но можно лучше!';
    } else {
        message += ' 📚 Потренируйтесь ещё!';
    }
    
    feedbackElement.textContent = message;
    feedbackElement.className = 'feedback';
    
    // Hide question area
    if (questionArea) questionArea.style.display = 'none';
    
    // Show restart button prominently
    nextButton.style.display = 'none';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    
    playButton.addEventListener('click', () => {
        if (correctItem) {
            speakItem(correctItem);
        }
    });
    
    nextButton.addEventListener('click', nextQuestion);
    
    restartButton.addEventListener('click', () => {
        clearInterval(timerInterval);
        initGame();
    });
});

// Prevent speech synthesis from being blocked by browser
window.addEventListener('beforeunload', () => {
    if (timerInterval) clearInterval(timerInterval);
    window.speechSynthesis.cancel();
});
