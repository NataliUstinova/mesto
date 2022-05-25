import './index.css';
import { Card } from '../scripts/Card.js'
import { initialCards } from '../scripts/constants.js';
import { FormValidator } from '../scripts/FormValidator.js'

const popups = document.querySelectorAll('.popup');
//popup edit profile
const popupEditProfile = document.querySelector('.popup_profile-info');
const profile = document.querySelector('.profile'); // профиль
const profileEditButton = profile.querySelector('.profile__edit-button'); //кнопка редактирования

//form popup edit profile
const profileName = profile.querySelector('.profile__name'); // имя
const profileJob = profile.querySelector('.profile__job'); // деятельность
const formProfile = popupEditProfile.querySelector('.popup__form'); // форма
const nameInput = formProfile.querySelector('.popup__input_value_name'); //поле ввода имени
const jobInput = formProfile.querySelector('.popup__input_value_job'); //поле ввода деятельности

//popup add pic
const popupPicAdd = document.querySelector('.popup_add-pic');
//popup add pic form
const formCard = document.querySelector('.popup__form_add-pic');
const inputPicTitle = popupPicAdd.querySelector('.popup__input_value_pic-title'); // input pic title
const inputPicLink = popupPicAdd.querySelector('.popup__input_value_pic-link');
//popup add pic buttons
const newPicButton = profile.querySelector('.profile__add-button');

//cards
const cardsList = document.querySelector('.cards__list');

//validation options
const validationOptions = {
  formElementSelector: '.popup__form',
  inputElementSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

const editProfileValidation = new FormValidator(validationOptions, formProfile);
const addCardValidation = new FormValidator(validationOptions, formCard);

editProfileValidation.enableValidation();
addCardValidation.enableValidation();

//functions
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function openProfilePopup() {
  editProfileValidation.resetForm();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
}

function openPicPopup() {
  addCardValidation.resetForm();
  addCardValidation.toggleButtonState();
  openPopup(popupPicAdd);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

function addCard(card) {
  const newCard = new Card(card, '.card__template');
  return newCard.addCard();
}

const renderCards = (card) => {
  const cardElements = addCard(card);
  cardsList.prepend(cardElements);
};

initialCards.forEach(renderCards);

function handleProfileFormSubmit (event) {
    event.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditProfile);
}

function handleCardFormSubmit(event) {
  event.preventDefault();
  const inputCard = {
    name: inputPicTitle.value,
    link: inputPicLink.value,
  };
  renderCards(inputCard);
  closePopup(popupPicAdd);
  formCard.reset();
}

//listeners
profileEditButton.addEventListener('click', openProfilePopup);
newPicButton.addEventListener('click',openPicPopup);
formProfile.addEventListener('submit', handleProfileFormSubmit);
formCard.addEventListener('submit', handleCardFormSubmit);

