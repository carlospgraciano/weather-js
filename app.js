// Init Classes
const ui = new UI();
const weather = new Weather();
const WStorage = new WeatherStorage();

// UI Variables
const form = document.querySelector('#w-form');
const locationBtn = document.querySelector('#w-change-btn');
const locationName = document.querySelector('#city');

// Set Event Listeners
form.addEventListener('submit', (e) => e.preventDefault());
locationBtn.addEventListener('click', searchWeatherByName);
locationName.addEventListener('keydown', (e) => (e.keyCode === 13) && searchWeatherByName());

function searchWeatherByName() {
  const locationValue = locationName.value;
  if(!locationValue) return ui.emptyLocationName();
  
  weather.setLocationByName(locationValue);
  weather.getWeather()
        .then((payload) => {
          if(payload.cod === '404') return ui.weatherRequestError(payload);
          ui.setWeatherInformation(payload);
          WStorage.setToLocalStorage('weather', payload);
        })
        .catch((err) => console.error(err));
  
  UI.hideModal('changeLocation');
  ui.resetFieldValue(locationName);
};

function initializeData() {
  const lastWeatherInfo = WStorage.retrieveFromLocalStorage('weather');
  if (lastWeatherInfo) ui.setWeatherInformation(lastWeatherInfo);
};

initializeData();