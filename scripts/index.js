// @todo: Темплейт карточки

const cardTemplate = document.getElementById('card-template');
console.log(1);
console.log(cardTemplate);

const content = cardTemplate.content; 



for (let i = 0; i < initialCards.length; i += 1) {
    console.log(initialCards[i].name);
    
    const cardCopy = content.cloneNode(true); 
    cardCopy.querySelector('.card__image').src = initialCards[i].link;
    cardCopy.querySelector('.card__image').alt = initialCards[i].name; 
    const cardList = document.querySelector('.places__list'); 
    console.log(2);
    console.log(cardList);
    cardList.append(cardCopy);
    
}

// Этот цикл работает аналогично методу forEach выше


// @todo: DOM узлы


// вставляем ссылку и название 


  //(что тут должно).append(cardsCopy); .places__list cюда ? 

// @todo: Функция создания карточки


// @todo: Функция удаления карточки

const button = document.querySelector('button'); 
button.addEventListener('click', function(){
console.log('click');
});

// @todo: Вывести карточки на страницу
