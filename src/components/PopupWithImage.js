import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageTitle = this._popup.querySelector('.popup-image__name');
    this._popupImageLink = this._popup.querySelector('.popup-image__image');
  }

  open(image, name) {
    this._popupImageLink.src = image;
    this._popupImageLink.alt = name;
    this._popupImageTitle.textContent = name;
    super.open();
  }
}
