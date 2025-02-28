import '../pages/index.css'; // добавьте импорт главного файла стилей 

import { initialCards } from './cards.js';

const cardTemplate = document.getElementById('card-template');
const content = cardTemplate.content;
const cardList = document.querySelector('.places__list'); // контейнер для карточки 
const modalCard = document.querySelector('.popup_type_image'); // само модальное окно картинки 
const modalImage = modalCard.querySelector('.popup__image'); // картинка в модальном окне
modalCard.classList.add('popup_is-animated');

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
  const card = createCard(cardData, deleteCard, likeCard, openModalImage); //вызов
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
      modal.classList.remove('popup_is-opened'); 
    }
  });

  const closeBtn = modal.querySelector('.popup__close'); //закрытие по кнопке
  closeBtn.addEventListener('click', function () {
    modal.classList.remove('popup_is-opened');
  });

});

// Открытие модального окна 
function openPopup(modal) {
  modal.classList.add('popup_is-opened');
  window.addEventListener('keydown', (event) => {      //закрытие по клавише escape    
    checkEscapeBtn(event, modal);
  });
}

function checkEscapeBtn(event, modal) {   //удаление разработчика по Esc
  if (event.key === 'Escape') {          // встроенное св-во объекта, какая клавиша нажата
    modal.classList.remove('popup_is-opened'); 
    window.removeEventListener('keydown', checkEscapeBtn);
  }
}

// ОТКРЫТИЕ 1 и 2 модальных окон
const openModal = document.querySelector('.popup_type_edit');//попап редактир-я
openModal.classList.add('popup_is-animated');
const editProfileBtn = document.querySelector('.profile__edit-button'); //кнопка редактирования
const openModalNewCard = document.querySelector('.popup_type_new-card');//попап новой карточки
openModalNewCard.classList.add('popup_is-animated');
const addCardBtn = document.querySelector('.profile__add-button'); //кнопка добавления
const formElement = openModal.querySelector('.popup__form'); // Находим форму в DOM
const addForm = openModalNewCard.querySelector('.popup__form');
const nameTitle = document.querySelector('.profile__title'); //Жак-Ив
const editInputName = document.querySelector('.popup__input_type_name');// поле имя 
const jobTitle = document.querySelector('.profile__description');//Исследователь океана
const editJobname = document.querySelector('.popup__input_type_description');//поле занятие

editProfileBtn.addEventListener('click', function () {
  editInputName.value = nameTitle.textContent;//зн-е имени поля = знач-ю Жак-Ив (заголовку)
  editJobname.value = jobTitle.textContent;//зн-е имени занятие = знач-ю Исследователь
  openPopup(openModal);              // Открытие попапа редактирования
});

// Обработчик «отправки» формы для редактирования 
function handleFormSubmit(evt) { //вызовется при нажатии submit сохранить
  evt.preventDefault(); 
  nameTitle.textContent = editInputName.value;//значение Жак-Ив = знач-ю имени поля
  jobTitle.textContent = editJobname.value; //значение Исследователь = знач-ю имени занятие
  openModal.classList.add('popup_is-opened'); 
}
// Прикрепляем обработчик к форме, он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

//ФОРМА ДЛЯ ДОБАВЛЕНИЯ КАРТОЧЕК 
const cardNameInput = document.querySelector('.popup__input_type_card-name'); //поле названия карточки 
const cardUrlInput = document.querySelector('.popup__input_type_url'); //поле ссылки карточки

addCardBtn.addEventListener('click', function () {   //ДОБАВЛЕНИЕ КАРТОЧКИ ПО КЛИКУ
  openPopup(openModalNewCard);      // Открытие попапа добавления карточки 
});

// Обработчик «отправки» формы для добавления карточки 
function addCardSubmit(evt) { //вызовется при нажатии submit сохранить
  evt.preventDefault(); 
  openModalNewCard.classList.add('popup_is-opened'); 
  const cardName = cardNameInput.value;
  const cardUrl = cardUrlInput.value;
  const cardData = {
    name: cardName,
    link: cardUrl,
};
  const card = createCard(cardData, deleteCard, likeCard, openModalImage); //вызов
  cardList.insertBefore(card, cardList.firstChild);  //добавляет созданную карточку в контейнер 
  
  cardNameInput.value = ''; //очистить поле
  cardUrlInput.value = '';
}
// Прикрепляем обработчик к форме, он будет следить за событием “submit” - «отправка»
  addForm.addEventListener('submit', addCardSubmit);


