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

    let randomIndex = generateRandomIndex();
    while (randomIndex === LAST_QUOTE_INDEX) {
        randomIndex = generateRandomIndex();
    }
    LAST_QUOTE_INDEX = randomIndex;

    quoteElement.innerText = quotes[randomIndex];

    // Issue 4: No animation or feedback on quote change
    // Solution: Add a simple fade-in animation to the quote
}
