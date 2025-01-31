// variáveis
let masterNumber = 0;
let chances = 1;
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
  const number = parseInt(input.value);

  if (number < 1 || number > 50 || isNaN(number)) {
    showModal("Por favor, escolha um número entre 1 e 50");
    return;
  }

  masterNumber = number;
  document.getElementById("masterMessage").textContent =
    "Passe o celular para a pessoa que vai adivinhar";
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

  // Assign random tasks
  const taskPositions = new Set();
  while (taskPositions.size < 10) {
    taskPositions.add(Math.floor(Math.random() * 50) + 1);
  }

  taskPositions.forEach((pos) => {
    randomTasks[pos] = tasks[Math.floor(Math.random() * tasks.length)];
  });

  // Create number buttons
  for (let i = 1; i <= 50; i++) {
    const button = document.createElement("button");
    button.className = "number-button";
    button.textContent = i;
    button.onclick = () => guessNumber(i);
    grid.appendChild(button);
  }

  startTimer();
}

async function guessNumber(number) {
  if (isProcessingGuess) return;
  isProcessingGuess = true;

  const buttons = document.querySelectorAll(".number-button");

  // Disable numbers based on guess
  buttons.forEach((button) => {
    const buttonNumber = parseInt(button.textContent);
    if (number > masterNumber && buttonNumber >= number) {
      button.disabled = true;
    } else if (number < masterNumber && buttonNumber <= number) {
      button.disabled = true;
    }
  });

  // Check if number has a task and show it first
  if (randomTasks[number]) {
    await new Promise((resolve) => {
      showModal(randomTasks[number], false, resolve);
    });
  }

  // Check if player found the master's number
  if (number === masterNumber) {
    showModal("Você acertou! O mestre bebe uma dose!");
    stopTimer();
    setTimeout(() => {
      showModal("NOVO JOGO?", true);
    }, 2000);
    isProcessingGuess = false;
    return;
  }

  // Check if player trapped the master
  const remainingButtons = Array.from(buttons).filter(
    (button) => !button.disabled
  );
  if (
    remainingButtons.length === 1 &&
    remainingButtons[0].textContent == masterNumber
  ) {
    showModal("Você imprensou o mestre! Ele bebe uma dose!");
    stopTimer();
    setTimeout(() => {
      showModal("NOVO JOGO?", true);
    }, 2000);
    isProcessingGuess = false;
    return;
  }

  // Decrease chances only after checking for win conditions
  chances--;

  if (chances === 0) {
    showModal("VOCÊ PERDEU! BEBA UMA DOSE!");
    stopTimer();
    setTimeout(() => {
      initializeGame();
    }, 2000);
    isProcessingGuess = false;
    return;
  }

  isProcessingGuess = false;
}

function showModal(message, isNewGame = false, callback = null) {
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modalMessage");
  const button = modal.querySelector(".button");

  modalMessage.textContent = message;
  modal.style.display = "flex";

  if (isNewGame) {
    button.onclick = () => {
      closeModal();
      document.querySelector(".game-screen").classList.remove("active");
      document.querySelector(".welcome-screen").classList.add("active");
      if (callback) callback();
    };
  } else {
    button.onclick = () => {
      closeModal();
      if (callback) callback();
    };
  }
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

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
