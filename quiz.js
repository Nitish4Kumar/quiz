
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

const quizArray = [
  {
    id: "0",
    question: "full form of CSS?",
    options: ["cascading style sheets", "colour style sheet", "style sheet language", "coding sheet structure"],
    correct: "cascading style sheets",
  },
  {
    id: "1",
    question: "HTML tags are surronded by ______brackets.",
    options: ["Angle", "Curly", "Round", "Squart"],
    correct: "Angle",
  },
  {
    id: "2",
    question: " HTML document can contain______.",
    options: ["Tags", "Plain text", "Attributes", "All the above"],
    correct: "All the above",
  },
  {
  id: "3",
    question: " HTML is considered as _____.",
    options: ["High level language" ," oop language"," programming language" ,"Markup Language"],
    correct: "Markup Language",
  },
  {
    id: "4",
      question: "What does the abbreviation HTML stand for?",
      options: ["HighText Machine Language" ,"HyperText and links Markup Language" ," HyperText Markup Language" ," None of these"],
      correct: "HyperText Markup Language",
    },
    {
        id: "5",
          question: "Which of the following element is responsible for making the text bold in HTML?",
          options: ["pre", "a", "b", "br"],
          correct: "b",
        },
        {
            id: "6",
              question: " Javascript is an which type of language? ",
              options: ["object_oriented", "object-base", "procedural", "non"],
              correct: "object_oriented",
            },
            {
                id: "7",
                  question: "Which language use for frontend?",
                  options: ["html", "css", "javascript", "all of above"],
                  correct: "all of above",
                },
                {
                  id: "8",
                    question: "which of these are valid CSS3 transformation statements?",
                    options: ["matrix()", "modify()", "skip()", "simulate()"],
                    correct: "matrix()",
                  },
                  {
                    id: "9",
                      question: "Which of the following keywords is used to define a variable in Javascript?",
                      options: ["let", "var", "both let and var", "non"],
                      correct: "both let and var",
                    },
];


restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    
    questionCount += 1;
    if (questionCount == quizArray.length) {
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  quizCards[questionCount].classList.remove("hide");
};

function quizCreator() {
  
  quizArray.sort(() => Math.random() - 0.5);

  for (let i of quizArray) {
    
    i.options.sort(() => Math.random() - 0.5);
    
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";

    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }
  clearInterval(countdown);
  options.forEach((element) => {
    element.disabled = true;
  });
}
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};