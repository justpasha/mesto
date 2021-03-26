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
      changeLoading('.edit-profile-form', true, '');
      api
        .editProfileInfo(formData)
        .catch((err) => console.log(err))
        .finally(changeLoading('.edit-profile-form', false, 'Сохранить'));
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
      changeLoading('.add-card-form', true, '');
      api
        .createCard(formData)
        .then((res) => res.json())
        .then((newCardData) => {
          cardList.addItem(createLocalCard(newCardData));
        })
        .catch((err) => console.log(err))
        .finally(changeLoading('.add-card-form', false, 'Создать'));
    },
  },
  '.add-card-form__container'
);

//форма смены аватара
const popupChangeAvatar = new PopupWithForm(
  {
    popupSelector: '.change-avatar-form',
    handleFormSubmit: (formData) => {
      changeLoading('.change-avatar-form', true, '');
      api
        .changeAvatar(formData)
        .then((res) => res.json())
        .then((data) => {
          userInfo.setAvatar(data);
        })
        .catch((err) => console.log(err))
        .finally(changeLoading('.change-avatar-form', false, 'Сохранить'));
    },
  },
  '.change-avatar-form__container'
);

//попап подтверждения удаления
const popupDeleteForm = new PopupWithConfirm({
  popupSelector: '.delete-form',
  formSelector: '.delete-form__container',
  handleFormConfirm: (cardId, element) => {
    changeLoading('.delete-form', true, '');
    api
      .deleteCard(cardId)
      .then(() => {
        element.remove();
      })
      .catch((err) => console.log(err))
      .finally(changeLoading('.delete-form', false, 'Да'));
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
  likeLoading(likeButton, true);
  api
    .setLike(cardId)
    .then(() => {
      likeButton.classList.add(likeActiveSelector);
    })
    .catch((err) => console.log(err))
    .finally(likeLoading(likeButton, false));
}

//снятие лайка
function deleteLike(cardId, likeActiveSelector, likeButton) {
  likeLoading(likeButton, true);
  api
    .deleteLike(cardId)
    .then(() => {
      likeButton.classList.remove(likeActiveSelector);
    })
    .catch((err) => console.log(err))
    .finally(likeLoading(likeButton, false));
}

//открытие попапа с изображением
function handleCardClick(image, name) {
  popupImage.open(image, name);
}

//обработка загрузок
function changeLoading(popupSelector, isLoading, text) {
  const popup = document.querySelector(popupSelector);
  const formButton = popup.querySelector('.popup__save-button');
  if (isLoading) {
    formButton.textContent = 'Сохранение...';
    formButton.setAttribute('disabled', true);
  } else {
    formButton.textContent = text;
    formButton.removeAttribute('disabled');
  }
}

function likeLoading(likeButton, isLoading) {
  if (isLoading) {
    likeButton.setAttribute('disabled', true);
  } else {
    likeButton.removeAttribute('disabled');
  }
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
