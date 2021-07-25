// Initial Data
let game = {
  a1: "",
  a2: "",
  a3: "",
  b1: "",
  b2: "",
  b3: "",
  c1: "",
  c2: "",
  c3: "",
};

let player = "";
let warning = "";
let playing = false;

reset();

// Events
document.querySelector(".reset").addEventListener("click", reset);
document.querySelectorAll(".item").forEach(item => {
  item.addEventListener("click", itemClick);
});

// Functions
function itemClick(event) {
  let item = event.target;
  let itemIndex = item.getAttribute("data-item");

  if (playing && game[itemIndex] === "") {
    game[itemIndex] = player;
    renderGame();
    togglePlayer();
  }
}

function reset() {
  let warning = "";
  playing = true;

  let random = Math.floor(Math.random() * 2);
  player = random === 0 ? "X" : "O";

  for (let index in game) {
    game[index] = "";
  }

  renderGame();
  renderInfo();
}

function renderGame() {
  for (let index in game) {
    let item = document.querySelector(`div[data-item=${index}]`);
    item.innerHTML = game[index];
  }

  checkGame();
}

function renderInfo() {
  document.querySelector(".vez").innerHTML = player;
  document.querySelector(".resultado").innerHTML = warning;
}

function togglePlayer() {
  player = player === "X" ? "O" : "X";
  renderInfo();
}

function checkGame() {
  if (checkWinnerFor("X")) {
    warning = '"X" venceu 🎉';
    playing = false;
  }

  if (checkWinnerFor("O")) {
    warning = '"O" venceu 🎉';
    playing = false;
  }

  if (isFull()) {
    warning = "Empatou 😅";
    playing = false;
  }
}

function checkWinnerFor(player) {
  let possibilities = [
    "a1,a2,a3",
    "b1,b2,b3",
    "c1,c2,c3",

    "a1,b1,c1",
    "a2,b2,c2",
    "a3,b3,c3",

    "a1,b2,c3",
    "a3,b2,c1",
  ];

  for (let index in possibilities) {
    let possibilityArray = possibilities[index].split(",");
    let checkWinner = possibilityArray.every(option => game[option] === player);
    if (checkWinner) return true;
  }

  return false;
}

function isFull() {
  for (let index in game) {
    if (game[index] === "") return false;
  }

  return true;
}
