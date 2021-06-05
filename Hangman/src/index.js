import Hangman from "./hangman";
import { getPuzzle } from "./requests";

document.querySelector("#reset").addEventListener("click", startGame);
const puzzleEl = document.getElementById("puzzle");
const statusEl = document.getElementById("status");
let hangmanGame;

async function startGame() {
  const puzzle = await getPuzzle("2");
  hangmanGame = new Hangman(puzzle, 5);
  render(hangmanGame);
}

// make guesses with user keypress
window.addEventListener("keypress", e => {
  const guess = e.key;
  hangmanGame.makeGuess(guess);
  render(hangmanGame);
});

const render = game => {
  puzzleEl.innerHTML = ``;

  hangmanGame.puzzle.split("").forEach(letter => {
    const letterEl = document.createElement("span");
    letterEl.textContent = letter;
    puzzleEl.appendChild(letterEl);
  });

  setStatusMessage(game);
};

const setStatusMessage = game => {
  switch (game.status) {
    case "playing":
      statusEl.style.color = "white";
      statusEl.textContent = `Guesses left: ${game.guessesLeft}`;
      break;
    case "failed":
      statusEl.style.color = "red";
      statusEl.textContent = `Nice try! The word was "${game.word.join("")}"`;
      break;
    case "finished":
      statusEl.style.color = "greenyellow";
      statusEl.textContent = "Great work! You guessed the word correctly!";
      break;
  }
};

startGame();
