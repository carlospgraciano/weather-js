class WeatherStorage {
  setToLocalStorage(key, payload) {
    // If record already exists - Overwrite it
    if (this.retrieveFromLocalStorage(key)) this.removeFromLocalStorage(key);
    const value = JSON.stringify(payload);
    localStorage.setItem(key, value);
  }

  retrieveFromLocalStorage(key) {
    const rawResponse = localStorage.getItem(key);
    return JSON.parse(rawResponse);
  }

  removeFromLocalStorage(key) {
    localStorage.removeItem(key);
  }
}