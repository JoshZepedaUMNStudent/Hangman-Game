// Word array
var words = ["tractor", "cow", "horse", "pig", "chicken",
            "hoe", "pitchfork", "shovel", "axe", "corn",
            "wheat", "hay", "barn"];

// Variables
var guess = [];
var remainingGuess = 10;
var wrongGuess = [];
var answerArray = [];
var wins = 0;
var losses = 0;
var lettersPicked = {
    cache: []
};
var setState = "stopped";
var secretWord = "";

// Begin game
window.onload = document.getElementById("underscores").innerHTML = "Use the picture for clues";

function begin() {
    setState = "gameOn";
    document.getElementById("messageBox").innerHTML = "Guess the letters";
    gameStart()
};

function gameStart() {
    if (setState === "gameOn") {
        // Word generator
        secretWord = words[Math.floor(Math.random() * words.length)];
        // Initializing answer array
        for (var i = 0; i < secretWord.length; i++) {
            answerArray[i] = "_";
        }
    } else {
        document.getElementById("messageBox").innerHTML = "GOOD JOB!";
    }
    // Display stats
    document.getElementById("underscores").innerHTML = answerArray.join(" ");
    document.getElementById("lives").innerHTML = remainingGuess;
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
};

// Check if player wins
function playerWins() {
    if (answerArray.indexOf("_") === -1) {
        setState = "stopped";
        wins++;
        document.getElementById("wins").innerHTML = wins;
        gameStart()
    }
};

// Check if player loses
function playerLoses() {
    if (remainingGuess <= 0) {
        document.getElementById("messageBox").innerHTML = "SORRY, YOU LOST. CLICK BUTTON TO PLAY AGAIN.";
        losses++;
        setState = "stopped";
    }
};

// Listener for player's guess
document.addEventListener("keyup", function() {
    guess = event.key.toLowerCase();
    // Only accepts keys if in GAMEON state
    if (setState === "gameOn") {
        // For wrong guess
        if (secretWord.includes(guess) === false) {
            wrongGuess.push(guess);
            document.getElementById("showWrongLetters").innerHTML = wrongGuess.join(" ");
            document.getElementById("messageBox").innerHTML = "Wrong guess";
            lives--;
            document.getElementById("lives").innerHTML = remainingGuess;
            playerLoses();
        }
        // For correct guess
        for (var i = 0; i < secretWord.length; i++) {
            if (secretWord[i].includes(guess)) {
                lettersPicked.cache.push(guess);
                answerArray[i] = guess;
                document.getElementById("underscores").innerHTML = answerArray.join(" ");
                document.getElementById("messageBox").innerHTML = "Good guess!";
                playerWins();
            }
        }
    }
});