function selectBot(botName, prefix) {
    const buttons = document.querySelectorAll('.prefix-button');
    const prefixText = document.getElementById('prefix-text');
    const botSelection = document.getElementById('bot-selection');
    buttons.forEach(button => button.style.display = 'none');
    prefixText.style.display = 'block';
    prefixText.style.fontWeight = 'bold';
    prefixText.textContent = `Prefix: ${prefix}`;
    botSelection.textContent = botName;
    botSelection.classList.remove('fadein');
    void botSelection.offsetWidth;
    botSelection.textContent = botName;
    botSelection.classList.add('fadein');
    botSelection.style.cursor = 'text';
}