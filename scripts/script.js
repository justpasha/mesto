let editButton = document.querySelector('.edit-button')
let popup = document.querySelector('.popup')
let closeIcon=document.querySelector('.popup__close-icon')

function toggleEditForm () {
  popup.classList.toggle('popup_opened')
}

popup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    toggleEditForm();
  }
});

editButton.addEventListener('click',toggleEditForm)
closeIcon.addEventListener('click',toggleEditForm)



let form = popup.querySelector('.popup__container')

function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    let nameInput = popup.querySelector('.popup__input_type_name')
    let jobInput = popup.querySelector('.popup__input_type_about')
    let profileName = document.querySelector('.profile__name')
    let profileAbout = document.querySelector('.profile__description')

    nameInput.getAttribute('value');
    jobInput.getAttribute('value');

    profileName.textContent = nameInput.value
    profileAbout.textContent = jobInput.value
    toggleEditForm()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
form.addEventListener('submit', handleFormSubmit);


