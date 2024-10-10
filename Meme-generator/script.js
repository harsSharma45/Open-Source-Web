const topTextInput = document.getElementById('top-text-input');
const bottomTextInput = document.getElementById('bottom-text-input');
const imageUrlInput = document.getElementById('image-url-input');
const imageFileInput = document.getElementById('image-file-input'); 
const topText = document.getElementById('top-text');
const bottomText = document.getElementById('bottom-text');
const generateMemeBtn = document.getElementById('generate-meme-btn');
const saveMemeBtn = document.getElementById('save-meme-btn');
const memeContainer = document.querySelector('.meme-container');
const canvas = document.getElementById('meme-canvas');
const ctx = canvas.getContext('2d');
const alertRegion = document.createElement('div');

// Set initial canvas size
canvas.width = 800;
canvas.height = 600;

alertRegion.setAttribute('role', 'alert');
alertRegion.setAttribute('aria-live', 'assertive');
alertRegion.setAttribute('style', 'position: absolute; left: -9999px;');
document.body.appendChild(alertRegion);

let topTextHistory = [];
let bottomTextHistory = [];
let historyIndex = -1;

generateMemeBtn.addEventListener('click', generateMeme);
saveMemeBtn.addEventListener('click', saveMeme);
document.addEventListener('keydown', handleKeyDown);

function generateMeme() {
    const topTextValue = topTextInput.value.trim();
    const bottomTextValue = bottomTextInput.value.trim();
    const imageUrlValue = imageUrlInput.value.trim();

    if (!imageUrlValue && !imageFileInput.files.length) {
        alertRegion.textContent = "Please enter an image URL or select an image file.";
        return;
    }

    if (topTextValue && !topTextHistory.includes(topTextValue)) {
        topTextHistory.push(topTextValue);
    }
    if (bottomTextValue && !bottomTextHistory.includes(bottomTextValue)) {
        bottomTextHistory.push(bottomTextValue);
    }

    const img = new Image();
    img.onload = function() {
        memeContainer.style.display = 'block';
        
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, 0, 0);
        
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = canvas.width * 0.004;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        let fontSize = Math.min(Math.max(canvas.width * 0.08, 24), canvas.width * 0.15);
        ctx.font = `bold ${fontSize}px Impact, Arial, sans-serif`;

        // Function to draw text with multiple strokes for better visibility
        function drawText(text, x, y) {
            // Draw multiple outline strokes for better visibility
            for(let i = 0; i < 5; i++) {
                ctx.strokeText(text, x, y);
            }
            // Fill the text
            ctx.fillText(text, x, y);
        }

        // Function to handle text that's too wide
        function fitText(text, maxWidth) {
            let words = text.split(' ');
            let lines = [];
            let currentLine = words[0];

            for(let i = 1; i < words.length; i++) {
                let testLine = currentLine + ' ' + words[i];
                let metrics = ctx.measureText(testLine);
                if (metrics.width > maxWidth * 0.9) {
                    lines.push(currentLine);
                    currentLine = words[i];
                } else {
                    currentLine = testLine;
                }
            }
            lines.push(currentLine);
            return lines;
        }

        // Draw top text
        if (topTextValue) {
            let lines = fitText(topTextValue, canvas.width);
            let lineHeight = fontSize * 1.2;
            let startY = fontSize;
            
            lines.forEach((line, index) => {
                drawText(line, canvas.width / 2, startY + (lineHeight * index));
            });
        }

        // Draw bottom text
        if (bottomTextValue) {
            let lines = fitText(bottomTextValue, canvas.width);
            let lineHeight = fontSize * 1.2;
            let startY = canvas.height - (lineHeight * lines.length) - fontSize/2;
            
            lines.forEach((line, index) => {
                drawText(line, canvas.width / 2, startY + (lineHeight * index));
            });
        }
    };

    if (imageFileInput.files && imageFileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(imageFileInput.files[0]);
    } else if (imageUrlValue) {
        img.src = imageUrlValue;
    } else {
        img.src = 'https://via.placeholder.com/500';
    }

    clearInputs();
}

function saveMeme() {
    const link = document.createElement('a');
    link.download = 'my-meme.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    alertRegion.textContent = "Meme saved to your device.";
}

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
        adjustTextSize(1);
    } else if (event.key === '-') {
        adjustTextSize(-1);
    }
}

function clearInputs() {
    topTextInput.value = '';
    bottomTextInput.value = '';
    imageUrlInput.value = '';
    imageFileInput.value = '';
    alertRegion.textContent = "Input fields cleared.";
    topTextInput.focus();
}

function scrollThroughText(direction) {
    if (direction === 'up') {
        historyIndex = Math.max(historyIndex - 1, 0);
    } else {
        historyIndex = Math.min(historyIndex + 1, topTextHistory.length - 1);
    }

    if (historyIndex >= 0) {
        topTextInput.value = topTextHistory[historyIndex] || '';
        bottomTextInput.value = bottomTextHistory[historyIndex] || '';
    }
}

function adjustTextSize(direction) {
    const currentSize = parseFloat(window.getComputedStyle(topText).fontSize);
    const newSize = direction === 1 ? currentSize + 2 : currentSize - 2;

    topText.style.fontSize = `${newSize}px`;
    bottomText.style.fontSize = `${newSize}px`;

    alertRegion.textContent = `Text size ${direction === 1 ? 'increased' : 'decreased'}.`;
}
