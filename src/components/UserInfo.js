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
    if (name) {
      this._nameElement.textContent = name;
    }
    if (job) {
      this._jobElement.textContent = job;
    }
    if (avatar) {
      this._avatarElement.src = avatar;
    }
  }
}
