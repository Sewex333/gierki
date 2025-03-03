var questions = [
    {
        question: "Kiedy Minecraft mial swoja premiere?(Pelna wersja)",                                             //1
        options: ["2009", "2010", "2011", "2012"],
        correctAnswer: "2011"
    },
    {
        question: "Jak nazywa sie pierwsza dodana postac w Minecraft?",                                              //2
        options: ["Mirek", "Jeb", "Alex", "Steve"],
        correctAnswer: "Steve"
    },
    {
        question: "Ktorego z tych swiatow NIE ma w oficjalnej wersji Minecrafta?",                                  //3
        options: ["End", "Eter", "Overworld", "Nether"],
        correctAnswer: "Eter"
    },
    {
        question: "W ktorej wersji dodano kolorowe lozka do Minecrafta?",                                            //4
        options: ["1.12", "1.13", "1.14", "1.15"],
        correctAnswer: "1.14"
    },
    {
        question: "Czego NIE potrzeba do zrobienia Ciasta w Minecraft?",                                  //5
        options: ["Mleko", "Maka", "Cukier", "Jablko"],
        correctAnswer: "Jablko"
    },
    {
        question: "Czym oswaja sie ocelota w Minecrafcie?",                                                    //6
        options: ["Ryba", "Welna", "Nicia", "Koscia"],
        correctAnswer: "Ryba"
    },
    {
        question: "Gdzie mozna znalezc Netherite?",                                                         //7
        options: ["Postoj ", "Biblioteka", "Twiedza", "Bastion"],
        correctAnswer: "Bastion"
    },
    {
        question: "Ilu blokow zelaza potrzeba do zrobienia 3 zelaznych golemow? ",                   //8
        options: ["9", "12", "15", "18"],
        correctAnswer: "12"
    },
    {
        question: "Co mozna znalezc w podziemiach igla?",                                                //9
        options: [ "Popsuty portat do Netheru", "Wejscie do Twierdzy", "Zombie Villagera", "Iglo nie ma podziemii"],
        correctAnswer: "Zombie Villagera"
    },
    {
        question: [" Jak nazywa sie jednostka pomiaru trwalosci narzedzi w Minecraft?"],                 //10
        options: ["Wytrzymalosc", "Uderzenie", "ladunek", "Punkt"],
        correctAnswer: "Wytrzymalosc"
    },
    {
        question: ["Jak nazywa sie owoc ktory po zjedzeniu teleportuje gracza w losowe miejsce?"],//11
        options: ["Owoc Chorusu", "Owoc Kresu", "Kosmiczny Owoc", "Smoczy owoc"],
        correctAnswer: "Owoc Chorusu"
    },
    {
        question: ["Na czyim modelu robiona byla poczatkowa wersja Creapera?"],                                         //12  
        options: ["Swini", "Endermana", "Kury", "Zombie"],
        correctAnswer: "Swini"
    },
    {   
        question: ["Gdzie mozna storzyc Withera?"],                                         //13
        options: ["Tylko w Overworldzie", "Tylko w Netherze", "Tylko w Endzie", "Nie ma znaczenia"],
        correctAnswer: "Nie ma znaczenia"
    },
    {
        question: ["Jak nazywa sie update 1.16?"],                              //14
        options: ["Color Update", "Water Update", "End Uptade", "Nether Update"],
        correctAnswer: "Nether Update"
    },
    {
        question: ["Ktory mob jest czarny, wysoki, kradnie bloki i boi sie wody?"],                                       //15
        options: ["Endermite", "Shulker", "Enderdragon", "Enderman"],
        correctAnswer: "Enderman"
    },
    {
        question: ["Co sie stanie gdy wskoczysz do portalu w endzie po pokonaniu smoka?"],                                         //16
        options: ["Nic", "Przeniesie cie do miasta w endzie", "Wyswietlone zostana napisy koncowe", "Zyskasz Smocze Serce"],
        correctAnswer: "Wyswietlone zostana napisy koncowe"
    },
    {
        question: ["Ile jest narzedzi do zrobienia z kamienia?"],//17
        options: ["3", "4", "5", "6"],
        correctAnswer: "5"
    },
    {
        question: ["Ile potrzeba zelaza do zrobienia Kowadla "],                                //18
        options: ["7", "21", "29", "31"],
        correctAnswer: "31"
    },
    {
        question: ["Ktore z ponizszych jest surowcem niezbednym do zrobienia betonu w Minecraft?"],                        //19
        options: ["Ziemia", "Glina", "Piasek", "Kamien"],
        correctAnswer: "Piasek"
    },
    {
        question: ["Jaka trzeba dac nazwe name tagowi by moby sie obrocily?"],                                  //20
        options: ["Walkonhands", "Up", "Dinnerbone", "Jeb_"],
        correctAnswer: "Dinnerbone"
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
        // alert('Poprawna odpowiedz!');
    } else {
        incorrectAnswers++;
        alert('Nieprawidlowa odpowiedz. Prawidlowa odpowiedz to: ' + currentQuestion.correctAnswer);
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
        return "Nigdy nie grales w kloce :/";
    } else if (correctAnswers <= 3) {
        return "Minecraft? Ta gra dla pedofili?";
    } else if (correctAnswers <= 7) {
        return "Cos tam Ci sie kojarzy";
    } else if (correctAnswers <= 11) {
        return "Kilka razy odpaliles Minecrafta";
    } else if (correctAnswers <= 14){
        return "Grasz w Minecrafta duuzo";
    } else if (correctAnswers <=19){
        return "Minecraft enjoyer";
    } else if (correctAnswers === 20){
        return "Twoje zycie jest kwadratowe"
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

