// @todo: Темплейт карточки

const cardTemplate = document.getElementById('card-template');
const content = cardTemplate.content; 

for (let i = 0; i < initialCards.length; i += 1) {
    console.log(initialCards[i].name);
    
    const cardCopy = content.cloneNode(true); 
    cardCopy.querySelector('.card__image').src = initialCards[i].link;
    cardCopy.querySelector('.card__image').alt = initialCards[i].name; 
    cardCopy.querySelector('.card__title').textContent = initialCards[i].name; 
    const buttons = cardCopy.querySelector('.card__delete-button'); 
    buttons.addEventListener('click', cardClick); 
    const cardList = document.querySelector('.places__list'); 
    console.log(cardList);
    cardList.append(cardCopy);
}
// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки



function cardClick(event) {           
   console.log('CLICK');
   const listItem = event.target.closest('.places__item');
   listItem.remove();
}


     
  

 // надо ли после клика removeEventListener('click', cardClick) ? 


// @todo: Вывести карточки на страницу
