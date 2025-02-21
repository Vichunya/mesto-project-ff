import '../pages/index.css'; // добавьте импорт главного файла стилей 

import {initialCards} from './cards.js';

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
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', deleteHandler);
    likeButton.addEventListener('click', likeHandler); 
    cardImage.addEventListener('click', openModalImage); 
    

    return cardCopy;
}

initialCards.forEach(cardData => {
    const card = createCard(cardData, deleteCard, likeCard, openModalImage);
    cardList.append(card);
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
   const imageSrc = event.target; 
   console.log(imageSrc.src);
   modalImage.src = imageSrc.src;
   modalCard.style.display = 'flex';
};

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

//модальное окно для кнопки добавления  
const openModalNewCard = document.querySelector('.popup_type_new-card');
const addCardBtn = document.querySelector('.profile__add-button'); //кнопка добавления
console.log(addCardBtn);
addCardBtn.addEventListener('click', function() {
    openModalNewCard.style.display = 'flex';
});


// Модальное окно для карточки: 
//.popup_type_image - модальное окно 
//.card__image - картинка
//.popup__image - класс картинки в модальном окне  

//const modalCard = document.querySelector('.popup_type_image'); // само модальное окно картинки 
//const modalImage = modalCard.querySelector('.popup__image'); // картинка в модальном окне

//const images = document.querySelectorAll('.card__image'); // по всем картинкам проходит 
//images.forEach((image)=> {
   // image.addEventListener('click', openModalImage); //внутрь метода положить
//});

//function openModalImage(event) {           //открытие модального окна с картинкой
    //const imageSrc = event.target; 
   // console.log(imageSrc.src);
   // modalImage.src = imageSrc.src;
    //modalCard.style.display = 'flex';
//};

// ОТКРЫТИЕ 1 и 2 модальных окон
//const openModal = document.querySelector('.popup_type_edit');
//const editProfileBtn = document.querySelector('.profile__edit-button'); //кнопка редактирования
//const openModalNewCard = document.querySelector('.popup_type_new-card');
//const addCardBtn = document.querySelector('.profile__add-button'); //кнопка добавления

//function openPopup(openModal, openModalNewCard) {
   // openModal.style.display = 'flex';
    //openModalNewCard.style.display = 'flex';
//}
//editProfileBtn.addEventListener('click', function() {
   // openPopup(openModal);              // Открытие попапа редактирования
//}); 

//addCardBtn.addEventListener('click', function() {
  // openPopup(openModalNewCard);
//});



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