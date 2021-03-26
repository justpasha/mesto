import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
  selectors,
  editButton,
  addButton,
  changeAvatarButton,
  nameInput,
  jobInput,
  profileAvatar,
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: '14241259-6e5d-4497-966c-a550cda05f4a',
    'Content-Type': 'application/json',
  },
});

const validEditForm = new FormValidator(
  selectors,
  '.edit-profile-form__container'
);
const validAddForm = new FormValidator(selectors, '.add-card-form__container');
const validAvatarForm = new FormValidator(
  selectors,
  '.change-avatar-form__container'
);

//добавление в контейнер карт
const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItem(createLocalCard(item));
    },
  },
  '.elements'
);

//загрузка исходных карточек
api
  .getInitialCards()
  .then((data) => {
    cardList.renderItems(data);
  })
  .catch((err) => console.log(err));

//загрузка данных профиля
api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data);
    profileAvatar.src = data.avatar;
  })
  .catch((err) => console.log(err));

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  discriptionSelector: '.profile__description',
  avatarSelector: '.profile__avatar',
});

const popupImage = new PopupWithImage('.popup-image');

//форма профиля
const popupEditForm = new PopupWithForm(
  {
    popupSelector: '.edit-profile-form',
    handleFormSubmit: (formData) => {
      api.editProfileInfo(formData).catch((err) => console.log(err));
      userInfo.setUserInfo(formData);
    },
  },
  '.edit-profile-form__container'
);

//форма карточки
const popupAddForm = new PopupWithForm(
  {
    popupSelector: '.add-card-form',
    handleFormSubmit: (formData) => {
      api
        .createCard(formData)
        .then((res) => res.json())
        .then((newCardData) => {
          cardList.addItem(createLocalCard(newCardData));
        })
        .catch((err) => console.log(err));
    },
  },
  '.add-card-form__container'
);

//форма смены аватара
const popupChangeAvatar = new PopupWithForm(
  {
    popupSelector: '.change-avatar-form',
    handleFormSubmit: (formData) => {
      api
        .changeAvatar(formData)
        .then((res) => res.json())
        .then((data) => {
          userInfo.setAvatar(data);
        })
        .catch((err) => console.log(err));
    },
  },
  '.change-avatar-form__container'
);

//попап подтверждения удаления
const popupDeleteForm = new PopupWithConfirm({
  popupSelector: '.delete-form',
  formSelector: '.delete-form__container',
  handleFormConfirm: (cardId, element) => {
    api
      .deleteCard(cardId)
      .then(() => {
        element.remove();
      })
      .catch((err) => console.log(err));
  },
});

//создание карточки
function createLocalCard(data) {
  const card = new Card(data, {
    cardSelector: '.card-template',
    myId: userInfo.getUserId(),
    handleCardClick: handleCardClick,
    handleCardDelete: handleCardDelete,
    setCardLike: setCardLike,
    deleteLike: deleteLike,
  });
  return card.generateCard();
}

//удаление карточки
function handleCardDelete(cardId, element) {
  popupDeleteForm.open(cardId, element);
}

//постановка лайка
function setCardLike(cardId, likeActiveSelector, likeButton) {
  api
    .setLike(cardId)
    .then(() => {
      likeButton.classList.add(likeActiveSelector);
    })
    .catch((err) => console.log(err));
}

//снятие лайка
function deleteLike(cardId, likeActiveSelector, likeButton) {
  api
    .deleteLike(cardId)
    .then(() => {
      likeButton.classList.remove(likeActiveSelector);
    })
    .catch((err) => console.log(err));
}

//открытие попапа с изображением
function handleCardClick(image, name) {
  popupImage.open(image, name);
}

//изменить аватар
changeAvatarButton.addEventListener('click', () => {
  validAvatarForm.clearInputError();
  validAvatarForm.toggleButtonState();
  popupChangeAvatar.open();
});

//редактировать профиль
editButton.addEventListener('click', () => {
  validEditForm.clearInputError();
  const userInitialInfo = userInfo.getUserInfo();
  nameInput.value = userInitialInfo.name;
  jobInput.value = userInitialInfo.about;
  validEditForm.toggleButtonState();
  popupEditForm.open();
});

//добавить карточку
addButton.addEventListener('click', () => {
  validAddForm.clearInputError();
  validAddForm.toggleButtonState();
  popupAddForm.open();
});

popupImage.setEventListeners();
popupAddForm.setEventListeners();
popupEditForm.setEventListeners();
popupDeleteForm.setEventListeners();
popupChangeAvatar.setEventListeners();

validEditForm.enableValidation();
validAddForm.enableValidation();
validAvatarForm.enableValidation();
