let dark_mood = document.getElementById('dark_mood')
let container = document.querySelector('.container')
let value = false;
dark_mood.addEventListener('click', () => {
    value = !value;
    if (value == true) {
        container.classList.remove('container')
        container.classList.add('container2')
    }else{
        container.classList.remove('container2')
        container.classList.add('container')
    }
console.log(value);
})


let weather_city = document.querySelector('.weather_city')
let weather_date_time = document.querySelector('.weather_date_time')
let weather_forecast = document.querySelector('.weather_forecast')
let weather_icon = document.querySelector('.weather_icon')
let weather_tempeature = document.querySelector('.weather_tempeature')
let weather_main = document.querySelector('.weather_main')
let weather_max = document.querySelector('.weather_max')
let weather_search = document.querySelector('.weather_search')

// for the last part 
let weather_FeelsLike = document.querySelector('.weather_FeelsLike')
let weather_Humidity = document.querySelector('.weather_Humidity')
let weather_Wind = document.querySelector('.weather_Wind')
let weather_Pressure = document.querySelector('.weather_Pressure')

// get the actual country name 

let getCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);
}

// get date and time 
let getDateTime = (dt) => {
        let curDate = new Date(dt * 1000)
        let options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };
        const formatter = new Intl.DateTimeFormat('en-US', options).format(curDate)
        return formatter
}

// Search Fanctionality Start

let city_name = document.querySelector('.city_name')

let intputValue = 'Dhaka';
weather_search.addEventListener('submit', (e) => {
    e.preventDefault()
    if (city_name.value != '') {
        intputValue = city_name.value
        getWeatherData()
        city_name.value = ''
    }
})
// Search Fanctionality End

const getWeatherData = async () => {
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${intputValue}&APPID=c0b359808b7eaa0aaa5f7ea240fd693d`

    try {
        let res = await fetch(weatherUrl);
        let data = await res.json();
        const { main, name, weather, wind, sys, dt } = data;
        weather_city.innerHTML = `${name}, ${getCountryName(sys.country)}`
        weather_date_time.innerHTML = getDateTime(dt);
        weather_forecast.innerHTML = weather[0].main
        weather_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`
        weather_tempeature.innerHTML = `${main.temp.toFixed()}&#176`
        weather_main.innerHTML = `main: ${main.temp_min.toFixed()}&#176`
        weather_max.innerHTML = `max: ${main.temp_max.toFixed()}&#176`

        // for the last part 
        weather_FeelsLike.innerHTML = `${main.feels_like.toFixed()}&#176`
        weather_Humidity.innerHTML = `${main.humidity.toFixed()}%`
        weather_Wind.innerHTML = `${wind.speed}m/s`
        weather_Pressure.innerHTML = `${main.pressure.toFixed()} hPa`
    } catch (error) {
        console.log(error);
    }

    // console.log(name);
}
// getWeatherData()

document.body.addEventListener('load', getWeatherData())