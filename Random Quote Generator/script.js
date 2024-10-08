const quotes = [
    "The best way to predict the future is to create it. - Peter Drucker",
    "You miss 100% of the shots you don’t take. - Wayne Gretzky",
    "Whether you think you can or you think you can’t, you’re right. - Henry Ford",
    "Your time is limited, so don’t waste it living someone else’s life. - Steve Jobs",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "If you are not willing to risk the usual, you will have to settle for the ordinary. - Jim Rohn",
    "Alone we can do so little, together we can do so much. - Helen Keller"
];

function generateQuote() {
    const quoteElement = document.getElementById('quote');
    
    // Issue 3: The quote is sometimes the same when clicking the button multiple times
    // Solution: Ensure that a new quote is picked randomly each time
    let randomIndex = Math.floor(Math.random() * quotes.length);
    
    quoteElement.innerText = quotes[randomIndex];
    
    // Issue 4: No animation or feedback on quote change
    // Solution: Add a simple fade-in animation to the quote
}
