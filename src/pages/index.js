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


let userId;

function render(card) {
  const newCard = {
    name: card.name,
    link: card.link,
    likes: card.likes,
    id: card._id,
    userId: userId,
    ownerId: card.owner._id
  }
  
  const cardElement = createCard(newCard);
  cardsList.append(cardElement);
}

// const handleLikeClick = () => {
//   const likedCard = 
// }


function createCard(item) {
  return new Card(item, cardTemplate, () => {
  //   showImagePopup.open({name: item.name, link: item.link});
  // }, id => {
    // deletePopup.open();
  }, (item) => {
      item.getCardId();
      console.log(item);
      // handleLikeClick(item.id)
  }, () => {
      deletePopup.open()
    }
    ).addCard(item);
}

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

const user = new UserInfo({nameElementSelector: '.profile__name', jobElementSelector: '.profile__job', avatarSelector: '.profile__avatar-input'});

const userData = await api.getUserInfoServer()
  .then((user) => {
    return user;
  })
  .catch((err) => {
    console.log(err);
  });

user.setUserInfo({name: userData.name, job: userData.about, avatar: userData.avatar});

const profilePopup = new PopupWithForm({
  handleFormSubmit: async (item) => {
    const userData = await api.editProfile({name: item.name, about: item.job})
      .then(user => user)
      .catch((err) => {
        console.log(err);
      });
    user.setUserInfo({name: userData.name, job: userData.about});
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

const deletePopup = new PopupWithForm ({}, '.popup_delete-pic');
deletePopup.setEventListeners();

const avatarPopup = new PopupWithForm ({ handleFormSubmit:  async () => {
    const newAvatar = await api.changeUserAvatar(avatarPopup.getUserInfo())
      .then(res => res)
      .catch(err => err);
    console.log(avatarPopup.getUserInfo());
    console.log('newAvatar', newAvatar);
    console.log('user', user);
    user.setUserInfo({avatar: newAvatar.avatar});
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

const addCardPopup = new PopupWithForm({
    handleFormSubmit: async (item) => {
      const newCard = await api.addUserCard(item.name, item.link)
        // .then(() => { 
        //   document.querySelector('.popup__save').textContent = 'Сохранение...';})
        .then(res => res)
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

const showImagePopup = new PopupWithImage(showImagePopupSelector);
showImagePopup.setEventListeners();


//Карточки должны отображаться на странице только после получения id пользователя
// const promises = [userData, newCard]
//
// // Передаём массив с промисами методу Promise.all
// Promise.all(promises)
//   .then((results) => {
//     console.log(results); // ["Первый промис", "Второй промис"]
//   }); 