import React, { useEffect, useState } from "react";
import BigCard from "../components/BigCard.jsx";
import CardList from "../components/CardList.jsx";
import GlowCircle from "../components/GlowCircle.jsx";
import WeatherInfo from "../components/WeatherInfo.jsx";
import { useLocations } from "../hooks/UseLocations.jsx";
import { getWeatherIcon } from "../utils.jsx";

const WEATHER_API_KEY = "905f1a7f4bc64c91bb1150432240403";
const OPEN_WEATHER_API_KEY = 'c71e8f930b674cc9033f4f2b9d9b7f36';

function Home() {
    const [weatherData, setWeatherData] = useState({});
    const [location, setLocation] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const { getSelectedLocation, addLocation, selectLocation } = useLocations();
    const [openWeatherData, setOpenWeatherData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    async function fetchWeatherAPI(loc) {
        setIsLoading(true);
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${loc}&days=7`, {
                method: 'GET',
                headers: {
                    'key': WEATHER_API_KEY,
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error('Weather data fetching failed');
            }
            setWeatherData(data);
            const location = {
                name: data.location.name,
                country: data.location.country,
                selected: false
            };
            addLocation(location);
            selectLocation(location);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    async function fetchOpenWeatherMap(loc) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${OPEN_WEATHER_API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error('Weather data fetching failed');
            }
            const data = await response.json();
            setOpenWeatherData(data);
        } catch (err) {
            console.error('Error fetching weather data:', err);
        } 
    }

    useEffect(() => {
        fetchWeatherAPI(getSelectedLocation()?.name ?? "London");
        fetchOpenWeatherMap(getSelectedLocation()?.name ?? "London");
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        fetchWeatherAPI(location);
        fetchOpenWeatherMap(location);
    }

    async function fetchLocationSuggestions(query) {
        const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${WEATHER_API_KEY}&q=${query}`);
        const data = await response.json();
        setSuggestions(data.map(item => item.name));
    }

    function handleSuggestionClick(suggestion) {
        setLocation(suggestion);
        setSuggestions([]);
    }
    
    return (
        <>
            <GlowCircle x={0} y={0} opacity={0.15} blur={60} />

            <header className="flex w-full h-fit px-8">
                <form className="flex items-center gap-4 w-full max-w-2xl mx-auto" onSubmit={handleSubmit}>
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
                    <button type="submit" className={`bg-blue pulsing-btn rounded-full flex justify-center items-center h-full aspect-square shadow-primary ${isLoading && 'loading'}`}>
                        <i className="fa-solid fa-arrow-pointer"></i>
                    </button>
                </form>
            </header>

        <main className="flex items-center flex-col gap-4 w-full h-full overflow-auto px-8 py-8 rounded-[80px]">
            {weatherData && (
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <WeatherInfo temperature={weatherData?.current?.temp_c} summary={weatherData?.current?.condition?.text} location={weatherData?.location} icon={getWeatherIcon(weatherData?.current?.condition?.code)} />
                    <BigCard 
                        title={"Current"}
                        data={[
                            { value: weatherData?.current?.wind_kph, unit: 'km/h', description: 'Wind' },
                            { value: weatherData?.current?.precip_mm, unit: 'mm', description: 'Rain' },
                            { value: weatherData?.current?.humidity, unit: '%', description: 'Humidity' }
                        ]}
                     />
                    <BigCard 
                        title={"Marine"}
                        data={[
                            { value: openWeatherData?.main?.pressure, unit: 'Pa', description: 'Pressure' },
                            { value: openWeatherData?.main?.feels_like, unit: '°C', description: 'Feels Like' },
                            { value: openWeatherData?.visibility, unit: 'm', description: 'Visibility' }  
                        ]}
                    />
                    <CardList title={"Hourly"} data={weatherData?.forecast?.forecastday[0].hour} />
                    <CardList title={"Daily"} data={weatherData?.forecast?.forecastday} />
                </div>
            )}
        </main>
    </>
  )
}

export default Home;
