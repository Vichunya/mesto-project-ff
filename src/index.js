
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

console.log('Hello, World!')

// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
import firstImage from '../images/card_1.jpg';
import secondImage from '../images/card_2.jpg';
import thirdImage from '../images/card_3.jpg';

const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'First Image', link: firstImage },
  { name: 'Second Image', link: secondImage },
  { name: 'Third Image', link: thirdImage },
];

//import './styles/index.css'; // добавьте импорт главного файла стилей 

