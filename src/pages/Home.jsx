import React, { useEffect, useState, useRef } from "react";
import BigCard from "../components/BigCard.jsx";
import CardList from "../components/CardList.jsx";
import GlowCircle from "../components/GlowCircle.jsx";
import WeatherInfo from "../components/WeatherInfo.jsx";
import WeatherGraphs from "../components/WeatherGraphs.jsx";
import { useLocations } from "../hooks/UseLocations.jsx";
import { getWeatherIcon } from "../utils.jsx";
import { motion } from "framer-motion";
import { useOnline } from "../hooks/UseOnline.jsx";

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
    const { isOnline } = useOnline();

    async function fetchWeatherAPI(loc) {
        // Set is loading to true, so that the loading spinner is shown
        setIsLoading(true);
        try {
            // Fetch the weather data from the weather API
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${loc}&days=7`, {
                method: 'GET',
                headers: {
                    'key': WEATHER_API_KEY,
                }
            });
            const data = await response.json();
            // If the response is not ok, throw an error
            if (!response.ok) {
                throw new Error('Weather data fetching failed');
            }
            // Set the weather data to the fetched data
            setWeatherData(data);
            setCoordinates({ latitude: data.location.lat, longitude: data.location.lon });
            // Add the location to the pins (with the cached data), and set it as the selected location
            const location = {
                name: data.location.name,
                country: data.location.country,
                selected: false,
                lastUpdated: new Date().toISOString(),
                data
            };
            addLocation(location);
            selectLocation(location);
            // Return the coordinates of the location, to use for fetching open weather data
            return { latitude: data.location.lat, longitude: data.location.lon };
        } catch (error) {
            // Log any errors that occur when fetching the weather data
            console.error('Error fetching weather data:', error);
        } finally {
            // Set is loading to false, so that the loading spinner is hidden
            setIsLoading(false);
        }
    };

    async function fetchOpenWeatherMap(latitude, longitude) {
        try {
            // Attempt to fetch the weather data from the open weather map API
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_API_KEY}&units=metric`);
            if (!response.ok) {
                // If the response is not ok, throw an error
                throw new Error('Weather data fetching failed');
            }
            // Set the open weather data to the fetched data
            const data = await response.json();
            setOpenWeatherData(data);
        } catch (err) {
            // Log any errors that occur when fetching the weather data
            console.error('Error fetching weather data:', err);
        } 
    }

    // On page load, attempt to get the weather data
    useEffect(() => {
        // Attempt to get the selected location from the saved pins
        const selectedLocation = getSelectedLocation();
        // If there is a location selected in pins, fetch the weather data for that location
        if (selectedLocation) {
            // If the user is offline, set the weather data to the cached data from the pin
            if (!isOnline) {
                setWeatherData(selectedLocation.data);
                setCoordinates({ latitude: selectedLocation.data.location.lat, longitude: selectedLocation.data.location.lon });
                return;
            }
            // Otherwise, fetch the weather data from the weather API
            fetchWeatherAPI(`${selectedLocation.name},${selectedLocation.country}`).then(coords => {
                if (coords) fetchOpenWeatherMap(coords.latitude, coords.longitude);
            })
        } else {
            // By default attempt to fetch London
            fetchWeatherAPI("London").then(coords => {
                if (coords) fetchOpenWeatherMap(coords.latitude, coords.longitude);
            });
            // If there is no selected location, set is loading to true, so that the loading spinner is shown
            setIsLoading(true);
            // Attempt to get the user's current location from the browser
            navigator.geolocation.getCurrentPosition((position) => {
                // If the location is successfully fetched, update the coordinates and fetch the weather data
                const { latitude, longitude } = position.coords;
                setCoordinates({ latitude, longitude });
                fetchWeatherAPI(`${latitude},${longitude}`);
                fetchOpenWeatherMap(latitude, longitude);
            }, 
            (error) => {
                // Log any errors that occur when fetching the location, and fetch the default weather data for London
                console.error('Error getting geolocation:', error);
                fetchWeatherAPI("London").then(coords => {
                    if (coords) fetchOpenWeatherMap(coords.latitude, coords.longitude);
                });
            });
        }
    }, []);

    // On search for location
    function handleSubmit(event) {
        // Prevent the form from submitting (reloading the page)
        event?.preventDefault();
        // Fetch the weather data for the location
        fetchWeatherAPI(location).then(coords => {
            // If the coords are fetched, fetch the open weather data
            if (coords) fetchOpenWeatherMap(coords.latitude, coords.longitude);
        })
    }

    async function fetchLocationSuggestions(query) {
        // If the suggestion is less than 3 characters, it's too short to search for
        if (query.length < 3) return setSuggestions([]);
        // Fetch location suggestions from the weather API
        const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${WEATHER_API_KEY}&q=${query}`);
        const data = await response.json();
        // Set the suggestions to the names of the locations
        setSuggestions(data.map(item => item.name));
    }

    // When a suggestion is clicked, set the location input to the suggestion and clear the suggestions
    function handleSuggestionClick(suggestion) {
        setLocation(suggestion);
        setSuggestions([]);
    }

    async function refreshWeatherData() {
        // Set is loading to true, so that the loading spinner is shown
        setIsLoading(true);
        try {
            // Attempt to get the user's current location from the browser
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            // If the location is successfully fetched, update the coordinates and fetch the weather data
            const { latitude, longitude } = position.coords;
            setCoordinates({ latitude, longitude });
            fetchWeatherAPI(`${latitude},${longitude}`);
            fetchOpenWeatherMap(latitude, longitude);
        } 
        catch (error) {
            // Log any errors that occur when fetching the location
            console.error('Error refreshing weather data:', error);
        } 
        finally {
            // Set is loading to false, so that the loading spinner is hidden
            setIsLoading(false);
        }
    }

    return (
        <>
            <GlowCircle x={0} y={0} opacity={0.15} blur={60} />

            <motion.header initial={{y: -100, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 1}} className="flex w-full h-fit px-8">
                {/* On the form submission (the pointer button is clicked), handle fetching the data from the API */}
                <form className="flex items-center gap-4 w-full max-w-2xl mx-auto" onSubmit={handleSubmit}>
                    {/* On location pin clicked, refresh the weather data */}
                    <button type="button" onClick={refreshWeatherData} className="bg-blue text-white pulsing-btn rounded-full flex justify-center items-center h-full aspect-square shadow-primary">
                        <i className="fas fa-map-marker-alt"></i>
                    </button>
                    <div className="flex items-center gap-4 bg-white border-white dark:bg-dark-gray border dark:border-gray rounded-2xl w-full py-2 px-4 shadow-primary relative text-gray dark:text-light-gray">
                        <i className="fas fa-search"></i>
                        {/* Handle location changing, and fetch suggestions as they type */}
                        <input 
                            type="text" 
                            className="bg-transparent outline-none w-full" 
                            value={location} 
                            onChange={e => {
                                setLocation(e.target.value);
                                fetchLocationSuggestions(e.target.value); // Fetch suggestions as the user types
                            }} 
                        />
                        {/* If there any suggestions, render them inside a list, as clickable */}
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
            {/* If the weatherData has been fetched, render it inside the components */}
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
                    <CardList title={"Hourly"} data={weatherData?.forecast?.forecastday.map(day => day.hour).flat(1)} />
                    <CardList title={"Daily"} data={weatherData?.forecast?.forecastday.map(day => ({...day, date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}))} />
                </div>
            )}
        </main>
    </>
  )
}

export default Home;