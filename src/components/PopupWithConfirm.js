import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector, formSelector, handleFormConfirm }) {
    super(popupSelector);
    this._handleFormConfirm = handleFormConfirm;
    this._confirmForm = this._popup.querySelector(formSelector);
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormConfirm(this._cardId, this._element);
      super.close();
    });
  }

  open(cardId, element) {
    super.open();

    this._cardId = cardId;
    this._element = element;
  }
}
