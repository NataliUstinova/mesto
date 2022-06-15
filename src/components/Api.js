class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  
<<<<<<< HEAD
  
  getUserInfoServer() {
=======
  getUserInfo() {
>>>>>>> d3b81b2ff8dc1bc6946efd6bba919cde65f9ecbc
    return  fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }
  getInitialCards() {
    // ...
  }
}
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: '46f10111-7535-41c9-bac2-e4a6e0f14e0d',
    'Content-Type': 'application/json'
  }
}); 