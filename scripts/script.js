const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupProfileEdit = document.querySelector('.edit-profile-form');
const popupAddCard = document.querySelector('.add-card-form');
const popupFullImage = document.querySelector('.popup-image')
const nameInput = popupProfileEdit.querySelector('.popup__input_type_name');
const jobInput = popupProfileEdit.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__description');
const editProfileForm = popupProfileEdit.querySelector('.edit-profile-form__container');
const addCardForm = popupAddCard.querySelector('.add-card-form__container');
const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template').content;

function popupToggle(popup) {
  popup.classList.toggle('popup_opened');
}

function handleOpenEditForm () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  popupToggle(popupProfileEdit);
  popupProfileEdit.querySelector('.popup__close-button').addEventListener('click', handleCloseEdit);
}

function handleEditFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  popupToggle(popupProfileEdit);
}

function handleCloseEdit() {
 popupToggle(popupProfileEdit)
}

function handleOpenAddForm() {
  popupToggle(popupAddCard);
  popupAddCard.querySelector('.popup__close-button').addEventListener('click', handleCloseAddForm);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const cardNameInput = popupAddCard.querySelector('.popup__input_type_card-name');
  const cardLinkInput = popupAddCard.querySelector('.popup__input_type_card-link');
  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };
  addCard(newCard);
  popupToggle(popupAddCard);
  cardNameInput.value = '';
  cardLinkInput.value = '';
}

function handleCloseAddForm() {
  popupToggle(popupAddCard);
}

function handleDelete(evt) {
  evt.target.closest('.element').remove();
}

function handleLike(evt) {
  evt.target.classList.toggle('element__like-button_active');
}

function render() {
  initialCards.forEach(addCard);
}

render();

function addCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.element__name').innerText = card.name;
  cardElement.querySelector('.element__image').alt = card.name;
  cardElement.querySelector('.element__image').src = card.link;
  cardElement.querySelector('.element__delete-button').addEventListener('click', handleDelete);
  cardElement.querySelector('.element__like-button').addEventListener('click', handleLike);
  cardElement.querySelector('.element__image').addEventListener('click', handleOpenImage);
  cards.prepend(cardElement);
}

function handleOpenImage(evt) {
  popupFullImage.classList.add('popup_opened', 'popup-image_opened');
  const image = evt.target.closest('.element__image');
  const src = image.getAttribute('src');
  const name = image.getAttribute('alt');
  popupFullImage.querySelector('.popup-image__image').src = src;
  popupFullImage.querySelector('.popup-image__image').alt = name;
  popupFullImage.querySelector('.popup-image__name').textContent = name;
  popupFullImage.querySelector('.popup__close-button').addEventListener('click', () => {
  removeClass();
  });
}

function removeClass() {
  popupFullImage.classList.remove('popup_opened', 'popup-image_opened');
}

popupProfileEdit.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    handleCloseEdit();
  }
});
popupAddCard.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    handleCloseAddForm();
  }
});
popupFullImage.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    removeClass();
  }
});

editButton.addEventListener('click', handleOpenEditForm);
editProfileForm.addEventListener('submit', handleEditFormSubmit);

addButton.addEventListener('click', handleOpenAddForm);
addCardForm.addEventListener('submit', handleAddFormSubmit);
