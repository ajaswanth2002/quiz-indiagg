//codewithcurious.com



// Define an array of quiz questions
const quizQuestions = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "Javascript"],
    correctAnswer: "Javascript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
    correctAnswer: "Cascading Style Sheets"
  },
  {
    question: "What does HTML stand for?",
    options: ["Hypertext Markup Language", "Hypertext Markdown Language", "Hyperloop Machine Language", "Helicopters Terminals Motorboats Lamborginis"],
    correctAnswer: "Hypertext Markup Language"
  },
  {
    question: "What year was JavaScript launched?",
    options: ['1996', '1995', '1994', 'none of the above'],
    correctAnswer: "1995"
  },
  {
    question: 'Who is the father of HTML?',
    options: ['Rasmus Lerdorf', 'Tim Berners-Lee', 'Brendan Eich', 'Sergey Brin'],
    correctAnswer: 'Tim Berners-Lee'
  }
];

// Variables to track quiz state
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

// Function to start the quiz
function startQuiz() {
  // Hide the start button and display the first question
  document.getElementById("start-button").style.display = "none";
  const restart = document.getElementById("restart");
  restart.style.display = "flex";
  restart.style.alignItems = "center";
  const questionContainerWin = document.getElementById("question-container-win");
  questionContainerWin.style.display="none";
  displayQuestion();
  startTimer();
}

// Function to display a question and its options
function displayQuestion() {
  const questionContainer = document.getElementById("question-container");
  questionContainer.style.display = "block";
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  const questionText = document.getElementById("question-text");
  const answerButtons = document.getElementById("answer-buttons");

  // Clear previous question and answer options
  questionText.innerHTML = "";
  answerButtons.innerHTML = "";

  // Display the current question
  questionText.innerHTML = currentQuestion.question;

  // Create answer buttons for each option
  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("answer-button");
    answerButtons.appendChild(button);

    // Add click event listener to check the answer
    button.addEventListener("click", function () {
      checkAnswer(option);
    });
  });
}

// Function to check the selected answer
function checkAnswer(selectedOption) {
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Check if the selected answer is correct
  if (selectedOption === currentQuestion.correctAnswer) {
    score++;
  }

  // Move to the next question or end the quiz if all questions are answered
  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;

    // Update the timer text
    const timer = document.getElementById("timer-container");
    timer.style.display = "flex";
    timer.style.alignItems = "center";
    document.getElementById("timer").textContent = timeLeft;

    // End the quiz if time runs out
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

// Function to end the quiz
function endQuiz() {
  // Stop the timer
  

  // Calculate the score percentage
  const scorePercentage = (score / quizQuestions.length) * 100;

  // Display the final score
  const questionContainer = document.getElementById("question-container");
  questionContainer.style.display="none"

  const questionContainerWin = document.getElementById("question-container-win");
  questionContainerWin.style.display="flex";
  questionContainerWin.style.flexDirection="column"
  questionContainerWin.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Your Score: ${score} out of ${quizQuestions.length}</p>
    <p>Score Percentage: ${scorePercentage}%</p>
  `;
  clearInterval(timerInterval);
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 30;

}

function restartQuiz() {
  // Reset quiz state variables
  clearInterval(timerInterval);
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 30;

  // Clear the displayed result from the previous quiz
  const questionContainer = document.getElementById("question-container");
  questionContainer.style.display = "none";
  const questionContainerWin = document.getElementById("question-container-win");
  questionContainerWin.style.display="none";
  

  // Show the start button and hide the restart button
  console.log("chanding button")
  document.getElementById("start-button").style.display = "block";
  document.getElementById("restart").style.display = "none";
  document.getElementById("timer-container").style.display = "none";
  console.log("buttons changed")

  // Start the quiz again
}


// Add event listener to start the quiz when the start button is clicked
document.getElementById("start-button").addEventListener("click", startQuiz);
document.getElementById("restart").addEventListener("click", restartQuiz);
