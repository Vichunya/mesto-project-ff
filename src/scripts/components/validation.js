// Вынесем форму и инпуты 
//const formElement = document.querySelector('.popup__form'); // форма 
//const formInput = formElement.querySelector('.popup__input'); //инпуты 

// локальная область видимости formElement, inputElement 
const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);//valMEs-разный текст ошибок 
    } else {
        hideInputError(formElement, inputElement);
    }
};
// ф-я показа ошибки 
const showInputError = (formElement, inputElement, errorMessage) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);//поле с ошибкой ? 
    
    inputElement.classList.add('form__input_type_error');//добавить класс ошибки в html ? 
    errorElement.textContent = errorMessage; // Вы пропустили это поле
    errorElement.classList.add('form__input-error_active');//класс показа ? Добавить в html ? 
};

// ф-я скрытия ошибки 
const hideInputError = (formElement, inputElement) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

// обработчики для всех полей 
const setEventListeners = (formElement) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        isValid(formElement, inputElement)
      });
    });
  };


// включение валидации вызовом enableValidation
// все настройки передаются при вызове

// enableValidation({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
//   });

// "form" novalidate  - вставаить в html
// .form__input_type_error {
//     border-bottom-color: red; }
// <span class=" "> Вы пропустили это поле </span> - errorMessage
// <span class=" "> Минимальное количество символов:2. Длина текста сейчас: 1 символ.</span> 