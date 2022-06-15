class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  
  _checkServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }
  
  getUserInfoServer() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => this._checkServerResponse(res));
  }
  
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => this._checkServerResponse(res));
  }
  
  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(res => this._checkServerResponse(res))
  }
}
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: '46f10111-7535-41c9-bac2-e4a6e0f14e0d',
    'Content-Type': 'application/json'
  }
}); 