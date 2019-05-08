"use strict";

let questionNumber = 1;
let score = 0;
let start, container;
[start, container] = [$("#start-page"), $(".container")];

// Renders the quiz upon clicking start button.
function showQuestion() {
  if (questionNumber > question_list.length) {
    renderQuizResultPage();
    renderResultPageBackground();
  } else {
    const currentQuestion = question_list[questionNumber - 1];
    container.append(`<main id="quiz-page" class="col-12" role="main">
      <div id="quiz-container">
        <ul id="progress-section">
          <li id="progress" class="flex"> Progress: ${questionNumber} / ${
      question_list.length
    }</li>  
          <li id="score" class="flex">Score: ${score}</li>
        </ul>
        <form id="quiz-form" class="clearfix">
          <legend id="quiz-question">${currentQuestion.question}</legend>
            <fieldset>
              <div class="answer-container">         
                <label class="answer-choice-box float-left">
                  <input  type="radio" name="answer" value="${
                    currentQuestion.answers[0]
                  }" required>
                  <span>${currentQuestion.answers[0]}</span>
                </label>             
                <label class="answer-choice-box float-right">
                  <input  type="radio" name="answer" value="${
                    currentQuestion.answers[1]
                  }" required>
                  <span>${currentQuestion.answers[1]}</span>
                </label>     
                <label class="answer-choice-box float-left">
                  <input type="radio" name="answer" value="${
                    currentQuestion.answers[2]
                  }" required>
                  <span>${currentQuestion.answers[2]}</span>
                </label>
                <label class="answer-choice-box float-right">
                  <input  type="radio" name="answer" value="${
                    currentQuestion.answers[3]
                  }" required>
                  <span>${currentQuestion.answers[3]}</span>
                </label>  
              </div>
            </fieldset>
            <input type="submit" name="submit">
          </form>
        </div>
      </main>`);
  }
}

// Check if user answer is correct. If so, increment score.
function checkAnswer() {
  let userAnswer = $("input[type=radio]:checked").val();
  if (userAnswer === question_list[questionNumber - 1].rightAnswer) {
    score++;
  }
}

// Feedback after each user-submitted answer.
function renderFeedbackPage() {
  let userAnswer = $("input:checked").val();
  $("#quiz-page").detach();
  container.append(`<main id="feedback-page" class="col-12" role="main">
    <div class="vertical-align-middle">
      <p class="white-large-font">${getFeedbackMessage(userAnswer)}</p>
      <p class="white-large-font">Correct answer: ${
        question_list[questionNumber - 1].rightAnswer
      }</p>
      <p class="white-large-font">Your current score: ${score} / ${
    question_list.length
  }</p>
    </div>
    <button class="js-next-button">Next Question</button>
  </main>`);
  renderFeedbackBackground(userAnswer);
}

// Change feedback background based on correct or incorrect user answer
function renderFeedbackBackground(userAnswer) {
  if (userAnswer === question_list[questionNumber - 1].rightAnswer) {
    $("#feedback-page").addClass("feedback-correct-background");
  } else {
    $("#feedback-page").addClass("feedback-wrong-background");
  }
}

// Tells user if answer was right or wrong.
function getFeedbackMessage(userAnswer) {
  if (userAnswer === question_list[questionNumber - 1].rightAnswer) {
    return "Correct!";
  } else {
    return "Wrong";
  }
}

// End of game score.
function renderQuizResultPage() {
  $("main[role='main']").detach();
  container.append(`<main id="result-page" class="col-12" role="main">
    <div class="vertical-align-middle">
      <p class="white-large-font">${getQuizResultMessage()} You got ${score}/6 right for ${getPercentageGrade(
    score
  )}%!</p>
      <button class="reset-button">Play Again</button>
    </div>
  </main>`);
}

// render result background
function renderResultPageBackground() {
  if (score > 3) {
    $("#result-page").addClass("result-pass-page");
  } else {
    $("#result-page").addClass("result-fail-page");
  }
}

// Final percentage grade.
function getPercentageGrade(score) {
  return Math.floor((score / question_list.length) * 100);
}

// Tell user if they passed or failed
function getQuizResultMessage() {
  if (score > 3) {
    return `You Passed!`;
  } else {
    return `You Failed!`;
  }
}

function handleStart() {
  start.on("click", "#js-start-button", function() {
    $("main[role='main']").detach();
    start.detach();
    showQuestion();
  });
}

function handleAnswer() {
  container.submit("#quiz-page", function(event) {
    event.preventDefault();
    checkAnswer();
    getFeedbackMessage();
    renderFeedbackPage();
  });
}

function handleNext() {
  container.on("click", ".js-next-button", function() {
    $("main[role='main']").detach();
    questionNumber++;
    showQuestion();
  });
}

function handleReset() {
  container.on("click", ".reset-button", function() {
    questionNumber = 1;
    score = 0;
    container.find("main[role='main']").detach();
    container.append(start);
  });
}

$(function() {
  handleStart();
  handleAnswer();
  handleNext();
  handleReset();
});
