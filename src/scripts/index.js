import '../pages/index.css'; // добавьте импорт главного файла стилей 

import { initialCards } from './cards.js';
import { createCard } from './components/card.js';
import { openPopup } from './components/modal.js';
import { closePopup } from './components/modal.js';
import { deleteCard } from './components/card.js';
import { likeCard } from './components/card.js';
import { isValid } from './components/validation.js';
import { hideInputError } from './components/validation.js';

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
  clearValidation(profilePopup, enableValidationObject);
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
  cardNameInput.value = ''; //очистить поле
  cardUrlInput.value = '';
  clearValidation(openModalNewCard, enableValidationObject);
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

const setEventListeners = (formElement, settings) => {  //formElement - форма //эта ф-я ищет все инпуты
  // Находим все поля внутри формы
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector)); //инпуты
  const buttonElement = formElement.querySelector(settings.submitButtonSelector) // кнопка отправки 
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {          //inputElement - инпут 
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => { //Навесили на все инпуты обработчик 
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      // проверяем, есть ли значение в data-error-message 
      //const stroka = 'word.lenght';
      console.log('!!!!!!!!');
      //console.log(stroka.length);
      console.log(inputElement.value.length > 2 );
      if (inputElement.dataset.errorMessage && inputElement.value.length >= 2) {
        validateSymbols(inputElement); //ф-я регулярного выражения 
      } 
      isValid(formElement, inputElement);  // перед ней надо вызвать ф-ю регулярного выр-я, написать в инпут месседж
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function validateSymbols(inputElement) {
  const namePattern = /^[a-zA-Zа-яА-ЯёЁ\- ]+$/;
  if (!namePattern.test(inputElement.value)) {
    console.log('регулярное выражение не проверилось');
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  };
  //else {         
    //inputElement.setCustomValidity("");
  //};
  
}

const enableValidation = (settings) => {  //ищет все формы // Вызов setEventListeners
  // Найдём все формы 
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы ВЫЗОВЕМ функцию setEventListeners, 
    // передав ей элемент формы
    setEventListeners(formElement, settings); //settings - это псевдоним
  });
};

const enableValidationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_visible'
};

// Вызовем функцию
enableValidation(enableValidationObject); // смотрит наличие всех форм 

// Функция принимает массив полей ввода              // Блокировка кнопки 
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {      //hasInvalidInput вызывается на 138 ? 
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add('form__submit_inactive');
    buttonElement.classList.remove('popup__button_active');
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove('form__submit_inactive');
  }
};

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  console.log(inputList);
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

const clearValidation = (formElement, settings) => { // очищает ошибки валидации формы и делает кнопку неактивной 
  const inputList = formElement.querySelectorAll(settings.inputSelector); //инпуты 
  console.log(inputList);
  const submitButton = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach((inputElement) => {
    delete inputElement.dataset.error; // удаляет сообщение об ошибке 
    hideInputError(formElement, inputElement);
    console.log(inputElement.classList);
  });

  if (submitButton) {
    submitButton.disabled = true; // Делаем кнопку неактивной
  }
}

