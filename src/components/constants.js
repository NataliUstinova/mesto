//popup show pic
export const popupShowPic = document.querySelector('.popup_show-pic');
export const fullImage = popupShowPic.querySelector('.popup__full-image');
export const imageDescription = popupShowPic.querySelector('.popup__description');

export const popupEditProfile = document.querySelector('.popup_profile-info');
export const popupEditProfileSelector = '.popup_profile-info';
export const profile = document.querySelector('.profile'); // профиль
export const profileEditButton = profile.querySelector('.profile__edit-button'); //кнопка редактирования

// //form popup edit profile
export const formProfile = popupEditProfile.querySelector('.popup__form'); // форма
export const nameInput = formProfile.querySelector('.popup__input_value_name'); //поле ввода имени
export const jobInput = formProfile.querySelector('.popup__input_value_job'); //поле ввода деятельности

//popup add pic
export const popupPicAddSelector = '.popup_add-pic';
//popup add pic form
export const formCard = document.querySelector('.popup__form_add-pic');
//popup add pic button
export const newPicButton = profile.querySelector('.profile__add-button');

//validation options
export const validationOptions = {
  formElementSelector: '.popup__form',
  inputElementSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

//Card section
export const cardsListSelector = '.cards__list';
export const cardTemplate = '.card__template';

export const showImagePopupSelector = '.popup_show-pic';

export const initialCards = [
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