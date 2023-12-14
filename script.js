/*----- HTML elements -----*/
const targetWordElement = document.getElementById("target-word");
const synonymListElement = document.getElementById("synonym-list");
const gameBoardElement = document.getElementById("game-board");
const resetButton = document.getElementById("reset-button");

/*----- constants -----*/

const fastSpeed = 1;
const slowSpeed = 0.5;
const numberOfCombinedWords = 10;

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
// let speedList = [
//   fastSpeed,
//   fastSpeed,
//   fastSpeed,
//   fastSpeed,
//   fastSpeed,
//   slowSpeed,
//   slowSpeed,
//   slowSpeed,
//   slowSpeed,
//   slowSpeed,
// ]
/*----- functions -----*/

function generateSpeedList(start, end, length) {
  if (length < 1) {
    return [];
  }

  const result = [];
  const increment = (end - start) / length;

  for (let i = 0; i < length; i++) {
    result.push(i * increment + start);
  }

  return result;
}

function generatePositionList(start, end, length) {
  if (length < 1) {
    return {};
  }

  const result = [];
  const increment = (end - start) / length;

  for (let i = 0; i < length; i++) {
    result.push(i * increment + start);
  }

  return result;

  // random positions of words
  synonymItem.style.left = Math.random() * gameBoardElement.offsetWidth + "px";
  synonymItem.style.top =
    Math.round((Math.random() * gameBoardElement.offsetHeight) / 100) * 100 +
    "px";
}

class WordShooter {
  constructor(targetWord, numberOfCombinedWords, synonyms, randomWords) {
    this.targetWord = targetWord;
    this.synonyms = synonyms;
    this.randomWords = randomWords;
    this.score = 0;
    this.remainingTime = 20;
    this.numberOfCombinedWords = numberOfCombinedWords;
  }

  startGame() {
    // show target word
    targetWordElement.textContent = this.targetWord;

    // combine lists
    this.combinedList = this.combineWordList();

    // create word list
    synonymListElement.innerHTML = "";
    for (const synonym of this.combinedList) {
      const synonymItem = document.createElement("li");
      synonymItem.textContent = synonym;
      synonymListElement.appendChild(synonymItem);

      // add event listener to each word
      synonymItem.addEventListener("click", this.handleSynonymClick.bind(this));

      // random positions of words
      synonymItem.style.left =
        Math.random() * gameBoardElement.offsetWidth + "px";
      synonymItem.style.top =
        Math.round((Math.random() * gameBoardElement.offsetHeight) / 100) *
          100 +
        "px";
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

  // isPositionOverlapping(newLeft, newTop, existingElements) {
  //   for (const existingItem of existingElements) {
  //     const existingLeft = existingItem.style.left;
  //     const existingTop = existingItem.style.top;

  //     const existingRight = parseFloat(existingLeft) + existingItem.offsetWidth;
  //     const existingBottom =
  //       parseFloat(existingTop) + existingItem.offsetHeight;

  //     if (
  //       parseFloat(newLeft) < existingRight &&
  //       parseFloat(newRight) > existingLeft &&
  //       parseFloat(newTop) < existingBottom &&
  //       parseFloat(existingBottom) > existingTop
  //     ) {
  //       return true; // Overlap detected
  //     }
  //   }

  //   return false; // No overlap found
  // }

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
    document.getElementById("reset-button").style.display = "block";

    // stop moving words
    window.cancelAnimationFrame(moveSynonyms);

    // show score
    alert(`Round Complete! Final score is: ${this.score}`);
  }

  moveSynonyms() {
    let i = 0;

    for (const synonymItem of synonymListElement.children) {
      // random speed
      // const randomSpeed = Math.random() * 0.5 + 0.1;
      const speed = speedList[i];
      //   // update position based on random speed
      //   synonymItem.style.left =
      //     parseFloat(synonymItem.style.left) + randomSpeed + "px";

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
speedList = generateSpeedList(slowSpeed, fastSpeed, numberOfCombinedWords);

const firstGame = new WordShooter(
  targetWord,
  numberOfCombinedWords,
  synonyms,
  antonyms
);
firstGame.startGame();
