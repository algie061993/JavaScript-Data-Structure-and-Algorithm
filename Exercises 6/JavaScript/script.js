/*
 * This function, getRandomComputerResult, is designed to simulate the computer's
 * choice in a game like Rock-Paper-Scissors by randomly selecting one of the
 * available options.
 *
 * 1. const options = ["Rock", "Paper", "Scissors"];
 * - Defines an array named 'options' containing the three possible string choices.
 *
 * 2. const randomIndex = Math.floor(Math.random() * options.length);
 * - **Math.random()** generates a floating-point number between 0 (inclusive) and 1 (exclusive).
 * - This number is multiplied by **options.length** (which is 3), resulting in a number
 * in the range [0, 3).
 * - **Math.floor()** rounds this result down to the nearest whole integer,
 * ensuring the 'randomIndex' is a valid array index: 0, 1, or 2.
 *
 * 3. return options[randomIndex];
 * - Uses the generated index to access and return the corresponding string
 * value ("Rock", "Paper", or "Scissors") from the 'options' array.
 *
 */
function getRandomComputerResult() {
  const options = ["Rock", "Paper", "Scissors"];
  const randomIndex = Math.floor(Math.random() * options.length);
  console.log(randomIndex);
  return options[randomIndex];
}

console.log(`this is the result of the computer ${getRandomComputerResult()}`);

/*
 * This function, hasPlayerWonTheRound, is designed to determine if the player
 * has won a round of a game like Rock-Paper-Scissors based on their choice
 * and the computer's choice.
 *
 * 1. return (player === "Rock" && computer === "Scissors") ||
 * (player === "Scissors" && computer === "Paper") ||
 * (player === "Paper" && computer === "Rock");
 * - This line uses a logical OR (||) operator to check if the player's choice
 * ("player") is equal to "Rock" and the computer's choice ("computer") is equal
 * to "Scissors", or if the player's choice is equal to "Scissors" and the
 * computer's choice is equal to "Paper", or if the player's choice is equal to
 * "Paper" and the computer's choice is equal to "Rock".
 * - If any of these conditions are true, the function returns true, indicating
 * that the player has won the round. If none of these conditions are true, it returns false,
 * indicating that the player has not won the round.
 *
 */

let playerScore = 0;
let computerScore = 0;
function hasPlayerWonTheRound(player, computer) {
  return (
    (player === "Rock" && computer === "Scissors") ||
    (player === "Scissors" && computer === "Paper") ||
    (player === "Paper" && computer === "Rock")
  );
}

console.log(hasPlayerWonTheRound("Rock", "Scissors"));
console.log(hasPlayerWonTheRound("Scissors", "Rock"));

/*
 * This function, getRoundResults, determines the outcome of a round in a
 * Rock-Paper-Scissors game based on the user's choice and a randomly generated
 * choice for the computer.
 * 1. const computerResult = getRandomComputerResult();
 * - Calls the previously defined function getRandomComputerResult to obtain
 * the computer's choice for the round.
 * 2. if (hasPlayerWonTheRound(userOption, computerResult)) { ... }
 * - Uses the hasPlayerWonTheRound function to check if the user has won
 * against the computer's choice. If true, it increments the player's score
 * and returns a message indicating the player's victory.
 * 3. else if (computerResult === userOption) { ... }
 * - Checks if the computer's choice is the same as the user's choice. If true,
 * it returns a message indicating a tie.
 * 4. else { ... }
 * - If none of the above conditions are true, it increments the computer's
 * score and returns a message indicating the computer's victory.
 */
function getRoundResults(userOption) {
  const computerResult = getRandomComputerResult();

  if (hasPlayerWonTheRound(userOption, computerResult)) {
    playerScore++;
    return `Player wins! ${userOption} beats ${computerResult}`;
  } else if (computerResult === userOption) {
    return `It's a tie! Both chose ${userOption}`;
  } else {
    computerScore++;
    return `Computer wins! ${computerResult} beats ${userOption}`;
  }
}

