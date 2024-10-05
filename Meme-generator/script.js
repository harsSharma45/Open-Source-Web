const topTextInput = document.getElementById('top-text-input');
const bottomTextInput = document.getElementById('bottom-text-input');
const imageUrlInput = document.getElementById('image-url-input');
const generateMemeBtn = document.getElementById('generate-meme-btn');
const topText = document.getElementById('top-text');
const bottomText = document.getElementById('bottom-text');
const memeImage = document.getElementById('meme-image');

generateMemeBtn.addEventListener('click', () => {
    const topTextValue = topTextInput.value.trim();
    const bottomTextValue = bottomTextInput.value.trim();
    const imageUrlValue = imageUrlInput.value.trim();

    topText.textContent = topTextValue || 'Top Text';
    bottomText.textContent = bottomTextValue || 'Bottom Text';
    memeImage.src = imageUrlValue || 'https://via.placeholder.com/500';

    topTextInput.value = '';
    bottomTextInput.value = '';
    imageUrlInput.value = '';
});
