const showInputError = ({formElement, inputElement, inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
  inputElement.classList.add(errorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(inputErrorClass);
};

const hideInputError = ({formElement, inputElement, inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
  inputElement.classList.remove(errorClass);
  errorElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const checkInputValidity = ({formElement, inputElement, inputErrorClass, errorClass}) => {
  if (!inputElement.validity.valid) {
    showInputError({formElement, inputElement, inputErrorClass, errorClass});
  } else {
    hideInputError({formElement, inputElement, inputErrorClass, errorClass});
  }
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = ({formElement, inputElementSelector, inactiveButtonClass, submitButtonSelector, inputErrorClass, errorClass}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputElementSelector));
  const formSubmitNode = formElement.querySelector(submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function (evt) {
      checkInputValidity({formElement, inputElement, inputErrorClass, errorClass});
      toggleButtonState(inputList, formSubmitNode, inactiveButtonClass);
    });
  });
};

const enableValidation = ({formElementSelector, inputElementSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const formElementNodes = document.querySelectorAll(formElementSelector);

  formElementNodes.forEach(formElementNode => {

    setEventListeners({formElement: formElementNode, submitButtonSelector, inactiveButtonClass, inputElementSelector, inputErrorClass, errorClass});

    formElementNode.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

  });
};

enableValidation({
  formElementSelector: '.popup__form',
  inputElementSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_error-text',
  errorClass: 'popup__error-line'
});
