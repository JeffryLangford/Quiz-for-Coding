var startQuizBtn = document.getElementById("startquiz");
var span = document.getElementsByTagName("span");
var entryEl = document.getElementById("entry");
var questionsEl = document.getElementById("questions");
var answerEl = document.getElementById("answer");
var endPromptEl = document.getElementById("endprompt");
var viewScoresEl = document.getElementById("view-scores");
var viewScoresLink = document.getElementById("score-check");
var timeLeft = 60;
var timeInterval;
var questionCounter = 0;
var questionList = [
    {
        question: "Which composer is famously known for his numerous amounts of violin concertos who wrote in the Baroque time period?",
        answers: ["George Frideric Handel", "Antonio Vivaldi", "Arcangelo Corelli", "J. S. Bach"],
        correctAnswer: "Antonio Vivaldi"
    },
    {
        question: "Who is considered the grandfather of the Minimalism genre?",
        answers: ["Steve Reich", "John Cage", "La Monte Young", "Terry Riley"],
        correctAnswer: "La Monte Young"
    },
    {
        question: "This composer wrote three ballets in increasingly progressive style in France with the Ballet Russe under Sergei Diaghilev's coreography:",
        answers: ["Igor Stravinsky", "Rimsky Korsakov", "Arnold Schoenberg", "Sergei Rachmaninoff"],
        correctAnswer: "Igor Stravinsky"
    },
    {
        question: "The serialist genre was attributed to all of these composers EXCEPT for:",
        answers: ["Milton Babbitt", "Elliott Carter", "Arnold Schoenberg", "Anton Webern"],
        correctAnswer: "Elliott Carter"
    },
    {
        question: "Who was the Hungarian Composer known for his efforts in helping to found the process known as ethnomusicology?",
        answers: ["Zoltán Kodály", "György Ligeti", "Ernő Dohnányi", "Béla Bartók"],
        correctAnswer: "Béla Bartók"
    },
    {
        question: "Spectralism was the term used to describe this 20th century composer:",
        answers: ["Gérard Grisey", "Krzysztof Penderecki", "György Ligeti", "Steve Reich"],
        correctAnswer: "Gérard Grisey"
    },
    {
        question: "J.S. Bach had many composers influence him. Among these four, who did NOT influence him?",
        answers: ["Georg Philipp Telemann", "Antonio Vivaldi", "Alessandro Scarlatti", "Dieterich Buxtehude"],
        correctAnswer: "Alessandro Scarlatti"
    },
    {
        question: "Who composed the famous 'Heroic' Symphony that is considered to be the start of the Romantic Time period?",
        answers: ["J.S. Bach", "Beethoven", "Mozart", "Haydn"],
        correctAnswer: "Beethoven"
    }
]

function startQuiz () {
    countdown();
    entryEl.classList.add("hide");
    questionsEl.classList.remove("hide");
    questionRender();
};

function countdown () {
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
    var questionH2 = document.createElement("h3");
    //questionH2.classList.add("");
    questionH2.textContent = questionList[questionCounter].question;
    questionsEl.append(questionH2);
    for (var i = 0; i < questionList[questionCounter].answers.length; i++) {
        var answerBtn = document.createElement("button");
        answerBtn.classList.add("btn-primary", "btn", "m-2", "btn-mw-10");
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
            answerEl.innerHTML = "Correct!";
            console.log("correct");
            answerEl.classList.remove("hide");
        }
        else {
            answerEl.innerHTML = "Incorrect! 10 seconds have been deducted from your time.";
            console.log("false");
            answerEl.classList.remove("hide");
            timeLeft = timeLeft - 10;
        }
        questionCounter = questionCounter + 1;
        questionRender();
    }
}

function scoreHandler(event) {
    event.preventDefault();
    var user = document.getElementById("initials").value.trim();
    var storage = localStorage.getItem("initials");
    if (storage) {
        localStorage.setItem("initials", JSON.stringify(storage + user));
    } else {
        localStorage.setItem("initials", JSON.stringify(user));
    }
    viewScores();
}

var finalScore = timeLeft;
function endQuiz(event = null) {
    if (event != null) {
        event.preventDefault();
    }
    answerEl.classList.add("hide");
    questionsEl.classList.add("hide");
    endPromptEl.classList.remove("hide");

    var endPromptFinalScore = document.createElement("p");
    endPromptFinalScore.textContent = "Your final score is " + finalScore;
    endPromptEl.append(endPromptFinalScore);
    clearInterval(timeInterval);

    var lineBreak = document.createElement("br");
    endPromptEl.append(lineBreak);

    var endPromptWriteInitials = document.createElement("p");
    endPromptWriteInitials.textContent = "Write your intials below";
    endPromptEl.append(endPromptWriteInitials);

    var endPromptInput = document.createElement("input");
    endPromptInput.setAttribute("id", "initials");
    endPromptEl.append(endPromptInput);

    var endPromptSubmitScore = document.createElement("button");
    endPromptSubmitScore.classList.add("btn-primary", "btn", "m-2", "btn-mw-10");
    endPromptSubmitScore.textContent = "Submit Score";
    endPromptEl.append(endPromptSubmitScore);

    endPromptEl.append(lineBreak);

    endPromptSubmitScore.addEventListener("click", scoreHandler);

    //var scoreStorage = localStorage.getItem(finalScore);
    //console.log(scoreStorage);
}

var scoreStorage = localStorage.getItem(finalScore);
console.log(scoreStorage);

function viewScores(event = null) {
    if (event != null) {
        event.preventDefault();
    }
    entryEl.classList.add("hide");
    questionsEl.classList.add("hide");
    answerEl.classList.add("hide");
    endPromptEl.classList.add("hide");
    var viewScoresH3 = document.createElement("h3");
    viewScoresH3.textContent = "High Scores:";
    viewScoresEl.append(viewScoresH3);
    viewScoresEl.classList.remove("hide");

    var initialStorage = localStorage.getItem("initials");
    console.log(initialStorage);

    var scoreDisplayP = document.createElement("p");
    scoreDisplayP.textContent = initialStorage + " - " + scoreStorage;
    viewScoresEl.append(scoreDisplayP);

    var endPromptGoBack = document.createElement("button");
    endPromptGoBack.classList.add("btn-primary", "btn", "m-2", "btn-mw-10");
    endPromptGoBack.setAttribute("id", "go-back");
    endPromptGoBack.textContent = "Go Back";
    endPromptGoBack.addEventListener("click", goBack);
    viewScoresEl.append(endPromptGoBack);

    var clearScoresBtn = document.createElement("button");
    clearScoresBtn.classList.add("btn-primary", "btn", "m-2", "btn-mw-10");
    clearScoresBtn.textContent = "Clear Scores";
    viewScoresEl.append(clearScoresBtn);
    clearScoresBtn.addEventListener("click", clearScores);

    //get local storages
    //append local storages and style it
    //save scores (maybe concatenation)
}

function clearScores(event) {
    event.preventDefault;
    localStorage.clear();
    goBack();
}

function goBack () {
    window.location.reload();
}

//add score up above

// create user object from submission

//store high scores on local storage after the quiz has been completed

viewScoresLink.addEventListener("click", viewScores);
questionsEl.addEventListener("click", clickHandler);
startQuizBtn.addEventListener("click", startQuiz);