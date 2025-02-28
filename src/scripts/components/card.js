const cardTemplate = document.getElementById('card-template');
const content = cardTemplate.content;

export function createCard(cardData, deleteHandler, likeHandler, openModalImage) {
  const cardCopy = content.cloneNode(true);
  const cardImage = cardCopy.querySelector('.card__image'); //из конкретной карточки
  const cardTitle = cardCopy.querySelector('.card__title');
  const deleteButton = cardCopy.querySelector('.card__delete-button');
  const likeButton = cardCopy.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;  //устанавливает название карточки 

  deleteButton.addEventListener('click', deleteHandler);
  likeButton.addEventListener('click', likeHandler);
  cardImage.addEventListener('click', openModalImage);


  return cardCopy;
}