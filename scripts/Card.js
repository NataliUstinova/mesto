import { popupShowPic, fullImage, imageDescription, openPopup } from './index.js'

export class Card {
  _likeCard;
  _deleteCard;
  _showImage;
  _setEventListeners;
  constructor(card, template) {
    this._title = card.name;
    this._link = card.link;
    this._template = document.querySelector(template).content;
    
    this._likeCard = () => {
      this._likeButton.classList.toggle('card__like_active')
    }
    
    this._deleteCard = () => {
      this._newCard.remove();
    }
    
    this._showImage = () => {
      imageDescription.textContent = this._title;
      fullImage.alt = this._title;
      fullImage.src = this._link;
      openPopup(popupShowPic);
    }
    
    this._setEventListeners = () => {
      this._deleteButton = this._newCard.querySelector('.card__delete');
      this._likeButton.addEventListener('click',  this._likeCard);
      this._deleteButton.addEventListener('click', this._deleteCard);
      this._cardPic.addEventListener('click', this._showImage);
    }
  }
  //публичный метод создания карточки
  addCard() {
    this._newCard = this._template.cloneNode(true);
    this._cardPic = this._newCard.querySelector('.card__image');
    this._likeButton = this._newCard.querySelector('.card__like');
  
    this._cardPic.src = this._link;
    this._cardPic.alt = this._title;
    this._newCard.querySelector('.card__title').textContent = this._title;
  
    this._setEventListeners();
  
    return this._newCard;
  }
}

