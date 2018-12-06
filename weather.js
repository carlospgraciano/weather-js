class Weather {
  constructor() {
    this.apiKey = '11a5db272ecfa35656c61f42c6f7b9a5';
    this.city = '';
  }
  // Change Weather Location By Name
  setLocationByName(city) {
    this.city = city;
  }

  // Fetch Geolocation API
  async getPosition() {
    return await new Promise((resolve) => navigator.geolocation.getCurrentPosition((position) => resolve(position.coords)));
  }

  // Fetch weather API
  async getWeatherByName() {
    const rawApiResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=${this.apiKey}`);
    return await rawApiResponse.json();
  }

  async getWeatherByLatLon(coords) {
    const { latitude, longitude } = coords;
    const rawApiResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${this.apiKey}`);
    return await rawApiResponse.json();
  }
}