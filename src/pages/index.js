import './index.css';
import { initialCards } from '../components/constants.js';
import Section from '../components/Section.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
// import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


const popupEditProfile = document.querySelector('.popup_profile-info');
const popupEditProfileSelector = '.popup_profile-info';
const profile = document.querySelector('.profile'); // профиль
const profileEditButton = profile.querySelector('.profile__edit-button'); //кнопка редактирования
//
// //form popup edit profile
const formProfile = popupEditProfile.querySelector('.popup__form'); // форма
const nameInput = formProfile.querySelector('.popup__input_value_name'); //поле ввода имени
const jobInput = formProfile.querySelector('.popup__input_value_job'); //поле ввода деятельности
//
// //popup add pic
const popupPicAddSelector = '.popup_add-pic';
// //popup add pic form
const formCard = document.querySelector('.popup__form_add-pic');
// //popup add pic buttons
const newPicButton = profile.querySelector('.profile__add-button');

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

//Card section
const cardsListSelector = '.cards__list';
const cardTemplate = '.card__template';


function createCard(item) {
  return new Card(item, cardTemplate, () => {
    showImagePopup.open({name: item.name, link: item.link});
  }).addCard(item);
}
const cardsList = new Section({
    items:  initialCards,
    renderer: (item) => {cardsList.addItem(createCard(item));}},
  cardsListSelector
);

cardsList.renderItems();

const user = new UserInfo({nameElementSelector: '.profile__name', jobElementSelector: '.profile__job'});

const profilePopup = new PopupWithForm({
  handleFormSubmit: (item) => {
    user.setUserInfo({name: item.name, job: item.job});
    profilePopup.close();
    profilePopup.resetForm();
    editProfileValidation.toggleButtonState();
  },
  handlePopupClose: () => {
    editProfileValidation.hideErrors();
    profilePopup.resetForm();
    editProfileValidation.toggleButtonState();
    
  }
  }, popupEditProfileSelector);
profilePopup.setEventListeners();

profileEditButton.addEventListener('click', () => {
  const userData = user.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  profilePopup.open();
})

const addCardPopup = new PopupWithForm({
  handleFormSubmit: (item) => {
    const newCardInput = {
      name: item.name,
      link: item.link
    };
    
    cardsList.addItem(createCard(newCardInput));
    addCardPopup.close();
    addCardPopup.resetForm();
    addCardValidation.toggleButtonState();
  },
  handlePopupClose: () => {
    addCardValidation.hideErrors();
    addCardPopup.resetForm();
    addCardValidation.toggleButtonState();
  }
  }, popupPicAddSelector);
addCardPopup.setEventListeners()

newPicButton.addEventListener('click', () => addCardPopup.open());

const showImagePopupSelector = '.popup_show-pic';
const showImagePopup = new PopupWithImage(showImagePopupSelector);
showImagePopup.setEventListeners();
