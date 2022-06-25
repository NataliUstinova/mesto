export default class FormValidator {
  constructor(options, form) {
    this._form = form;
    this._options = options;
    this._inputList = Array.from(this._form.querySelectorAll(this._options.inputElementSelector));
    this._buttonElement = this._form.querySelector(this._options.submitButtonSelector);
  }
  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._options.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._options.inputErrorClass);
  }
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._options.errorClass);
    errorElement.classList.remove(this._options.inputErrorClass);
    errorElement.textContent = '';
  }
  
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }
  
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._options.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._options.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }
  
  _setEventListeners() {
    
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.hideErrors();
    });
    
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
    
  }
  
  enableValidation() {
    this.toggleButtonState();
    this._setEventListeners();
  }
  
  hideErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}