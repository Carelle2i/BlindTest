const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

const questions = [
  {
    type: 'multiple',
    question: "Who is the artist of the song 'Shape of You'?",
    options: ["Ed Sheeran", "Justin Bieber", "Taylor Swift", "Adele"],
    answer: "Ed Sheeran"
  },
  {
    type: 'boolean',
    question: "The song 'Thriller' by Michael Jackson came out in 1982.",
    options: ["True", "False"],
    answer: "True"
  },
  {
    type: 'short',
    question: "What year did the song 'Thriller' by Michael Jackson come out?",
    answer: "1982"
  }
];

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = 'Next';
  nextButton.classList.add('d-none');
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  optionsContainer.innerHTML = '';

  if (question.type === 'multiple' || question.type === 'boolean') {
    question.options.forEach(option => {
      const button = document.createElement('button');
      button.innerText = option;
      button.classList.add('list-group-item', 'list-group-item-action', 'option-button');
      if (option === question.answer) {
        button.dataset.correct = true;
      }
      button.addEventListener('click', selectAnswer);
      optionsContainer.appendChild(button);
    });
  } else if (question.type === 'short') {
    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('form-control', 'mb-2');
    optionsContainer.appendChild(input);

    const submitButton = document.createElement('button');
    submitButton.innerText = 'Submit';
    submitButton.classList.add('btn', 'btn-primary', 'mt-2');
    submitButton.addEventListener('click', () => {
      const userAnswer = input.value;
      if (userAnswer.toLowerCase() === question.answer.toLowerCase()) {
        setStatusClass(input, true);
      } else {
        setStatusClass(input, false);
      }
      nextButton.classList.remove('d-none');
    });
    optionsContainer.appendChild(submitButton);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    score++;
  }
  Array.from(optionsContainer.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('d-none');
  } else {
    questionElement.innerText = `Quiz Over! Your score is ${score}/${questions.length}`;
    nextButton.innerText = 'Restart';
    nextButton.classList.remove('d-none');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('list-group-item-success');
  } else {
    element.classList.add('list-group-item-danger');
  }
}

function clearStatusClass(element) {
  element.classList.remove('list-group-item-success');
  element.classList.remove('list-group-item-danger');
}

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
    nextButton.classList.add('d-none');
  } else {
    startGame();
  }
});

startGame();
