const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

profileEditButton.addEventListener("click", openPopup);
function openPopup() {
  popup.classList.add("popup_opened");
}

popupCloseButton.addEventListener("click", closePopup);
function closePopup() {
  popup.classList.remove("popup_opened");
}