/*----- HTML elements -----*/
const targetWordElement = document.getElementById("target-word");
const synonymListElement = document.getElementById("synonym-list");
const gameBoardElement = document.getElementById("game-board");
const resetButton = document.getElementById("reset-button");
const scoreElement = document.getElementById("score");

/*----- constants -----*/

const fastSpeed = 1;
const slowSpeed = 0.5;
const numberOfCombinedWords = 14;
let score = 0;

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
    topoffset: generateList(0.01, 0.35, numberOfCombinedWords, 0.05),
    leftoffset: generateList(0, 0.9, numberOfCombinedWords, 0.05),
  };
  return result;
}

class WordShooter {
  constructor(targetWord, numberOfCombinedWords, synonyms, randomWords) {
    this.targetWord = targetWord;
    this.synonyms = synonyms;
    this.randomWords = randomWords;
    this.remainingTime = 20;
    this.numberOfCombinedWords = numberOfCombinedWords;
    this.PositionList = generatePositionList(); // generate initial positions and speeds
    this.moveSynonyms = this.moveSynonyms.bind(this);
  }

  startGame() {
    score = 0;
    this.remainingTime = 20;

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
    const listLength = numberOfCombinedWords / 2;
    const combinedArray = [...this.synonyms.sort(() => Math.random() - 0.5).slice(0, listLength),
    ...this.randomWords.sort(() => Math.random() - 0.5).slice(0, listLength)];
    combinedArray.sort(() => Math.random() - 0.5);
    console.log(combinedArray);
    return combinedArray
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
    alert(`Round Complete! Final score is: ${score}`);
  }

  resetWin() {
    // show reset button
    resetButton.style.display = "block";
    resetButton.addEventListener("click", this.playAgain.bind(this));

    // stop moving words
    window.cancelAnimationFrame(this.moveSynonyms);

    // show score 
    alert(`You found all the words! Final score is: ${score}`);
  }

  playAgain() {
    score = 0;
    scoreElement.textContent = score;

    resetButton.style.display = "none";

    this.remainingTime = 20;
    this.startGame();
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
    if (synonyms.includes(clickedSynonym)) {
      score++;
      scoreElement.textContent = score;
      event.target.remove(); // Remove clicked element

      if (score == numberOfCombinedWords / 2) {
        this.resetWin();
      }
    }
  }
}

// start the first game

const firstGame = new WordShooter(
  targetWord,
  numberOfCombinedWords,
  synonyms,
  antonyms
);
firstGame.startGame();
