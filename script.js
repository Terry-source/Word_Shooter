/*----- HTML elements -----*/
const targetWordElement = document.getElementById("target-word");
const synonymListElement = document.getElementById("synonym-list");
const gameBoardElement = document.getElementById("game-board");
const resetButton = document.getElementById("reset-button");

/*----- constants -----*/

const fastSpeed = 1;
const slowSpeed = 0.5;
const numberOfCombinedWords = 40;


/*----- state variables -----*/

let targetWord = "elegant";
let synonyms = [
  "graceful",
  "handsome",
  "fine",
  "luxurious",
  "majestic",
  "magnificent",
  "classy",
  "stylish",
  "simple",
  "tasteful",
  "glorious",
  "proud",
  "royal",
  "superb",
  "regal",
  "refined",
  "rich",
  "sophisticated",
  "aristocratic",
  "noble",
  "gallant",
  "courtly",
  "stately",
];
let antonyms = [
  "tasteless",
  "dowdy",
  "graceless",
  "loud",
  "grotesque",
  "flamboyant",
  "flashy",
  "gaudy",
  "crude",
  "coarse",
  "tawdry",
  "glitzy",
  "tacky",
  "garish",
  "cheesy",
  "raffish",
  "splashy",
  "styleless",
  "vulgar",
  "trashy",
  "rude",
  "rough-hewn",
  "ticky-tacky",
  "ticky-tack",
  "rough-edged",
  "tasteless",
  "dowdy",
  "graceless",
  "loud",
  "grotesque",
  "flamboyant",
  "flashy",
  "gaudy",
  "crude",
  "coarse",
  "tawdry",
  "glitzy",
  "tacky",
  "garish",
  "cheesy",
  "raffish",
  "splashy",
  "styleless",
  "vulgar",
  "uncouth",
  "trashy",
  "rude",
  "rough-hewn",
  "ticky-tacky",
  "ticky-tack",
  "rough-edged",
];
/*----- functions -----*/


function generateList(start, end, length) {
  if (length < 1) {
    return [];
  }

  const result = [];
  const increment = (end - start) / length;

  for (let i = 0; i < length; i++) {
    result.push(i * increment + start);
  }

  // randomiser
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function generatePositionList() {
  const result = {
    speed: generateList(slowSpeed, fastSpeed, numberOfCombinedWords, fastSpeed - slowSpeed),
    topoffset: generateList(0, 1, numberOfCombinedWords, 1 / numberOfCombinedWords),
    leftoffset: generateList(0, 1, numberOfCombinedWords, 1 / numberOfCombinedWords),
  };
  return result;
}

class WordShooter {
  constructor(targetWord, numberOfCombinedWords, synonyms, randomWords) {
    this.targetWord = targetWord;
    this.synonyms = synonyms;
    this.randomWords = randomWords;
    this.score = 0;
    this.remainingTime = 3;
    this.numberOfCombinedWords = numberOfCombinedWords;
    this.PositionList = generatePositionList(); // generate initial positions and speeds
    this.moveSynonyms = this.moveSynonyms.bind(this);
  }

  startGame() {
    // show target word
    targetWordElement.textContent = this.targetWord;

    // combine lists
    this.combinedList = this.combineWordList();

    // create word list

    synonymListElement.innerHTML = "";
    for (const [index, synonym] of this.combinedList.entries()) {
      const synonymItem = document.createElement("li");
      synonymItem.textContent = synonym;
      synonymListElement.appendChild(synonymItem);

      // add event listener to each word
      synonymItem.addEventListener("click", this.handleSynonymClick.bind(this));

      // random positions of words
      synonymItem.style.left =
        this.PositionList['leftoffset'][index] * gameBoardElement.offsetWidth + "px";
      synonymItem.style.top =
        this.PositionList['topoffset'][index] * gameBoardElement.offsetWidth + "px";
    }

    // move words
    this.moveSynonyms();

    // countdown timer
    this.setTimer(() => {
      // reset game
      this.reset();
    });
  }

  combineWordList() {
    const combinedArray = [...this.synonyms, ...this.randomWords];
    combinedArray.sort(() => Math.random() - 0.5);
    console.log(combinedArray);
    return combinedArray.slice(0, this.numberOfCombinedWords);
  }

  setTimer(resetCallback) {
    const timerInterval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
        document.getElementById("timer").textContent = this.remainingTime;
      } else {
        clearInterval(timerInterval);
        resetCallback();
      }
    }, 1000);
  }

  reset() {
    // show reset button
    resetButton.style.display = "block";
    resetButton.addEventListener("click", this.playAgain.bind(this));

    // stop moving words
    window.cancelAnimationFrame(this.moveSynonyms);

    // show score
    // alert(`Round Complete! Final score is: ${this.score}`);
  }

  playAgain() {
    resetButton.style.display = "none";
    const nextGame = new WordShooter(
      targetWord,
      numberOfCombinedWords,
      synonyms,
      antonyms
    );
    nextGame.startGame();
  }

  moveSynonyms() {
    let i = 0;

    for (const [index, synonymItem] of Array.from(synonymListElement.children).entries()) {
      // random speed
      const speed = this.PositionList['speed'][index];

      requestAnimationFrame(() => {
        synonymItem.style.left =
          parseFloat(synonymItem.style.left) + 1 * speed + "px";
        synonymItem.style.transitionTimingFunction = "ease";
      });

      // check for element reaching edge of game area and reset
      if (parseFloat(synonymItem.style.left) > gameBoardElement.offsetWidth) {
        synonymItem.style.left = 0;
      }

      i++;
    }

    // repeat animation loop
    window.requestAnimationFrame(this.moveSynonyms.bind(this));
  }

  handleSynonymClick(event) {
    const clickedSynonym = event.target.textContent;

    // check if clicked synonym is correct
    if (clickedSynonym in synonyms) {
      this.score++;
      event.target.remove(); // Remove clicked element
    }
  }
}

// start the first game
// speedList = generateList(slowSpeed, fastSpeed, numberOfCombinedWords);

const firstGame = new WordShooter(
  targetWord,
  numberOfCombinedWords,
  synonyms,
  antonyms
);
firstGame.startGame();
