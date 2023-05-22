import React, { useEffect, useState } from 'react'
import Weathercard from './Weathercard';

const Main = () => {
    const [searchValue,setSearchValue]=useState("jamshedpur");
    const[tempinfo,settempinfo]=useState({});
    const getWeatherInfo=async()=>{
     try{
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=2896df3eca263a5779b282b2091f9f7f`;
        const res= await fetch(url);
        const data= await res.json();
        // console.log(data);
        const{temp,humidity,pressure}=data.main;
        const{main:weathermood}=data.weather[0];
        const{name}=data;
        const {speed}=data.wind;
         const{country,sunset}=data.sys;
         const myweatherInfo ={
            temp,
            humidity,
            pressure,
            weathermood,
            name,
            speed,
            country,
            sunset,
         };
         settempinfo(myweatherInfo);
        // console.log(temp);
     }
     catch(error){
        console.log(error);

     }
    };
    useEffect(()=>{
        getWeatherInfo();
    },[])
    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input type="search"
                        placeholder='Search...'
                        autoFocus
                        id='search'
                        className='searchTerm'
                        value={searchValue}
                        onChange={(e)=>setSearchValue(e.target.value)} />
                    <button className='searchButton' type='button' onClick={getWeatherInfo}>
                        Search
                    </button>

                </div>
            </div>
            {/* tempcard */}
           <Weathercard tempinfo={tempinfo}/>
          
        </>
    )
}

export default Main
