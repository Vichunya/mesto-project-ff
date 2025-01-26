// @todo: Темплейт карточки

//const cards = document.getElementById('card-template');
//const cardsCopy = cards.cloneNode(true);
//const container = document.querySelector();//куда вставить скопированное? 
   // .append(cardsCopy);


// @todo: DOM узлы

const cards = document.querySelector('#card-template').content;
const cardsItems = document.querySelector('.places__item'); 

const cardsCopy = cards.querySelector('.places__item').cloneNode(true);

// вставляем ссылку и название 
cardsCopy.querySelector('.card__image').src = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg';
cardsCopy.querySelector('.card__image').alt = 'Архыз'; 
cardsCopy.querySelector('.card__image').src = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg';
cardsCopy.querySelector('.card__image').alt = 'Челябинская область';
cardsCopy.querySelector('.card__image').src = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg';
cardsCopy.querySelector('.card__image').alt = 'Иваново';
cardsCopy.querySelector('.card__image').src = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg';
cardsCopy.querySelector('.card__image').alt = 'Камчатка';
cardsCopy.querySelector('.card__image').src = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg';
cardsCopy.querySelector('.card__image').alt = 'Холмогорский район';
cardsCopy.querySelector('.card__image').src = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg';
cardsCopy.querySelector('.card__image').alt = 'Байкал';

  //(что тут должно).append(cardsCopy); .places__list cюда ? 

// @todo: Функция создания карточки
const button = document.querySelector('button'); 
button.addEventListener('click', function(){

});

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
