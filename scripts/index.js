//для валидации
const selectors = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
};

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupProfileEdit = document.querySelector('.edit-profile-form');
const popupAddCard = document.querySelector('.add-card-form');
const nameInput = popupProfileEdit.querySelector('.popup__input_type_name');
const jobInput = popupProfileEdit.querySelector('.popup__input_type_about');
const cardNameInput = popupAddCard.querySelector(
  '.popup__input_type_card-name'
);
const cardLinkInput = popupAddCard.querySelector(
  '.popup__input_type_card-link'
);
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__description');
const editProfileForm = popupProfileEdit.querySelector(
  '.edit-profile-form__container'
);
const addCardForm = popupAddCard.querySelector('.add-card-form__container');
const cardList = document.querySelector('.elements');

const validEditForm = new FormValidator(
  selectors,
  '.edit-profile-form__container'
);
const validAddForm = new FormValidator(selectors, '.add-card-form__container');

import { Card } from './Card.js';
import { initialCards } from './initial-cards.js';
import { FormValidator } from './FormValidator.js';
export { openPopup };

function handleOpenEditForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  openPopup(popupProfileEdit);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popupProfileEdit);
}

function handleOpenAddForm() {
  addCardForm.reset();
  openPopup(popupAddCard);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  addCArd(
    {
      name: cardNameInput.value,
      link: cardLinkInput.value,
    },
    '.card-template'
  );
  closePopup(popupAddCard);
  addCardForm.reset();
}

//загрузка изначальных карточек
function renderElements() {
  initialCards.forEach((item) => {
    addCArd(item, '.card-template');
  });
}

function addCArd(cardItem, cardSelector) {
  const card = new Card(cardItem, cardSelector);
  const cardElement = card.generateCard();
  cardList.prepend(cardElement);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closeByEscape);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closeByEscape);
}

//закрытие по esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//закрытие по оверлэю и крестику
function handleClosePopup() {
  const popupList = document.querySelectorAll('.popup');
  popupList.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
      }
      if (evt.target.classList.contains('popup__close-icon')) {
        closePopup(popup);
      }
    });
  });
}

//удаление ошибок полей формы при закрытии без сохранения
function clearInputError(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(selectors.inputSelector)
  );
  const spanList = Array.from(
    formElement.querySelectorAll(`.${selectors.errorClass}`)
  );
  inputList.forEach((inputElement) => {
    inputElement.classList.remove(selectors.inputErrorClass);
  });
  spanList.forEach((errorElement) => {
    errorElement.classList.remove(selectors.errorClass);
    errorElement.textContent = '';
  });
}

//блокировка кнопки при повторном открытии формы
function disabledButton(formElement) {
  const buttonElement = formElement.querySelector(
    selectors.submitButtonSelector
  );
  buttonElement.classList.add(selectors.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

editButton.addEventListener('click', () => {
  clearInputError(editProfileForm);
  disabledButton(editProfileForm);
  handleOpenEditForm();
});
editProfileForm.addEventListener('submit', handleEditFormSubmit);

addButton.addEventListener('click', () => {
  clearInputError(addCardForm);
  disabledButton(addCardForm);
  handleOpenAddForm();
});
addCardForm.addEventListener('submit', handleAddFormSubmit);

validEditForm.enableValidation();
validAddForm.enableValidation();

renderElements();
handleClosePopup();
