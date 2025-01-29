// @todo: Темплейт карточки

const cardTemplate = document.getElementById('card-template');
const content = cardTemplate.content; 

for (let i = 0; i < initialCards.length; i += 1) {
    console.log(initialCards[i].name);
    
    const cardCopy = content.cloneNode(true); 
    cardCopy.querySelector('.card__image').src = initialCards[i].link;
    cardCopy.querySelector('.card__image').alt = initialCards[i].name; 
    cardCopy.querySelector('.card__title').textContent = initialCards[i].name; 
    const cardList = document.querySelector('.places__list'); 
    console.log(cardList);
    cardList.append(cardCopy);
}
// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

const buttons = document.querySelector('card__delete-button'); //выбираем кнопки удаления
const cardLink = initialCards[i].link; // выбираем ссылки 
const cardName = initialCards[i].name; // выбираем названия 
function cardClick(event) {           // что писать вместо event ? 
    сardLink.remove;                 // функция удаляет карточку, если нажимают на кнопку 
    cardName.remove; }

buttons.addEventListener('click', function(cardClick) {
    if (event.target)      // а что записать в if ? 
    console.log(cardClick);
 });

 // надо ли после клика removeEventListener('click', cardClick) ? 


// @todo: Вывести карточки на страницу
