const questions = [
  { prompt: 'Completa la frase:', sentence: 'I ___ happy today.', answer: 'am', options: ['am', 'is', 'are'] },
  { prompt: 'Completa la frase:', sentence: 'You ___ my best friend.', answer: 'are', options: ['am', 'is', 'are'] },
  { prompt: 'Completa la frase:', sentence: 'He ___ very tired.', answer: 'is', options: ['am', 'is', 'are'] },
  { prompt: 'Completa la frase:', sentence: 'We ___ students in this temple.', answer: 'are', options: ['am', 'is', 'are'] },
  { prompt: 'Completa la frase:', sentence: 'They ___ at home now.', answer: 'are', options: ['am', 'is', 'are'] },
  { prompt: 'Completa la frase:', sentence: 'She ___ a brave explorer.', answer: 'is', options: ['am', 'is', 'are'] }
];

const questionEl = document.getElementById('question');
const sentenceEl = document.getElementById('sentence');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');
const levelEl = document.getElementById('level');
const missionTextEl = document.getElementById('mission-text');

let currentQuestion = 0;
let score = 0;
let lives = 3;
let answered = false;

function updateStats() {
  scoreEl.textContent = score;
  livesEl.textContent = lives;
  levelEl.textContent = Math.min(1 + Math.floor(score / 4), 5);
}

function renderQuestion() {
  answered = false;
  const item = questions[currentQuestion];
  questionEl.textContent = item.prompt;
  sentenceEl.textContent = item.sentence;
  answersEl.innerHTML = '';

  item.options.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer-btn';
    button.textContent = option;
    button.addEventListener('click', () => checkAnswer(button, option, item.answer));
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
    score += 2;
    missionTextEl.textContent = 'Risposta corretta! La porta del tempio si apre leggermente.';
    button.classList.add('correct');
  } else {
    lives -= 1;
    missionTextEl.textContent = 'Sbagliato! Il guardiano del tempio ti fa perdere una vita.';
    button.classList.add('wrong');
  }

  updateStats();

  if (lives <= 0) {
    missionTextEl.textContent = 'Hai perso tutte le vite. Riprova e riconquista il tempio!';
    nextBtn.textContent = 'Ricomincia';
    return;
  }

  if (score >= 12) {
    missionTextEl.textContent = 'Congratulazioni! Hai vinto la sfida del tempio e hai imparato il verbo to be.';
    nextBtn.textContent = 'Vinci ancora';
  }
}

function nextQuestion() {
  if (lives <= 0) {
    score = 0;
    lives = 3;
    nextBtn.textContent = 'Prossima sfida';
    missionTextEl.textContent = 'Sblocca la porta del tempio scegliendo la forma corretta del verbo to be.';
    updateStats();
  }

  currentQuestion = (currentQuestion + 1) % questions.length;
  renderQuestion();
}

nextBtn.addEventListener('click', () => {
  if (!answered) return;
  nextQuestion();
});

updateStats();
renderQuestion();
