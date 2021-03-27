export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
    this._user = 'users/me';
    this._cards = 'cards';
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(console.log(`Произошла ошибка ${res.status}`));
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/${this._cards}`, {
      headers: this.headers,
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/${this._user}`, {
      headers: this.headers,
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  editProfileInfo(data) {
    return fetch(`${this.baseUrl}/${this._user}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).catch((err) => console.log(err));
  }

  createCard(data) {
    return fetch(`${this.baseUrl}/${this._cards}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).catch((err) => console.log(err));
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/${this._cards}/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    }).catch((err) => console.log(err));
  }

  setLike(cardId) {
    return fetch(`${this.baseUrl}/${this._cards}/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers,
    }).catch((err) => console.log(err));
  }

  deleteLike(cardId) {
    return fetch(`${this.baseUrl}/${this._cards}/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    }).catch((err) => console.log(err));
  }

  changeAvatar(data) {
    return fetch(`${this.baseUrl}/${this._user}/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).catch((err) => console.log(err));
  }
}
