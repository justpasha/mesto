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
const popup = document.querySelector('.popup');
const closeButton=document.querySelector('.popup__close-button');
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__description');
const form = popup.querySelector('.popup__container');
const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template').content;

function openEditForm () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  popup.classList.toggle('popup_opened');
}
function closeEditForm () {
  popup.classList.toggle('popup_opened');
}
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closeEditForm();
}

function render() {
  initialCards.forEach(addCard);
}

function addCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.element__name').innerText = card.name;
  cardElement.querySelector('.element__image').alt = card.name;
  cardElement.querySelector('.element__image').src = card.link;
  cards.appendChild(cardElement);
}

render();

popup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closeEditForm();
  }
});

editButton.addEventListener('click',openEditForm)
closeButton.addEventListener('click',closeEditForm)
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
form.addEventListener('submit', handleFormSubmit);
