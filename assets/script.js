//Variables representing the element objects in html
var timer = document.getElementById(`timer`);
var startNext = document.getElementById(`startNext`);
var q1 = document.querySelector(`#b1`);
var b2 = document.querySelector(`#b2`);
var b3 = document.querySelector(`#b3`);
var b4 = document.querySelector(`#b4`);
var answerResult = document.getElementById(`answer-result`);
var quizBox = document.getElementById(`quiz-box`);
var results = document.querySelector(`.results`);
var scorePage = document.getElementById(`scorePage`);
var quizQuestion = document.getElementById(`quiz-question`);
var scoreLink = document.getElementById("score-link");
var quizButtons = document.querySelectorAll(`.quizButtons`);
var submitHS = document.getElementById(`submitHS`);
var resultsQ = document.getElementById(`resultsQ`)
var form = document.getElementById(`form`);
var initials = document.getElementById(`initials`);
var submitHS = document.getElementById(`submitHS`);
var leaderboard = document.getElementById(`leaderboard`);

//Setting default values to global scope for quiz
var quizIndex = 0;
var totalScore = 0;
started = false;
var correctAnswer;

scoreLink.addEventListener(`click`, function () {
    userHighScores();
})

// questions and answers for quiz
const quiz = [
    {
        question: "Inside which HTML element do we put the javascript?", 
        options: ["A: h1", "B: js", "C: script", "D: head"],
        answer: "A: h1"
    },
    {
        question: "What is getItem commonly used for?",
        options: ["A: adding games", "B: storage", "C: local storage", "D: alert"],
        answer: "C: local storage"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is?",
        options: ["A: Javascript", "B: console.log", "C: Terminal", "D: for loop strings to numbers"],
        answer: "B: console.log"
    },
    {
        question: "The condition in an if/else statement is enclosed with ______ ?",
        options: ["A: quotation marks", "B: curly brackets", "C: commas", "D: square brackets"],
        answer: "D: square brackets"
    }
];

     var checkAnswer = (event) => {
      uiSwitch(checkAnswer);
    //Using for each to loop through questions
    quizButtons.forEach(element => {element.addEventListener(`click`, checkAnswer)});
    const choice = event.target.innerHTML;
    // Determines whether the triggered button contained the correctAnswer, then displays the current totalScore, a correct or wrong message, and if correct will increase the totalScore
    if (started) {
        if (choice === correctAnswer) {
            totalScore += 25;
            answerResult.innerHTML = `Correct!<br> Total Score = ${totalScore}/100`
        } else {
            secondsLeft -= 15;
            answerResult.style.borderTop = `solid`, `white`;
            answerResult.innerHTML = `Wrong!<br> The correct answer was: <br>${quiz[quizIndex].answer} <br>Total Score = ${totalScore}/100`
        }
        // The quizIndex increases every loop, cycling through the contents of the quiz array. When the user reaches the end of the questions and answers set in the array, the showResults function is triggered, ending the quiz and showing the results page.
        quizIndex++
        if (quizIndex > quiz.length - 1) {
            showResults();
        } else {
            quizQuestion.innerHTML = quiz[quizIndex].question
            b1.innerHTML = quiz[quizIndex].options[0]
            b2.innerHTML = quiz[quizIndex].options[1]
            b3.innerHTML = quiz[quizIndex].options[2]
            b4.innerHTML = quiz[quizIndex].options[3]
            correctAnswer = quiz[quizIndex].answer
        }
        //The initial click of the startNext button will show the first question and set of answers in the quiz array. Then it sets the started variable to true, which will, upon a click of one of the answer buttons, begin the quiz loop.
    } else {
        //sets score back to zero on every iteration of the quiz
        totalScore = 0;
        quizQuestion.innerHTML = quiz[0].question
        b1.innerHTML = quiz[0].options[0]
        b2.innerHTML = quiz[0].options[1]
        b3.innerHTML = quiz[0].options[2]
        b4.innerHTML = quiz[0].options[3]
        correctAnswer = quiz[0].answer
        started = true;
        // Begins the timer at the start of every quiz iteration
        setTime();

    }
}

//The event listener that triggers the checkAnswer function. It is called at the start of the quiz, and at the end if the user wants to start the quiz over
startNext.addEventListener(`click`, checkAnswer)


// This function creates a timer that counts down from 60 seconds
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
            // If the timer reaches zero, calls the timerFailState function, showing the user a fail screen and a try again button
            timerFailState();
        }
    }, 1000)
    // Every time a new timer is started, its ID will be stored in an array
    stopTimerID_array.push(stopTimerID);
}

// Shows the user a message on screen of their remaining time
function updateTimer() {
    timer.textContent = `${secondsLeft} seconds left!`
}

// Loops through the the timer IDs stored in the stopTimerID_array, and when called, will stop them from counting down
function callClearInterval() {
    for (var i = 0; i < stopTimerID_array.length; i++) {
        clearInterval(stopTimerID_array[i])
    };
}

// Game Over screen
function timerFailState() {
    reset();
    uiSwitch(timerFailState)
    quizQuestion.textContent = `OH NO! Your time has run out!`
    quizQuestion.style.color = `white`
    startNext.textContent = `Click Here to Try Again.`
}

//Results page
var showResults = () => {
    reset();
    quizQuestion.textContent = `Your Final Score was ${totalScore}/100`
    quizQuestion.style.color = `white`
    startNext.textContent = `Click Here to Try Again`
}

// High Score page
var userHighScores = () => {
    reset();
    uiSwitch(userHighScores);
}
function reset() {
    callClearInterval();
    uiSwitch(reset);
    secondsLeft = 61;
    started = false;
    quizIndex = 0;
}
function saveHighScore() {
    var userScoreObject = {
        user: initials.value.trim(),
        score: totalScore
    }
    localStorage.setItem(`userScoreObject`, JSON.stringify(userScoreObject))
}

// Pulls the user's info from local storage
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
        submitHS.setAttribute(`style`, `display: white;`)
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
        resultsQ.textContent = `Record your High Score?`
        submitHS.removeAttribute(`style`, `display: none;`)
        form.removeAttribute(`style`, `display: none;`)
        quizBox.removeAttribute(`style`, `display: none;`)
        scoreLink.removeAttribute(`style`, `display: none;`)
    }
}
function init() {
    localStorage.clear();
    quizButtons.forEach(element => {
        element.setAttribute(`style`, `display: none;`)
    })
    results.setAttribute(`style`, `display: none;`);
}
init();