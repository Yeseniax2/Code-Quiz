//Variables representing the element objects in html
var timer = document.getElementById(`timer`);
var startNext = document.getElementById(`startNext`);
var q1 = document.querySelector(`#q1`);
var q2 = document.querySelector(`#q2`);
var q3 = document.querySelector(`#q3`);
var q4 = document.querySelector(`#q4`);
var q5 = document.querySelector(`#q5`);
var answerResult = document.getElementById(`answer-result`);
var quizBox = document.getElementById(`quiz-box`);
var results = document.querySelector(`.results`);
var scorePage = document.getElementById(`score`);
var Question = document.getElementById(`questions`);
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

// questions and answers for quiz
const questions = [
    {
         question: "Inside which HTML element do we put the javascript?", 
          correctAnswer: "C. <script>", 
          choices: [{choice: "A. <h1>"}, {choice: "B. <js>"}, {choice: "C. <script>"}, {choice: "D. <head>"}],
    },

        { question: "What is getItem commonly used for?",
        correctAnswer: "B. local storage", 
        choices: [{choice: "A. adding names "}, {choice: "B. local storage"}, {choice: "C. online shopping"}, {choice: "D. naming a variable"}],
      },
       
        { question: "What is the correct way to declare a variable in JavaScript?",
        correctAnswer: "B. var x ",
        choices: [{choice: "A: variable x "}, {choice:"B: var x"}, {choice:"C: x = var"}, {choice:"D: var = x"}],
    },

       { question: "The condition in an if/else statement is enclosed with ______ ?",
        correctAnswer: "D. Square Brackets",
        choices: [{choice: "A: Quotes"}, {choice: "B: Curly Brackets"}, {choice: "C: Commas"}, {choice: "D: Square Brackets"}],
},
       { question: "A very useful tool used during development and debugging for printing content to the debugger is?", 
        correctAnswer: "B. console.log",
        choices: [{choice: "A: JavaScript"}, {choice: "B. console.log"}, {choice: "C. Terminal"}, {choice: "D. For loops"}],
    
}]

       var checkAnswer = (event) => {
       uiSwitch(checkAnswer);
    // using for each to loop through questions
    quizButtons.forEach(element => {element.addEventListener(`click`, checkAnswer)});
    const choice = event.target.innerHTML;
    // Determines whether the button clicked contained the correctAnswer using if statement
    if (started) {
        if (choice === correctAnswer) {
            totalScore += 25;
            answerResult.style.borderTop = `solid`, `blue`;
            answerResult.innerHTML = `Correct!<br> Total Score = ${totalScore}/100`
        } else {
            secondsLeft -= 15;
            answerResult.style.borderTop = `solid`, `blue`;
            answerResult.innerHTML = `Wrong!<br> The correct answer was: <br>${quiz[quizIndex].answer} <br>Total Score = ${totalScore}/100`
        }
        quizIndex++
        if (quizIndex > quiz.length - 1) {
            showResults();
        } else {
            quizQuestion.innerHTML = quiz[quizIndex].question
            q1.innerHTML = quiz[quizIndex].options[1]
            q2.innerHTML = quiz[quizIndex].options[2]
            q3.innerHTML = quiz[quizIndex].options[3]
            q4.innerHTML = quiz[quizIndex].options[4]
            q5.innerHTML = quiz[quizIndex].options[5]
            correctAnswer = quiz[quizIndex].answer
        }
        totalScore = 0;
        quizQuestion.innerHTML = quiz[0].question
        q1.innerHTML = quiz[0].options[1]
        q2.innerHTML = quiz[0].options[2]
        q3.innerHTML = quiz[0].options[3]
        q4.innerHTML = quiz[0].options[4]
        q5.innerHTML = quiz[0].options[5]
        correctAnswer = quiz[0].answer
        started = true;
        //Timer starts in the beggining of every quiz
        setTime();

    }
}
startNext.addEventListener(`click`, checkAnswer)
// Timer set 60 seconds
var stopTimerID;
// This array contains every iteration of the timer once it has begun
var stopTimerID_array = [];
var secondsLeft = 61;
function setTime() {
    stopTimerID = window.setInterval(function () {
        secondsLeft--;
        updateTimer();
        if (secondsLeft <= 0) {
            secondsLeft = 61;
            timerFailState();
        }
    }, 1000)
    stopTimerID_array.push(stopTimerID);
}
//Remaining time left
function updateTimer() {
    timer.textContent = `${secondsLeft} seconds left!`
}
function callClearInterval() {
    for (var i = 0; i < stopTimerID_array.length; i++) {
        clearInterval(stopTimerID_array[i])
    };
}
function timerFailState() {
    reset();
    uiSwitch(timerFailState)
    quizQuestion.textContent = `Sorry your time has run out!`
    quizQuestion.style.color = `red`
    startNext.textContent = `Click Here to Try Again.`
}
//Results
var showResults = () => {
    reset();
    quizQuestion.textContent = `Your Final Score was ${totalScore}/100`
    startNext.textContent = `Click Here to Try Again`
}
// High Score
var userHighScores = () => {
    reset();
    uiSwitch(userHighScores);
}
// A reset function 
    callClearInterval();
    uiSwitch(reset);
    secondsLeft = 61;
    started = false;
    quizIndex = 0;

