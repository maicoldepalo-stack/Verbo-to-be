const examples = [
  'I am happy today.',
  'You are my best friend.',
  'She is very kind.',
  'We are students.',
  'They are at home.'
];

const questions = [
  { pronoun: 'I', answer: 'am', options: ['am', 'is', 'are'] },
  { pronoun: 'You', answer: 'are', options: ['am', 'is', 'are'] },
  { pronoun: 'He', answer: 'is', options: ['am', 'is', 'are'] },
  { pronoun: 'We', answer: 'are', options: ['am', 'is', 'are'] },
  { pronoun: 'They', answer: 'are', options: ['am', 'is', 'are'] }
];

const examplesList = document.getElementById('examples-list');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const scoreEl = document.getElementById('score');
const nextBtn = document.getElementById('next-btn');

let currentQuestion = 0;
let score = 0;
let answered = false;

function renderExamples() {
  examplesList.innerHTML = examples.map((sentence) => `<li>${sentence}</li>`).join('');
}

function renderQuestion() {
  answered = false;
  const question = questions[currentQuestion];
  questionEl.textContent = `Choose the correct form for ${question.pronoun}:`;
  answersEl.innerHTML = '';

  question.options.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer-btn';
    button.textContent = option;
    button.addEventListener('click', () => checkAnswer(button, option, question.answer));
    answersEl.appendChild(button);
  });
}

function checkAnswer(button, selected, correct) {
  if (answered) return;
  answered = true;

  const buttons = [...answersEl.children];
  buttons.forEach((item) => {
    item.disabled = true;
    if (item.textContent === correct) {
      item.classList.add('correct');
    }
  });

  if (selected === correct) {
    score += 1;
    scoreEl.textContent = score;
    button.classList.add('correct');
  } else {
    button.classList.add('wrong');
  }
}

function nextQuestion() {
  currentQuestion = (currentQuestion + 1) % questions.length;
  renderQuestion();
}

nextBtn.addEventListener('click', () => {
  if (!answered) {
    return;
  }
  nextQuestion();
});

renderExamples();
renderQuestion();
