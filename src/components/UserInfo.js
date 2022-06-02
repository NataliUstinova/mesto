export default class UserInfo {
  constructor({nameElementSelector, userInfoElementSelector}) {
    this._nameElement = document.querySelector(nameElementSelector);
    this._userInfoElement = document.querySelector(userInfoElementSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._userInfoElement.textContent,
    }
  }
  setUserInfo(name, job) {
    this._nameElement.textContent = name.value;
    this._userInfoElement.textContent = job.value;
  }
}
