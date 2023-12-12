/*----- HTML elements -----*/
const targetWordElement = document.getElementById("target-word");
const synonymListElement = document.getElementById("synonym-list");
const gameBoardElement = document.getElementById("game-board");
const playAgainButton = document.getElementById("play-again-button");

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

class WordShooterGame {
    constructor(targetWord, synonyms, randomWords) {
        this.targetWord = targetWord;
        this.synonyms = synonyms;
        this.randomWords = randomWords;
        this.score = 0;
        this.remainingTime = 20;
    }

}

// Start the first game
const firstGame = new WordShooterGame(targetWord, synonyms, antonyms);
firstGame.startGame();