import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._description = document.querySelector('.popup__description');
    this._image = document.querySelector('.popup__full-image');
  }

  open({name, link}) {
    this._description.textContent = name;
    this._image.alt = name;
    this._image.src = link;
    super.open();
  }
}