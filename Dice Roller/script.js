function rollDice() {
    const dice = document.getElementById('dice');
    const result = document.getElementById('result');
    let number = Math.floor(Math.random() * 6) + 1;
    result.innerText = `You rolled a ${number}`;
    
    // Issue 3: The dice icon doesn't update based on the rolled number
    // Solution: Update the dice icon to match the rolled number
    switch(number) {
        case 1:
            dice.innerText = '🎲';
            break;
        case 2:
            dice.innerText = '🎲';
            break;
        case 3:
            dice.innerText = '🎲';
            break;
        case 4:
            dice.innerText = '🎲';
            break;
        case 5:
            dice.innerText = '🎲';
            break;
        case 6:
            dice.innerText = '🎲';
            break;
        default:
            dice.innerText = '🎲';
    }

    // Issue 4: No animation when rolling the dice
    // Solution: Add a simple animation effect
}
