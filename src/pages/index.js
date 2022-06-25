import './index.css';
import {
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
  formAvatar,
  avatar
  } from '../utils/constants.js';
import { renderLoading } from '../utils/utils.js';
import Section from '../components/Section.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

//Api
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: '46f10111-7535-41c9-bac2-e4a6e0f14e0d',
    'Content-Type': 'application/json'
  }
});

let initialCards = null;

//Validation
const editProfileValidation = new FormValidator(validationOptions, formProfile);
const addCardValidation = new FormValidator(validationOptions, formCard);
const avatarValidation = new FormValidator(validationOptions, formAvatar);

editProfileValidation.enableValidation();
addCardValidation.enableValidation();
avatarValidation.enableValidation();

let selectedCard = null;
const user = new UserInfo({nameElementSelector: '.profile__name', jobElementSelector: '.profile__job', avatarSelector: '.profile__avatar-input'});

let userData = null;

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardsList.addItem(createCard(item));
    }
  },
  cardsListSelector
);

Promise.all([api.getUserInfoServer(), api.getInitialCards()])
  .then(responses => {
    if (responses[0]._id) {
      userData = responses[0];
      user.setUserInfo({name: userData.name, job: userData.about, avatar: userData.avatar});
      cardsList.setItems({items: responses[1]})
      initialCards = responses[1];
      cardsList.renderItems();
    }
  })
  .catch(err => console.log(err));

const showImagePopup = new PopupWithImage(showImagePopupSelector);
showImagePopup.setEventListeners();

function createCard(card) {
  const newCard = new Card({
    card: card, 
    userId: userData._id, 
    template: cardTemplate, 
    handleCardClick: () => {
      console.log(showImagePopup);
      showImagePopup.open({name: card.name, link: card.link});
    }, 
    handleLikeClick: (event) => {
      if (!newCard.isLiked()) {
        api.addLike(card._id)
          .then(res => newCard.setLikes(res.likes))
          .catch(err => err);
      }
      else {
        api.deleteLike(card._id)
          .then(res => newCard.setLikes(res.likes))
          .catch(err => err);
      }
      
    }, 
    handleDeleteCardClick: () => {
      selectedCard = newCard;
      popupDeleteCard.open();
    }
  })
  return newCard.addCard(card);
}

const profilePopup = new PopupWithForm({
  handleFormSubmit: (item, event) => {
    let saveButton = renderLoading(event.target);
    saveButton.textContent = 'Сохранение...';

    api.editProfile({name: item.name, about: item.job})
      .then(_user => { 
        saveButton.textContent = 'Сохранить';
        user.setUserInfo({name: _user.name, job: _user.about, avatar: userData.avatar});
        profilePopup.close();
        editProfileValidation.toggleButtonState();
      })
      .catch((err) => {
        console.log(err);
      });
    
  },
  handlePopupClose: () => {
    editProfileValidation.hideErrors();
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

const popupDeleteCard = new PopupWithForm ({ 
  handleFormSubmit: () => { 
    api.deleteCard(selectedCard._id)
      .then(() => {
        selectedCard.deleteCard();
        selectedCard = null;
        popupDeleteCard.close();
      })
      .catch(err => console.log(err));
  }, 
  handlePopupClose: () => null},
  '.popup_delete-pic'
);
popupDeleteCard.setEventListeners();

const avatarPopup = new PopupWithForm ({ 
  handleFormSubmit:  
  (avatar,  event) => {
    let saveButton = renderLoading(event.target);
    saveButton.textContent = 'Сохранение...';

    api.changeUserAvatar(avatar.avatarLink)
      .then(res => {
        saveButton.textContent = 'Сохранить';
        user.setUserInfo({name: userData.name, job: userData.about, avatar: res.avatar});
        avatarPopup.close();
        avatarValidation.toggleButtonState();
      })
      .catch(err => err);
    
  },
  handlePopupClose: () => {
    avatarValidation.hideErrors();
    avatarValidation.toggleButtonState();
  }
}, '.popup_edit-avatar');
avatarPopup.setEventListeners();


avatar.addEventListener('click', () => avatarPopup.open());

const popupAddCard = new PopupWithForm({
    handleFormSubmit: (item, event) => {
      let saveButton = renderLoading(event.target);
      saveButton.textContent = 'Сохранение...';
      
      api.addUserCard(item.name, item.link)
        .then(res => {
          saveButton.textContent = 'Создать';
          cardsList.addItem(createCard(res));
          popupAddCard.close();
          addCardValidation.toggleButtonState();
        })
        .catch(err => err);
    },
    handlePopupClose: () => {
      addCardValidation.hideErrors();
      addCardValidation.toggleButtonState();
    }
  }, 
  popupPicAddSelector
);

popupAddCard.setEventListeners();

newPicButton.addEventListener('click', () => popupAddCard.open());