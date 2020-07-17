class Weather {

  constructor(city, state, country) {
    this.apiKey = 'bf22686c27c6236abca71acfdcaba465';
    this.city = city;
    this.state = state;
    this.country = country;
  }

  // Fetch weather from API
  async getWeather() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state},${this.country}&units=metric&APPID=${this.apiKey}`);

    const responseData = await response.json();

    return responseData;  // .current_observation
  }

  // Change weather location
  changeLocation(city, state, country) {
    this.city = city;
    this.state = state;
    this.country = country;
  }
}