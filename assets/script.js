var startQuizBtn = document.getElementById("startquiz");
var span = document.getElementsByTagName("span");
var entryEl = document.getElementById("entry");
var questionsEl = document.getElementById("questions");
var answerEl = document.getElementById("answer");
var endPromptEl = document.getElementById("endprompt");
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
        //answerEl.innerHTML = "";
        var answerP = document.createElement("p");
        if (event.target.textContent === questionList[questionCounter].correctAnswer) {
            answerP.textContent = "Correct!";
            questionsEl.append(answerP);
            console.log("correct");
        }
        else {
            answerP.textContent = "Incorrect! 10s have been deducted from your total time.";
            questionsEl.append(answerP);
            console.log("false");
            timeLeft = timeLeft - 10;
        }
        questionCounter = questionCounter + 1;
        questionRender();
    }
}

function endQuiz() {
    questionsEl.classList.add("hide");
    endPromptEl.classList.remove("hide");
    var endPromptP = document.createElement("p");
    //var correctQuestions = ; //TODO: find a way to store how many correct questions the audience answered 
    var finalScore = timeLeft /*+ correctQuestions*/;
    endPromptP.textContent = "Your final score is " + finalScore + ".";
    endPromptEl.append(endPromptP);
    clearInterval(timeInterval);
    var endPromptInput = document.createElement("input");
    endPromptEl.append(endPromptInput);
    var endPromptGoBack = document.createElement("button");
    endPromptGoBack.classList.add("btn-primary", "btn", "m-2", "btn-mw-10");
    endPromptGoBack.textContent = "Go Back";
    endPromptEl.append(endPromptGoBack);
    var endPromptViewHighScores = document.createElement("button");
    endPromptViewHighScores.classList.add("btn-primary", "btn", "m-2", "btn-mw-10");
    endPromptViewHighScores.textContent = "View High Scores";
    endPromptEl.append(endPromptViewHighScores);
}
//add score up above

// create user object from submission
/*var user = {
    firstName: firstNameInput.value.trim(),
  };

  // set new submission to local storage 
  localStorage.setItem("user", JSON.stringify(user));
  console.log(firstNameInput.value + " " + lastNameInput.value + " " + emailInput.value + " " + passwordInput.value);
*/

//store high scores on local storage after the quiz has been completed

questionsEl.addEventListener("click", clickHandler)
startQuizBtn.addEventListener("click", startQuiz);