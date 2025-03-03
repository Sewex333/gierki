var playersCount;
var currentPlayer = 1;
var wordToGuess;
var guessedWord;
var playersScores = {};
var guessWordContainer = document.getElementById('guess-word-container');
var guessWordInput = document.getElementById('guess-word');
var summaryDisplay = document.getElementById('summary-display');
var currentPlayerDisplay = document.getElementById('current-player-display');
var currentPlayerSpan = document.getElementById('current-player');
var playersConrainer = document.getElementById('players-container');
var gameContainer = document.getElementById('game-container');

// Przykładowe hasła
var exampleWords = [
    "robert-lewandowski",
    "iga-swiatek",
    "adam-malysz",
    "robert-kubica",
    "kamil-stoch",
    "karol-wojtyla",
    "kamil-grosicki",
    "andrzej-duda",
    "jaroslaw-kaczynski",
    "donald-tusk",
    "szymon-holownia",
    "slawomir-mentzen",
    "mariusz-pudzianowski",
    "marcin-najman",
    "krzysztof-stanowski",
    "mateusz-borek",
    "michal-matczak",
    "zenon-martyniuk",
    "czeslaw-milosz",
    "andrzej-golota",
    "zbigniew-boniek",
    "wojciech-szczesny",
    "anna-lewandowska",
    "karol-wisniewski",
    "stuart-burton",
    "tomasz-dzialowy",
    "jerzy-dudek",
    "tadeusz-kosciuszko",
    "olga-tokarczuk",
    "jerzy-owsiak",
    "joanna-jedrzejczyk",
    "wojciech-jaruzelski",
    "dawid-podsiadlo",
    "filip-szczesniak",
    "jakub-blaszczykowski",
    "tomasz-hajto",
    "slawomir-peszko",
    "michal-pazdan",
    "piotr-zyla",
    "maryla-rodowicz",
    "slawomir",
    "anita-wlodarczyk",
    "marcin-gortat",
    "grzegorz-krychowiak",
    "bartosz-zmarzlik",
    "lukarz-fabianski",
    "sebastian-fabijanski",
    "sylwester-wardega",
    "michal-barton",
    "marcin-dubiel",
    "gerald"
];
var usedWords = [];

function startGame() {
    playersCount = parseInt(document.getElementById('players').value);
    if (playersCount >= 1 && playersCount <= 4) {
        initializeGame();
    } else {
        alert('Proszę wybrać liczbę graczy od 1 do 4.');
    }
}

function initializeGame() {
    playersConrainer.style.display = 'none';
    gameContainer.style.display = 'flex';

    if (exampleWords.length === 0) {
        showSummary();
        return;
    }

    // Losowe wybranie hasła do odgadnięcia
    wordToGuess = getRandomWord();
    guessedWord = Array(wordToGuess.length);

    // Wypełnij guessedWord spacjami i ustaw znaki "-" od razu
    for (let i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess[i] === '-') {
            guessedWord[i] = '-';
        } else {
            guessedWord[i] = '_';
        }
    }

    displayWord();
    guessWordContainer.style.display = 'block';

    // Inicjalizacja wyników graczy
    for (let i = 1; i <= playersCount; i++) {
        if (!playersScores[i]) {
            playersScores[i] = 0;
        }
    }

    updateScoreDisplay();
    updateCurrentPlayer();

}

function getRandomWord() {
    var randomIndex = Math.floor(Math.random() * exampleWords.length);
    var word = exampleWords[randomIndex].toUpperCase(); // Zamień hasło na wielkie litery
    usedWords.push(exampleWords.splice(randomIndex, 1)[0]);
    return word;
}

function displayWord() {
    var wordDisplay = document.getElementById('word-display');
    wordDisplay.textContent = guessedWord.join(' ');
}

function makeGuess() {
    var guessInput = document.getElementById('guess');
    var guess = guessInput.value.toUpperCase();

    // Sprawdź czy litera została już zgadnięta
    if (guessedWord.includes(guess) || guess === ' ') {
        alert('Nieprawidłowa litera lub spacja!');
        return;
    }

    // Sprawdź czy litera jest w haśle
    if (wordToGuess.includes(guess)) {
        for (let i = 0; i < wordToGuess.length; i++) {
            if (wordToGuess[i] === guess) {
                guessedWord[i] = guess;
            }
        }
        // Dodaj punkty za poprawną literę
        playersScores[currentPlayer]++;
    } else {
        // Odejmij "życie" (punkty) za niepoprawną literę
        // W tym przykładzie za każdą niepoprawną literę odejmujemy 1 punkt
        playersScores[currentPlayer]--;
    }

    // Sprawdź czy hasło zostało odgadnięte
    if (guessedWord.join('') === wordToGuess) {
        alert(`Gracz ${currentPlayer} odgadł hasło!`);
        // Przyznaj punkty za odgadnięcie hasła
        playersScores[currentPlayer] += 10;

        // Rozpocznij nową rundę
        initializeGame();
    } else {
        // Przejdź do kolejnego gracza
        currentPlayer = currentPlayer % playersCount + 1;
    }

    // Aktualizuj wyniki graczy i wyświetl je
    updateScoreDisplay();

    // Wyczyść pole do wprowadzania liter
    guessInput.value = '';
}

function makeWordGuess() {
    var guess = guessWordInput.value.toUpperCase();

    // Sprawdź czy zgadłeś hasło
    if (guess === wordToGuess) {
        alert(`Gracz ${currentPlayer} odgadł hasło!`);
        // Przyznaj punkty za odgadnięcie hasła
        playersScores[currentPlayer] += 10;

        // Rozpocznij nową rundę
        initializeGame();
    } else {
        alert('Nieprawidłowe hasło! Spróbuj ponownie.');
        // Odejmij "życie" (punkty) za niepoprawne hasło
        playersScores[currentPlayer]--;
        // Przejdź do kolejnego gracza
        currentPlayer = currentPlayer % playersCount + 1;
        // Aktualizuj wyniki graczy i wyświetl je
        updateScoreDisplay();
    }

    // Wyczyść pole do wprowadzania hasła
    guessWordInput.value = '';
}

function updateScoreDisplay() {
    var scoreDisplay = document.getElementById('score-display');
    scoreDisplay.innerHTML = '<h2>Wyniki:</h2>';

    for (let i = 1; i <= playersCount; i++) {
        scoreDisplay.innerHTML += `<div class="player-score">Gracz ${i}: ${playersScores[i]}pkt</div>`;
    }

    // Wyświetl aktualne słowo do odgadnięcia
    displayWord();
}

function showSummary() {
    var summaryDisplay = document.getElementById('summary-display');
    summaryDisplay.style.display = 'block';
    summaryDisplay.innerHTML = '<h2>Podsumowanie</h2>';

    // Znajdź gracza z największą liczbą punktów
    var winner = 1;
    for (let i = 2; i <= playersCount; i++) {
        if (playersScores[i] > playersScores[winner]) {
            winner = i;
        }
    }

    // Wyświetl tabelę z wynikami
    var tableHTML = '<table>';
    tableHTML += '<tr><th>Gracz</th><th>Punkty</th></tr>';
    for (let i = 1; i <= playersCount; i++) {
        tableHTML += `<tr><td>Gracz ${i}</td><td>${playersScores[i]}</td></tr>`;
    }
    tableHTML += '</table>';
    summaryDisplay.innerHTML += tableHTML;

    // Wyświetl informację o zwycięzcy
    summaryDisplay.innerHTML += `<p>Gracz ${winner} jest zwycięzcą!</p>`;
}

function skipWord() {
 // Rozpocznij nową rundę
    initializeGame();
}
