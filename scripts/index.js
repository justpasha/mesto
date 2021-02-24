const initialCards = [
  {
    name: 'Архыз',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

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
const cardSelector = document.querySelector('.card-template');

import { Card } from './Card.js';

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

editButton.addEventListener('click', () => {
  // clearInputError(editProfileForm);
  // disabledButton(editProfileForm);
  handleOpenEditForm();
});
editProfileForm.addEventListener('submit', handleEditFormSubmit);

addButton.addEventListener('click', () => {
  // clearInputError(addCardForm);
  // disabledButton(addCardForm);
  handleOpenAddForm();
});
addCardForm.addEventListener('submit', handleAddFormSubmit);

renderElements();
handleClosePopup();
