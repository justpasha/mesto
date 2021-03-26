export default class UserInfo {
  constructor({ nameSelector, discriptionSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(discriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._name.textContent,
      about: this._description.textContent,
    };

    return this._userInfo;
  }

  setUserInfo(item) {
    this._name.textContent = item.name;
    this._description.textContent = item.about;

    this._myId = item._id;
  }

  setAvatar(data) {
    this._avatar.src = data.avatar;
  }

  getUserId() {
    return this._myId;
  }
}
