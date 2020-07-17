class UI {

  constructor() {
    this.location = document.getElementById('w-location');
    this.desc = document.getElementById('w-desc');
    this.temp = document.getElementById('w-temp');
    this.details = document.getElementById('w-details');
    this.icon = document.getElementById('w-icon');
    
    this.humidity = document.getElementById('w-humidity');
    this.tempMin = document.getElementById('w-temp-min');
    this.tempMax = document.getElementById('w-temp-max');


    this.feelsLike = document.getElementById('w-feels-like');
    this.pressure= document.getElementById('w-pressure');
    this.wind = document.getElementById('w-wind');
  }

  paint(weather) {
    this.location.textContent = `${weather.name}, ${weather.sys.country}`;
    this.desc.textContent = weather.weather[0].main;

    this.temp.textContent = `Temperature: ${weather.main.temp}`;
    this.temp.innerHTML += ' &#8451;' ;

    this.icon.setAttribute('src', `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);

    this.humidity.textContent = `Relative Humidity: ${weather.main.humidity}%`;
    this.tempMin.textContent = `Min temperature: ${weather.main.temp_min}`;
    this.tempMin.innerHTML += ' &#8451;' ;

    this.tempMax.textContent = `Max temperature: ${weather.main.temp_max}`;
    this.tempMax.innerHTML += ' &#8451;' ;

    this.feelsLike.textContent = `Feels Like: ${weather.main.feels_like}` ;
    this.feelsLike.innerHTML += ' &#8451;' ;

    this.pressure.textContent = `Pressure: ${weather.main.pressure} Pa`;
    this.wind.textContent = `Wind Speed: ${weather.wind.speed} km/h`;
  }

}