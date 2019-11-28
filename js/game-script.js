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


/*     {
        name: "efi",
        source: "./img/efi-card.png",
    }, */
    /*     {
        name: "wein",
        source: "./img/wein-card.png",
    }, */
/*     {
        name: "uza",
        source: "img/uza-card.png",
    }, */






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


let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1500;

const game = document.getElementById('game');
const grid = document.createElement('div');
grid.setAttribute('class', 'grid');
game.appendChild(grid);


function createGrid() {
    var gridSize = deck.length;
    console.log('gridsize = ' + gridSize);
    let rows = (gridSize / 3);
    console.log('rows = ' + rows);
    for (let counter = 0; counter < rows; counter++) {

        const gridrow = document.createElement('div');
        gridrow.setAttribute('class', 'gridrow');
        grid.appendChild(gridrow);
        console.log('row = ' + counter);

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
            console.log('card = ' + currentCard);
        }
    }
}

const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

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
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }

});


var btnOpen = document.getElementById('js-open');
var newGame = document.getElementById('js-close');
var modal = document.getElementById('js-modal');
var modalChildren = modal.children;

function hideModal() {
    modal.animate(modal, {
    opacity: 0,
    translateY: 100
  }, {
    type: modal.spring,
    frequency: 50,
    friction: 600,
    duration: 1500
  });
}

function showModal() {
  // Define initial properties
  modal.css(modal, {
    opacity: 0,
    scale: .5
  });
  
  // Animate to final properties
  modal.animate(modal, {
    opacity: 1,
    scale: 1
  }, {
    type: dynamics.spring,
    frequency: 300,
    friction: 400,
    duration: 1000
  });
}

function showBtn() {
    modal.css(btnOpen, {
    opacity: 0
  });
  
  modal.animate(btnOpen, {
    opacity: 1
  }, {
    type: modal.spring,
    frequency: 300,
    friction: 400,
    duration: 800
  });
}

function showModalChildren() {
  // Animate each child individually
  for(var i=0; i<modalChildren.length; i++) {
    var item = modalChildren[i];
    
    // Define initial properties
    modal.css(item, {
      opacity: 0,
      translateY: 30
    });

    // Animate to final properties
    modal.animate(item, {
      opacity: 1,
      translateY: 0
    }, {
      type: modal.spring,
      frequency: 300,
      friction: 400,
      duration: 1000,
      delay: 100 + i * 40
    });
  } 
}

function toggleClasses() {
  toggleClass(btnOpen, 'is-active');
  toggleClass(modal, 'is-active');
}

// Open nav when clicking sandwich button
btnOpen.addEventListener('click', function(e) {
  toggleClasses();
  showModal();
  showModalChildren();
});

// Open nav when clicking sandwich button
newGame.addEventListener('click', function(e) {
  hideModal();
  modal.setTimeout(toggleClasses, 500);
  modal.setTimeout(showBtn, 500);
  const deck = shuffle(cardDeck);
  createGrid();
});