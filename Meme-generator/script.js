const topTextInput = document.getElementById('top-text-input');
const bottomTextInput = document.getElementById('bottom-text-input');
const imageUrlInput = document.getElementById('image-url-input');
const imageFileInput = document.getElementById('image-file-input');  // New input element for file uploads
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

    if (imageFileInput.files && imageFileInput.files[0]) {
        // Load local image if a file is selected
        const reader = new FileReader();
        reader.onload = function (e) {
            memeImage.src = e.target.result;
        };
        reader.readAsDataURL(imageFileInput.files[0]);
    } else if (imageUrlValue) {
        // If URL is provided, use it
        memeImage.src = imageUrlValue;
    } else {
        // Default placeholder image if neither URL nor file is provided
        memeImage.src = 'https://via.placeholder.com/500';
    }

    // Clear inputs
    topTextInput.value = '';
    bottomTextInput.value = '';
    imageUrlInput.value = '';
    imageFileInput.value = '';  // Reset file input
});
