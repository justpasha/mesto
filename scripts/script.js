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
const closeButton = document.querySelector('.popup__close-button');
const popupProfileEdit = document.querySelector('.edit-profile-form');
const popupAddCard = document.querySelector('.add-card-form');
const nameInput = popupProfileEdit.querySelector('.popup__input_type_name');
const jobInput = popupProfileEdit.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__description');
const editProfileForm = popupProfileEdit.querySelector('.edit-profile-form__container');
const addCardForm = popupAddCard.querySelector('.add-card-form__container');
const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template').content;

function openEditForm () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  popupProfileEdit.classList.toggle('popup_opened');
}
function closeEditForm () {
  popupProfileEdit.classList.toggle('popup_opened');
}

function toggleForm() {
  popupAddCard.classList.toggle('popup_opened');
}

function handleDelete(evt) {
  evt.target.closest('.element').remove();
}

function cardLike(evt) {
  evt.target.classList.toggle('element__like-button_active');
}

function handleEditFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closeEditForm();
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
  popupAddCard.classList.toggle('popup_opened');
  cardNameInput.value = '';
  cardLinkInput.value = '';
}

function render() {
  initialCards.forEach(addCard);
}

function addCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.element__name').innerText = card.name;
  cardElement.querySelector('.element__image').alt = card.name;
  cardElement.querySelector('.element__image').src = card.link;
  cardElement.querySelector('.element__delete-button').addEventListener('click', handleDelete);
  cardElement.querySelector('.element__like-button').addEventListener('click', cardLike);
  cards.prepend(cardElement);
}

render();

popupProfileEdit.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    closeEditForm();
  }
});

editButton.addEventListener('click', openEditForm);
closeButton.addEventListener('click', closeEditForm);

editProfileForm.addEventListener('submit', handleEditFormSubmit);

addButton.addEventListener('click', toggleForm);
addCardForm.addEventListener('submit', handleAddFormSubmit);
