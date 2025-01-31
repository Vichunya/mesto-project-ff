
const cardTemplate = document.getElementById('card-template');
const content = cardTemplate.content;
const cardList = document.querySelector('.places__list');

function createCard(cardData, deleteHandler) {
    const cardCopy = content.cloneNode(true);
    const cardImage = cardCopy.querySelector('.card__image');
    const cardTitle = cardCopy.querySelector('.card__title');
    const deleteButton = cardCopy.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', deleteHandler);

    return cardCopy;
}

initialCards.forEach(cardData => {
    const card = createCard(cardData, deleteCard);
    cardList.append(card);
});

function deleteCard(event) {
    const listItem = event.target.closest('.places__item');
    listItem.remove();
}






