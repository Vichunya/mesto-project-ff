// Открытие модального окна 
export function openPopup(modal) {
    modal.classList.add('popup_is-opened'); //плавное открытие (visibility: visible)
    document.addEventListener('keydown', closePopupEsc);    //закрытие по клавише escape    
}                                                        // keydown - нажатие по клавиатуре

function closePopupEsc(event) {   
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



