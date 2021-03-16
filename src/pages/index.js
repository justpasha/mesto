import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  initialCards,
  selectors,
  editButton,
  addButton,
  nameInput,
  jobInput,
} from '../utils/constants.js';

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
      cardList.addItem(createCard(item));
    },
  },
  '.elements'
);

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  discriptionSelector: '.profile__description',
});

const popupImage = new PopupWithImage('.popup-image');

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
      cardList.addItem(createCard(formData));
    },
  },
  '.add-card-form__container'
);

//создание карточки
function createCard(data) {
  const card = new Card(data, '.card-template', handleCardClick);
  return card.generateCard();
}

//открытие попапа с изображением
function handleCardClick(image, name) {
  popupImage.open(image, name);
}

//редактировать профиль
editButton.addEventListener('click', () => {
  validEditForm.clearInputError();
  const userInitialInfo = userInfo.getUserInfo();
  nameInput.value = userInitialInfo.name;
  jobInput.value = userInitialInfo.description;
  validEditForm.toggleButtonState();
  popupEditForm.open();
});

//добавить карточку
addButton.addEventListener('click', () => {
  validAddForm.clearInputError();
  validAddForm.toggleButtonState();
  popupAddForm.open();
});

cardList.renderItems();

popupImage.setEventListeners();
popupAddForm.setEventListeners();
popupEditForm.setEventListeners();

validEditForm.enableValidation();
validAddForm.enableValidation();
