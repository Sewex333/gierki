var questions = [
    {
        question: "W którym roku założono Pogoń Szczecin?",                                             //1
        options: ["1945", "1947", "1948", "1950"],
        correctAnswer: "1948"
    },
    {
        question: "Ile razy Pogoń wygrała Puchar Polski?",                                              //2
        options: ["0", "1", "2", "3"],
        correctAnswer: "0"
    },
    {
        question: "Kto z tych zawodników NIE jest wychowankiem Pogoni Szczecin?",                       //3
        options: ["Łukasz Zwoliński", "Kamil Grosicki", "Marcin Listkowski", "Adam Buksa"],
        correctAnswer: "Adam Buksa"
    },
    {
        question: "Które miejsce zajęła Pogoń w sezonie 20/21?",                                        //4
        options: ["2", "3", "4", "5"],
        correctAnswer: "3"
    },
    {
        question: "Kto w sezonie 22/23 był głównym kapitanem Pogoni?",                                  //5
        options: ["Kamil Grosicki", "Damian Dąbrowski", "Benedikt Zech", "Sebastian Kowalczyk"],
        correctAnswer: "Damian Dąbrowski"
    },
    {
        question: "Kto jest partnerem technicznym Pogoni Szczecin od 2020 roku?",                       //6
        options: ["Adidas", "Zina", "Puma", "Capella"],
        correctAnswer: "Capella"
    },
    {
        question: "Jak brzmi przydomek kibiców Pogoni Szczecin?",                                       //7
        options: ["Pogoniarze", "Partacy", "Portowcy", "Pomorzani"],
        correctAnswer: "Portowcy"
    },
    {
        question: "Kto był ostatnim królem strzelców ekstraklasy z Pogoni Szczecin?",                   //8
        options: ["Łukasz Zwoliński", "Marcin Robak", "Kamil Grosicki", "Adam Buksa"],
        correctAnswer: "Marcin Robak"
    },
    {
        question: "Czyjego imienia jest stadion Pogoni Szczecin?",                                      //9
        options: ["Jacka Magiery", "Floriana Krygiera", "Roberta Dymkowskiego", "Kamila Grosickiego"],
        correctAnswer: "Floriana Krygiera"
    },
    {
        question: ["W którym roku rozpoczęła się przebudowa stadionu Pogoni Szczecin?"],                 //10
        options: ["2018", "2019", "2020", "2021"],
        correctAnswer: "2019"
    },
    {
        question: ["Z jakim numerem debiutował w seniorskiej drużynie Pogoni Szczecin Kamil Grosicki?"],//11
        options: ["11", "21", "31", "91"],
        correctAnswer: "21"
    },
    {
        question: ["Jak nazywa się maskotka Pogoni Szczecin?"],                                         //12  
        options: ["Gołąb", "Gryf", "Orzeł", "Jastrząb"],
        correctAnswer: "Gryf"
    },
    {   
        question: ["Gdzie z Pogoni odszedł Jakub Piotrowski?"],                                         //13
        options: ["Waasl.-Beveren", "KRC Genk", "Ludogorets", "F. Düsseldorf"],
        correctAnswer: "KRC Genk"
    },
    {
        question: ["Kto jest najmłodszym debiutantem w Pogoni Szczecin?"],                              //14
        options: ["Adrian Przyborek", "Kamil Grosicki", "Kacper Kozłowski", "Marcin Listkowski"],
        correctAnswer: "Kacper Kozłowski"
    },
    {
        question: ["Ile razy Pogoń zdobyła wicemistrza Polski?"],                                       //15
        options: ["0", "1", "2", "3"],
        correctAnswer: "2"
    },
    {
        question: ["Jakiej narodowości jest Leonardo Koutris?"],                                         //16
        options: ["Brazlia", "Szwecja", "Niemcy", "Grecja"],
        correctAnswer: "Grecja"
    },
    {
        question: ["Jakim wynikiem zakończył się debiutancki mecz na nowym stadionie Pogoni 1.10.2022?"],//17
        options: ["2:1", "1:2", "2:2", "2:0"],
        correctAnswer: "2:1"
    },
    {
        question: ["Jaki trener Pogoni zdobywał medal w sezonie 21/22?"],                                //18
        options: ["Kosta Runjaić", "Jens Gustafsson", "Czesław Michniewicz", "John van den Brom"],
        correctAnswer: "Kosta Runjaić"
    },
    {
        question: ["Kto strzelił 2 bramki w wygranym 4:1 meczu z KR Reykjavík?"],                        //19
        options: ["Kamil Grosicki", "Sebastian Kowalczyk", "Kamil Drygas", "Luka Zahović"],
        correctAnswer: "Kamil Drygas"
    },
    {
        question: ["Kto strzelił najwiecej bramek w historii Pogoni?"],                                  //20
        options: ["Marian Kielec", "Kamil Grosicki", "Robert Dymkowski", "Edi Andradina"],
        correctAnswer: "Marian Kielec"
    }
];
questions = questions.sort(() => Math.random() - 0.5);

