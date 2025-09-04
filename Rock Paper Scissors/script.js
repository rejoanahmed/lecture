// Game variables
let playerScore = 0;
let computerScore = 0;

// Get DOM elements
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const resultText = document.getElementById('result-text');
const playerChoiceElement = document.getElementById('player-choice');
const computerChoiceElement = document.getElementById('computer-choice');
const choiceButtons = document.querySelectorAll('.choice-btn');
const resetButton = document.getElementById('reset-btn');

// Game choices
const choices = ['rock', 'paper', 'scissors'];

// Emoji mapping for display
const choiceEmojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

// Function to get computer's random choice
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to determine the winner
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'tie';
    }
    
    // Rock beats scissors, scissors beats paper, paper beats rock
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'scissors' && computerChoice === 'paper') ||
        (playerChoice === 'paper' && computerChoice === 'rock')
    ) {
        return 'player';
    } else {
        return 'computer';
    }
}

// Function to update the display
function updateDisplay(playerChoice, computerChoice, result) {
    // Update choice displays
    playerChoiceElement.textContent = choiceEmojis[playerChoice];
    computerChoiceElement.textContent = choiceEmojis[computerChoice];
    
    // Update result text
    if (result === 'tie') {
        resultText.textContent = "It's a tie! 🤝";
        resultText.style.color = '#f39c12';
    } else if (result === 'player') {
        resultText.textContent = "You win! 🎉";
        resultText.style.color = '#2ecc71';
    } else {
        resultText.textContent = "Computer wins! 😔";
        resultText.style.color = '#e74c3c';
    }
    
    // Update scores
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
}

// Function to play a round
function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    
    // Update scores
    if (result === 'player') {
        playerScore++;
    } else if (result === 'computer') {
        computerScore++;
    }
    
    // Update display
    updateDisplay(playerChoice, computerChoice, result);
    
    // Check for game end (optional - you can remove this if you want infinite play)
    if (playerScore === 5 || computerScore === 5) {
        setTimeout(() => {
            if (playerScore === 5) {
                resultText.textContent = "🎊 Congratulations! You won the game! 🎊";
                resultText.style.color = '#2ecc71';
            } else {
                resultText.textContent = "💻 Computer won the game! Better luck next time! 💻";
                resultText.style.color = '#e74c3c';
            }
        }, 1000);
    }
}

// Function to reset the game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreElement.textContent = '0';
    computerScoreElement.textContent = '0';
    resultText.textContent = 'Choose your weapon!';
    resultText.style.color = 'white';
    playerChoiceElement.textContent = '❓';
    computerChoiceElement.textContent = '❓';
}

// Add event listeners to choice buttons
choiceButtons.forEach(button => {
    button.addEventListener('click', function() {
        const playerChoice = this.getAttribute('data-choice');
        playRound(playerChoice);
    });
});

// Add event listener to reset button
resetButton.addEventListener('click', resetGame);

// Add some visual feedback when hovering over buttons
choiceButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add keyboard support for accessibility
document.addEventListener('keydown', function(event) {
    if (event.key === '1' || event.key.toLowerCase() === 'r') {
        playRound('rock');
    } else if (event.key === '2' || event.key.toLowerCase() === 'p') {
        playRound('paper');
    } else if (event.key === '3' || event.key.toLowerCase() === 's') {
        playRound('scissors');
    } else if (event.key === ' ' || event.key.toLowerCase() === 'r') {
        resetGame();
    }
});

// Display keyboard instructions
console.log('Keyboard shortcuts:');
console.log('1 or R - Rock');
console.log('2 or P - Paper');
console.log('3 or S - Scissors');
console.log('Space - Reset Game');