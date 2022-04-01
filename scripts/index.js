const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');
const popupSaveButton = popup.querySelector('.popup__save');

let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');
let formElement = popup.querySelector('.editProfile');
let nameInput = formElement.querySelector('.popup__input_value_name');
let jobInput = formElement.querySelector('.popup__input_value_job');


profileEditButton.addEventListener('click', openPopup);
function openPopup() {
  popup.classList.add('popup_opened');
}

popupCloseButton.addEventListener('click', closePopup);
function closePopup() {
  popup.classList.remove('popup_opened');
}

popupSaveButton.addEventListener('click', formSubmitHandler); 
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

