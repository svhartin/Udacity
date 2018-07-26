//array of the cards
let cardList = ["diamond", "paper-plane-o", "anchor", "bicycle", "bolt", "cube", "leaf", "bomb",
                 "diamond", "paper-plane-o", "anchor", "bicycle", "bolt", "cube", "leaf", "bomb"];

let openList = [];
let moveCounter = 0;
let timerInterval;
restart();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//When two cards are clicked, determine if they are a match. If they are a match, then show the user they are a match. If they are not a match, then turn the cards back over. While playing the game, keep track of the number of moves the user completes in order to rate the user via the move counter and star rating system. Once all the matches have been found and the game is complete, display a message telling the user he/she won and how well he/she completed the game based on the move counter, star rating system. and the amount of time used.
$(document).on('click', '.card', function() {
  showCard(this);
  addCardToOpenList(this);
  if(openList.length === 2) {
    let card1 = openList.pop();
    let card2 = openList.pop();
    let isAMatch = doCardsMatch(card1, card2);
    if (isAMatch) {
      addMatchClass(card1);
      addMatchClass(card2);
    } else {
      setTimeout(function() {
        hideUnmatchedCard(card1);
        hideUnmatchedCard(card2);
      }, 1000);
    }
    updateMoveCounter();
    updateStarCounter();
  }
  if($(".card").length === $(".match").length) {
    clearInterval(timerInterval);
    displayMessage();
  }
});

//Restart the game by clicking on the restart icon
$(".restart").click(function() {
  restart();
});

//Function for the timer to start at the beginning of the game each time.
function createTimer() {
  var start = new Date;

  timerInterval = setInterval(function() {
      $('.timer').text(Math.round((new Date - start) / 1000, 0))
  }, 1000);
}

//function to show the card when clicked
function showCard(card) {
    $(card).toggleClass("open", 1000, "easeOutSine" );
    $(card).toggleClass("show", 1000, "easeOutSine" );
}


//function to add the card clicked to a list to determine if it's a match or not
function addCardToOpenList(card) {
  if (openList.length > 0 && openList[0] === card) {
    return;
  }
  openList.push(card);
}

//function to determine if the two cards chosen match or not
function doCardsMatch(card1, card2) {
  let card1Child = $(card1).children()[0].className;
  let card2Child = $(card2).children()[0].className;
  console.log(card1Child, card2Child);
  return card1Child === card2Child;
}

//function to tell the user when it's a match
function addMatchClass(card) {
  $(card).addClass("match");
}

//function to hide the card if it's not a match
function hideUnmatchedCard(card) {
  $(card).toggleClass("open", 1000, "easeOutSine" );
  $(card).toggleClass("show", 1000, "easeOutSine" );
}

//function to update the star rating when the game is completed
function updateStarCounter() {
  //When the moveCounter reaches 11 moves, decrease the starCounter from three stars to two stars.
  if (moveCounter === 11) {
    $(".stars .fa-star").eq(0).hide();
  }
  //When the moveCounter reaches 21 moves, decrease the starCounter from two stars to one star.
  if (moveCounter === 21) {
    $(".stars .fa-star").eq(0).hide();
  }
    const numberOfStars = $('.stars .fa-star').not(':hidden').length;
    $('.numberOfStars').text(numberOfStars);
}

//function to update the number of moves the user completes
function updateMoveCounter() {
  moveCounter = moveCounter + 1;
  $(".moves").text(moveCounter);
}

//function to display a congratulatory message when the user completes the game, along with the rating/score.
function displayMessage() {
  $("#modalLink").click();
}

function restart() {
  //Remove previous deck
  $('.card').remove();
  //shuffle the deck for each new game
  shuffle(cardList);
  for(let i = 0; i < cardList.length; i++) {
    let currentCard = cardList[i];
    let html = '<li class="card"><i class="fa fa-' + currentCard + '"></i></li>';
    $('.deck').append(html);
  }

  openList = [];
  moveCounter = -1;
  updateMoveCounter();

  $('.timer').text(0);

  $(".stars .fa-star").show();

  createTimer();
}
