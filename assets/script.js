var startQuizBtn = document.getElementById("startquiz");
var span = document.getElementsByTagName("span");
var entryEl = document.getElementById("entry");
var questionsEl = document.getElementById("questions");
var endPromptEl = document.getElementById("endprompt");
var timeInterval;
var questionCounter = 0;
var questionList = [
    {
        question: "What color is a banana?",
        answers: ["red", "blue", "yellow", "green"],
        correctAnswer: "yellow"
    },
    {
        question: "What color is an orange?",
        answers: ["blue", "orange", "red", "purple"],
        correctAnswer: "orange"
    }
]

function startQuiz () {
    //take the audience to the first question with answer choices
    //probably with an if loop
    countdown();
    entryEl.classList.add("hide");
    questionsEl.classList.remove("hide");
    questionRender();
};

function countdown () {
    let timeLeft = 10;
    timeInterval = setInterval(function() {
        if (timeLeft > 0) {
            span[0].textContent = timeLeft + "s";
            timeLeft--;
        } else {
            span[0].textContent = "";
            endQuiz();
        }
    }, 1000)
}

function questionRender () {
    if (questionList.length > questionCounter) {
    questionsEl.innerHTML = "";
    var questionP = document.createElement("p");
    //questionP.classList.add("whatever desired for styling, look at line 52 for example");
    questionP.textContent = questionList[questionCounter].question;
    questionsEl.append(questionP);
    for (var i = 0; i < questionList[questionCounter].answers.length; i++) {
        var answerBtn = document.createElement("button");
        answerBtn.classList.add("btn-primary", "btn", "m-2");
        answerBtn.textContent = questionList[questionCounter].answers[i];
        questionsEl.append(answerBtn);
    }
    } else {
        endQuiz();
    }
}

function clickHandler(event) {
    if (event.target.tagName === "BUTTON") {
        if (event.target.textContent === questionList[questionCounter].correctAnswer) {
            console.log("true");
            //display correct
        }
        else {
            console.log("false");
            //display incorrect, subtract 10s
        }
        questionCounter = questionCounter + 1;

        questionRender();
    }
}

function endQuiz() {
    clearInterval(timeInterval);
    questionsEl.classList.add("hide");
    endPromptEl.classList.remove("hide");
}
//add score up above


//use if loops to take the audience through the quiz:
//if correct: display "Correct!" then go to next question (probably use if here)
//if incorrect: display "Incorrect!" then deduct 10s from time (probably use else here)


//store high scores on local storage after the quiz has been completed
questionsEl.addEventListener("click", clickHandler)
startQuizBtn.addEventListener("click", startQuiz);