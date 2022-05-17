import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

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
const popupAddPic = document.querySelector('.popup__save-add-pic');


//cards
const cardsList = document.querySelector('.cards__list');
const template = document.querySelector('.card__template').content.querySelector('.card__element');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//functions
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
}

function openPicPopup() {
  formCard.reset();
  popupAddPic.disabled = true;
  popupAddPic.classList.add('popup__save_disabled');
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


// function addCard(item) {
//   const cardElement = template.cloneNode(true);
//   const cardTitle = cardElement.querySelector('.card__title');
//   const cardImg = cardElement.querySelector('.card__image');
//   const likeBtn = cardElement.querySelector('.card__like');
//   const deleteBtn = cardElement.querySelector('.card__delete');
//
//
//   cardTitle.textContent = item.name;
//   cardImg.alt = item.name;
//   cardImg.src = item.link;
//
//   likeBtn.addEventListener('click', () => {
//     likeBtn.classList.toggle('card__like_active');
//   });
//
//   deleteBtn.addEventListener('click', () => {
//     cardElement.remove();
//   });
//   cardImg.addEventListener('click', () => {
//     imageDescription.textContent = item.name;
//     fullImage.alt = item.name;
//     fullImage.src = item.link;
//     openPopup(popupShowPic);
//   });
//   return cardElement;
// }

initialCards.forEach((cardsList) => {
  renderCards(cardsList);
});

function editFormSubmitHandler (event) {
    event.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditProfile);
}

function cardFormSubmitHandler(event) {
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
formProfile.addEventListener('submit', editFormSubmitHandler);
formCard.addEventListener('submit', cardFormSubmitHandler);

