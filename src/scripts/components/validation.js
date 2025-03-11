// Вынесем форму и инпуты 
//const formElement = document.querySelector('.popup__form'); // форма 
//const inputElement = formElement.querySelector('.popup__input'); //инпуты 
//const buttonElement = document.querySelector('.popup__button') // кнопка отправки 

// локальная область видимости formElement, inputElement 
export const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        console.log(inputElement.validationMessage);
        showInputError(formElement, inputElement, inputElement.validationMessage);//valMEs-разный текст ошибок 
    } else {
        console.log('is valid');
        hideInputError(formElement, inputElement);
    }
};
// ф-я показа ошибки 
const showInputError = (formElement, inputElement, errorMessage) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);//поля с ошибкой

    inputElement.classList.add('form__input_type_error');//создать и добавить в папку попап форм
    errorElement.textContent = errorMessage; // Вы пропустили это поле
    errorElement.classList.add('form__input-error_active');// создать и добавить в папку попап форм
};

// ф-я скрытия ошибки 
const hideInputError = (formElement, inputElement) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

