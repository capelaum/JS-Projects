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
    max = 20,
    winningNum = getRandomNum(min, max), 
    guessesLeft = 3;
    
// console.log("winningNum", winningNum)

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.innerHTML = `<b>${min}</b>`
maxNum.innerHTML = `<b>${max}</b>`

guessNumber = document.querySelector('.guess-number')
guessNumber.textContent = `Number of guesses: ${guessesLeft}`;

// Play again event listener
game.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
})

// Listen for guess
guessBtn.addEventListener('click', function() {

  let guess = parseInt(guessInput.value);

  // Game Over - Win
  if(guess === winningNum){
    gameOver(true, `${winningNum} is correct, YOU WIN!`)

  }else{  // Wrong number
    guessesLeft -= 1;

    guessNumber.textContent = `Number of guesses: ${guessesLeft}`;

    // Game Over - Lost
    if(guessesLeft === 0){
      guessNumber.textContent = `Number of guesses: ${guessesLeft}`;
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`)
    }else {
      // Game continues - wrong answer

      // Validate
      if(isNaN(guess) || guess < min || guess > max){
        // console.log('guess: ', guess);
        setMessage(`Please enter a number between ${min} and ${max}, ${guessesLeft} guesses left`, 'red');
      }else {

        // Change border red
        guessInput.style.borderColor = 'red';
  
        // Clear input
        guessInput.value = '';
  
        // Tell user its the wrong number
        setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
      }
    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red'

  // Disable input and button
  guessInput.disabled = true;
  //guessBtn.disabled = true;

  // Change border green
  guessInput.style.borderColor = color;

  // Set message
  setMessage(msg, color);

  guessBtn.value = 'Play again';
  guessBtn.className += 'play-again';

}

// Set message 
function setMessage(msg, color) {
  message.style.color = color;

  // isNaN(guess) ? msg = `${guess} is not a number, ${guessesLeft} guesses left` : msg = msg;
  message.textContent = msg;
}

// Get Winning Number
function getRandomNum(min, max) {
  return Math.floor(Math.random()*(max - min + 1) + min);
}


