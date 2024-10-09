const quotes = [
    "The best way to predict the future is to create it. - Peter Drucker",
    "You miss 100% of the shots you don’t take. - Wayne Gretzky",
    "Whether you think you can or you think you can’t, you’re right. - Henry Ford",
    "Your time is limited, so don’t waste it living someone else’s life. - Steve Jobs",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "If you are not willing to risk the usual, you will have to settle for the ordinary. - Jim Rohn"
];

let LAST_QUOTE_INDEX = -1; //to keep track of last quote.

function generateRandomIndex() {
    return Math.floor(Math.random() * quotes.length)
}

function generateQuote() {
    const quoteElement = document.getElementById('quote');



    // Issue 4: No animation or feedback on quote change
    // Solution: Add a simple fade-in animation to the quote
    // Remove any existing fade-in-active class to reset animation
    // Reset the opacity by removing the fade-in-active class
        // Remove fade-out and add fade-in class to trigger fade-in effect

    quoteElement.classList.remove('fade-in');
    quoteElement.classList.add('fade-out');
        
    // After the fade-out completes, update the quote and fade it back in
    setTimeout(() => {
        let randomIndex = generateRandomIndex();
        while (randomIndex === LAST_QUOTE_INDEX) {
            randomIndex = generateRandomIndex();
        }
        LAST_QUOTE_INDEX = randomIndex;
    
        // Change the quote text
        quoteElement.innerText = quotes[randomIndex];
    
        // Remove fade-out and add fade-in class to trigger fade-in effect
        quoteElement.classList.remove('fade-out');
        quoteElement.classList.add('fade-in');
    }, 500);
        
}
