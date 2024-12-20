/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from 'axios'
import { useEffect, useState } from 'react'
const ShowWeatherInfo = ({ countrie }) => {
    const [weather, setWeather] = useState([])
    
    useEffect(() => {
            const api_key = "e84ac9af2f415c6fb8ad4122caf95118"
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${countrie.capital}&appid=${api_key}`)
                .then(response => {
                    console.log(response.data)
                    setWeather(response.data)
                })
                .catch(error => console.error(error));
     }, [])
    if (countrie === null) return null
    if (weather.length === 0) return null    
    return (
        <>
            <h3>Weather in {countrie.capital}</h3>
            <p>temperature : {weather.main.temp - 273} ºC</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt={weather.weather[0].description} />
            <p>wind : {weather.wind.speed} m/s</p>
           
            


        </>
    )
}

export default ShowWeatherInfo