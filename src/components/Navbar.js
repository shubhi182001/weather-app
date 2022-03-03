import React, { useEffect, useState } from 'react'
import Temp from './Temp';
// import {Navlink} from "react-router-dom"

export default function Navbar() {

    const [searchValue, setSearchValue] = useState("new york");
    const [tempInfo, setTempInfo] = useState({});
    const getWeatherInfo = async () =>{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=f3e000eea3d5fffee17f187837f4c47a`; 
            let res = await fetch(url);
            let data = await res.json();
            
            const {temp, humidity, pressure} = data.main;
            const {main:weathermood} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country, sunset} = data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };
            setTempInfo(myNewWeatherInfo);
        } catch (error){
            console.log(error);
        }
    };


    useEffect(() => 
    {getWeatherInfo();
    }, []);

    return (
        

        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">WeatherApp</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        {/* <li className="nav-item">
                        <a className="nav-link" href="/">Links</a>
                        </li> */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                MORE
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="/">Air Quality</a></li>
                                <li><a className="dropdown-item" href="/">News</a></li>
                                <li><a className="dropdown-item" href="/">Videos</a></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><a className="dropdown-item" href="/">Radar and Maps</a></li>
                            </ul>
                        </li>
                        
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search for Cities" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                        <button className="btn btn-outline-success" type="button" onClick={getWeatherInfo}>Search</button>
                    </form>
                    </div>
                </div>
            </nav>
            <Temp tempInfo={tempInfo} />
        </>
    )
}
