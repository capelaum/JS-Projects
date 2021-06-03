/* Hangman class */
class Hangman {
  constructor(word, guessesLeft) {
    this.word = word.toLowerCase().split("");
    this.guessesLeft = guessesLeft;
    this.guessedLetters = [];
    this.status = "playing";
  }

  get puzzle() {
    let puzzle = "";

    this.word.forEach(letter => {
      if (this.guessedLetters.includes(letter) || letter === " ") {
        puzzle += letter;
      } else {
        puzzle += "*";
      }
    });

    return puzzle;
  }

  setStatus() {
    let puzzle = this.puzzle;
    let word = this.word.join("");

    if (this.status === "playing") {
      if (this.guessesLeft === 0) {
        this.status = "failed";
      } else if (puzzle === word) {
        this.status = "finished";
      }
    }
  }

  makeGuess(guess) {
    if (this.status !== "playing") return; // game over

    guess = guess.toLowerCase();
    const isUnique = !this.guessedLetters.includes(guess);
    const isBadGuess = !this.word.includes(guess);

    if (isUnique) this.guessedLetters.push(guess);
    if (isUnique && isBadGuess) this.guessesLeft--;

    this.setStatus();
  }
}

export default Hangman;