var currentQuestionIndex = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;

var questionText = document.getElementById('question-text');
var optionsContainer = document.getElementById('options');
var welcomeMenu = document.getElementById('welcome-menu');
var questionContainer = document.getElementById('question-container');
var resultMenu = document.getElementById('result-menu');
var resultText = document.getElementById('result-text');

function startQuiz() {
    welcomeMenu.style.display = 'none';
    questionContainer.style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    optionsContainer.innerHTML = ''; 

    currentQuestion.options.forEach(function (option) {
        var button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', function () {
            checkAnswer(option);
        });
        optionsContainer.appendChild(button);
    });

    updateCounter();
}

function checkAnswer(selectedOption) {
    var currentQuestion = questions[currentQuestionIndex];
    currentQuestion.selectedAnswer = selectedOption;  

    if (selectedOption === currentQuestion.correctAnswer) {
        correctAnswers++;
        // alert('Poprawna odpowiedź!');
    } else {
        incorrectAnswers++;
        alert('Nieprawidłowa odpowiedź. Prawidłowa odpowiedź to: ' + currentQuestion.correctAnswer);
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}


function showResult() {
    questionContainer.style.display = 'none';
    resultMenu.style.display = 'block';
    var resultContainer = document.getElementById('result-container');
    resultContainer.textContent = 'Poprawne odpowiedzi: ' + correctAnswers + '\nNiepoprawne odpowiedzi: ' + incorrectAnswers;

    var resultMessage = document.createElement('p');
    resultMessage.textContent = getQuizResultMessage(correctAnswers);
    resultContainer.appendChild(resultMessage);
}

function getQuizResultMessage(correctAnswers) {
    if (correctAnswers === 0) {
        return "Jesteś kibcem Lecha Poznań...";
    } else if (correctAnswers <= 3) {
        return "Zaden z ciebie kibic Pogoni.";
    } else if (correctAnswers <= 7) {
        return "Coś tam o Pogoni wiesz.";
    } else if (correctAnswers <= 11) {
        return "Jesteś przeciętnym kibicem Pogoni.";
    } else if (correctAnswers <= 14){
        return "Jesteś ekspertem w sprawach Pogoni!";
    } else if (correctAnswers <=19){
        return "Kibicujesz Pogoni Szczecin od zawsze!";
    } else if (correctAnswers === 20){
        return "Twoja krew jest granatowo-bordowa!!"
    }
}


function updateCounter() {
    counterContainer.textContent = 'Pytanie ' + (currentQuestionIndex + 1) + '/' + questions.length +
        ' | Poprawne: ' + correctAnswers + ' | Niepoprawne: ' + incorrectAnswers;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;

    resultMenu.style.display = 'none';
    welcomeMenu.style.display = 'block';
}

