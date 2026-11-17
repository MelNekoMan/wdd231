// Select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#weather-desc');
const highTemp = document.querySelector('#high-temp');
const lowTemp = document.querySelector('#low-temp');
const humidity = document.querySelector('#humidity');
const forecastContainer = document.querySelector('#forecast-container');

const apiKey = 'cb38f0e514bc564da87b9dd459aef022';
const lat = '10.4806';
const lon = '-66.9036';

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function apiFetch() {
  try {
    const response = await fetch(weatherUrl);
    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    } else {
      throw Error(await response.text());
    }

    const forecastResponse = await fetch(forecastUrl);
    if (forecastResponse.ok) {
      const forecastData = await forecastResponse.json();
      displayForecast(forecastData);
    } else {
      throw Error(await forecastResponse.text());
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function displayResults(data) {
  currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
  const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  let desc = data.weather[0].description;

  desc = desc.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  weatherIcon.setAttribute('src', iconSrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;
  highTemp.innerHTML = `${Math.round(data.main.temp_max)}&deg;C`;
  lowTemp.innerHTML = `${Math.round(data.main.temp_min)}&deg;C`;
  humidity.textContent = `${data.main.humidity}%`;
}

function displayForecast(data) {
  forecastContainer.innerHTML = '';

  const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

  dailyForecasts.forEach(day => {
    const date = new Date(day.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const temp = Math.round(day.main.temp);

    const p = document.createElement('p');
    p.innerHTML = `${dayName}: <strong>${temp}&deg;C</strong>`;
    forecastContainer.appendChild(p);
  });
}

apiFetch();