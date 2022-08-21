export default class Card {
  constructor({card, userId, template, handleCardClick, handleLikeClick, handleDeleteCardClick}) {
    this._template = document.querySelector(template).content;
    
    this._title = card.name;
    this._link = card.link;
    this._likes = card.likes;
    this._id = card._id;
    this._userId = userId;
    this._ownerId = card.owner._id;
    
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleLikeClick = handleLikeClick;
  }
  
  isLiked() {
    return this._likes.find(user => user._id === this._userId);
  }

  _updateLikesView() {
    this._cardElement.querySelector('.card__like-counter').textContent = this._likes.length;
    if (this._likes.length === 0) {
      this._cardElement.querySelector('.card__like-counter').textContent = '';
    }
    if (this.isLiked()) this._cardElement.querySelector('.card__like')
      .classList.add('card__like_active');
    else this._cardElement.querySelector('.card__like')
      .classList.remove('card__like_active');
  }
  
  setLikes(likes) {
    this._likes = likes;
    this._updateLikesView();
  }
  
  deleteCard = () => {
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
    this._updateLikesView()
    
    if(this._ownerId !== this._userId) {
      this._deleteButton.style.display = 'none';
    }
  
    return this._cardElement;
  }
}

