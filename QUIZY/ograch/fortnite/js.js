var questions = [
    {
        question: "W którym roku premiere miał pierwszy tryb Fortnite",                                             //1
        options: ["2015", "2016", "2017", "2018"],
        correctAnswer: "2017"
    },
    {
        question: "Jak nazywa się pierwszy najpopularniejszy podstawowy skin z Fornite?",                                              //2
        options: ["Toney", "Gregory", "Jones", "Steve"],
        correctAnswer: "Jones"
    },
    {
        question: "W którym sezonie wprowadzono pierwszy karnet bojowy?",                                  //3
        options: ["Sezon 1", "Sezon 2", "Sezon 3", "Sezon 4"],
        correctAnswer: "Sezon 2"
    },
    {
        question: "Jaka jest cena za epickiego skina?",                                            //4
        options: ["800 v-dolców", "1200 v-dolców", "1500 v-dolców", "2000 v-dolców"],
        correctAnswer: "1500 v-dolców"
    },
    {
        question: "Jaki event odbył się w sezonie 6 rodziale 1?",                                  //5
        options: ["Pojedynek robota z potworem", "Wejście do skarbca i wybuch wulkanu", "Start rakiety i pojawienie się szczeliny na niebie", "Wybuch kostki i wymiar 'Pomiedzy'"],
        correctAnswer: "Wybuch kostki i wymiar 'Pomiedzy'"
    },
    {
        question: "Jak nazywała się miejscówka gdzie co tydzień pojawiała sie budowla zrobiona przez graczy",                                                    //6
        options: ["Podium", "Blok", "Budowa", "Kretywność"],
        correctAnswer: "Podium"
    },
    {
        question: "Kto według fabuły ukrywał się w lochach lodowego króla?",                                                         //7
        options: ["Potwór", "Król ognia", "Władca Zgliszcz", "Królowa lodu"],
        correctAnswer: "Król ognia"
    },
    {
        question: "Jak nazwana została mroczna fioletowa kostka? ",                   //8
        options: ["Jacob", "Lukas", "Kevin", "Micheal"],
        correctAnswer: "Kevin"
    },
    {
        question: "Dokąd wedrowała mroczna kostka po pojawieniu w rozdziale 1?",                                                //9
        options: [ "Do Zalewu Zdobyczy", "Do wulkanu",  "Do Sklepowej Sadyby", "Do mapy startowej"],
        correctAnswer: "Do Zalewu Zdobyczy"
    },
    {
        question: ["Jaki był motyw przewodni sezonu 9 rodziału 1?"],                 //10
        options: ["Piraci", "Kosmici", "Futurystyczność", "Starożytność"],
        correctAnswer: "Futurystyczność"
    },
    {
        question: ["Który sezon był najdłuższym w historii Fornite?"],                  //11
        options: ["Sezon 1 Rodział 1", "Sezon 1 Rozdział 2", "Sezon 1 Rozdział 3", "Og Sezon"],
        correctAnswer: "Sezon 1 Rozdział 2"
    },
    {
        question: ["Ile trwała przerwa między między pierwszym a drugim rozdziałem? (event z czarną dziurą)"],                                         //12  
        options: ["1 dzień", "2 dni", "3 dni", "4 dni"],
        correctAnswer: "2 dni"
    },
    {   
        question: ["W którym sezonie rozdzialu 2 cały sezon był w motywie Marvela"],                                         //13
        options: ["Sezon 2", "Sezon 3", "Sezon 4", "Sezon 5"],
        correctAnswer: "Sezon 4"
    },
    {
        question: ["W którym sezonie rozdziału 1 usunięto double pompę?"],                              //14
        options: ["Sezon 4", "Sezon 5", "Sezon 6", "Sezon 7"],
        correctAnswer: "Sezon 5"
    },
    {
        question: ["Jaki skin był do odebrania za 100 poziom karnetu bojowego w sezonie 5 rozdiału 1?"],                                       //15
        options: ["Żniwiarz(John Wick)", "Omega", "Zmierzch Bogów (Ragnarok)", "Wilkołak"],
        correctAnswer: "Zmierzch Bogów (Ragnarok)"
    },
    {
        question: ["Co się działo przed pojawieniem się kostki na mapie?"],                                         //16
        options: ["Nic", "Pioruny rozwalały kaktusy na wzgórzu", "Trzęsienia ziemii", "Z nieba leciała fioletowa wiązka światła"],
        correctAnswer: "Pioruny rozwalały kaktusy na wzgórzu"
    },
    {
        question: ["Jaka jest maksymalna ilość malych potek w jednym slocie?"],           //17
        options: ["3", "6", "8", "10"],
        correctAnswer: "6"
    },
    {
        question: ["Jak się nazywała miejscówka rozwalona przez meteoryt?"],                                //18
        options: ["Stęchły Skład", "Zgubne Ziemie", "Słone Strzechy", "Widmowe Wzgórza"],
        correctAnswer: "Stęchły Skład"
    },
    {
        question: ["Jaki środek transportu został dodany jako pierwszy ?"],                        //19
        options: ["Wózek golfowy", "Taran", "Wózek sklepowy", "Kulojazd"],
        correctAnswer: "Wózek sklepowy"
    },
    {
        question: ["Jak nazywał się pierwszy tryb w którym gracze mogli wejść na mapę bez przeciwników i grać ze znajomymi?"],                                  //20
        options: ["Wolna gra", "Tryb Kreatywny", "Piaskownica", "Plac Zabaw"],
        correctAnswer: "Plac Zabaw"
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
        return "Grasz w gry na mikrofali";
    } else if (correctAnswers <= 3) {
        return "Fornite? Nie gram w gry dla dzieci";
    } else if (correctAnswers <= 7) {
        return "Grasz tylko w Ratowanie Świata";
    } else if (correctAnswers <= 11) {
        return "Weekendowy gracz Fortnite";
    } else if (correctAnswers <= 14){
        return "Tylko og gracz";
    } else if (correctAnswers <=19){
        return "Fortnie jest grany codzennie";
    } else if (correctAnswers === 20){
        return "Spoceniec, Unreal na 3 kontach"
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

