document.addEventListener('DOMContentLoaded', function(){
    const toggleButton = document.querySelector(".drop-toggle");
    const dropContent = document.querySelector(".drop-content");

    toggleButton.addEventListener('click',function(){
        dropContent.classList.toggle('open');
    })
})