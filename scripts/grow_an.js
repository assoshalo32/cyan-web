const texts = document.querySelectorAll('.text');
const addText = document.querySelectorAll('.add-text');
const backButton = document.getElementById('back-button');

let selectedText;

texts.forEach((text, index) => {
    text.addEventListener('click', () => {
        selectedText = text;
        texts.forEach((t, i) => {
            if (t !== text) {
                t.classList.add('disappear');
                addText[i].classList.remove('show');
            }
        });
        text.classList.add('grow-animation');
        addText[index].classList.add('show');
        backButton.style.display = 'block';
    });
});

backButton.addEventListener('click', () => {
    if (selectedText) {
        selectedText.classList.remove('grow-animation');
        const classes = ['slide1', 'slide2', 'slide3', 'slide4', 'slide5'];
        classes.forEach((el) => {
            selectedText.classList.remove(el);
        });
    }
    texts.forEach((text, i) => {
        text.classList.remove('disappear');
        text.classList.add('fadein');
        const classes = ['slide1', 'slide2', 'slide3', 'slide4', 'slide5'];
        classes.forEach((el) => {
            text.classList.remove(el);
        });
        addText[i].classList.remove('show');
    });
    backButton.style.display = 'none';
});