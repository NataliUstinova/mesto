export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }
  
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', _handleEscClose);
  }
  
  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._popup._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      openedPopup.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget || evt.target.classList.contains("popup__close")) {
        this._popup.close();
      }
    });
  }
}