function saveHighScore() {
    var userScoreObject = {
        user: initials.value.trim(),
        score: totalScore
    }
    localStorage.setItem(`userScoreObject`, JSON.stringify(userScoreObject))
}

// Pulls users info from local storage
function renderHighScore() {
    var highScore = JSON.parse(localStorage.getItem(`userScoreObject`));
    if (highScore !== null) {
        document.getElementById('savedHS').innerHTML += `Name: ${highScore.user} | Score: ${highScore.score}<br>`
    }
}
submitHS.addEventListener(`click`, function (e) {
    e.preventDefault();
    saveHighScore();
    renderHighScore();
    userHighScores();
});
function uiSwitch(ui) {
    if (ui === userHighScores) {
        leaderboard.removeAttribute(`style`, `display: none;`)
        results.removeAttribute(`style`, `display: none;`);
        quizBox.setAttribute(`style`, `display: none;`)
        scoreLink.setAttribute(`style`, `display: none;`)
        submitHS.setAttribute(`style`, `display: none;`)
        resultsQ.textContent = `Code Quiz Leaderboard`
        form.setAttribute(`style`, `display: none;`)
    } else if (ui === reset) {
        answerResult.textContent = '';
        timer.style.display = `none`;
        startNext.removeAttribute(`style`, `display: none;`)
        answerResult.style.borderTop = `none`;
        results.removeAttribute(`style`, `display: none;`);
        quizButtons.forEach(element => {
            element.setAttribute(`style`, `display: none;`)
        })
        leaderboard.setAttribute(`style`, `display: none;`)
    } else if (ui === timerFailState) {
        results.setAttribute(`style`, `display: none;`)
    } else if (ui === checkAnswer) {
        timer.style.display = `block`;
        startNext.setAttribute(`style`, `display: none;`)
        quizButtons.forEach(element => {
            element.removeAttribute(`style`, `display: none;`)
        })
        results.setAttribute(`style`, `display: none;`);
        resultsQ.textContent = `Would you like to record your High Score?`
        submitHS.removeAttribute(`style`, `display: none;`)
        form.removeAttribute(`style`, `display: none;`)
        quizBox.removeAttribute(`style`, `display: none;`)
        scoreLink.removeAttribute(`style`, `display: none;`)
    }
}

// Upon the initial loading of the page clears the local storage memory and hides UI elements
function init() {
    localStorage.clear();
    quizButtons.forEach(element => {
        element.setAttribute(`style`, `display: none;`)
    })
    results.setAttribute(`style`, `display: none;`);
}
init();
