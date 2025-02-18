
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

import '../pages/index.css'; // добавьте импорт главного файла стилей 

import {initialCards} from './cards.js';

const openModal = document.querySelector('.popup_type_edit');
const editProfileBtn = document.querySelector('.profile__edit-button'); //кнопка редактирования
console.log(editProfileBtn);
editProfileBtn.addEventListener('click', function() {
    openModal.style.display = 'flex';
});

const closeBtn = openModal.querySelector('.popup__close'); 
closeBtn.addEventListener('click', function() {
    openModal.style.display = 'none';
});
// закрытие вне модального окна
window.addEventListener('click', function(event) {
    if (event.target === openModal) {
      openModal.style.display = 'none';
    }
  });

  // закрытие по клавише Escape 
  function checkEscapeBtn(event) {
    if (event.key === 'Escape') {          // встроенное св-во объекта, какая клавиша нажата
        openModal.style.display = 'none';
        window.removeEventListener('keydown', checkEscapeBtn);  
    }
}
  // Добавляем обработчик при открытии окна //А зачем добавлять отдельно для ESC ?
  editProfileBtn.addEventListener('click', function() {
    openModal.style.display = 'flex';
    window.addEventListener('keydown', checkEscapeBtn); 
});

//модальное окно для кнопки добавления  // тут ошибка 
const openModalNewCard = document.querySelector('popup_type_new-card');
const addCardBtn = document.querySelector('.profile__add-button'); //кнопка добавления
addCardBtn.addEventListener('click', function() {
    openModalNewCard.style.display = 'flex';
});

// Лайк, когда внесла лайк в ф-ю создания карточки, они удалились
// Вообще не работает 

//const likeButton = cardCopy.querySelector('.card__like-button'); кнопка лайка
//likeButton.addEventListener('click', likeHandler); лайк обработчик
//function likeHandler(event) {
   // const likeButton = event.target;  
   // likeButton.classList.toggle('.card__like-button');  
//}

