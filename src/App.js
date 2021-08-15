import cloudImg from './images/cloud-image.png';
import './App.css';
import { useState } from 'react';



const API_KEY = "1d760bdbc81c4e87e76a123e70a5940c";


function App() {
  const [cityName, setCityName] = useState("");
  const [weatherInfo, setWeatherInfo] = useState({});


  console.log(cityName)

  function getResult(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`)
        .then((res) => res.json())
        .then((result) => {
          setWeatherInfo(result)
          console.log(result)
          // console.log(result.weather[0].main)
        })
    }
  }


  const getData = (e) => {
    console.log(e.target.value)
    setCityName(e.target.value)
  }


  return (
    <div className="container">
      <form className="col-md-6 m-auto py-5">
        <div className="input-group mb-3">
          <input
            onChange={getData}
            value={cityName}
            onKeyPress={getResult}
            type="text" className="form-control" placeholder="Enter a location for Weather" />
          <div className="input-group-append">
            <button onClick={getResult} type="button" className="btn btn-danger">Search</button>
          </div>
        </div>
      </form>
      <div className="weather-status text-white text-center">
        <img src={cloudImg} alt="" />
        {typeof weatherInfo.main != "undefined" ? (
          <div>
            <h1>{weatherInfo.name}, {weatherInfo.sys.country}</h1>
            <h3><span>{(Math.round(weatherInfo.main.temp))}</span>&deg;C</h3>
            <h1 className="lead">{weatherInfo.weather[0].main}</h1>
          </div>
        ) : (
          <h3>{weatherInfo.message}</h3>
        )}
      </div>
    </div>
  );
}

export default App;
