import { Popup } from './Popup';
import { popupImageTitle, popupImageLink } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open() {
    super.open();
    popupImageLink.src = this._image;
    popupImageLink.alt = this._name;
    popupImageTitle.textContent = this._name;
  }
}
