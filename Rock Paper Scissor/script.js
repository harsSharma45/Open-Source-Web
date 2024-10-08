
const computer = document.querySelector(".buttonn-text")
function playGame(playerChoice) {
    const resultElement = document.getElementById('result');
    
    const choices = ['🪨 rock', '📄 paper', '✂️ scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    computer.innerHTML=`${computerChoice}`
    
    // Issue 2: Computer always seems to win
    // Solution: Fix the logic for determining the winner

    // Determine the winner
    let result;
    if (playerChoice === computerChoice) {
        result = "It's a tie!";
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = "You win!";
    } else {
        result = "Computer wins!";
    }
    
    // Issue 3: No feedback about the computer's choice
    // Solution: Display the computer's choice along with the result

    // Update the result on the screen
    resultElement.innerText = result;

    // Issue 4: No restart button or option to play again
    // Solution: Add a button or feature to restart the game or play again
}
