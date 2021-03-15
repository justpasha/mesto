export default class UserInfo {
  constructor({ nameSelector, discriptionSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._descriptionSelector = document.querySelector(discriptionSelector);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._nameSelector.textContent,
      description: this._descriptionSelector.textContent,
    };

    return this._userInfo;
  }

  setUserInfo(item) {
    this._nameSelector.textContent = item.name;
    this._descriptionSelector.textContent = item.description;
  }
}
