
const cardTemplate = document.getElementById('card-template');
const content = cardTemplate.content;

function createCard(cardData) {
    const cardCopy = content.cloneNode(true);
    const cardImage = cardCopy.querySelector('.card__image');
    const cardTitle = cardCopy.querySelector('.card__title');
    const deleteButton = cardCopy.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', clickDeleteCard);

    return cardCopy;
}

initialCards.forEach(cardData => {
    const card = createCard(cardData);
    const cardList = document.querySelector('.places__list');
    cardList.append(card);
});

function clickDeleteCard(event) {
    const listItem = event.target.closest('.places__item');
    listItem.remove();
}






