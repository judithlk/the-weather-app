import React, { useState } from "react";
import './MainComponent.css';
import axios from 'axios';
import { Search } from 'react-bootstrap-icons'
// import { Container } from 'react-bootstrap';

function MainComponent() {
    const [city, setCity] = useState('');
    let Result = new Object();

    const handleChange = (e) => {
        setCity(e.target.value);
    }

    const ktoC = (x) => {
        return Math.floor(x - 273.15);
    }

    const ktoF = (x) => {
        return Math.floor(((x - 273.15) * (9/5)) + 32); 
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OW_API_KEY}`)

        .then(data => {
            Result = data.data;
            document.getElementById('container').style.display = "block";
            document.getElementById('city-name').innerHTML = `<h2>${Result.name}</h2>`;

            document.getElementById('weather-icon').innerHTML =`<img src=${`https://openweathermap.org/img/wn/${Result.weather[0].icon}@2x.png`} alt="weather icon"/>
            <h5>${Result.weather[0].description}</h5>`;  

            document.getElementById("temp-display").innerHTML = `<h4>${ktoC(Result.main.temp)} °C</h4>
            <h4>${ktoF(Result.main.temp)} °F</h4>`;
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter city name..." onChange={handleChange} />
                <button type="submit">
                    <Search></Search>
                </button>
            </form>
            <div className="container" id="container">
                <div className="row weather-display" id="weather-display">
                    <div className="row city-name" id="city-name"></div>
                    <div className="row other-info">
                        <div className="col-m-5 weather-icon" id="weather-icon"></div>
                        <div className="col-m-5 temp-display" id="temp-display"></div>
                    </div>
                </div>
            </div>
            <footer>
                <span>Written by <a href="https://github.com/judithlk/" target="_blank" rel="noreferrer">Judith Yusuf</a>. Powered by <a href="https://openweathermap.org/" target="_blank" rel="noreferrer">OpenWeatherMap</a></span>
            </footer>
        </div>
    );
}

export default MainComponent;