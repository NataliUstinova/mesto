export class FormValidator {
  constructor(options, form) {
    this._form = form;
    this._options = options;
    this._inputList = Array.from(this._form.querySelectorAll(options._inputElementSelector));
    this._submitButton = this._form.querySelector(options._submitButtonSelector);
  }
  _showInputError() {
    
  }
  _hideInputError() {
    
  }
  
  _hasInvalidInput() {
    
  }
  
  _checkInputValidity() {
    
  }
  
  toggleButtonState() {
    
  }
  
  _setEventListeners() {
    
  }
  
  enableValidation() {
    
  }
  
  resetForm() {
    
  }
}