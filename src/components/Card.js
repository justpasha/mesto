export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
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
      .addEventListener('click', () => this._handleCardClick());
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
