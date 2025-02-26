import '../pages/index.css'; // добавьте импорт главного файла стилей 

import { initialCards } from './cards.js';

const cardTemplate = document.getElementById('card-template');
const content = cardTemplate.content;
const cardList = document.querySelector('.places__list'); // контейнер для карточки 
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
const openModal = document.querySelector('.popup_type_edit');//попап редактир-я
const editProfileBtn = document.querySelector('.profile__edit-button'); //кнопка редактирования
const openModalNewCard = document.querySelector('.popup_type_new-card');//попап новой карточки
const addCardBtn = document.querySelector('.profile__add-button'); //кнопка добавления
const formElement = document.querySelector('.popup__form'); // Находим форму в DOM
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
  openModal.style.display = 'none';
}
// Прикрепляем обработчик к форме, он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

//ФОРМА ДЛЯ ДОБАВЛЕНИЯ КАРТОЧЕК 
const cardNameInput = formElement.querySelector('.popup__input_type_card-name'); //поле названия карточки 
const cardUrlInput = formElement.querySelector('.popup__input_type_url'); //поле ссылки карточки
const cardNameValue = cardNameInput.value; // значение из поля названия ПЕРЕДАТЬ В CREATECARD (first параметр)
const cardUrlValue = cardUrlInput.value;  //значение из поля ссылки 

addCardBtn.addEventListener('click', function () {   //ДОБАВЛЕНИЕ КАРТОЧКИ ПО КЛИКУ
  openPopup(openModalNewCard);      // Открытие попапа добавления карточки 
  const newCard = document.createElement('div'); // Создание новой карточки 
  newCard.classList.add('popup_type_new-card'); // добавление класса новой карточке  
  // newCard.textContent = 'Новое место'; // название карточки надо ?
});

// Обработчик «отправки» формы для добавления карточки 
function addCardSubmit(evt) { //вызовется при нажатии submit сохранить
  evt.preventDefault(); 
  openModal.style.display = 'none';
  cardList.insertbefore(newCard, cardList.firstChild) //первая в списке 
  cardNameInput.value = ''; //очистить поле
  cardUrlInput.value = '';
}
// Прикрепляем обработчик к форме, он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', addCardSubmit);


