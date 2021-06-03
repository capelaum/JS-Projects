import Hangman from "./hangman";
import { getPuzzle } from "./requests";

const puzzleEl = document.getElementById("puzzle");
const statusEl = document.getElementById("status");
let game1;

// make guesses with user keypress
window.addEventListener("keypress", e => {
  const guess = e.key;
  game1.makeGuess(guess);
  render(game1);
});

const render = game => {
  puzzleEl.innerHTML = ``;

  game1.puzzle.split("").forEach(letter => {
    const letterEl = document.createElement("span");
    letterEl.textContent = letter;
    puzzleEl.appendChild(letterEl);
  });

  if (game.status === "playing") statusEl.style.color = "white";
  if (game.status === "finished") statusEl.style.color = "greenyellow";
  if (game.status === "failed") statusEl.style.color = "red";

  statusEl.textContent = getStatusMessage(game);
};

const getStatusMessage = game => {
  switch (game.status) {
    case "playing":
      return `Guesses left: ${game.guessesLeft}`;
    case "failed":
      return `Nice try! The word was "${game.word.join("")}"`;
    case "finished":
      return "Great work! You guessed the word correctly!";
  }
};

const startGame = async () => {
  const puzzle = await getPuzzle("2");
  game1 = new Hangman(puzzle, 5);
  render(game1);
};

document.querySelector("#reset").addEventListener("click", startGame);

startGame();
