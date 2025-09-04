// Game variables
let secretNumber;
let guessesLeft;
let previousGuesses = [];
let gameActive = true;

// DOM elements
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const feedback = document.getElementById('feedback');
const guessesLeftDisplay = document.getElementById('guessesLeft');
const previousGuessesDisplay = document.getElementById('previousGuesses');
const newGameButton = document.getElementById('newGameButton');
const hintButton = document.getElementById('hintButton');

// Initialize the game
function initGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    guessesLeft = 10;
    previousGuesses = [];
    gameActive = true;
    
    // Reset display
    feedback.innerHTML = '<p>Take a guess!</p>';
    feedback.className = 'feedback';
    guessesLeftDisplay.textContent = guessesLeft;
    previousGuessesDisplay.textContent = '';
    guessInput.value = '';
    guessInput.disabled = false;
    guessButton.disabled = false;
    newGameButton.style.display = 'none';
    
    console.log('Secret number:', secretNumber); // For debugging
}

// Check the player's guess
function checkGuess() {
    if (!gameActive) return;
    
    const guess = parseInt(guessInput.value);
    
    // Validate input
    if (isNaN(guess) || guess < 1 || guess > 100) {
        feedback.innerHTML = '<p>Please enter a number between 1 and 100!</p>';
        feedback.className = 'feedback';
        return;
    }
    
    // Check if already guessed
    if (previousGuesses.includes(guess)) {
        feedback.innerHTML = '<p>You already guessed that number! Try a different one.</p>';
        feedback.className = 'feedback';
        return;
    }
    
    // Add to previous guesses
    previousGuesses.push(guess);
    previousGuessesDisplay.textContent = previousGuesses.join(', ');
    
    // Decrease guesses left
    guessesLeft--;
    guessesLeftDisplay.textContent = guessesLeft;
    
    // Check if correct
    if (guess === secretNumber) {
        feedback.innerHTML = `<p>🎉 Congratulations! You guessed it right! The number was ${secretNumber}.</p>`;
        feedback.className = 'feedback correct';
        gameActive = false;
        guessInput.disabled = true;
        guessButton.disabled = true;
        newGameButton.style.display = 'inline-block';
    } else if (guessesLeft === 0) {
        feedback.innerHTML = `<p>😔 Game Over! The secret number was ${secretNumber}. Better luck next time!</p>`;
        feedback.className = 'feedback game-over';
        gameActive = false;
        guessInput.disabled = true;
        guessButton.disabled = true;
        newGameButton.style.display = 'inline-block';
    } else {
        // Give feedback
        if (guess > secretNumber) {
            feedback.innerHTML = '<p>📈 Too high! Try a lower number.</p>';
            feedback.className = 'feedback too-high';
        } else {
            feedback.innerHTML = '<p>📉 Too low! Try a higher number.</p>';
            feedback.className = 'feedback too-low';
        }
    }
    
    // Clear input
    guessInput.value = '';
    guessInput.focus();
}

// Provide a hint
function giveHint() {
    if (!gameActive) return;
    
    const hint = Math.floor(secretNumber / 10) * 10;
    feedback.innerHTML = `<p>💡 Hint: The number is between ${hint} and ${hint + 9}.</p>`;
    feedback.className = 'feedback';
}

// Handle Enter key press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
}

// Event listeners
guessButton.addEventListener('click', checkGuess);
newGameButton.addEventListener('click', initGame);
hintButton.addEventListener('click', giveHint);
guessInput.addEventListener('keypress', handleKeyPress);

// Focus on input when page loads
guessInput.focus();

// Initialize the game when page loads
initGame();