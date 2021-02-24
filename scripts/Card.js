const popupElement = document.querySelector('.popup-image');
const popupImage = document.querySelector('.popup-image__image');
const popupImageTitle = document.querySelector('.popup-image__name');

export { Card };

class Card {
  _name;
  _image;
  _cardSelector;
  _element;

  constructor(data, cardSelector) {
    this._name = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _handleOpenPopupImage() {
    popupImage.src = this._image;
    popupImage.alt = this._name;
    popupImageTitle.textContent = this._name;
    popupElement.classList.add('popup_opened');
  }

  _handleClosePopupImage() {
    popupElement.classList.remove('popup_opened');
  }

  _handleDelete() {
    this._element.closest('.element').remove();
  }

  _handleLike() {
    this._element
      .querySelector('.element__like-button')
      .classList.toggle('element__like-button_active');
  }

  _setEventListeners() {
    this._element
      .querySelector('.element__image')
      .addEventListener('click', () => this._handleOpenPopupImage());
    this._element
      .querySelector('.element__delete-button')
      .addEventListener('click', () => this._handleDelete());
    this._element
      .querySelector('.element__like-button')
      .addEventListener('click', () => this._handleLike());
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;

    return this._element;
  }
}
