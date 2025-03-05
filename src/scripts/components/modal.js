// Открытие модального окна 
export function openPopup(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc);    //закрытие по клавише escape    
}

function closePopupEsc(event) {   //удаление разработчика по Esc
    if (event.key === 'Escape') {          // встроенное св-во объекта, какая клавиша нажата
        const modal = document.querySelector('.popup_is-opened');
        modal.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', closePopupEsc);
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

