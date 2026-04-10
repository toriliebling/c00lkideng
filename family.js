// Функция для воспроизведения произношения слова через аудиофайлы
function playWordSound(wordId) {
    // Сопоставление идентификаторов слов с именами файлов
    const audioFiles = {
        'mother': 'pronunciation_en_mother.mp3',
        'father': 'pronunciation_en_father.mp3',
        'sister': 'pronunciation_en_sister.mp3',
        'brother': 'pronunciation_en_brother.mp3',
        'grandmother': 'pronunciation_en_grandmother.mp3',
        'grandfather': 'pronunciation_en_grandfather.mp3',
        'aunt': 'pronunciation_en_aunt.mp3',
        'uncle': 'pronunciation_en_uncle.mp3',
        'cousin': 'pronunciation_en_cousin.mp3',
        'son': 'pronunciation_en_son.mp3',
        'daughter': 'pronunciation_en_daughter.mp3',
        'family': 'pronunciation_en_family.mp3'
    };

    const fileName = audioFiles[wordId];
    if (!fileName) {
        console.error('Аудиофайл для слова "' + wordId + '" не найден');
        return;
    }

    const audioPath = 'soundsfamily/' + fileName;
    const audio = new Audio(audioPath);

    // Визуальная обратная связь
    const button = event?.target;
    if (button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 200);
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
        'mother': 'Mother',
        'father': 'Father',
        'sister': 'Sister',
        'brother': 'Brother',
        'grandmother': 'Grandmother',
        'grandfather': 'Grandfather',
        'aunt': 'Aunt',
        'uncle': 'Uncle',
        'cousin': 'Cousin',
        'son': 'Son',
        'daughter': 'Daughter',
        'family': 'Family'
    };
    return words[id] || id;
}

// Возвращает русский перевод слова
function getWordTranslation(id) {
    const translations = {
        'mother': 'Мама',
        'father': 'Папа',
        'sister': 'Сестра',
        'brother': 'Брат',
        'grandmother': 'Бабушка',
        'grandfather': 'Дедушка',
        'aunt': 'Тётя',
        'uncle': 'Дядя',
        'cousin': 'Двоюродный брат/сестра',
        'son': 'Сын',
        'daughter': 'Дочь',
        'family': 'Семья'
    };
    return translations[id] || '';
}

// Данные о словах (факты и примеры) - оставлены для возможного будущего использования
const wordData = {
    'mother': {
        fact: 'Базовое слово для обозначения матери.',
        examples: [
            'My mother is a teacher.',
            'I love my mother.',
            'Mother, can you help me?'
        ]
    },
    'father': {
        fact: 'Базовое слово для обозначения отца.',
        examples: [
            'My father works in an office.',
            'Father, can we go to the park?',
            'He is a good father.'
        ]
    },
    'sister': {
        fact: 'Слово для обозначения сестры.',
        examples: [
            'I have one sister.',
            'My sister is older than me.',
            'She is my little sister.'
        ]
    },
    'brother': {
        fact: 'Слово для обозначения брата.',
        examples: [
            'He is my brother.',
            'I have two brothers.',
            'My brother plays football.'
        ]
    },
    'grandmother': {
        fact: 'Слово для обозначения бабушки.',
        examples: [
            'My grandmother bakes cookies.',
            'We visit grandmother every Sunday.',
            'Grandmother tells interesting stories.'
        ]
    },
    'grandfather': {
        fact: 'Слово для обозначения дедушки.',
        examples: [
            'My grandfather has a garden.',
            'Grandfather reads newspapers.',
            'We go fishing with grandfather.'
        ]
    },
    'aunt': {
        fact: 'Слово для обозначения тёти.',
        examples: [
            'My aunt lives in another city.',
            'Aunt Mary is very kind.',
            'We visit my aunt on holidays.'
        ]
    },
    'uncle': {
        fact: 'Слово для обозначения дяди.',
        examples: [
            'Uncle John is a doctor.',
            'My uncle gives me presents.',
            'We play chess with uncle.'
        ]
    },
    'cousin': {
        fact: 'Слово для обозначения двоюродного брата или сестры.',
        examples: [
            'I have three cousins.',
            'My cousin is the same age as me.',
            'We play video games with cousins.'
        ]
    },
    'son': {
        fact: 'Слово для обозначения сына.',
        examples: [
            'They have a son and a daughter.',
            'My son is five years old.',
            'He is a proud father of a son.'
        ]
    },
    'daughter': {
        fact: 'Слово для обозначения дочери.',
        examples: [
            'Their daughter goes to school.',
            'My daughter loves drawing.',
            'She is a mother of two daughters.'
        ]
    },
    'family': {
        fact: 'Общее слово для обозначения семьи.',
        examples: [
            'I love my family.',
            'We have a big family.',
            'Family is very important.'
        ]
    }
};
