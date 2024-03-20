import React, { useEffect, useState, useRef } from "react";
import BigCard from "../components/BigCard.jsx";
import CardList from "../components/CardList.jsx";
import GlowCircle from "../components/GlowCircle.jsx";
import WeatherInfo from "../components/WeatherInfo.jsx";
import WeatherGraphs from "../components/WeatherGraphs.jsx";
import { useLocations } from "../hooks/UseLocations.jsx";
import { getWeatherIcon } from "../utils.jsx";
import { motion } from "framer-motion";

// api keys
// const WEATHER_API_KEY = "905f1a7f4bc64c91bb1150432240403";old
const WEATHER_API_KEY = "51c9ed3ce362443dac1114615241803"; //new
const OPEN_WEATHER_API_KEY = 'c71e8f930b674cc9033f4f2b9d9b7f36';
// const WORLD_WEATHER_API_KEY = '5d566da289364451abf110654241303'; //old
// const WORLD_WEATHER_API_KEY = 'bd5271cc0f444116a32190453241803'; //new

function Home() {
    const [weatherData, setWeatherData] = useState({});
    const [location, setLocation] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const { getSelectedLocation, addLocation, selectLocation } = useLocations();
    const [openWeatherData, setOpenWeatherData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });//for graphs
    const [hourlyWeather, setHourlyWeather] = useState([]);//to display hourly weather
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        window.addEventListener('online', () => setIsOnline(true));
        window.addEventListener('offline', () => setIsOnline(false));
        return () => {
            window.removeEventListener('online', () => setIsOnline(true));
            window.removeEventListener('offline', () => setIsOnline(false));
        }
    })
    
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
            setCoordinates({ latitude: data.location.lat, longitude: data.location.lon });
            const location = {
                name: data.location.name,
                country: data.location.country,
                selected: false,
                lastUpdated: new Date().toISOString(),
                data
            };
            addLocation(location);
            selectLocation(location);
            return { latitude: data.location.lat, longitude: data.location.lon };
        } catch (error) {
            console.error('Error fetching weather data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    async function fetchOpenWeatherMap(latitude, longitude) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_API_KEY}&units=metric`);
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
        const selectedLocation = getSelectedLocation();
        if (selectedLocation) {
            if (!isOnline) {
                setWeatherData(selectedLocation.data);
                setCoordinates({ latitude: selectedLocation.data.location.lat, longitude: selectedLocation.data.location.lon });
                return;
            }
            fetchWeatherAPI(`${selectedLocation.name},${selectedLocation.country}`).then(coords => {
                fetchOpenWeatherMap(coords.latitude, coords.longitude);
            })
        } else {
            // Fetch live location
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCoordinates({ latitude, longitude });
                fetchWeatherAPI(`${latitude},${longitude}`);
                fetchOpenWeatherMap(latitude, longitude);
            }, 
            (error) => {
                console.error('Error getting geolocation:', error);
                // default location if geolocation fails
                fetchWeatherAPI(getSelectedLocation()?.name ?? "London");
                fetchOpenWeatherMap(getSelectedLocation()?.name ?? "London");
            });
        }
    }, []);

    function handleSubmit(event) {
        event?.preventDefault();
        fetchWeatherAPI(location).then(coords => {
            fetchOpenWeatherMap(coords.latitude, coords.longitude);
        })
    }

    async function fetchLocationSuggestions(query) {
        if (query.length < 3) return setSuggestions([]);
        const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${WEATHER_API_KEY}&q=${query}`);
        const data = await response.json();
        setSuggestions(data.map(item => item.name));
    }

    function handleSuggestionClick(suggestion) {
        setLocation(suggestion);
        setSuggestions([]);
    }

    useEffect(() => {
        if (weatherData.forecast && weatherData.forecast.forecastday && weatherData.forecast.forecastday.length > 0) {
            const now = new Date();
            const currentHour = now.getHours();
            const todayHourlyForecast = Array.isArray(weatherData?.forecast?.forecastday[0]?.hour) 
                                        ? weatherData.forecast.forecastday[0].hour : [];
            const tomorrowHourlyForecast = Array.isArray(weatherData?.forecast?.forecastday[1]?.hour) 
                                           ? weatherData.forecast.forecastday[1].hour : [];
            const hourlyForecasts = [...todayHourlyForecast, ...tomorrowHourlyForecast];
            const indexOfCurrentHour = hourlyForecasts.findIndex(hour => new Date(hour.time).getHours() === currentHour);
            const next24Hours = hourlyForecasts.slice(indexOfCurrentHour, Math.min(indexOfCurrentHour + 24, hourlyForecasts.length));

            setHourlyWeather(next24Hours);
        }
    }, [weatherData]);
    

    async function refreshWeatherData() {
        setIsLoading(true);
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            const { latitude, longitude } = position.coords;
            setCoordinates({ latitude, longitude });
            fetchWeatherAPI(`${latitude},${longitude}`);
            fetchOpenWeatherMap(latitude, longitude);
        } 
        catch (error) {
            console.error('Error refreshing weather data:', error);
        } 
        finally {
            setIsLoading(false);
        }
    }
    // added


    

    return (
        <>
            <GlowCircle x={0} y={0} opacity={0.15} blur={60} />

            <motion.header initial={{y: -100, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 1}} className="flex w-full h-fit px-8">
                <form className="flex items-center gap-4 w-full max-w-2xl mx-auto" onSubmit={handleSubmit}>
                    <button type="button" onClick={refreshWeatherData} className="bg-blue text-white pulsing-btn rounded-full flex justify-center items-center h-full aspect-square shadow-primary">
                        <i className="fas fa-map-marker-alt"></i>
                    </button>
                    <div className="flex items-center gap-4 bg-white border-white dark:bg-dark-gray border dark:border-gray rounded-2xl w-full py-2 px-4 shadow-primary relative text-gray dark:text-light-gray">
                        <i className="fas fa-search"></i>
                        <input 
                            type="text" 
                            className="bg-transparent outline-none w-full" 
                            value={location} 
                            onChange={e => {
                                setLocation(e.target.value);
                                fetchLocationSuggestions(e.target.value); // Fetch suggestions as the user types
                            }} 
                        />
                        {suggestions.length > 0 && (
                            <ul className="suggestions-dropdown absolute left-0 mt-2 w-full bg-dark-gray border border-gray rounded-sm shadow-md">
                                {suggestions.map((suggestion, index) => (
                                    <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="cursor-pointer px-4 py-2 hover:bg-gray-100">{suggestion}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button type="submit" className={`bg-blue text-white pulsing-btn rounded-full flex justify-center items-center h-full aspect-square shadow-primary ${isLoading && 'loading'}`}>
                        <i className="fa-solid fa-arrow-pointer"></i>
                    </button>
                </form>
            </motion.header>

        <main className="flex items-center flex-col gap-4 w-full h-full overflow-auto px-8 py-8 rounded-[80px]">
            {weatherData && (
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <WeatherInfo temperature={weatherData?.current?.temp_c} summary={weatherData?.current?.condition?.text} location={weatherData?.location} icon={getWeatherIcon(weatherData?.current?.condition?.code)} coordinates={coordinates} />
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
                    <WeatherGraphs coordinates={coordinates} />
                    <CardList title={"Hourly"} data={hourlyWeather} />
                    <CardList title={"Daily"} data={weatherData?.forecast?.forecastday.map(day => ({...day, date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}))} />
                </div>
            )}
        </main>
    </>
  )
}

export default Home;