document.addEventListener('DOMContentLoaded', () => {
    let scrollInterval;
    const scrollSpeed = 1; // Pixels per frame
    const scrollDelay = 40; // Milliseconds between frames

    // Scroll to the top of the page when loaded
    window.scrollTo(0, 0);

    // Start automatic scrolling from top to bottom
    function startScrolling() {
        scrollInterval = setInterval(() => {
            window.scrollBy(0, scrollSpeed); // Scroll down
            // Stop scrolling when reaching the bottom
            if (window.scrollY >= document.body.scrollHeight - window.innerHeight) {
                clearInterval(scrollInterval);
            }
        }, scrollDelay);
    }

    // Pause scrolling
    function pauseScrolling() {
        clearInterval(scrollInterval);
    }

    // Resume scrolling
    function resumeScrolling() {
        startScrolling();
    }

    // Event listeners for mouse and touch interactions
    document.addEventListener('mousedown', pauseScrolling);
    document.addEventListener('mouseup', resumeScrolling);
    document.addEventListener('touchstart', pauseScrolling);
    document.addEventListener('touchend', resumeScrolling);

    // Start scrolling when the page loads
    startScrolling();
});