const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What is the capital of Suriname?",
    choice1: 'Caracas',
    choice2: 'Paramaribo',
    choice3: 'Georgetown',
    choice4: 'Colombo',
    answer: 2,
  },
  {
    question: "What is the capital of Argentina?",
    choice1: 'Buenos Aires',
    choice2: 'Bogotá',
    choice3: 'Lima',
    choice4: 'Montevideo',
    answer: 1,
  },
  {
    question: "What is the capital of Venezuela?",
    choice1: 'Santo Domingo',
    choice2: 'Pristina',
    choice3: 'Caracas',
    choice4: 'Suva',
    answer: 3,
  },
  {
    question: "What is the capital of Paraguay?",
    choice1: 'Asunción',
    choice2: 'Cayenne',
    choice3: 'Quito',
    choice4: 'Montevideo',
    answer: 1,
  },
  {
    question: "What is the capital of Brazil?",
    choice1: 'Valletta',
    choice2: 'Rio de Janeiro',
    choice3: 'Sucre',
    choice4: 'Brasília',
    answer: 4,
  },
  {
    question: "What is the capital of Uruguay?",
    choice1: 'Quito',
    choice2: 'Malé',
    choice3: 'Montevideo',
    choice4: 'Asunción',
    answer: 3,
  },
  {
    question: "What is the capital of South Georgia?",
    choice1: 'King Edward Point',
    choice2: 'St. Peter Port',
    choice3: 'Budapest',
    choice4: 'Quito',
    answer: 1,
  },
  {
    question: "What is the capital of Bolivia?",
    choice1: 'Port of Spain',
    choice2: 'Vientiane',
    choice3: 'Sucre',
    choice4: 'Bogotá',
    answer: 3,
  },
  {
    question: "What is the capital of Peru?",
    choice1: 'Cusco',
    choice2: 'Malabo',
    choice3: 'Panama',
    choice4: 'Lima',
    answer: 4,
  },
  {
    question: "What is the capital of Guyana?",
    choice1: 'Road Town',
    choice2: 'Georgetown',
    choice3: 'St. Georges',
    choice4: 'Cayenne',
    answer: 2,
  },
  {
    question: "What is the capital of Colombia?",
    choice1: 'Tarapacá',
    choice2: 'Cartagena',
    choice3: 'Bogotá',
    choice4: 'Lima',
    answer: 3,
  },
  {
    question: "What is the capital of Chile?",
    choice1: 'Santiago',
    choice2: 'San Diego',
    choice3: 'Stanley',
    choice4: 'Vienne',
    answer: 1,
  },
  {
    question: "What is the capital of French Guiana?",
    choice1: 'Paris',
    choice2: 'Cayenne',
    choice3: 'Lyon',
    choice4: 'Bordeaux',
    answer: 2,
  },
  {
    question: "What is the capital of Falkland Islands?",
    choice1: 'Port of Spain',
    choice2: 'Vientiane',
    choice3: 'Stanley',
    choice4: 'Amman',
    answer: 3,
  },
  {
    question: "What is the capital of Ecuador?",
    choice1: 'Sarajevo',
    choice2: 'Bogotá',
    choice3: 'Sucre',
    choice4: 'Quito',
    answer: 4,
  }
  ];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 15;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore',score);
    return window.location.assign('end.html');
  }

  questionCounter++;
  progressText.innerText=`Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)* 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  availableQuestions.splice(questionsIndex,1 );

  acceptingAnswers= true;
}

choices.forEach(choice =>{
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice= e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'wrong';

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    },1000);
  })

})

incrementScore = num =>{
  score += num;
  scoreText.innerText= score;
}

startGame();