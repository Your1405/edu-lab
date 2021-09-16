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
    question: "How many planets are there in our solar system?",
    choice1: '9',
    choice2: '8',
    choice3: '2',
    choice4: '7',
    answer: 2,
  },
  {
    question: 'Which planet is known for the "Great Red Spot"?',
    choice1: 'Jupiter',
    choice2: 'Pluto',
    choice3: 'Mars',
    choice4: 'Mercury',
    answer: 1,
  },
  {
    question: "Which is the second largest moon in our solar system?",
    choice1: 'Deimos',
    choice2: 'Triton',
    choice3: 'Titan, moon of Saturn',
    choice4: 'Callisto',
    answer: 3,
  },
  {
    question: "How many years does it take for Neptune to orbit once around the sun?",
    choice1: '165',
    choice2: '356',
    choice3: '100',
    choice4: '278',
    answer: 1,
  },
  {
    question: "What planet is closest to the sun?",
    choice1: 'Earth',
    choice2: 'Neptune',
    choice3: 'Pluto',
    choice4: 'Mercury',
    answer: 4,
  },
  {
    question: "Which planet is the biggest in our solar system?",
    choice1: 'Venus',
    choice2: 'Uranus',
    choice3: 'Jupiter',
    choice4: 'Mars',
    answer: 3,
  },
  {
    question: "Which of the following is the correct order?",
    choice1: 'Mars, Venus, Earth, Mercury, Saturn, Uranus, Mercury, Jupiter',
    choice2: 'Saturn, Mars, Earth, Venus, Jupiter, Uranus, Mercury, Neptune',
    choice3: 'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune',
    choice4: 'Mars, Earth, Mercury,Venus, Jupiter, Neptune, Uranus, Saturn',
    answer: 3,
  },
  {
    question: "Which planet is covered largely by water?",
    choice1: 'Earth',
    choice2: 'Jupiter',
    choice3: 'Mars',
    choice4: 'Titan',
    answer: 1,
  },
  {
    question: "Which of the following does the sun not do for the solar system?",
    choice1: 'It’s a light source.',
    choice2: 'It radiates solar energy',
    choice3: 'Its gravity holds the solar system together',
    choice4: 'It provides oxygen for us.',
    answer: 4,
  },
  {
    question: "Which planet has no moon/moons?",
    choice1: 'Mercury & Jupiter',
    choice2: 'Mercury & Venus',
    choice3: 'Neptune & Jupiter',
    choice4: 'Earth & Uranus',
    answer: 2 ,
  },
  {
    question: "Which planet comes after Saturn?",
    choice1: 'Mars',
    choice2: 'Earth',
    choice3: 'Neptune',
    choice4: 'Uranus',
    answer: 4 ,
  },
  {
    question: "What planet is the closest to the sun?",
    choice1: 'Earth',
    choice2: 'Venus',
    choice3: 'Jupiter',
    choice4: 'Mercury',
    answer: 4,
  },
  {
    question: "Which planet is the smallest in our solar system?",
    choice1: 'Venus',
    choice2: 'Saturn',
    choice3: 'Mars',
    choice4: 'Mercury',
    answer: 4,
  },
  {
    question: "Which of the following is not in our solar system?",
    choice1: 'Dwarf planets',
    choice2: 'Supernovas',
    choice3: 'Asteroids',
    choice4: 'Comets',
    answer:2 ,
  },
  {
    question: "What are the rocks and ice that form a belt beyond mars?",
    choice1: 'Meteorites',
    choice2: 'Meteor',
    choice3: 'Asteroids',
    choice4: 'Comets',
    answer: 3,
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