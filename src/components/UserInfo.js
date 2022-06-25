export default class UserInfo {
  constructor({nameElementSelector, jobElementSelector, avatarSelector}) {
    this._nameElement = document.querySelector(nameElementSelector);
    this._jobElement = document.querySelector(jobElementSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatarElement.src
    }
  }

  setUserInfo({ name, job, avatar}) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    this._avatarElement.src = avatar;
  }
}
