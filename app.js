// Emre's presentation notes
// - Good code syntax and spacing and execution!
// - Challenge yourself more, you can deliver a more complex app!
// - Leave more comments in your code!

/*-------------------------------- Constants --------------------------------*/
const triviaData = [
  {
    question:
      "Which artist holds the record for the most albums sold worldwide?",
    options: ["Taylor Swift ", "Michael Jackson", "The Beatles", "Madonna"],
    correctAnswer: "Michael Jackson",
  },

  {
    question: "What is the largest organ in the human body?",
    options: ["Brain", "Heart", "Skin", "Liver"],
    correctAnswer: "Skin",
  },

  {
    question:
      "What was the name of the failed invasion that took place in Cuba during John F. Kennedy's presidency, intended to overthrow Fidel Castro?",
    options: [
      "The Cuban Missile Crisis",
      "Bay of Pigs Invasion",
      "Operation Mongoose",
      "The Cuban Revolution",
    ],
    correctAnswer: "Bay of Pigs Invasion",
  },
  {
    question:
      "In what year did the Berlin Wall fall, symbolizing the end of the Cold War and the reunification of Germany?",
    options: ["1987", "1989", "1991", "1993"],
    correctAnswer: "1989",
  },

  {
    question:
      "Which notorious mafia boss was the leader of the Gambino crime family and was famously convicted for his role in numerous criminal activities, including murder?",
    options: ["Al Capone", "John Gotti", "Lucky Luciano", "Vito Corleone"],
    correctAnswer: "John Gotti",
  },

  {
    question:
      "In which country is Machu Picchu, the ancient Incan city, located?",
    options: ["Mexico", "Peru", "Chile", "Ecuador"],
    correctAnswer: "Peru",
  },

  {
    question:
      "During which major historical event was the construction of the Empire State Building completed, symbolizing resilience and hope?",
    options: [
      "World War I",
      "The Great Depression",
      "The Roaring Twenties",
      "The Civil Rights Movement",
    ],
    correctAnswer: "The Great Depression",
  },

  {
    question:
      "Who wrote the famous 1925 novel *The Great Gatsby*, a classic of American literature?",
    options: [
      "Ernest Hemingway",
      "F. Scott Fitzgerald",
      "John Steinbeck",
      "Mark Twain",
    ],
    correctAnswer: "F. Scott Fitzgerald",
  },

  {
    question:
      "Where was hip-hop music born in the 1970s, emerging as a cultural movement?",
    options: ["Harlem", "The Bronx", "Brooklyn", "Compton"],
    correctAnswer: "The Bronx",
  },

  {
    question:
      "Which sports team holds the record for the most championships in the history of professional sports?",
    options: [
      "New York Yankees",
      "Los Angeles Lakers",
      "Real Madrid",
      "New England Patriots",
    ],
    correctAnswer: "New York Yankees",
  },
];

const highScoreMessage = () => "That was impressive";
const averageScoreMessage = () => "Your'e pretty average";
const lowScoreMessage = () => "Time to hit the library ";

/*-------------------------------- Variables --------------------------------*/
let currentQuestionIndex = 0;
let score = 0;

/*------------------------ Cached Element References ------------------------*/
const questionElement = document.querySelector("#question");
const nextQuestionButton = document.querySelector("#next-question button");
const answerButtonsContainer = document.querySelector("#answerButtons");
const playButton = document.querySelector("#start-game");
// You chose to cache elements in 2 different ways, choose one way and stick to that!
// Especially if you're getting code from GPTs, it becomes obvious when you are doing
// the same thing in 2 different ways. So if like above you're caching dom elements
// into variables, keep doing that instead of what you did below with dom elements
// being cached in functions.. I will move them above to show you what that looks like.
// And in this way, you won't have dupicate code.
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-game");
const finalScoreElement = document.getElementById("final-score-display");
const nextQuestionElement = document.getElementById("next-question");
const finalMessageElement = document.getElementById("final-message");
const landingPageEl = document.getElementById("landingPage");
const triviaModeEl = document.getElementById("triviaMode");
const scoreBoardEl = document.getElementById("score-board")

/*----------------------------- Event Listeners -----------------------------*/
playButton.addEventListener("click", startTrivia);
nextQuestionButton.addEventListener("click", nextQuestion);

/*-------------------------------- Functions --------------------------------*/
// TODO: Use arrow functions, instead of function declerations, you used arrow
// functions above - so stick to a single method
function displayQuestion(questionObj) {
  questionElement.textContent = questionObj.question;
  answerButtonsContainer.innerHTML = "";

  let shuffledOptions = [...questionObj.options].sort(
    () => Math.random() - 0.5
  );

  // TODO: Declate the button created below above
  shuffledOptions.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("answer-button");
    button.addEventListener("click", function () {
      checkAnswer(button, option, questionObj.correctAnswer);
    });
    answerButtonsContainer.appendChild(button);
  });
}

function checkAnswer(button, selectedOption, correctAnswer) {
  // TODO: Move this cache above with all the other ones
  document.querySelectorAll(".answer-button").forEach((btn) => {
    btn.disabled = true;
  });

  if (selectedOption === correctAnswer) {
    button.classList.add("correct");
    score++;
    scoreElement.textContent = score;
  } else {
    button.classList.add("incorrect");
  }
  nextQuestionElement.style.display = "block";
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < triviaData.length) {
    displayQuestion(triviaData[currentQuestionIndex]);
    nextQuestionElement.style.display = "none";
  } else {
    finalScoreElement.style.display = "block";
    finalScoreElement.textContent = score;
    nextQuestionElement.style.display = "none";
    restartButton.style.display = "block";

    let message = "";
    if (score <= 4) {
      message = "Time to hit the library! You should try again.";
    } else if (score <= 7) {
      message = "You're pretty average! Think you can do better?";
    } else {
      message = "That was impressive! Want to try again?";
    }

    finalMessageElement.textContent = message;
    finalMessageElement.style.display = "block";
  }
}

function restartGame() {
  currentQuestionIndex = 0;
  score = 0;

  scoreElement.textContent = score;
  restartButton.style.display = "none";
  finalScoreElement.style.display = "none";
  nextQuestionElement.style.display = "none";
  finalMessageElement.style.display = "none";

  displayQuestion(triviaData[currentQuestionIndex]);
  landingPageEl.style.display = "none";
  triviaModeEl.style.display = "block";
  scoreBoardEl.style.display = "block";
}

function startTrivia() {
  landingPageEl.style.display = "none";
  triviaModeEl.style.display = "block";
  scoreBoardEl.style.display = "block";
  nextQuestionElement.style.display = "none";
  finalScoreElement.style.display = "none";

  displayQuestion(triviaData[currentQuestionIndex]);
}
