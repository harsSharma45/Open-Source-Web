const topTextInput = document.getElementById('top-text-input');
const bottomTextInput = document.getElementById('bottom-text-input');
const imageUrlInput = document.getElementById('image-url-input');
const generateMemeBtn = document.getElementById('generate-meme-btn');
const topText = document.getElementById('top-text');
const bottomText = document.getElementById('bottom-text');
const memeImage = document.getElementById('meme-image');
const alertRegion = document.createElement('div'); // for accessible alerts

// Set up alert region
alertRegion.setAttribute('role', 'alert');
alertRegion.setAttribute('aria-live', 'assertive');
alertRegion.setAttribute('style', 'position: absolute; left: -9999px;');
document.body.appendChild(alertRegion);

// Variables to store previous text inputs
let topTextHistory = [];
let bottomTextHistory = [];
let historyIndex = -1;

generateMemeBtn.addEventListener('click', generateMeme);
document.addEventListener('keydown', handleKeyDown);

// Function to generate meme
function generateMeme() {
    const topTextValue = topTextInput.value.trim();
    const bottomTextValue = bottomTextInput.value.trim();
    const imageUrlValue = imageUrlInput.value.trim();

    // Validate inputs
    if (!imageUrlValue) {
        alertRegion.textContent = "Please enter an image URL.";
        return; // stop execution if URL is empty
    }

    // Save to history
    if (topTextValue && !topTextHistory.includes(topTextValue)) {
        topTextHistory.push(topTextValue);
    }
    if (bottomTextValue && !bottomTextHistory.includes(bottomTextValue)) {
        bottomTextHistory.push(bottomTextValue);
    }

    topText.textContent = topTextValue || 'Top Text';
    bottomText.textContent = bottomTextValue || 'Bottom Text';
    memeImage.src = imageUrlValue || 'https://via.placeholder.com/500';

    // Reset input fields
    topTextInput.value = '';
    bottomTextInput.value = '';
    imageUrlInput.value = '';

    // Focus back to top text input for convenience
    topTextInput.focus();
}

// Function to handle keyboard events
function handleKeyDown(event) {
    if (event.key === 'Enter') {
        generateMemeBtn.click();
    } else if (event.key === 'Escape') {
        clearInputs();
    } else if (event.key === 'ArrowUp') {
        scrollThroughText('up');
    } else if (event.key === 'ArrowDown') {
        scrollThroughText('down');
    } else if (event.key === '+') {
        adjustTextSize(1); // Increase size
    } else if (event.key === '-') {
        adjustTextSize(-1); // Decrease size
    }
}

// Function to scroll through previous text inputs
function scrollThroughText(direction) {
    if (direction === 'up') {
        historyIndex = Math.max(historyIndex - 1, 0);
    } else {
        historyIndex = Math.min(historyIndex + 1, topTextHistory.length - 1);
    }

    // Update input fields if there's history
    if (historyIndex >= 0) {
        topTextInput.value = topTextHistory[historyIndex] || '';
        bottomTextInput.value = bottomTextHistory[historyIndex] || '';
    }
}

// Function to clear input fields
function clearInputs() {
    topTextInput.value = '';
    bottomTextInput.value = '';
    imageUrlInput.value = '';
    alertRegion.textContent = "Input fields cleared.";
    topTextInput.focus();
}

// Function to adjust text size
function adjustTextSize(direction) {
    const currentSize = parseFloat(window.getComputedStyle(topText).fontSize);
    const newSize = direction === 1 ? currentSize + 2 : currentSize - 2;

    // Update text size for both top and bottom text
    topText.style.fontSize = `${newSize}px`;
    bottomText.style.fontSize = `${newSize}px`;

    alertRegion.textContent = `Text size ${direction === 1 ? 'increased' : 'decreased'}.`;
}

