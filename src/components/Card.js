import { openPopup } from '../pages'
import { popupShowPic, fullImage, imageDescription } from './constants.js'

export class Card {
  constructor(card, template) {
    this._title = card.name;
    this._link = card.link;
    this._template = document.querySelector(template).content;
  }
  
  _likeCard = () => {
    this._likeButton.classList.toggle('card__like_active');
  }
  
  _deleteCard = () => {
    this._cardElement.remove();
  }
  
  _showImage = () => {
    imageDescription.textContent = this._title;
    fullImage.alt = this._title;
    fullImage.src = this._link;
    openPopup(popupShowPic);
  }
  
  _setEventListeners = () => {
    this._likeButton.addEventListener('click',  this._likeCard);
    this._deleteButton.addEventListener('click', this._deleteCard);
    this._cardPic.addEventListener('click', this._showImage);
  }
  //публичный метод создания карточки
  addCard() {
    this._cardElement = this._template.querySelector('.card__element').cloneNode(true);
    this._cardPic = this._cardElement.querySelector('.card__image');
    this._likeButton = this._cardElement.querySelector('.card__like');
    this._deleteButton = this._cardElement.querySelector('.card__delete');
  
    this._cardPic.src = this._link;
    this._cardPic.alt = this._title;
    this._cardElement.querySelector('.card__title').textContent = this._title;
  
    this._setEventListeners();
  
    return this._cardElement;
  }
}

