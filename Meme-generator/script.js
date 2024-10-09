const ArrayOfIds = [];
const storingAllMemeIds = async() => {
    try {
        const response = await axios.get('https://api.imgflip.com/get_memes');
        await response.data.data.memes.map((meme, index) => {
            ArrayOfIds.push(meme.id);
        })
        console.log(ArrayOfIds);
    } catch (error) {
        console.log(error.message);
    }
}


const generateMeme = async (e) => {
    e.preventDefault();

    const topText = document.getElementById('top-text-input').value;
    const bottomText = document.getElementById('bottom-text-input').value;
    const randomIndex = Math.floor(Math.random() * ArrayOfIds.length);
    const templateId = ArrayOfIds[randomIndex];
    const username = 'HYDRAFERD';
    const password = 'hacktoberfest';

    try {
        const response = await axios.post('https://api.imgflip.com/caption_image', null, {
            params: {
                template_id: templateId,
                username: username,
                password: password,
                text0: topText,
                text1: bottomText
            }
        });

        if (response.data.success) {
            document.getElementsByClassName('meme-img')[0].src = response.data.data.url;
        } else {
            alert('Failed to create meme:', response.data.error_message);
        }
    } catch (error) {
        console.error('Error making API request:', error.message);
    }
}

const button = document.getElementsByClassName('generateButton');
console.log(button);

button[0].addEventListener('click', generateMeme);

storingAllMemeIds();
