import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit, handlePopupClose }, selector) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._handlePopupClose = handlePopupClose;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
  }

  _extraFuncClose() {
    this._handlePopupClose();
  }
  
  resetForm() {
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
    this._formElement.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
  
  close() {
    super.close();
    
  }
}
