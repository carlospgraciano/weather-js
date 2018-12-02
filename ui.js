class UI {
  constructor() {
    this.locationTitle = document.querySelector('#w-location');
    this.weatherDescription = document.querySelector('#w-desc');
    this.weatherTemperature = document.querySelector('#w-string');
    this.weatherIcon = document.querySelector('#w-icon');
    this.weatherHumidity = document.querySelector('#w-humidity');
    this.weatherSunrise = document.querySelector('#w-sunrise');
    this.weatherSunset = document.querySelector('#w-sunset');
    this.weatherWind = document.querySelector('#w-wind');
  };

  setWeatherInformation(weatherInfo) {
    const { weather: rawWeather, main, wind, sys, name } = weatherInfo;
    const weather = this.getLastWeather(rawWeather);

    this.locationTitle.innerHTML = `${name}, ${sys.country}`;
    this.weatherDescription.innerHTML = `${weather.description}`;
    this.weatherTemperature.innerHTML = `${this.convertKelvinToCelsius(main.temp)} °C`;
    this.weatherIcon.setAttribute('src', this.getIconURL(weather.icon));
    this.weatherHumidity.innerHTML = `Relative Humidity: ${main.humidity}%`;
    this.weatherSunrise.innerHTML = `Sunrise Time: ${this.getReadableDate(sys.sunrise)}`;
    this.weatherSunset.innerHTML = `Sunset Time: ${this.getReadableDate(sys.sunset)}`;
    this.weatherWind.innerHTML = `Wind: From the ${this.getWindDirection(wind.deg)} at ${wind.speed} MPH`;
  }

  getIconURL(iconCode) {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  }

  getReadableDate(unixTimestamp) {
    return moment.unix(unixTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss A');
  }

  getWindDirection(angle) {
    const directions = ['North', 'North-West', 'West', 'South-West', 'South', 'South-East', 'East', 'North-East'];
    return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8];
  }

  getLastWeather(rawWeather) {
    const lastIndex = (rawWeather.length - 1);
    return rawWeather[lastIndex];
  }

  convertKelvinToCelsius(temperature) {
    return Math.round(temperature - 273.15);
  }

  weatherRequestError(payload) {
    swal({
      title: 'Oops!',
      text: `Something went wrong: ${payload.message}`,
      type: 'error',
    });
  }

  emptyLocationName() {
    swal({
      title: 'No location name detected!',
      text: 'Must insert location name to search',
      type: 'error',
    });
  }

  resetFieldValue(field) {
    field.value = '';
  }

  static showModal(id) {
    $(`#${id}`).modal('show');
  }

  static hideModal(id) {
    $(`#${id}`).modal('hide');
  }
};