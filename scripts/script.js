let editButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let closeButton=document.querySelector('.popup__close-button')
let nameInput = popup.querySelector('.popup__input_type_name')
let jobInput = popup.querySelector('.popup__input_type_about')
let profileName = document.querySelector('.profile__name')
let profileAbout = document.querySelector('.profile__description')
let form = popup.querySelector('.popup__container')

function changeEditForm () {
  profileName.textContent = nameInput.value
  profileAbout.textContent = jobInput.value
  popup.classList.toggle('popup_opened')
}
function closeEditForm () {
  popup.classList.toggle('popup_opened')
  nameInput.value = profileName.textContent
  jobInput.value = profileAbout.textContent
}
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    changeEditForm()
}

popup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closeEditForm();
  }
});
editButton.addEventListener('click',changeEditForm)
closeButton.addEventListener('click',closeEditForm)
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
form.addEventListener('submit', handleFormSubmit);


