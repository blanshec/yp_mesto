export default class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.auth = options.headers.authorization;
  }
  async getInitialCards() {
    const res = await fetch(`${this.url}/cards`, {
      headers: {
        authorization: this.auth
      }
    });
    if (res.ok) {
      /* Можно лучше: лучше преобразование в json оставить в классе Api в методе getInitialCards, а из него
        возвращать уже готовые данные */
      return res.json();
    }
    return Promise.reject(`An error occured: ${res.status}`);
  }
  async getUserData() {
    const res = await fetch(`${this.url}/users/me`, {
      headers: {
        authorization: this.auth
      }
    });
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`An error occured: ${res.status}`);
  }
  patchProfile(name, job) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.auth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        about: job
      })
    });
  }
}
