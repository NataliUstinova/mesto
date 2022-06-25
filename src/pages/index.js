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
  formAvatar,
  } from '../utils/constants.js';
import Section from '../components/Section.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { api } from '../components/Api.js';

//Validation
const editProfileValidation = new FormValidator(validationOptions, formProfile);
const addCardValidation = new FormValidator(validationOptions, formCard);
const avatarValidation = new FormValidator(validationOptions, formAvatar);

editProfileValidation.enableValidation();
addCardValidation.enableValidation();
avatarValidation.enableValidation();


let selectedCard = null;
const user = new UserInfo({nameElementSelector: '.profile__name', jobElementSelector: '.profile__job', avatarSelector: '.profile__avatar-input'});
const userData = await api.getUserInfoServer()
  .then((user) => {
    return user;
  })
  .catch((err) => {
    console.log(err);
  });

user.setUserInfo({name: userData.name, job: userData.about, avatar: userData.avatar});

const showImagePopup = new PopupWithImage(showImagePopupSelector);
showImagePopup.setEventListeners();

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardsList.addItem(createCard(item));
    }
  },
  cardsListSelector
);

cardsList.renderItems();

function createCard(card) {
  const newCard = new Card({
    card: card, 
    userId: userData._id, 
    template: cardTemplate, 
    handleCardClick: () => {
      console.log(showImagePopup);
      showImagePopup.open({name: card.name, link: card.link});
    }, 
    handleLikeClick: async (event) => {
      let likes = null;
      if (!newCard.isLiked()) {
        likes = await api.addLike(card._id)
          .then(res => res)
          .catch(err => err);
      }
      else {
        likes = await api.deleteLike(card._id)
          .then(res => res)
          .catch(err => err);
      }
      newCard.setLikes(likes?.likes);
    }, 
    handleDeleteCardClick: () => {
      selectedCard = newCard;
      deletePopup.open();
    }
  })
  return newCard.addCard(card);
}

const profilePopup = new PopupWithForm({
  handleFormSubmit: async (item, event) => {
    let saveButton = null;

      event.target.childNodes.forEach(node => {
        if (node?.classList?.contains('popup__save')) {
          saveButton = node;
          saveButton.textContent = 'Сохранение...';
        }
      });
    const userData = await api.editProfile({name: item.name, about: item.job})
      .then(user => { 
        saveButton.textContent = 'Сохранить';
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
    user.setUserInfo({...userData, job: userData.about});
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

const deletePopup = new PopupWithForm ({ 
  handleFormSubmit: async (event) => { 
    await api.deleteCard(selectedCard._id)
      .then(res => {
        selectedCard.deleteCard();
        selectedCard = null;
        deletePopup.close();
      })
      .catch(err => console.log(err));
  }, 
  handlePopupClose: () => null},
  '.popup_delete-pic'
);
deletePopup.setEventListeners();

const avatarPopup = new PopupWithForm ({ 
  handleFormSubmit:  
  async (avatar,  event) => {
    let saveButton = null;

      event.target.childNodes.forEach(node => {
        if (node?.classList?.contains('popup__save')) {
          saveButton = node;
          saveButton.textContent = 'Сохранение...';
        }
      });
    const response = await api.changeUserAvatar(avatar.avatarLink)
      .then(res => {
        saveButton.textContent = 'Сохранить';
        return res;
      })
      .catch(err => err);
    user.setUserInfo({name: userData.name, job: userData.about, avatar: response.avatar});
    avatarPopup.close();
    avatarPopup.resetForm();
    avatarValidation.toggleButtonState();
  },
  handlePopupClose: () => {
    avatarValidation.hideErrors();
    avatarPopup.resetForm();
    avatarValidation.toggleButtonState();
  }
}, '.popup_edit-avatar');
avatarPopup.setEventListeners();


const avatar = document.querySelector('.profile__edit-avatar');
avatar.addEventListener('click', () => avatarPopup.open());

// function findPopupSaveButton() {
//   event.target.childNodes.forEach(node => {
//         if (node?.classList?.contains('popup__save')) {
//           saveButton = node;
//           saveButton.textContent = 'Сохранение...';
//         }
//       });
// }

const addCardPopup = new PopupWithForm({
    handleFormSubmit: async (item, event) => {
      let saveButton = null;

      event.target.childNodes.forEach(node => {
        if (node?.classList?.contains('popup__save')) {
          saveButton = node;
          saveButton.textContent = 'Создание...';
        }
      });
      
      const newCard = await api.addUserCard(item.name, item.link)
        .then(res => {
          saveButton.textContent = 'Создать';
          return res;
        })
        .catch(err => err);

      cardsList.addItem(createCard(newCard));
      addCardPopup.close();
      addCardPopup.resetForm();
      addCardValidation.toggleButtonState();
    },
    handlePopupClose: () => {
      addCardValidation.hideErrors();
      addCardPopup.resetForm();
      addCardValidation.toggleButtonState();
    }
  }, 
  popupPicAddSelector
);

addCardPopup.setEventListeners();

newPicButton.addEventListener('click', () => addCardPopup.open());


//Карточки должны отображаться на странице только после получения id пользователя
// const promises = [userData, newCard]
//
// // Передаём массив с промисами методу Promise.all
// Promise.all(promises)
//   .then((results) => {
//     console.log(results); // ["Первый промис", "Второй промис"]
//   }); 