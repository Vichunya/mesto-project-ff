// Вынесем форму и инпуты 
//const formElement = document.querySelector('.popup__form'); // форма 
//const inputElement = formElement.querySelector('.popup__input'); //инпуты 
// const buttonElement = document.querySelector('.popup__button') // кнопка отправки 

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
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

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

// обработчики для всех форм 
const enableValidation = () => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll('.popup__form'));

    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
        // Для каждой формы вызовем функцию setEventListeners,
        // передав ей элемент формы
        setEventListeners(formElement);
    });
};

// Вызовем функцию
enableValidation();


// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

// КНОПКА ОТПРАВКИ ФОРМЫ 

// Функция принимает массив полей           //inputList - все поля, inputElement - все инпуты 
const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся функция
        // hasInvalidInput вернёт true

        return !inputElement.validity.valid;
    })
};
// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
        buttonElement.disabled = true;
        buttonElement.classList.add('form__submit_inactive');
    } else {
        // иначе сделай кнопку активной
        buttonElement.disabled = false;
        buttonElement.classList.remove('form__submit_inactive');
    }
};
const setEventListeners = (formElement) => {
    // Найдём все поля формы и сделаем из них массив
    const inputList = Array.from(formElement.querySelectorAll(`.form__input`));
    // Найдём в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector('.form__submit');
    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);

            // Вызовем toggleButtonState и передадим ей массив полей и кнопку
            toggleButtonState(inputList, buttonElement);
        });
    });
};

// КАСТОМНЫЕ СООБЩЕНИЯ 
<input
    type="text"
    minlength="2"
    pattern="^[a-zA-Z]+$"
    data-error-message="Разрешены только латинские буквы"></input>

const isValid = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        // данные атрибута доступны у элемента инпута через ключевое слово dataset.
        // обратите внимание, что в js имя атрибута пишется в camelCase 
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};


// "form" novalidate  - вставаить в html
// .form__input_type_error {
//     border-bottom-color: red; }
// <span class=" "> Вы пропустили это поле </span> - errorMessage
// <span class=" "> Минимальное количество символов:2. Длина текста сейчас: 1 символ.</span> 

//   <input
//     type="text"
//     id="name"
//     name="name"
//     required
//     minlength="2"
//     maxlength="40"
//     pattern="^[a-zA-Zа-яА-ЯёЁ\- ]+$"
//     data-error-message="Имя должно содержать от 2 до 40 символов и может содержать только латинские и кириллические буквы, дефисы и пробелы."
//   />