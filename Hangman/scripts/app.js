const puzzleEl = document.getElementById("puzzle");
// const guessesEl = document.getElementById("guesses");
const statusEl = document.getElementById("status");
let game1;

// window.addEventListener("load", render(game));
// window.addEventListener('resize', render(game));
// window.addEventListener('scroll', render(game));

// make guesses with user keypress
window.addEventListener("keypress", (e) => {
  const guess = e.key;
  game1.makeGuess(guess);
  render(game1);
});

const render = (game) => {
  puzzleEl.innerHTML = ``;

  game1.puzzle.split('').forEach((letter) => {
    const letterEl = document.createElement('span');
    letterEl.textContent = letter;
    puzzleEl.appendChild(letterEl);
  })


  if (game.status === "playing") statusEl.style.color = "white";
  if (game.status === "finished") statusEl.style.color = "greenyellow";
  if (game.status === "failed") statusEl.style.color = "red";

  statusEl.textContent = game.statusMessage;
}

const startGame = async () => {
  const puzzle = await getPuzzle('2')
  game1 = new Hangman(puzzle, 5);
  render(game1);
}

document.querySelector('#reset').addEventListener('click', startGame);

startGame();

/* Country API CALL */

getCurrentCountry()
  .then((country) => {
    console.log(country.name);
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });
