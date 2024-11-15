    // Game variables
    let playerScore = 0;
    let computerScore = 0;
    let roundCount = 0;

    // DOM Elements
    const playerScoreElement = document.getElementById('player-score');
    const computerScoreElement = document.getElementById('computer-score');
    const roundCountElement = document.getElementById('round-count');
    const statusElement = document.getElementById('status');
    const finalResultElement = document.getElementById('final-result');
    const restartButton = document.getElementById('restart-btn');

    // Possible choices
    const choices = ['rock', 'paper', 'scissors'];

    // Function to get the computer's choice
    function getComputerChoice() {
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    // Function to determine the round winner
    function determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return 'tie';
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'scissors' && computerChoice === 'paper') ||
            (playerChoice === 'paper' && computerChoice === 'rock')
        ) {
            return 'player';
        } else {
            return 'computer';
        }
    }

    // Update scores and status
    function updateScores(winner) {
        if (winner === 'player') {
            playerScore++;
            playerScoreElement.textContent = playerScore;
            statusElement.textContent = `You win this round!`;
        } else if (winner === 'computer') {
            computerScore++;
            computerScoreElement.textContent = computerScore;
            statusElement.textContent = `Computer wins this round!`;
        } else {
            statusElement.textContent = `It's a tie!`;
        }
    }

    // Handle a round of the game
    function playRound(playerChoice) {
        if (roundCount >= 5) return; // End the game after 5 rounds

        const computerChoice = getComputerChoice();
        const winner = determineWinner(playerChoice, computerChoice);

        updateScores(winner);
        roundCount++;
        roundCountElement.textContent = `${roundCount}`;

        if (roundCount === 5) {
            // Game over, display the final result
            if (playerScore > computerScore) {
                finalResultElement.textContent = 'Congratulations! You win!';
                finalResultElement.classList.add('win');
            } else if (computerScore > playerScore) {
                finalResultElement.textContent = 'Sorry, Computer wins!';
                finalResultElement.classList.add('lose');
            } else {
                finalResultElement.textContent = 'It is a tie game!';
                finalResultElement.classList.add('tie');
            }

            // Show the restart button
            restartButton.style.display = 'inline-block';
        }
    }

    // Attach event listeners to choice buttons
    document.getElementById('rock').addEventListener('click', () => playRound('rock'));
    document.getElementById('paper').addEventListener('click', () => playRound('paper'));
    document.getElementById('scissors').addEventListener('click', () => playRound('scissors'));

    // Restart the game
    restartButton.addEventListener('click', () => {
        // Reset scores and round count
        playerScore = 0;
        computerScore = 0;
        roundCount = 0;

        playerScoreElement.textContent = playerScore;
        computerScoreElement.textContent = computerScore;
        roundCountElement.textContent = `${roundCount}`;

        statusElement.textContent = 'Choose your move!';
        finalResultElement.textContent = '';
        finalResultElement.classList.remove('win', 'lose', 'tie');

        // Hide the restart button
        restartButton.style.display = 'none';
    });