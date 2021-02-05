const selectors = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
}

const showInputError = (formElement, inputElement, errorMessage, selectorList) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectorList.inputErrorClass);
  errorElement.classList.add(selectorList.errorClass);
  errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement, selectorList) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectorList.inputErrorClass);
  errorElement.classList.remove(selectorList.errorClass);
  errorElement.textContent = '';
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, selectorList) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selectorList.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(selectorList.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

const isValid = (formElement, inputElement, selectorList) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, selectorList);
  } else {
    hideInputError(formElement, inputElement, selectorList);
  }
};

const setEventListener = (formElement, selectorList) => {
  const inputList = Array.from(formElement.querySelectorAll(selectorList.inputSelector));
  const buttonElement = formElement.querySelector(selectorList.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, selectorList);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleButtonState(inputList, buttonElement, selectorList);
      isValid(formElement, inputElement, selectorList);
    });
  });
};

const enableValidation = (selectorList) => {
  const formList = Array.from(document.querySelectorAll(selectorList.formSelector));
  formList.forEach((formElement) => {
    setEventListener(formElement, selectorList);
  });
};

//удаление ошибок полей при закрытии без сохранения
const clearInputError = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const spanList = Array.from(formElement.querySelectorAll(`.${selectors.errorClass}`));
  inputList.forEach((inputElement) => {
    inputElement.classList.remove(selectors.inputErrorClass);
  });
  spanList.forEach((errorElement) => {
    errorElement.classList.remove(selectors.errorClass);
    errorElement.textContent = '';
  });
};

//блокировка кнопки при повторном открытии формы
const disabledButton = (formElement) => {
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  buttonElement.classList.add(selectors.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

enableValidation(selectors);
