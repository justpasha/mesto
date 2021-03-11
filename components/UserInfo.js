export default class UserInfo {
  constructor({ nameSelector, discriptionSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._descriptionSelector = document.querySelector(discriptionSelector);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._nameSelector,
      description: this._descriptionSelector,
    };

    return this._userInfo;
  }

  setUserInfo({ name, description }) {
    this._nameSelector.textContent = name;
    this._descriptionSelector.textContent = description;
  }
}
