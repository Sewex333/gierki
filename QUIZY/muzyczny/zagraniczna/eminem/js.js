var questions = [
    {
        question: "Kto był mentorem muzycznym Eminema na początku kariery?",                                 //1
        options: ["Dr Dre", "Snoop Dogg", "50 cent", "2 Pac"],
        correctAnswer: "Dr Dre"
    },
    {
        question: "Kogo dissuje Eminem w utworze 'Killshot'?",                                              //2
        options: ["Lil Uzi Vert", "Lil Wayne", "Machine Gun Kelly", "Drake"],
        correctAnswer: "Machine Gun Kelly"
    },
    {
        question: "Z jakiej płyty pochodzi utwór 'Not Afraid'?",                       //3
        options: ["Kamikaze", "Revival", "Recovery", "Relapse"],
        correctAnswer: "Recovery"
    },
    {
        question: "Która z tych płyt Eminema sprzedała się najgorzej?",                                        //4
        options: ["Kamikaze", "Revival", "Recovery", "Relapse"],
        correctAnswer: "Revival"
    },
    {
        question: "Jakie jest prawdziwe imię Eminema?",                                  //5
        options: ["Shade", "Micheal", "David", "Marshall"],
        correctAnswer: "Marshall"
    },
    {
        question: "Który utwór Eminema zdobył pierwszego Oscara?",                       //6
        options: ["Lose Yourself", "Stan", "Godzilla", "The Real Slim Shady"],
        correctAnswer: "Lose Yourself"
    },
    {
        question: "Który film zawiera utwór 'Lose Yourself'?",                                       //7
        options: ["Straight Outta Compton", "8 Mile", "Hustle & Flow", "Get Rich or Die Tryin'"],
        correctAnswer: "8 Mile"
    },
    {
        question: "W którym roku Eminem wydał album 'Marshall Mathers LP'?",                   //8
        options: ["1998", "1999", "2000", "2001"],
        correctAnswer: "2000"
    },
    {
        question: "W jakim utworze Eminem przebrał się w strój podobny do Robina?",                                      //9
        options: ["The Monster", "The Real Slim Shady", "Without me", "Survival"],
        correctAnswer: "Without me"
    },
    {
        question: ["Który z tych utworów promował album 'Encore'?"],                 //10
        options: ["My Name Is", "The Real Slim Shady", "Without Me", "Just Lose It"],
        correctAnswer: "Just Lose It"
    },
    {
        question: ["Ile nagród Grammy ma Eminem?"],//11
        options: ["11", "13", "15", "17"],
        correctAnswer: "15"
    },
    {
        question: ["Kogo NIE ma na utworze 'Forever'?"],                                         //12  
        options: ["Drake", "Dr Dre", "Kanye West", "Lil Wayne"],
        correctAnswer: "Dr Dre"
    },
    {   
        question: ["Jak nazywa się wydana 15.05.2009r. trzecia wersja płyty 'Relapse'?"],                                         //13
        options: ["Relapse: Rework", "Relapse pt2", "Relapse: Refill", "Relapse: Revival"],
        correctAnswer: "Relapse: Refill"
    },
    {
        question: ["W którym roku urodził się Eminem?"],                              //14
        options: ["1970", "1972", "1974", "1976"],
        correctAnswer: "1972"
    },
    {
        question: ["W którym z tych zespołów NIE występował Eminem?"],                                       //15
        options: ["Outsidaz", "N.W.A", "Bad Meets Evil", "D12"],
        correctAnswer: "N.W.A"
    },
    {
        question: ["Który utwór Eminema jest dedykowany jego córce Hailie??"],                                         //16
        options: ["The Monster", "Lose Yourself", "Mockingbird", "Stan"],
        correctAnswer: "Mockingbird"
    },
    {
        question: ["Jak nazywa się kompilacja Eminema zawierająca jego najpopularniejsze utwory?"],//17
        options: ["Made By Slim", "Best Numbers", "Best Of Marshall", "Curtain Call"],
        correctAnswer: "Curtain Call"
    },
    {
        question: ["Do jakiego filmu Marvela nagrał utwór Eminem?"],                                //18
        options: ["Hulk", "Iron Man", "Morbius", "Venom"],
        correctAnswer: "Venom"
    },
    {
        question: ["W którym utworze Eminem parodiuje Micheala Jacksona?"],                        //19
        options: ["Just Lose It", "White America", "Godzilla", "My Name Is"],
        correctAnswer: "Just Lose It"
    },
    {
        question: ["Jaki sportowiec występuje na teledysku do utworu 'Godzilla'?"],                                  //20
        options: ["Usain Bolt", "Ronaldinho", "Mike Tyson", "Michael Jordan"],
        correctAnswer: "Mike Tyson"
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
        return "Eminem? Ja tylko Maty słucham";
    } else if (correctAnswers <= 3) {
        return "This is Fortnite guy";
    } else if (correctAnswers <= 7) {
        return "Słyszałeś Eminema w radiu";
    } else if (correctAnswers <= 11) {
        return "Coś tam słuchasz Eminema";
    } else if (correctAnswers <= 14){
        return "Jesteś fanem Eminema";
    } else if (correctAnswers <=19){
        return "Słuchasz Eminema od dawna";
    } else if (correctAnswers === 20){
        return "You're a monster!!"
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

