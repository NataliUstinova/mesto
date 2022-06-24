export default class Card {
  constructor(card, template, handleCardClick, handleLikeClick, handleDeleteCardClick) {
    this._template = document.querySelector(template).content;
    
    this._title = card.name;
    this._link = card.link;
    this._likes = card.likes;
    this._id = card.id;
    this._userId = card.userId;
    this._ownerId = card.ownerId;
    
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleLikeClick = handleLikeClick;
  }
  
  _likeCard = () => {
    this._likeButton.classList.toggle('card__like_active');
  }
  
  _isLiked() {
    return this._likes.find(user => user._id === this._userId);
  }
  
  _setLikes(likes) {
    this._likes = likes;
    this._likeCountElement = this._cardElement.querySelector('.card__like-counter');
    this._likeCountElement.textContent = this._likes.length;
    
    if(this._isLiked()) {
      this._likeCard();
    }
  }
  
  _deleteCard = () => {
    this._cardElement.remove();
  }
  
  _setEventListeners = () => {
    this._likeButton.addEventListener('click',  this._handleLikeClick);
    this._deleteButton.addEventListener('click', this._handleDeleteCardClick);
    this._cardPic.addEventListener('click', this._handleCardClick);
  }
  _getTemplate = () => {
    return this._cardElement = this._template.querySelector('.card__element').cloneNode(true);
  }
  
  getCardId = () => this._id;
  
  //публичный метод создания карточки
  addCard() {
    this._getTemplate();
    this._cardPic = this._cardElement.querySelector('.card__image');
    this._likeButton = this._cardElement.querySelector('.card__like');
    this._deleteButton = this._cardElement.querySelector('.card__delete');

    
    this._cardPic.src = this._link;
    this._cardPic.alt = this._title;

    this._cardElement.querySelector('.card__title').textContent = this._title;
  
    this._setEventListeners();
    this._setLikes(this._likes)
    
    if(this._ownerId !== this._userId) {
      this._deleteButton.style.display = 'none';
    }
  
    return this._cardElement;
  }
}

