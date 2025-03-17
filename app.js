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

let currentQuestionIndex = 0;
let score = 0;

const highScoreMessage = () => "That was impressive";
const averageScoreMessage = () => "Your'e pretty average";
const lowScoreMessage = () => "Time to hit the library ";

const questionElement = document.querySelector("#question");
const nextQuestionButton = document.querySelector("#next-question button");
const answerButtonsContainer = document.querySelector("#answerButtons");
const playButton = document.querySelector("#start-game");

playButton.addEventListener("click", startTrivia);
nextQuestionButton.addEventListener("click", nextQuestion);

function displayQuestion(questionObj) {
  questionElement.textContent = questionObj.question;
  answerButtonsContainer.innerHTML = "";

  let shuffledOptions = [...questionObj.options].sort(
    () => Math.random() - 0.5
  );

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
  document.querySelectorAll(".answer-button").forEach((btn) => {
    btn.disabled = true;
  });

  if (selectedOption === correctAnswer) {
    button.classList.add("correct");
    score++;
    document.getElementById("score").textContent = score;
  } else {
    button.classList.add("incorrect");
  }
  document.getElementById("next-question").style.display = "block";
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < triviaData.length) {
    displayQuestion(triviaData[currentQuestionIndex]);
    document.getElementById("next-question").style.display = "none";
  } else {
    document.getElementById("final-score-display").style.display = "block";
    document.getElementById("final-score").textContent = score;
    document.getElementById("next-question").style.display = "none";
    document.getElementById("restart-game").style.display = "block";

    let message = "";
    if (score <= 4) {
      message = "Time to hit the library! You should try again.";
    } else if (score <= 7) {
      message = "You're pretty average! Think you can do better?";
    } else {
      message = "That was impressive! Want to try again?";
    }

    document.getElementById("final-message").textContent = message;
    document.getElementById("final-message").style.display = "block";
  }
}

function restartGame() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("score").textContent = score;
  document.getElementById("restart-game").style.display = "none";
  document.getElementById("final-score-display").style.display = "none";
  document.getElementById("next-question").style.display = "none";
  document.getElementById("final-message").style.display = "none";

  displayQuestion(triviaData[currentQuestionIndex]);
  document.getElementById("landingPage").style.display = "none";
  document.getElementById("triviaMode").style.display = "block";
  document.getElementById("score-board").style.display = "block";
}

function startTrivia() {
  document.getElementById("landingPage").style.display = "none";
  document.getElementById("triviaMode").style.display = "block";
  document.getElementById("score-board").style.display = "block";
  document.getElementById("next-question").style.display = "none";
  document.getElementById("final-score-display").style.display = "none";

  displayQuestion(triviaData[currentQuestionIndex]);
}
