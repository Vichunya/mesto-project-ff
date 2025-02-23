import '../pages/index.css'; // добавьте импорт главного файла стилей 

import { initialCards } from './cards.js';

const cardTemplate = document.getElementById('card-template');
const content = cardTemplate.content;
const cardList = document.querySelector('.places__list');
const modalCard = document.querySelector('.popup_type_image'); // само модальное окно картинки 
const modalImage = modalCard.querySelector('.popup__image'); // картинка в модальном окне

function createCard(cardData, deleteHandler, likeHandler, openModalImage) {
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

initialCards.forEach(cardData => {
  const card = createCard(cardData, deleteCard, likeCard, openModalImage);
  cardList.append(card);  //добавляет созданную карточку в контейнер 
});

function deleteCard(event) {
  const listItem = event.target.closest('.places__item');
  listItem.remove();
}

function likeCard(event) {
  const likeButton = event.target;
  likeButton.classList.toggle('card__like-button_is-active');
}

function openModalImage(event) {           //открытие модального окна с картинкой
  const imageSrc = event.target; // сохраняем элемент, по к-му произошло событие (изображение)
  modalImage.src = imageSrc.src;
  openPopup(modalCard);
};

const modals = document.querySelectorAll('.popup'); //закрытие вне окна 
modals.forEach(modal => {
  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  const closeBtn = modal.querySelector('.popup__close'); //закрытие по кнопке
  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });

});

// закрытие по клавише Escape 
function openPopup(modal) {
  modal.style.display = 'flex';  //modal, переиспользовать можно
  window.addEventListener('keydown', (event) => {      //открытие по клавише escape    
    checkEscapeBtn(event, modal);
  });
}

function checkEscapeBtn(event, modal) {   //удаление разработчика по Esc
  if (event.key === 'Escape') {          // встроенное св-во объекта, какая клавиша нажата
    modal.style.display = 'none';
    window.removeEventListener('keydown', checkEscapeBtn);
  }
}

// ОТКРЫТИЕ 1 и 2 модальных окон
const openModal = document.querySelector('.popup_type_edit');
const editProfileBtn = document.querySelector('.profile__edit-button'); //кнопка редактирования
const openModalNewCard = document.querySelector('.popup_type_new-card');
const addCardBtn = document.querySelector('.profile__add-button'); //кнопка добавления

editProfileBtn.addEventListener('click', function () {
  openPopup(openModal);              // Открытие попапа редактирования
});

addCardBtn.addEventListener('click', function () {
  openPopup(openModalNewCard);      // Открытие попапа добавления карточки 
});


// Находим форму в DOM
const formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
console.log(nameInput);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. // Так мы можем определить свою логику отправки.// О том, как это делать, расскажем позже.

  const nameValue = nameInput.value;;// Получите значение полей jobInput и nameInput из свойства value
  const jobValue = jobInput.value;

  // а куда ? document.querySelector('.');// Выберите элементы, куда должны быть вставлены значения полей
  //document.querySelector('.');

  // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);