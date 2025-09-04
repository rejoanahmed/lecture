// Game state variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let gameMode = 'pvp'; // 'pvp' for Player vs Player, 'pvc' for Player vs Computer

// Get DOM elements
const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('current-player');
const messageDisplay = document.getElementById('message');
const resetButton = document.getElementById('reset-btn');
const gameModeSelect = document.getElementById('game-mode');

// Winning combinations
const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
];

// Function to handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-index'));
    
    // Check if cell is already filled or game is not active
    if (gameBoard[cellIndex] !== '' || !gameActive) {
        return;
    }
    
    // Make the move
    makeMove(cellIndex, currentPlayer);
    
    // Check for win or tie
    if (checkWin()) {
        gameActive = false;
        if (gameMode === 'pvc' && currentPlayer === 'O') {
            messageDisplay.textContent = "Computer wins!";
        } else {
            messageDisplay.textContent = `Player ${currentPlayer} wins!`;
        }
        messageDisplay.classList.add('win');
        return;
    }
    
    if (checkTie()) {
        gameActive = false;
        messageDisplay.textContent = "It's a tie!";
        messageDisplay.classList.add('tie');
        return;
    }
    
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerDisplay.textContent = currentPlayer;
    
    // If playing against computer and it's computer's turn
    if (gameMode === 'pvc' && currentPlayer === 'O' && gameActive) {
        setTimeout(() => {
            makeComputerMove();
        }, 500); // Small delay to make it feel more natural
    }
}

// Function to make a move on the board
function makeMove(index, player) {
    gameBoard[index] = player;
    const cell = cells[index];
    cell.textContent = player;
    cell.classList.add(player.toLowerCase());
}

// Function to make computer move using minimax algorithm
function makeComputerMove() {
    if (!gameActive) return;
    
    // Show that computer is thinking
    messageDisplay.textContent = "Computer is thinking...";
    
    // Use minimax to find best move
    const bestMove = getBestMove();
    
    // Make the move
    makeMove(bestMove, 'O');
    
    // Check for win or tie
    if (checkWin()) {
        gameActive = false;
        messageDisplay.textContent = "Computer wins!";
        messageDisplay.classList.add('win');
        return;
    }
    
    if (checkTie()) {
        gameActive = false;
        messageDisplay.textContent = "It's a tie!";
        messageDisplay.classList.add('tie');
        return;
    }
    
    // Switch back to human player
    currentPlayer = 'X';
    currentPlayerDisplay.textContent = currentPlayer;
    messageDisplay.textContent = '';
}

// Minimax algorithm implementation
function minimax(board, depth, isMaximizing) {
    // Check terminal states
    if (checkWinForPlayer(board, 'O')) {
        return 10 - depth; // Computer wins
    }
    if (checkWinForPlayer(board, 'X')) {
        return depth - 10; // Human wins
    }
    if (isBoardFull(board)) {
        return 0; // Tie
    }
    
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

// Function to get the best move using minimax
function getBestMove() {
    let bestScore = -Infinity;
    let bestMove = 0;
    
    for (let i = 0; i < 9; i++) {
        if (gameBoard[i] === '') {
            gameBoard[i] = 'O';
            let score = minimax(gameBoard, 0, false);
            gameBoard[i] = '';
            
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    
    return bestMove;
}

// Function to check for a win for a specific player
function checkWinForPlayer(board, player) {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] === player && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

// Function to check if board is full
function isBoardFull(board) {
    return board.every(cell => cell !== '');
}

// Function to check for a win
function checkWin() {
    return checkWinForPlayer(gameBoard, currentPlayer);
}

// Function to check for a tie
function checkTie() {
    return gameBoard.every(cell => cell !== '');
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    
    // Clear all cells
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    
    // Reset display
    currentPlayerDisplay.textContent = currentPlayer;
    messageDisplay.textContent = '';
    messageDisplay.classList.remove('win', 'tie');
}

// Function to handle game mode change
function handleGameModeChange() {
    gameMode = gameModeSelect.value;
    resetGame();
    
    if (gameMode === 'pvc') {
        messageDisplay.textContent = "You are X, Computer is O. You go first!";
    } else {
        messageDisplay.textContent = '';
    }
}

// Add event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
gameModeSelect.addEventListener('change', handleGameModeChange);