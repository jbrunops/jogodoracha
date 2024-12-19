// variáveis
let masterNumber = 0;
let chances = 3;
let timer = 0;
let timerInterval;
const tasks = [
  "Você bebe 1 dose",
  "Escolha alguém para beber 1 dose",
  "Pergunte algo constrangedor a alguém!",
  "Você escolhe a música agora!",
  "Ninguém pode ir ao banheiro até o próximo mestre mandar",
  "Você tem direito a mandar alguém ir ao banheiro",
  "Escolha alguém para ficar sem beber por duas rodadas",
];

let randomTasks = {};
let isProcessingGuess = false;

function startGame() {
  document.querySelector(".welcome-screen").classList.remove("active");
  document.querySelector(".master-screen").classList.add("active");
}

function setMasterNumber() {
  const input = document.getElementById("masterNumber");
  const number = parseInt(input.valeu);

  if (number < 1 || number > 50 || isNaN(number)) {
    showModal("Por favor,escolha um número entre 1 e 50");
    return;
  }

  masterNumber = number;
  document.getElementById("masterMessage").textContent =
    "Passe o celular para a pessoa que vai adivinhar!";
  setTimeout(() => {
    document.querySelector(".master-screen").classList.remove("active");
    document.querySelector(".game-screen").classList.add("active");
    initializeGame();
  }, 2000);
}

function initializeGame() {
  const grid = document.getElementById("numberGrid");
  grid.innerHTML = "";
  chances = 3;
  randomTasks = {};
  isProcessingGuess = false;

  const taskPositions = new Set();
  while (taskPositions.size < 10) {
    taskPositions.add(Math.floor(Math.random() * 50) + 1);
  }

  taskPositions.forEach((pos) => {
    randomTasks[pos] = tasks[Math.floor(Math.random() * tasks.length)];
  });

  // Criar os botões
  for (let i = 1; i <= 50; i++) {
    const button = document.createElement("button");
    button.className = "number-button";
    button.textContent = i;
    button.onclick = () => guessNumber(i);
    grid.appendChild(button);
  }

  startTimer();
}

async function guessNumber(number) {}

function showModal() {}

function closeModal() {}

function startTimer() {
  timer = 0;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer++;
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    document.querySelector(".timer").textContent = `Tempo: ${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}
