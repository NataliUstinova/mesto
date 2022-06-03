import './index.css';
import { initialCards } from '../components/constants.js';
import Section from '../components/Section.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
// import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// const popups = document.querySelectorAll('.popup');
// //popup edit profile
const popupEditProfile = document.querySelector('.popup_profile-info');
const profile = document.querySelector('.profile'); // профиль
const profileEditButton = profile.querySelector('.profile__edit-button'); //кнопка редактирования
//
// //form popup edit profile
// const profileName = profile.querySelector('.profile__name'); // имя
// const profileJob = profile.querySelector('.profile__job'); // деятельность
const formProfile = popupEditProfile.querySelector('.popup__form'); // форма
const nameInput = formProfile.querySelector('.popup__input_value_name'); //поле ввода имени
const jobInput = formProfile.querySelector('.popup__input_value_job'); //поле ввода деятельности
//
// //popup add pic
const popupPicAdd = document.querySelector('.popup_add-pic');
// //popup add pic form
const formCard = document.querySelector('.popup__form_add-pic');
const inputPicTitle = document.querySelector('.popup__input_value_pic-title'); // input pic title
const inputPicLink = document.querySelector('.popup__input_value_pic-link');
// //popup add pic buttons
const newPicButton = profile.querySelector('.profile__add-button');

//cards
//const cardsList = document.querySelector('.cards__list');
// const cardsList = document.querySelector('.elements');
//classes

// const userInfo = new UserInfo({
//   nameElementSelector: '.popup__input_value_name',
//   userInfoElementSelector: '.popup__input_value_job'
// });


// function addCard(card) {
//   const newCard = new Card(card, '.card__template');
//   return newCard.addCard();
// }
// const renderCards = (card) => {
//   const cardElements = addCard(card);
//   cardsList.prepend(cardElements);
// };
//
// initialCards.forEach(renderCards);

function createCard(item) {
  return new Card(item, '.card__template').addCard(item);
}

const cardsList = new Section({
    items:  initialCards,
    renderer: (item) => {cardsList.addItem(createCard(item));}},
  '.card__list'
);

cardsList.renderItems();

function handleCardClick(name, link) {
  inputPicTitle.textContent = name;
  inputPicTitle.alt = name;
  inputPicLink.src = link;
  addCardPopup.open(name, link);
 }

handleCardClick()
  

const profilePopup = new PopupWithForm({submitHandler: (item) => {
    user.setUserInfo(item);
    profilePopup.close();
  }}, popupEditProfile)
profilePopup.setEventListeners()

profileEditButton.addEventListener('click', () => {
  const user = new UserInfo({nameElementSelector: '.popup__input_value_name', jobElementSelector: '.popup__input_value_job'});
  const userData = user.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.value;
  profilePopup.open();
})

const addCardPopup = new PopupWithForm({submitHandler: (item) => {
    cardsList.addItem(createCard(item));
    addCardPopup.close();
    addCardValidation.resetForm()
  }}, popupPicAdd)
addCardPopup.setEventListeners()

newPicButton.addEventListener('click', () => addCardPopup.open());

const showImagePopup = new PopupWithImage('.popup__full-image');
showImagePopup.setEventListeners()

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

// //Popups
// const popupEditProfileClass = new PopupWithForm('.popup_profile-info', handleProfileFormSubmit);
// const popupPicAdd = new PopupWithForm('.popup_add-pic', handleCardFormSubmit);
//
// function openPopupEditProfile(popup) {
//   const { name, job } = userInfo.getUserInfo();
//   inputPicTitle.value = name;
//   inputPicLink.value = job;
//  
//   popupEditProfileClass.open();
// }
//
// //listeners
// profileEditButton.addEventListener('click', openPopupEditProfile);
// newPicButton.addEventListener('click', popupPicAdd);
//
// popupEditProfile.setEventListeners();
// popupPicAdd.setEventListeners();
//
//
//

//
// function handleProfileFormSubmit (event) {
//     event.preventDefault(); 
//     profileName.textContent = nameInput.value;
//     profileJob.textContent = jobInput.value;
//     closePopup(popupEditProfile);
// }
//
// function handleCardFormSubmit(event) {
//   event.preventDefault();
//   const inputCard = {
//     name: inputPicTitle.value,
//     link: inputPicLink.value,
//   };
//   renderCards(inputCard);
//   closePopup(popupPicAdd);
//   formCard.reset();
// }


// formProfile.addEventListener('submit', handleProfileFormSubmit);
// formCard.addEventListener('submit', handleCardFormSubmit);
// //functions
// export function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closeByEscape);
// }

// function openProfilePopup() {
//   editProfileValidation.resetForm();
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
//   openPopup(popupEditProfile);
// }

// function openPicPopup() {
//   addCardValidation.resetForm();
//   addCardValidation.toggleButtonState();
//   openPopup(popupPicAdd);
// }

// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closeByEscape);
// }

// function closeByEscape(event) {
//   if (event.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   }
// }

// popups.forEach((popup) => {
//   popup.addEventListener('mousedown', (evt) => {
//     if (evt.target === evt.currentTarget || evt.target.classList.contains("popup__close")) {
//       closePopup(popup);
//     }
//   });
// });
