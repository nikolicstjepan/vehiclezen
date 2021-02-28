class User {
  constructor() {
    const checkLocalStorage = localStorage.getItem("token");

    if (checkLocalStorage) {
      this.token = localStorage.getItem("token");
    }
  }

  setUserToken(newToken) {
    this.token = newToken;
    return localStorage.setItem("token", newToken);
  }

  removeUserToken() {
    this.token = null;
    return localStorage.setItem("token", "");
  }

  getUserToken() {
    return this.token;
  }

  isLoggedIn() {
    return !!this.token;
  }
}

export default new User();