console.log(getRoundResults("Rock"));
console.log("Player Score: ", playerScore, "Computer Score: ", computerScore);

/*
 * The following code sets up the user interface for the Rock-Paper-Scissors game,
 * including event listeners for the buttons and the reset game button.
 */
const playerScoreSpanElement = document.getElementById("player-score");
const computerScoreSpanElement = document.getElementById("computer-score");
const roundResultsMsg = document.getElementById("results-msg");
const winnerMsgElement = document.getElementById("winner-msg");
const optionsContainer = document.querySelector(".options-container");
const resetGameBtn = document.getElementById("reset-game-btn");

/*
 * This function, showResults, updates the game interface based on the user's
 * choice and the current scores. It displays the results of the round, updates
 * the scores, and determines if the game has ended.
 * 1. roundResultsMsg.innerText = getRoundResults(userOption);
 * - Calls the getRoundResults function with the user's choice and updates
 * the results message displayed to the user.
 * 2. computerScoreSpanElement.innerText = computerScore;
 * - Updates the computer score displayed to the user.
 * 3. playerScoreSpanElement.innerText = playerScore;
 * - Updates the player score displayed to the user.
 * 4. if (playerScore === 3 || computerScore === 3) { ... }
 * - Checks if the player or computer has won three rounds. If so, it updates
 * the winner message and shows the reset game button. It also hides the options container to prevent further play.
 *
 */
function showResults(userOption) {
  roundResultsMsg.innerText = getRoundResults(userOption);
  computerScoreSpanElement.innerText = computerScore;
  playerScoreSpanElement.innerText = playerScore;

  if (playerScore === 3 || computerScore === 3) {
    winnerMsgElement.innerText = `${
      playerScore === 3 ? "Player" : "Computer"
    } has won the game!`;

    resetGameBtn.style.display = "block";
    optionsContainer.style.display = "none";
  }
}

/*
 * The following code adds event listeners to the buttons for the
 * Rock-Paper-Scissors game, and calls the showResults function when a button is clicked.
 * 1. rockBtn.addEventListener("click", function () { ... });
 * - Adds a click event listener to the "Rock" button that calls showResults
 * with "Rock" as the user's choice.
 * 2. paperBtn.addEventListener("click", function () { ... });
 * - Adds a click event listener to the "Paper" button that calls showResults
 * with "Paper" as the user's choice.
 * 3. scissorsBtn.addEventListener("click", function () { ... });
 * - Adds a click event listener to the "Scissors" button that calls showResults
 * with "Scissors" as the user's choice.
 */

const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scissorsBtn = document.getElementById("scissors-btn");

rockBtn.addEventListener("click", function () {
  showResults("Rock");
});

paperBtn.addEventListener("click", function () {
  showResults("Paper");
});

scissorsBtn.addEventListener("click", function () {
  showResults("Scissors");
});

/*
 * This function, resetGame, resets the game state to its initial values,
 * allowing the player to start a new game. It resets scores, clears messages,
 * hides the reset game button, and shows the options container.
 * 1. playerScore = 0; computerScore = 0;
 * - Resets both the player's and computer's scores to zero.
 * 2. roundResultsMsg.innerText = "";
 * - Clears the round results message displayed to the user.
 * 3. computerScoreSpanElement.innerText = "0"; playerScoreSpanElement.innerText = "0";
 * - Updates the displayed scores for both the player and computer to zero.
 * 4. winnerMsgElement.innerText = "";
 * - Clears the winner message displayed to the user.
 * 5. resetGameBtn.style.display = "none";
 * - Hides the reset game button.
 * 6. optionsContainer.style.display = "";
 * - Shows the options container, allowing the player to make choices again.
 *
 */
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  roundResultsMsg.innerText = "";
  computerScoreSpanElement.innerText = "0";
  playerScoreSpanElement.innerText = "0";
  winnerMsgElement.innerText = "";
  resetGameBtn.style.display = "none";
  optionsContainer.style.display = "";
}

resetGameBtn.addEventListener("click", resetGame);
