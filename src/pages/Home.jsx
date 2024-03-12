import React, { useEffect, useState } from "react";
import BigCard from "../components/BigCard.jsx";
import CardList from "../components/CardList.jsx";
import GlowCircle from "../components/GlowCircle.jsx";
import WeatherInfo from "../components/WeatherInfo.jsx";
import { useLocations } from "../hooks/UseLocations.jsx";
import { getWeatherIcon } from "../utils.jsx";

const key = "905f1a7f4bc64c91bb1150432240403";

function Home() {
    const [weatherData, setWeatherData] = useState({});
    const [location, setLocation] = useState('');
    const [suggestions, setSuggestions] = useState([]); // State for suggestions
    const { getSelectedLocation, addLocation, selectLocation } = useLocations();

    async function fetchData(loc) {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?q=${loc}&days=7`, {
            method: 'GET',
            headers: {
                'key': key,
            }
        });
        const data = await response.json();
        if (response.ok) {
            setWeatherData(data);
            const location = {
                name: data.location.name,
                country: data.location.country,
                selected: false
            };
            addLocation(location);
            selectLocation(location);
        }
    }

    useEffect(() => {
        fetchData(getSelectedLocation()?.name ?? "London");
    }, []);
  
    function handleSubmit(event) {
        event.preventDefault();
        fetchData(location);
    }

    // Function to fetch location suggestions
    async function fetchLocationSuggestions(query) {
        const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${key}&q=${query}`);
        const data = await response.json();
        setSuggestions(data.map(item => item.name));
    }

    // Function to handle suggestion click
    function handleSuggestionClick(suggestion) {
        setLocation(suggestion);
        setSuggestions([]); // Clear suggestions
    }
    
    return (
        <>
            <GlowCircle x={0} y={0} opacity={0.15} blur={60} />

            <header className="flex w-full h-fit px-8">
                <form className="flex items-center gap-4 w-full" onSubmit={handleSubmit}>
                    <div className="flex items-center gap-4 bg-dark-gray border border-gray rounded-2xl w-full py-2 px-4 shadow-primary relative">
                        <i className="fas fa-search text-light-gray"></i>
                        <input 
                            type="text" 
                            className="bg-transparent outline-none text-light-gray w-full" 
                            value={location} 
                            onChange={e => {
                                setLocation(e.target.value);
                                fetchLocationSuggestions(e.target.value); // Fetch suggestions as the user types
                            }} 
                        />
                        {suggestions.length > 0 && (
                            <ul className="suggestions-dropdown absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-sm shadow-md">
                                {suggestions.map((suggestion, index) => (
                                    <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="cursor-pointer px-4 py-2 hover:bg-gray-100">{suggestion}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button type="submit" className={`bg-blue pulsing-btn rounded-full flex justify-center items-center h-full aspect-square shadow-primary`}>
                        <i className="fa-solid fa-arrow-pointer"></i>
                    </button>
                </form>
            </header>

        <main className="flex items-center flex-col gap-4 w-full h-full overflow-auto px-8 py-8 rounded-[80px]">
            <WeatherInfo temperature={weatherData?.current?.temp_c} summary={weatherData?.current?.condition?.text} location={weatherData?.location} icon={getWeatherIcon(weatherData?.current?.condition?.code)} />
            <BigCard wind={weatherData?.current?.wind_kph} rain={weatherData?.current?.precip_mm} humidity={weatherData?.current?.humidity} />
            <CardList title={"Hourly"} data={weatherData?.forecast?.forecastday[0].hour} />
            <CardList title={"Daily"} data={weatherData?.forecast?.forecastday} />
        </main>
    </>
  )
}

export default Home