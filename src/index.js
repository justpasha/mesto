import './index.css';

import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

import {
  initialCards,
  selectors,
  editProfileForm,
  addCardForm,
  editButton,
  addButton,
  nameInput,
  jobInput,
} from './utils/constants.js';

const validEditForm = new FormValidator(
  selectors,
  '.edit-profile-form__container'
);
const validAddForm = new FormValidator(selectors, '.add-card-form__container');

//создание и добавление в контейнер карт
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '.card-template', handleCardClick);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  '.elements'
);

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  discriptionSelector: '.profile__description',
});

//открытие попапа с изображением
function handleCardClick() {
  const popupImage = new PopupWithImage('.popup-image');
  popupImage.open(this._image, this._name);
  popupImage.setEventListeners();
}

const popupEditForm = new PopupWithForm(
  {
    popupSelector: '.edit-profile-form',
    handleFormSubmit: (formData) => {
      userInfo.setUserInfo(formData);
    },
  },
  '.edit-profile-form__container'
);

const popupAddForm = new PopupWithForm(
  {
    popupSelector: '.add-card-form',
    handleFormSubmit: (formData) => {
      const card = new Card(formData, '.card-template', handleCardClick);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  '.add-card-form__container'
);

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

//редактировать профиль
editButton.addEventListener('click', () => {
  clearInputError(editProfileForm);
  disabledButton(editProfileForm);
  const userInitialInfo = userInfo.getUserInfo();
  nameInput.value = userInitialInfo.name;
  jobInput.value = userInitialInfo.description;
  popupEditForm.open();
});

//добавить карточку
addButton.addEventListener('click', () => {
  clearInputError(addCardForm);
  disabledButton(addCardForm);
  popupAddForm.open();
});

cardList.renderItems();

popupAddForm.setEventListeners();
popupEditForm.setEventListeners();

validEditForm.enableValidation();
validAddForm.enableValidation();
