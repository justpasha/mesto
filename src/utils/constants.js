export const editProfileForm = document.querySelector(
  '.edit-profile-form__container'
);
export const addCardForm = document.querySelector('.add-card-form__container');

export const profileAvatar = document.querySelector('.profile__avatar');

export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const changeAvatarButton = document.querySelector(
  '.profile__avatar-button'
);

export const nameInput = editProfileForm.querySelector(
  '.popup__input_type_name'
);
export const jobInput = editProfileForm.querySelector(
  '.popup__input_type_about'
);

//для валидации
export const selectors = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
};
