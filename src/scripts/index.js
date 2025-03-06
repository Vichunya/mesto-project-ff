import '../pages/index.css'; // добавьте импорт главного файла стилей 

import { initialCards } from './cards.js';
import { createCard } from './components/card.js';
import { openPopup } from './components/modal.js';
import { closePopup } from './components/modal.js';
import { deleteCard } from './components/card.js';
import { likeCard } from './components/card.js';

const cardList = document.querySelector('.places__list'); // контейнер для карточки 
const modalCard = document.querySelector('.popup_type_image'); // само модальное окно картинки 
const modalImage = modalCard.querySelector('.popup__image'); // картинка в модальном окне
const modalCaption = document.querySelector('.popup__caption'); //подпись под картинкой
modalCard.classList.add('popup_is-animated'); // visibility: hidden 

initialCards.forEach(cardData => {
  const card = createCard(cardData, deleteCard, likeCard, openModalImage); //вызов
  cardList.append(card);  //добавляет созданную карточку в контейнер 
});

function openModalImage(event) {           //открытие модального окна с картинкой
  const imageSrc = event.target; // сохраняем элемент, по к-му произошло событие (изображение)
  modalImage.src = imageSrc.src;
  modalImage.alt = imageSrc.alt; // альт     
  modalCaption.textContent = imageSrc.alt; //подпись под картинкой  

  openPopup(modalCard);
};

const modals = document.querySelectorAll('.popup'); //закрытие вне окна
modals.forEach(modal => {
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            closePopup();
        }
    });

    const closeBtn = modal.querySelector('.popup__close'); //закрытие по кнопке
    closeBtn.addEventListener('click', function () {
        closePopup();
    });
});

// ОТКРЫТИЕ 1 и 2 модальных окон
const profilePopup = document.querySelector('.popup_type_edit');//попап редактир-я
profilePopup.classList.add('popup_is-animated');
const editProfileBtn = document.querySelector('.profile__edit-button'); //кнопка редактирования
const openModalNewCard = document.querySelector('.popup_type_new-card');//попап новой карточки
openModalNewCard.classList.add('popup_is-animated');
const addCardBtn = document.querySelector('.profile__add-button'); //кнопка добавления
const profileForm = profilePopup.querySelector('.popup__form'); // Находим форму в DOM
const addForm = openModalNewCard.querySelector('.popup__form');
const nameTitle = document.querySelector('.profile__title'); //Жак-Ив
const editInputName = document.querySelector('.popup__input_type_name');// поле имя 
const jobTitle = document.querySelector('.profile__description');//Исследователь океана
const editJobname = document.querySelector('.popup__input_type_description');//поле занятие

editProfileBtn.addEventListener('click', function () {
  editInputName.value = nameTitle.textContent;//зн-е имени поля = знач-ю Жак-Ив (заголовку)
  editJobname.value = jobTitle.textContent;//зн-е имени занятие = знач-ю Исследователь
  openPopup(profilePopup);              // Открытие попапа редактирования
});

// Обработчик «отправки» формы для редактирования 
function handleProfileFormSubmit(evt) { //вызовется при нажатии submit сохранить
  evt.preventDefault();
  nameTitle.textContent = editInputName.value;//значение Жак-Ив = знач-ю имени поля
  jobTitle.textContent = editJobname.value; //значение Исследователь = знач-ю имени занятие
  closePopup();
}
// Прикрепляем обработчик к форме редактирования, он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', handleProfileFormSubmit);

//ФОРМА ДЛЯ ДОБАВЛЕНИЯ КАРТОЧЕК 
const cardNameInput = document.querySelector('.popup__input_type_card-name'); //поле названия карточки 
const cardUrlInput = document.querySelector('.popup__input_type_url'); //поле ссылки карточки

addCardBtn.addEventListener('click', function () {   //ДОБАВЛЕНИЕ КАРТОЧКИ ПО КЛИКУ
  openPopup(openModalNewCard);      // Открытие попапа добавления карточки 
});

// Обработчик «отправки» формы для добавления карточки 
function addCardSubmit(evt) { //вызовется при нажатии submit сохранить
  evt.preventDefault();
  closePopup();
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


