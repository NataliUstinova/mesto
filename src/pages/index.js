import './index.css';
import { initialCards,
  popupEditProfileSelector,
  profileEditButton, 
  formProfile,
  nameInput,
  jobInput,
  popupPicAddSelector,
  formCard,
  newPicButton,
  validationOptions,
  cardsListSelector,
  cardTemplate,
  showImagePopupSelector,
  } from '../utils/constants.js';
import Section from '../components/Section.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const editProfileValidation = new FormValidator(validationOptions, formProfile);
const addCardValidation = new FormValidator(validationOptions, formCard);

editProfileValidation.enableValidation();
addCardValidation.enableValidation();

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

const showImagePopup = new PopupWithImage(showImagePopupSelector);
showImagePopup.setEventListeners();
