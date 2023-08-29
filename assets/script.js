//Variables representing the element objects in html
var timer = document.getElementById(`timer`);
var startNext = document.getElementById(`startNext`);
var b1 = document.querySelector(`#q1`);
var b2 = document.querySelector(`#q2`);
var b3 = document.querySelector(`#q3`);
var b4 = document.querySelector(`#q4`);
var answerResult = document.getElementById(`answer-result`);
var quizBox = document.getElementById(`quiz-box`);
var results = document.querySelector(`.results`);
var scorePage = document.getElementById(`score`);
var quizQuestion = document.getElementById(`questions`);
var scoreLink = document.getElementById("score-link");
var quizButtons = document.querySelectorAll(`.quizButtons`);
var submitHS = document.getElementById(`submitHS`);
var resultsQ = document.getElementById(`resultsQ`)
var form = document.getElementById(`form`);
var initials = document.getElementById(`initials`);
var submitHS = document.getElementById(`submitHS`);
var leaderboard = document.getElementById(`leaderboard`);

//Setting default values to global scope for quiz 
var totalScore = 0;
started = false;
var correctAnswer;

// Takes user to see highscores
scoreLink.addEventListener(`click`, function () {
    userHighScores();
})

