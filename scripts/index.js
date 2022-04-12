const profile = document.querySelector('.profile'); // профиль
const profileEditButton = profile.querySelector('.profile__edit-button'); //кнопка редактирования
const popup = document.querySelector('.popup'); // попап
const popupCloseButton = popup.querySelector('.popup__close'); //кнопка закрытия

let profileName = profile.querySelector('.profile__name'); // имя
let profileJob = profile.querySelector('.profile__job'); // деятельность
let formElement = popup.querySelector('.popup__form'); // форма
let nameInput = formElement.querySelector('.popup__input_value_name'); //поле ввода имени
let jobInput = formElement.querySelector('.popup__input_value_job'); //поле ввода деятельности


function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.add('popup_opened');
}
profileEditButton.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
}
popupCloseButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);
