$(document).ready(function(){

  const cardDeck = [
      {
          name: "batz",
          source: "./img/batz-card.png",
      },
      {
          name: "dudu",
          source: "./img/dudu-card.png",
      },
      {
          name: "nuli",
          source: "./img/nuli-card.png",
      },
      {
          name: "ofra",
          source: "./img/ofra-card.png",
      },
      {
          name: "shabi",
          source: "./img/shabi-card.png",
      },
      {
          name: "uzi",
          source: "./img/uzi-card.png",
      },
      {
          name: "batz",
          source: "./img/batz-card.png",
      },
      {
          name: "dudu",
          source: "./img/dudu-card.png",
      },
      {
          name: "nuli",
          source: "./img/nuli-card.png",
      },
      {
          name: "ofra",
          source: "./img/ofra-card.png",
      },
      {
          name: "shabi",
          source: "./img/shabi-card.png",
      },
      {
          name: "uzi",
          source: "./img/uzi-card.png",
      },
  ] 

  let firstGuess = '';
  let secondGuess = '';
  let count = 0;
  let previousTarget = null;
  let delay = 1000;
  let timer = 0;
  let wrong = 0;
  let right = 0;
  let gameOn = 0;
  let wrongCount = document.getElementById('counter');
  let timerBar = document.querySelector(".progress-bar");
  let winDisplay = document.getElementById('win-display');
  let main = document.getElementById('main');
  let newGameButton = document.getElementById('new-game');


  const game = document.getElementById('game');
  const grid = document.createElement('div');
  grid.setAttribute('class', 'grid');
  game.appendChild(grid);

  function shuffle(deck) {
    var currentIndex = deck.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = deck[currentIndex];
      deck[currentIndex] = deck[randomIndex];
      deck[randomIndex] = temporaryValue;
    }
    return deck;
  }

  // start game and distribute cards
  function createGrid() {
      main.style.visibility = "visible";
      newGameButton.style.visibility = "visible";
      let startButton = document.getElementById('startButton');
      startButton.textContent = "Play again!";
      gameOn = 1;
      wrong = 0;
      wrongCount.textContent = "good luck! start!";
      setInterval(displayLoss, 50);
      timerBar.style.visibility = "visible";
      let deck = shuffle(cardDeck);
      var gridSize = deck.length;
      let rows = (gridSize / 3);
      for (let counter = 0; counter < rows; counter++) {

          const gridrow = document.createElement('div');
          gridrow.setAttribute('class', 'gridRow col-3');
          grid.appendChild(gridrow);

          for (let i = 0; i < 3; i++) {

              let currentRow = counter;
              let currentCard = i+((gridSize/rows)*counter);

              const card = document.createElement('div');
              card.classList.add('card');
              card.dataset.name = deck[currentCard].name;
            
              const front = document.createElement('div');
              front.classList.add('front');
            
              const back = document.createElement('div');
              back.classList.add('back');
              back.style.backgroundImage = `url(${ deck[currentCard].source})`;
            
              
              gridrow.appendChild(card);
              card.appendChild(front);
              card.appendChild(back);
          }
      }
  }

  // clear cards
  function clearGrid() {
    let oldGame = grid.getElementsByClassName('gridRow');
    while (oldGame.length > 0) {
        grid.removeChild(oldGame[0]);
    }
  }

  function match() {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
      card.classList.add('match');
    });
  };

  function resetGuesses() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
      card.classList.remove('selected');
    });
  };

  //analyze card choice
  grid.addEventListener('click', event => {

    const clicked = event.target;

    if (
      clicked.nodeName === 'SECTION' ||
      clicked === previousTarget ||
      clicked.parentNode.classList.contains('selected') ||
      clicked.parentNode.classList.contains('match')
    ) {
      return;
    }

    if (count < 2) {
      count++;
      if (count === 1) {
        firstGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selected');
      } else {
        secondGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selected');
      }

      if (firstGuess && secondGuess) {
        if (firstGuess === secondGuess) {
          right ++;
          setTimeout(match, delay);
          if (right === (0.5 * cardDeck.length)) {
            setTimeout(displayWin, delay);
          }
        } else {
          wrong ++;
          wrongCount.textContent = `wrong guesses: ${wrong}`;
          setTimeout(resetGuesses, delay);
          }
      }
      previousTarget = clicked;
    }

  });

//game timer
  function displayLoss() {
    if (gameOn === 1) {
      timer++;
    }
    var percent = 100-(0.07 * timer);
    timerBar.style.width = `${percent}%`;
    if (percent === 0){
      gameOn = 0;
      winDisplay.textContent = "You lost.";
      timerBar.style.visibility = "hidden";
      $('#myModal').modal('show');
    }
  }

  function displayWin() {
    gameOn = 0;
    winDisplay.textContent = `You won!!! ${wrong} guesses wrong.`;
    $('#myModal').modal('show');
  }


  // bootstrap functions to initialize Modal and game
  $('#myModal').on('hidden.bs.modal', function (e) {
    $('#myModal').modal('hide');
    createGrid();
  })

  $('#myModal').on('shown.bs.modal', function (e) {
    clearGrid();
    timer = 0;
    gameOn = 0;
    main.style.visibility = "hidden";
    timerBar.style.visibility = "hidden";
    $('#myModal').modal('show');
  })

  $('#myModal').modal('show'); 
});