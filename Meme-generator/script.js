const topTextInput = document.getElementById('top-text-input');
const bottomTextInput = document.getElementById('bottom-text-input');
const imageUrlInput = document.getElementById('image-url-input');
const imageFileInput = document.getElementById('image-file-input'); 
const generateMemeBtn = document.getElementById('generate-meme-btn');
const topText = document.getElementById('top-text');
const bottomText = document.getElementById('bottom-text');
const memeImage = document.getElementById('meme-image');
const alertRegion = document.createElement('div'); 

alertRegion.setAttribute('role', 'alert');
alertRegion.setAttribute('aria-live', 'assertive');
alertRegion.setAttribute('style', 'position: absolute; left: -9999px;');
document.body.appendChild(alertRegion);

let topTextHistory = [];
let bottomTextHistory = [];
let historyIndex = -1;

generateMemeBtn.addEventListener('click', generateMeme);
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

    topText.textContent = topTextValue || 'Top Text';
    bottomText.textContent = bottomTextValue || 'Bottom Text';

    if (imageFileInput.files && imageFileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            memeImage.src = e.target.result;
        };
        reader.readAsDataURL(imageFileInput.files[0]);
    } else if (imageUrlValue) {
        memeImage.src = imageUrlValue;
    } else {
        memeImage.src = 'https://via.placeholder.com/500';
    }

    topTextInput.value = '';
    bottomTextInput.value = '';
    imageUrlInput.value = '';
    imageFileInput.value = ''; 

    topTextInput.focus();
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

function clearInputs() {
    topTextInput.value = '';
    bottomTextInput.value = '';
    imageUrlInput.value = '';
    alertRegion.textContent = "Input fields cleared.";
    topTextInput.focus();
}

function adjustTextSize(direction) {
    const currentSize = parseFloat(window.getComputedStyle(topText).fontSize);
    const newSize = direction === 1 ? currentSize + 2 : currentSize - 2;

    topText.style.fontSize = `${newSize}px`;
    bottomText.style.fontSize = `${newSize}px`;

    alertRegion.textContent = `Text size ${direction === 1 ? 'increased' : 'decreased'}.`;
}

// const url = 'https://meme-generator-and-template-database.p.rapidapi.com/template/Bernie_I_Am_Once_Again_Asking_For_Your_Support';
// const options = {
// 	method: 'POST',
// 	headers: {
// 		'x-rapidapi-key': 'Sign Up for Key',
// 		'x-rapidapi-host': 'meme-generator-and-template-database.p.rapidapi.com',
// 		'Content-Type': 'application/json'
// 	},
// 	body: {
// 		text0: {
// 			text: 'for your financial support',
// 			font_size: 33,
// 			font: 'kanit'
// 		},
// 		text1: {
// 			text: 'This API developer:',
// 			font_size: 30
// 		}
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }
