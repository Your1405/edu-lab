const HighscoresList = document.querySelector('#highScoresList');
const highScores = JSON.parse(localStorage.getItem ('highScores')) || [];

HighscoresList.innerHTML = highScores.map(score => {
    return `<li class="high-score"> ${score.name} - ${score.score}</li>`
}).join('');