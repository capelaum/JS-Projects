document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const flagsLeft = document.querySelector("#flags-left");
  const result = document.querySelector("#result");

  let width = 10;
  let bombAmount = 20;
  let flags = 0;
  let squares = [];
  let isGameOver = false;

  // Create Board
  function createBoard() {
    flagsLeft.innerHTML = bombAmount;

    // get shuffled game array with random bombs
    const bombsArray = Array(bombAmount).fill("bomb");
    const emptyArray = Array(width * width - bombAmount).fill("valid");
    const gameArray = emptyArray.concat(bombsArray);
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("id", i);

      // put the values in each square
      square.classList.add(shuffledArray[i]);

      grid.appendChild(square);
      squares.push(square);

      // normal click
      square.addEventListener("click", function (e) {
        click(square);
      });

      //right click
      square.oncontextmenu = function (e) {
        e.preventDefault();
        addFlag(square);
      };
    }

    // add numbers
    for (let i = 0; i < squares.length; i++) {
      const isLeftEdge = i % width === 0;
      const isRightEdge = i % width === width - 1;

      let total = 0;

      if (squares[i].classList.contains("valid")) {
        // * check the total of bombs near the square

        // Left
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("bomb"))
          total++;
        // North Right
        if (
          i > 9 &&
          !isRightEdge &&
          squares[i + 1 - width].classList.contains("bomb")
        )
          total++;
        // North
        if (i > 10 && squares[i - width].classList.contains("bomb")) total++;
        // South East
        if (
          i > 11 &&
          !isLeftEdge &&
          squares[i - 1 - width].classList.contains("bomb")
        )
          total++;
        // Right
        if (i < 98 && !isRightEdge && squares[i + 1].classList.contains("bomb"))
          total++;
        // South West
        if (
          i < 90 &&
          !isLeftEdge &&
          squares[i - 1 + width].classList.contains("bomb")
        )
          total++;
        // North Left
        if (
          i < 88 &&
          !isRightEdge &&
          squares[i + 1 + width].classList.contains("bomb")
        )
          total++;
        // South
        if (i < 89 && squares[i + width].classList.contains("bomb")) total++;

        squares[i].setAttribute("data", total);
        //console.log(squares[i]);
      }
    }
  }

  createBoard();

  // add flag with right click
  function addFlag(square) {
    if (isGameOver) return;

    if (!square.classList.contains("checked") && flags < bombAmount) {
      if (!square.classList.contains("flag")) {
        square.classList.add("flag");
        square.innerHTML = "🚩";
        flags++;

        flagsLeft.innerHTML = bombAmount - flags;

        checkForWin();
      } else {
        square.classList.remove("flag");
        square.innerHTML = "";
        flags--;

        flagsLeft.innerHTML = bombAmount - flags;
      }
    }
  }

  // click on square actions
  function click(square) {
    let currentId = square.id;

    if (isGameOver) return;

    if (
      square.classList.contains("checked") ||
      square.classList.contains("flag")
    )
      return;

    if (square.classList.contains("bomb")) {
      gameOver(square);
    } else {
      let total = square.getAttribute("data");

      if (total != 0) {
        square.classList.add("checked");
        if (total == 1) square.classList.add("one");
        if (total == 2) square.classList.add("two");
        if (total == 3) square.classList.add("three");
        if (total == 4) square.classList.add("four");
        square.innerHTML = total;
        checkForWin(square);
        return;
      }

      // if it doesnt have any bombs near
      checkSquare(square, currentId);
    }

    checkForWin(square);
    square.classList.add("checked");
  }

  // check neighboring squares once square is clicked
  function checkSquare(square, currentId) {
    const isLeftEdge = currentId % width === 0;
    const isRightEdge = currentId % width === width - 1;

    setTimeout(() => {
      // Left
      if (currentId > 0 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      // North Right
      if (currentId > 9 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      // North
      if (currentId > 10) {
        const newId = squares[parseInt(currentId) - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      // South East
      if (currentId > 11 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      // Right
      if (currentId < 98 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      // South West
      if (currentId < 90 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      // North Left
      if (currentId < 88 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      // South
      if (currentId < 89) {
        const newId = squares[parseInt(currentId) + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
    }, 10);
  }

  // Lose
  function gameOver(square) {
    console.log("BOOM! GAME OVER!");
    result.innerHTML = "BOOM! Game Over!";
    isGameOver = true;

    // Shows all the bombs
    squares.forEach((square) => {
      if (square.classList.contains("bomb")) {
        square.innerHTML = "💣";
        square.classList.remove("bomb");
        square.classList.add("checked");
      }
    });
  }

  const winMsg = function () {
    console.log("YOU WIN!");
    result.innerHTML = "YOU WIN!";
  };

  // Check Win
  function checkForWin(square) {
    let matches = 0;
    let checks = 0;

    for (let i = 0; i < squares.length; i++) {
      if (
        squares[i].classList.contains("checked") &&
        squares[i].classList.contains("valid")
      ) {
        checks++;
        //console.log('checks = ', checks)

        if (checks === 80) {
          winMsg();
          square.innerHTML = "😎";
          isGameOver = true;
        }
      }

      if (
        squares[i].classList.contains("flag") &&
        squares[i].classList.contains("bomb")
      ) {
        matches++;
      }

      if (matches === bombAmount) {
        winMsg();
        square.innerHTML = "😎";
        isGameOver = true;
      }
    }
  }
});
