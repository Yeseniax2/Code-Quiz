//Variables representing the element objects in html
var timer = document.getElementById(`timer`);
var startNext = document.getElementById(`startNext`);
var q1 = document.querySelector(`#q1`);
var q2 = document.querySelector(`#q2`);
var q3 = document.querySelector(`#q3`);
var q4 = document.querySelector(`#q4`);
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


