import Popup from './Popup.js';
import { popupImageTitle, popupImageLink } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(image, name) {
    popupImageLink.src = image;
    popupImageLink.alt = name;
    popupImageTitle.textContent = name;
    super.open();
  }
}
