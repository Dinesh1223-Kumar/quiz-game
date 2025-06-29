// dom elements

const startscreen = document.getElementById("start-screen");
const quizscreen = document.getElementById("quiz-screen");
const resultscreen = document.getElementById("result-screen");
const startbutton = document.getElementById("start-btn");
const questiontext = document.getElementById("question-text");
const answerscontainer = document.getElementById("answers-container");
const currentquestionspan = document.getElementById("current-question");
const totalquestionspan = document.getElementById("total-questions");
const scorespan = document.getElementById("score");
const finalscorespan = document.getElementById("final-score");
const maxscorespan = document.getElementById("max-score");
const resultmessage = document.getElementById("result-message");
const resultbutton = document.getElementById("restart-btn");
const progressbar = document.getElementById("progress");


const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

//quiz state vars

let currentquestionindex = 0;
let score = 0;
let answersdisabled = false;

totalquestionspan.textContent = quizQuestions.length;
maxscorespan.textContent = quizQuestions.length;

//event listners

startbutton.addEventListener("click",startquiz)
resultbutton.addEventListener("click",restartquiz)

function startquiz(){
    
    //reset vars
    currentquestionindex = 0;
    score   = 0;
    scorespan.textContent = score;

    startscreen.classList.remove("active");
    quizscreen.classList.add("active");

    showquestion()


}

function showquestion(){
    //reset state
    answersdisabled = false;

    const currentquestion = quizQuestions[currentquestionindex];

    currentquestionspan.textContent = currentquestionindex + 1;

    const progresspercent = (currentquestionindex / quizQuestions.length) * 100;
    progressbar.style.width = progresspercent + "%";

    questiontext.textContent = currentquestion.question;

    //explain this in a second

    answerscontainer.innerHTML = "";
    currentquestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        button.dataset.correct = answer.correct;

        button.addEventListener("click",selectanswer)

        answerscontainer.appendChild(button);

    });
}

function selectanswer(event){

    if(answersdisabled) return;
    answersdisabled = true;

    const selectedbutton = event.target;
    const iscorrect = selectedbutton.dataset.correct === "true";

    Array.from(answerscontainer.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        } else{
             button.classList.add("incorrect");
        }
});

if(iscorrect){
    score++;
    scorespan.textContent = score;
}

setTimeout(()=>{
    currentquestionindex++;

    if (currentquestionindex < quizQuestions.length) {
        showquestion();
        
    } else {
        //show result screen
        showresults();
    }

},100)
}

function showresults(){
    quizscreen.classList.remove("active");
    resultscreen.classList.add("active");

    finalscorespan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if(percentage >= 90){
        resultmessage.textContent = "Excellent Job!";
        resultbutton.textContent = "Restart Quiz";
    } else if(percentage >= 80){
        resultmessage.textContent = "Good Job!";
        resultbutton.textContent = "Restart Quiz";
    } else if(percentage >= 70){
        resultmessage.textContent = "You can do better!";
        resultbutton.textContent = "Restart Quiz";
    } else {
        resultmessage.textContent = "Keep trying!";
        resultbutton.textContent = "Restart Quiz";
    }
}

function restartquiz(){
    resultscreen.classList.remove("active");

    startquiz();

}

