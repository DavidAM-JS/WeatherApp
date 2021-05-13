const searchForm = document.querySelector('.search-location');
const inputCity = document.querySelector('.inputCity');
var searchBox = new google.maps.places.Autocomplete(inputCity, { types: ['(regions)'] });
const weatherContainer = document.querySelector('.back-card');
const cityValue = document.querySelector('.search-location input');
const cityName = document.querySelector('.city-name p');
const cardBody = document.querySelector('.card-body');
const cardInfo = document.querySelector('.back-card');
const degress = document.querySelector('.degrees');
const condition = document.querySelector('.condition');
const high = document.querySelector('.high');
const low = document.querySelector('.low');
const feels = document.querySelector('.feels-like');
const humidity = document.querySelector('.humidity');
let icon = document.querySelector('.icon');

google.maps.event.addListener(searchBox, 'place_changed', function () {
  var place = searchBox.getPlace();
});

const spitOutCelcius = (kelvin) => {
  celcius = Math.round(kelvin - 273.15);
  return celcius;
}

const isDayTime = (icon) => {
  if (icon.includes('d')) { return true }
  else { return false }
}

updateWeatherApp = (city) => {
  console.log(city);
  let imageName = city.weather[0].icon;
  cityName.textContent = city.name;
  degress.innerHTML = `${spitOutCelcius(city.main.temp)} °C`;
  condition.innerHTML = `${city.weather[0].description}`;
  high.innerHTML = `<b>Temp Max.</b>${spitOutCelcius(city.main.temp_max)} °C &#129045`;
  low.innerHTML = `<b>Temp Min.</b>${spitOutCelcius(city.main.temp_min)} °C &#129047`;
  feels.innerHTML = `<b>Feels Like</b>${spitOutCelcius(city.main.feels_like)} °C`;
  humidity.innerHTML = `<b>Humidity</b>${city.main.humidity}%`;

  if (isDayTime(imageName)) {
    let iconSrc = '';
    switch (imageName) {
      case '01d':
        iconSrc = `./img/animated/day.svg`;
        icon.setAttribute('src', `${iconSrc}`);
        weatherContainer.style.backgroundImage = "url('img/Soleado.png')";
        weatherContainer.style.backgroundSize = "cover";
        break;
      case '02d':
        iconSrc = `./img/animated/cloudy-day-1.svg`;
        icon.setAttribute('src', `${iconSrc}`);
        weatherContainer.style.backgroundImage = "url('img/Soleado.png')";
        weatherContainer.style.backgroundSize = "cover";
        break;
      case '03d':
        iconSrc = `./img/animated/cloudy-day-1.svg`;
        icon.setAttribute('src', `${iconSrc}`);
        weatherContainer.style.backgroundImage = "url('img/Nublado.png')";
        weatherContainer.style.backgroundSize = "cover";
        break;
      case '04d':
        iconSrc = `./img/animated/cloudy.svg`;
        icon.setAttribute('src', `${iconSrc}`);
        weatherContainer.style.backgroundImage = "url('img/Nublado.png')";
        weatherContainer.style.backgroundSize = "cover";
        break;
      case '10d':
        iconSrc = `./img/animated/rainy-1.svg`;
        icon.setAttribute('src', `${iconSrc}`);
        weatherContainer.style.backgroundImage = "url('img/Nublado.png')";
        weatherContainer.style.backgroundSize = "cover";
        break;
      case '09d':
        iconSrc = `./img/animated/rainy-6.svg`;
        icon.setAttribute('src', `${iconSrc}`);
        weatherContainer.style.backgroundImage = "url('img/Lluvioso.png')";
        weatherContainer.style.backgroundSize = "cover";
        break;
      case '11d':
        iconSrc = `./img/animated/thunder.svg`;
        icon.setAttribute('src', `${iconSrc}`);
        weatherContainer.style.backgroundImage = "url('img/TormentaElectrica.png')";
        weatherContainer.style.backgroundSize = "cover";
        break;
    }
  } else {
    console.log('night');
    weatherContainer.style.backgroundImage = "url('img/Despejado.png')";
    weatherContainer.style.backgroundSize = "cover";
    let iconSrc = '';
    switch (imageName) {
      case '01n':
        iconSrc = `./img/animated/night.svg`;
        icon.setAttribute('src', `${iconSrc}`);
        break;
      case '02n', '03n':
        iconSrc = `./img/animated/cloudy-night-1.svg`;
        icon.setAttribute('src', `${iconSrc}`);
        break;
      case '04n':
        console.log('Hola');
        iconSrc = `./img/animated/cloudy.svg`;
        icon.setAttribute('src', `${iconSrc}`);
        break;
      case '10n', '09n':
        iconSrc = `./img/animated/rainy-6.svg`;
        icon.setAttribute('src', `${iconSrc}`);
        break;
      case '11n':
        iconSrc = `./img/animated/thunder.svg`;
        icon.setAttribute('src', `${iconSrc}`);
        break;
    }
  }
  cardInfo.classList.remove('d-none');
}

//add an event listner to the form
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const citySearched = cityValue.value.trim();
  console.log(citySearched);
  searchForm.reset();

  requestCity(citySearched)
    .then((data) => {
      console.log(data);
      updateWeatherApp(data);
    })
    .catch((error) => { console.log(error) });
})
