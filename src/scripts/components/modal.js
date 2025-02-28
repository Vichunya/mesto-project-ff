// Открытие модального окна 
export function openPopup(modal) {
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

// Закрытие модального окна 
export function closePopup(modal) {
    modal.classList.remove('popup_is-opened');
}

const modals = document.querySelectorAll('.popup'); //закрытие вне окна
modals.forEach(modal => {
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closePopup(modal);
        }
    });

    const closeBtn = modal.querySelector('.popup__close'); //закрытие по кнопке
    closeBtn.addEventListener('click', function () {
        closePopup(modal);
    });
});

