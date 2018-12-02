class Weather {
  constructor() {
    this.apiKey = '11a5db272ecfa35656c61f42c6f7b9a5';
  }
  // Change Weather Location By Name
  setLocationByName(city) {
    this.city = city;
  }
  // Fetch weather API
  async getWeather() {
    const rawApiResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=${this.apiKey}`);
    return await rawApiResponse.json();
  }
}