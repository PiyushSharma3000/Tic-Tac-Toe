const cells = document.querySelectorAll(".cell");
console.log(cells);//[div.cell, div.cell, div.cell, div.cell, div.cell, div.cell, div.cell, div.cell, div.cell]

const message = document.querySelector(".message");
console.log(message); // <div class="message"></div>

const restartButton = document.querySelector("#restartButton");
console.log(restartButton); // <button id="restartButton">Restart</button>

let currentPlayer = "X"; // Starting player
let gameOver = false; // this variable will help us remember Has someone already won the game

let turnIndicator = document.querySelector("#turn-indicator");
console.log(turnIndicator); // <div class="turn-indicator"></div>

// Function to check for a winner
// This function checks all possible winning combinations
const winner = () => {
    const winningIndexes = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    winningIndexes.forEach(([a, b, c]) => {
        if (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            message.textContent = `Player ${cells[a].textContent} wins!`;
            message.classList.remove("hidden");
            gameOver = true; // Set gameOver to true when a player wins
        }
    })
}

cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        // gameOver → true = game ended → no more moves allowed
        // cell.textContent → cell already filled → no double moves 
        if (gameOver || cell.textContent) return;
    
        cell.textContent = currentPlayer;
        winner();

        // if cell content is empty
        if (!gameOver) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            turnIndicator.textContent = `Player ${currentPlayer}'s turn`
        }
    });
});

restartButton.addEventListener("click", () => {
    cells.forEach((cell) => {
        cell.textContent = ""; // Clear the content of each cell
    })
    message.textContent = ""; // Clear the message
    message.classList.add("hidden"); // Hide the message
    currentPlayer = "X"; // Reset to starting player
    gameOver = false; // Reset gameOver to false
    turnIndicator.textContent = `Player ${currentPlayer}'s turn`; // Reset the turn indicator
})
