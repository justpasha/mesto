export default class Card {
  constructor(
    data,
    {
      cardSelector,
      myId,
      handleCardClick,
      handleCardDelete,
      setCardLike,
      deleteLike,
    }
  ) {
    this._name = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._ownerId = data.owner._id;
    this._myId = myId;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._setCardLike = setCardLike;
    this._deleteLike = deleteLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _handleLike() {
    if (this._likeButton.classList.contains(this._likeActiveSelector)) {
      this._deleteLike(
        this._cardId,
        this._likeActiveSelector,
        this._likeButton,
        this._likeCount
      );
    } else {
      this._setCardLike(
        this._cardId,
        this._likeActiveSelector,
        this._likeButton,
        this._likeCount
      );
    }
  }

  _setEventListeners() {
    this._element
      .querySelector('.element__image')
      .addEventListener('click', () =>
        this._handleCardClick(this._image, this._name)
      );

    if (this._ownerId !== this._myId) {
      this._deleteButton.remove();
    } else {
      this._deleteButton.addEventListener('click', () =>
        this._handleCardDelete(this._cardId, this._element)
      );
    }

    this._likeButton.addEventListener('click', () => this._handleLike());
  }

  generateCard() {
    this._element = this._getTemplate();
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._likeActiveSelector = 'element__like-button_active';

    if (this._likes.length !== 0) {
      this._likes.forEach((item) => {
        if (item._id === this._myId) {
          this._likeButton.classList.add(this._likeActiveSelector);
        }
      });
    }

    this._setEventListeners();

    const imageElement = this._element.querySelector('.element__image');

    imageElement.src = this._image;
    imageElement.alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;
    this._likeCount = this._element.querySelector('.element__like-count');
    this._likeCount.textContent = this._likes.length;

    return this._element;
  }
}
