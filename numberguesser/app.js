/* 
GAME RULES:
- Player must guess a number between a min and a max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if lose
- Let playr choose to play again
*/

// Game values
let min = 1, 
    max = 10,
    winningNum = 2, 
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for guess
guessBtn.addEventListener('click', function() {

  let guess = parseInt(guessInput.value);

  // Validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Game Over - Win
  if(guess === winningNum){
    gameOver(true, `${winningNum} is correct, YOU WIN!`)

  }else{  // Wrong number
    guessesLeft -= 1;

    // Game Over - Lost
    if(guessesLeft === 0){
      

      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`)
    }else {
      // Game continues - wrong answer

      // Change border red
      guessInput.style.borderColor = 'red';

      // Clear input
      guessInput.value = '';

      // Tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`);

    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red'

  // Disable input and button
  guessInput.disabled = true;
  guessBtn.disabled = true;

  // Change border green
  guessInput.style.borderColor = color;

  // Set message
  setMessage(msg, color);

}

// Set message 
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}


