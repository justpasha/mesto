const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupProfileEdit = document.querySelector('.edit-profile-form');
const popupAddCard = document.querySelector('.add-card-form');
const popupFullImage = document.querySelector('.popup-image')
const nameInput = popupProfileEdit.querySelector('.popup__input_type_name');
const jobInput = popupProfileEdit.querySelector('.popup__input_type_about');
const cardNameInput = popupAddCard.querySelector('.popup__input_type_card-name');
const cardLinkInput = popupAddCard.querySelector('.popup__input_type_card-link');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__description');
const editProfileForm = popupProfileEdit.querySelector('.edit-profile-form__container');
const addCardForm = popupAddCard.querySelector('.add-card-form__container');
const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template').content;

const openImage = popupFullImage.querySelector('.popup-image__image');
const openImageName = popupFullImage.querySelector('.popup-image__name');

const closeImageButton = popupFullImage.querySelector('.popup__close-button');
const closeCardFormButton = popupAddCard.querySelector('.popup__close-button');
const closeEditFormButton = popupProfileEdit.querySelector('.popup__close-button');

function handleOpenEditForm () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
}

function handleEditFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popupProfileEdit);
}

function handleOpenAddForm() {
  addCardForm.reset();
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  addCard({
    name: cardNameInput.value,
    link: cardLinkInput.value
  }, cards);
  closePopup(popupAddCard);
  addCardForm.reset();
}

function handleDelete(evt) {
  evt.target.closest('.element').remove();
}

function handleLike(evt) {
  evt.target.classList.toggle('element__like-button_active');
}

//создание карточки
function createCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.element__name').textContent = card.name;
  const cardImage = cardElement.querySelector('.element__image');
  cardImage.alt = card.name;
  cardImage.src = card.link;
  cardElement.querySelector('.element__delete-button').addEventListener('click', handleDelete);
  cardElement.querySelector('.element__like-button').addEventListener('click', handleLike);
  cardImage.addEventListener('click', () => {
    openPopup(popupFullImage);
    handleOpenImage(card)
  });
  return cardElement;
}

//загрузка изначальных карточек
function render(container) {
  initialCards.forEach((card) => {
  addCard(card, container);
 });
}

render(cards);

//добавление карточек в контейнер
function addCard(card, wrap) {
  wrap.prepend(createCard(card));
 }

function handleOpenImage(card) {
  openImage.src = card.link;
  openImage.alt = card.name;
  openImageName.textContent = card.name;
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//присваивается закрытие по esc
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });
}

//закрытие по оверлэю
function handleOverlayClose() {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((item) => {
    item.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(item);
      };
    });
  });
}

closeImageButton.addEventListener('click', () => closePopup(popupFullImage));
closeCardFormButton.addEventListener('click', () => closePopup(popupAddCard));
closeEditFormButton.addEventListener('click', () => closePopup(popupProfileEdit));

editButton.addEventListener('click', () => {
  clearInputError(editProfileForm);
  disabledButton(editProfileForm);
  openPopup(popupProfileEdit);
  handleOpenEditForm();
});
editProfileForm.addEventListener('submit', handleEditFormSubmit);

addButton.addEventListener('click', () => {
  clearInputError(addCardForm);
  disabledButton(addCardForm);
  handleOpenAddForm();
  openPopup(popupAddCard);
});
addCardForm.addEventListener('submit', handleAddFormSubmit);

handleOverlayClose();
