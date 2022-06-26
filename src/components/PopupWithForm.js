import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit, handlePopupClose }, selector) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._handlePopupClose = handlePopupClose;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._saveButton = this._formElement.querySelector('.popup__save');
  }
  
  _resetForm() {
    this._formElement.reset();
  }
  
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues(), event);
    });
    super.setEventListeners();
  }
  
  renderLoading({status, loadingText, initialText}) {
    if (status) {
      this._saveButton.textContent = loadingText;
    } else {
      this._saveButton.textContent = initialText;
    }
  }
  
  close() {
    super.close();
    this._handlePopupClose();
    this._resetForm();
  }
}
