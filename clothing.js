// Функция для воспроизведения произношения слова из аудиофайлов
function playWordSound(wordId) {
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

    const audioFile = audioFiles[wordId];
    if (!audioFile) {
        console.error('Аудиофайл не найден для слова:', wordId);
        return;
    }

    const audioPath = `clothingsounds/${audioFile}`;
    const audio = new Audio(audioPath);

    // Визуальная обратная связь
    const button = event?.target;
    if (button) {
        button.style.transform = 'scale(0.95)';
        button.style.backgroundColor = '#4CAF50';
        button.style.color = 'white';
        
        setTimeout(() => {
            button.style.transform = '';
            button.style.backgroundColor = '';
            button.style.color = '';
        }, 500);
    }

    audio.play().catch(error => {
        console.error('Ошибка воспроизведения аудио:', error);
        // Fallback на Web Speech API если аудиофайл не загрузился
        const speech = new SpeechSynthesisUtterance();
        speech.text = getWordText(wordId);
        speech.lang = 'en-US';
        speech.rate = 0.8;
        speech.pitch = 1;
        speech.volume = 1;
        window.speechSynthesis.speak(speech);
    });
}

// Возвращает английский текст для слова
function getWordText(id) {
    const words = {
        'shirt': 'Shirt',
        'pants': 'Pants',
        'dress': 'Dress',
        'skirt': 'Skirt',
        'jacket': 'Jacket',
        'coat': 'Coat',
        'hat': 'Hat',
        'shoes': 'Shoes',
        'socks': 'Socks',
        'gloves': 'Gloves',
        'scarf': 'Scarf',
        't-shirt': 'T‑shirt'
    };
    return words[id] || id;
}

// Возвращает русский перевод слова
function getWordTranslation(id) {
    const translations = {
        'shirt': 'Рубашка',
        'pants': 'Брюки',
        'dress': 'Платье',
        'skirt': 'Юбка',
        'jacket': 'Куртка',
        'coat': 'Пальто',
        'hat': 'Шляпа',
        'shoes': 'Обувь',
        'socks': 'Носки',
        'gloves': 'Перчатки',
        'scarf': 'Шарф',
        't-shirt': 'Футболка'
    };
    return translations[id] || '';
}
