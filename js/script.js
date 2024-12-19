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

function initializeGame() {}

async function guessNumber(number) {}

function showModal() {}

function closeModal() {}

function startTimer() {}

function stopTimer() {}
