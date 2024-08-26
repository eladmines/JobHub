export function hideLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
}


export function checkForCard() {
    const card = document.querySelector('.card.shadow.mb-4');
    if (card) {
        hideLoader();
    } else {
        // Check again in 500 milliseconds if the element is not yet present
        setTimeout(checkForCard, 500);
    }
}
