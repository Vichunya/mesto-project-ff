// Открытие модального окна 
export function openPopup(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc);    //закрытие по клавише escape    
}

function closePopupEsc(event) {   //удаление разработчика по Esc
    if (event.key === 'Escape') {          // встроенное св-во объекта, какая клавиша нажата
        closePopup();
    }
}

// Закрытие модального окна 
export function closePopup() {
    const modal = document.querySelector('.popup_is-opened');
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc);
}

const modals = document.querySelectorAll('.popup'); //закрытие вне окна
modals.forEach(modal => {
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closePopup();
        }
    });

    const closeBtn = modal.querySelector('.popup__close'); //закрытие по кнопке
    closeBtn.addEventListener('click', function () {
        closePopup();
    });
});

