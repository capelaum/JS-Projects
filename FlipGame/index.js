const cards = document.querySelectorAll(".card");
console.log(cards);

// variables
var isFlipped = false;
var firstCard;
var secondCard;
var count = 16;

shuffle();

cards.forEach((card) => card.addEventListener("click", flip));

function flip() {
  //   console.log("Card flipped");
  // console.log(this);
  this.classList.add("flip");

  if (!isFlipped) {
    isFlipped = true;
    firstCard = this;
  } else {
    secondCard = this;
    // console.log(firstCard);
    // console.log(secondCard);

    checkIt();
  }
}

function checkIt() {
  //   console.log("Checking...");
  firstCard.dataset.image === secondCard.dataset.image ? success() : fail();
}

function success() {
  console.log("Success");

  firstCard.removeEventListener("click", flip);
  secondCard.removeEventListener("click", flip);
  reset();

  count -= 2;
  console.log("count = ", count);

  if (count === 0) {
    alert("YOU WIN!");
    cards.forEach((card) => {
      card.classList.remove("flip");
      card.addEventListener("click", flip);
      shuffle();
    });
  }
}

function fail() {
  console.log("Failed");

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    reset();
  }, 1000);
}

function reset() {
  isFlipped = false;
  firstCard = null;
  secondCard = null;
}

//TODO: shuffle

function shuffle() {
  cards.forEach((card) => {
    var index = Math.floor(Math.random() * 16);
    card.style.order = index;
  });
}

function gameOver() {
  cards.forEach((card) => {
    if (card.classList.contains("flip")) count++;
    console.log(count);
  });

  if (count == 16) {
    return true;
  }
}
