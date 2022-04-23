//popups
const popupsAll = document.querySelectorAll('.popup'); // все попапы

//popup edit profile
const popupEditProfile = document.querySelector('.popup__profile-info');
const profile = document.querySelector('.profile'); // профиль
const profileEditButton = profile.querySelector('.profile__edit-button'); //кнопка редактирования
const popupProfileInfo = document.querySelector('.popup__profile-info');

//form popup edit profile
const profileName = profile.querySelector('.profile__name'); // имя
const profileJob = profile.querySelector('.profile__job'); // деятельность
const formElement = popupProfileInfo.querySelector('.popup__form'); // форма
const nameInput = formElement.querySelector('.popup__input_value_name'); //поле ввода имени
const jobInput = formElement.querySelector('.popup__input_value_job'); //поле ввода деятельности

//buttons popup edit profile
const submitProfileInfo = popupProfileInfo.querySelector('.popup__btn_profile-info'); // кнопка сохранить  изменения  профиля
const closePopupEdit = document.querySelector('.popup__close-edit');
const popupCloseButton = popupProfileInfo.querySelector('.popup__close'); //кнопка закрытия

//popup add pic
const popupPicAdd = document.querySelector('.popup__add-pic');
//popup add pic form
const formCard = document.querySelector('.popup__form_add-pic');
const inputPicTitle = popupPicAdd.querySelector('.popup__input_value_pic-title'); // input pic title
const inputPicLink = popupPicAdd.querySelector('.popup__input_value_pic-link');
//popup add pic buttons
const addPicBtn = profile.querySelector('.profile__add-button');
const closePopupAddPicBtn = document.querySelector('.popup__close-add-pic');
const submitAddPicBtn = popupPicAdd.querySelector('.popup__btn_save-pic');  // кнопка добавить картинку

//popup show pic
const popupShowPic = document.querySelector('.popup__show-pic');
const fullImage = popupShowPic.querySelector('.popup__full-image');
const imageDescription = popupShowPic.querySelector('.popup__description');
const closePopupShowBtn = document.querySelector('.popup__close-show');


//functions
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
}

function openPicPopup() {
  openPopup(popupPicAdd);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//
// const renderCards = (cards) => {
//   const cardTemplate = addNewCard(cards);
//   cardsList.prepend(cardTemplate);
// };

// function addCardForm(event) {
//   event.preventDefault();
//   const data = {
//     name: inputPicTitle,
//     links: inputPicLink,
//   };
//   renderCards(data);
//   closePopup(popupPicAdd);
//   formCard.reset();
// }
//
// addCardForm();

function editFormSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfileInfo);
}

// function addPicture (evt) {
//   evt.preventDefault();
//   closePopup(popupPicAdd);
// }

profileEditButton.addEventListener('click', openProfilePopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', editFormSubmitHandler);
addPicBtn.addEventListener('click',openPicPopup);
submitProfileInfo.addEventListener('submit', editFormSubmitHandler);

// const initialCards = [
//   {
//     name: 'Архыз',
//     links: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     links: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     links: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     links: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     links: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     links: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];
//
//
// function addCard(item) {
//   const template = document.querySelector('.card__template').content.querySelector('.card__element');
//   const cardTemplate = template.cloneNode(true);
//   const cardTitle = cardTemplate.querySelector('.card__title');
//   const cardImg = cardTemplate.querySelector('.card__image');
//   const likeBtn = cardTemplate.querySelector('.card__like');
//   const deleteBtn = cardTemplate.querySelector('.card__delete');
//
//   cardTitle.textContent = item.name;
//   cardImg.src.textContent = item.links;
//   cardImg.alt.textContent = item.name;
//  
//   likeBtn.addEventListener('click', () => {
//     likeBtn.classList.toggle("card__like_active");
//   })
//  
//   deleteBtn.addEventListener('click', () => {
//     cardTemplate.remove();
//   })
  
  // cardImg.addEventListener('click', () => {
  //  
  // })
//  
//   return cardTemplate;
// }

// const cardsList = document.querySelector('.cards__list');
// const renderCards = (items) => {
//   const cardElement = addCard(items);
//   cardsList.prepend(cardElement);
// }
//
// initialCards.reverse().forEach((cardsList) => {
//   addCard(cardsList);
// });
