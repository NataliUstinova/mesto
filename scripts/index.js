//popup edit profile
const popupEditProfile = document.querySelector('.popup__profile-info');
const profile = document.querySelector('.profile'); // профиль
const profileEditButton = profile.querySelector('.profile__edit-button'); //кнопка редактирования
const popupProfileInfo = document.querySelector('.popup__profile-info');

//form popup edit profile
const profileName = profile.querySelector('.profile__name'); // имя
const profileJob = profile.querySelector('.profile__job'); // деятельность
const formProfile = popupProfileInfo.querySelector('.popup__form'); // форма
const nameInput = formProfile.querySelector('.popup__input_value_name'); //поле ввода имени
const jobInput = formProfile.querySelector('.popup__input_value_job'); //поле ввода деятельности

//buttons popup edit profile
const submitProfileInfo = popupProfileInfo.querySelector('.popup__btn_profile-info'); // кнопка сохранить  изменения  профиля
const closePopupEditBtn = document.querySelector('.popup__close-edit');

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
function closeProfilePopup() {
  popupProfileInfo.classList.remove('popup_opened');
}
function closePicPopup() {
  popupPicAdd.classList.remove('popup_opened');
}
function closeShowPopup() {
  popupShowPic.classList.remove('popup_opened');
}

const renderCards = (card) => {
  const cardElements = addCard(card);
  cardsList.prepend(cardElements);
};

function addCard(item) {
  const cardElement = template.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImg = cardElement.querySelector('.card__image');
  const likeBtn = cardElement.querySelector('.card__like');
  const deleteBtn = cardElement.querySelector('.card__delete');


  cardTitle.textContent = item.name;
  cardImg.alt = item.name;
  cardImg.src = item.link;

  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle("card__like_active");
  });

  deleteBtn.addEventListener('click', () => {
    cardElement.remove();
  });
  popupShowPic.addEventListener('click', () => {
    imageDescription.textContent = item.name;
    fullImage.alt = item.name;
    fullImage.src = item.link;
    openPopup(popupShowPic);
  });
  return cardElement;
}



initialCards.forEach((cardsList) => {
  renderCards(cardsList);
});

function editFormSubmitHandler (event) {
    event.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfileInfo);
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
closePopupEditBtn.addEventListener('click', closeProfilePopup);
closePopupAddPicBtn.addEventListener('click', closePicPopup);
closePopupShowBtn.addEventListener('click', closeShowPopup);
addPicBtn.addEventListener('click',openPicPopup);

formProfile.addEventListener('submit', editFormSubmitHandler);
formCard.addEventListener('submit', cardFormSubmitHandler);

