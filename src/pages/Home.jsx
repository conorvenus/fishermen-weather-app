import React, { useEffect, useState, useRef } from "react";
import BigCard from "../components/BigCard.jsx";
import CardList from "../components/CardList.jsx";
import GlowCircle from "../components/GlowCircle.jsx";
import WeatherInfo from "../components/WeatherInfo.jsx";
import GraphCard from "../components/GraphCard.jsx";
import Chart from "chart.js/auto";
import { useLocations } from "../hooks/UseLocations.jsx";
import { getWeatherIcon } from "../utils.jsx";
import localforage from "localforage";

const WEATHER_API_KEY = "905f1a7f4bc64c91bb1150432240403";
const OPEN_WEATHER_API_KEY = 'c71e8f930b674cc9033f4f2b9d9b7f36';
const WORLD_WEATHER_API_KEY = '5d566da289364451abf110654241303'; 

function Home() {
    const [weatherData, setWeatherData] = useState({});
    const [location, setLocation] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const { getSelectedLocation, addLocation, selectLocation } = useLocations();
    const [openWeatherData, setOpenWeatherData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [lastUpdated, setLastUpdated] = useState('');

    useEffect(() => {
        const goOnline = () => setIsOnline(true);
        const goOffline = () => setIsOnline(false);

        window.addEventListener('online', goOnline);
        window.addEventListener('offline', goOffline);

        return () => {
            window.removeEventListener('online', goOnline);
            window.removeEventListener('offline', goOffline);
        };
    }, []);
    
    async function fetchWeatherAPI(loc) {
        setIsLoading(true);
        const cacheKey = `weather-${loc}`;
        try {
            // try loadin data from local storage
            const cachedData = await localforage.getItem(cacheKey);
            if (cachedData) {
                setWeatherData(cachedData.weatherData);
                setCoordinates(cachedData.coordinates);
                setLastUpdated(new Date().toLocaleString());
                return cachedData.coordinates;
            }
    
            // If no cache is found, fetch from the API
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
    
            // cache the fetched data
            await localforage.setItem(cacheKey, { weatherData: data, coordinates: { latitude: data.location.lat, longitude: data.location.lon } });
    
            setWeatherData(data);
            setCoordinates({ latitude: data.location.lat, longitude: data.location.lon });
            const location = {
                name: data.location.name,
                country: data.location.country,
                selected: false
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
            setLastUpdated(new Date().toLocaleString()); // update last updated time
        } catch (err) {
            console.error('Error fetching weather data:', err);
        }
    }

    useEffect(() => {
        const selectedLocation = getSelectedLocation();
        if (selectedLocation) {
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

    const tidalChartRef = useRef(null);
    const waveChartRef = useRef(null);

    useEffect(() => {
        if (coordinates.latitude != null && coordinates.longitude != null) {
            fetchTidalData();
            fetchWaveHeightData();
        }
    }, [coordinates]);

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
        } catch (error) {
            console.error('Error refreshing weather data:', error);
        } finally {
            setIsLoading(false);
        }
    }


    //Tidal Time Graph
    async function fetchTidalData() {

        //if there is something wrong with lat and long
        if (coordinates.latitude == null || coordinates.longitude == null) return;
        try {
            const response = await fetch(`https://api.worldweatheronline.com/premium/v1/marine.ashx?key=${WORLD_WEATHER_API_KEY}&q=${coordinates.latitude},${coordinates.longitude}&format=json&tide=yes`);
            if (!response.ok) {
                throw new Error('Failed to fetch tidal data');
            }
            const data = await response.json();

            if (!data.data.error) {
                const tidalData = data.data.weather[0].tides[0].tide_data.map(tide => ({
                    tideTime: tide.tideTime,
                    tideHeight_mt: tide.tideHeight_mt,
                    tide_type: tide.tide_type 
                }));

                DrawTidalHeight(tidalData);
            } else {
                DrawTidalHeight([]);
            }
        } catch (error) {
            console.error('Error fetching tidal data:', error);
        }
    }

    useEffect(() => {
        fetchTidalData();
    }, []);


    function DrawTidalHeight(tidalData) {
        const ctx = document.getElementById('tidal-times').getContext('2d');
        if (tidalChartRef.current) tidalChartRef.current.destroy();
    
        const labels = tidalData.map(data => data.tideTime);
        const dataPoints = tidalData.map(data => data.tideHeight_mt);
    
        tidalChartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Tidal Height (m)',
                    data: dataPoints,
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                tension: 0.4,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Wave Graph
    async function fetchWaveHeightData() {
        //if there is something wrong with lat and long
        if (coordinates.latitude == null || coordinates.longitude == null) return;
        try {
            const response = await fetch(`https://api.worldweatheronline.com/premium/v1/marine.ashx?key=${WORLD_WEATHER_API_KEY}&q=${coordinates.latitude},${coordinates.longitude}&format=json`);
            if (!response.ok) {
                throw new Error('Failed to fetch wave height data');
            }
            const data = await response.json();
    
            if (!data.data.error) {
                const waveHeightData = {
                    time: data.data.weather[0].hourly.map(hour => new Date(data.data.weather[0].date + 'T' + hour.time.slice(0, 2) + ':' + hour.time.slice(2) + ':00Z')),
                    waveHeight: data.data.weather[0].hourly.map(hour => hour.sigHeight_m),
                };
        
                DrawWaveHeight(waveHeightData);
            } else {
                DrawWaveHeight({ time: [], waveHeight: [] });
            }
        } catch (error) {
            console.error('Error fetching wave height data:', error);
        }
    }    
    
    useEffect(() => {
        fetchWaveHeightData();
    }, []);
    
    
    function DrawWaveHeight(waveHeightData) {
        const ctx = document.getElementById('wave-height').getContext('2d');
        if (waveChartRef.current) waveChartRef.current.destroy();
    
        const formattedLabels = waveHeightData.time.map(time => {
            const hours = time.getUTCHours();
            const suffix = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            return `${formattedHours} ${suffix}`;
        });
    
        waveChartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: formattedLabels,
                datasets: [{
                    label: 'Wave Height (m)',
                    data: waveHeightData.waveHeight,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                tension: 0.4,
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Wave Height (m)'
                        },
                        beginAtZero: true
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time'
                        }
                    }
                }
            }
        });
    }

    return (
        <>
            {!isOnline && (
                <div style={{backgroundColor: '#FFD700', color: '#FFFFFF', padding: '10px', textAlign: 'center'}}>
                    You are currently offline. Data shown may not be up-to-date.
                </div>
            )}
    
            {lastUpdated && (
                <div style={{textAlign: 'right', marginRight: '16px', marginTop: '2px', fontSize: '12px'}}>
                    Last Updated: {lastUpdated}
                </div>
            )}
    
            <GlowCircle x={0} y={0} opacity={0.15} blur={60} />
    
            <header className="flex w-full h-fit px-8">
                <form className="flex items-center gap-4 w-full max-w-2xl mx-auto" onSubmit={handleSubmit}>
                    <button type="button" onClick={refreshWeatherData} className="bg-blue pulsing-btn rounded-full flex justify-center items-center h-full aspect-square shadow-primary">
                        <i className="fas fa-map-marker-alt"></i>
                    </button>
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
                            <ul className="suggestions-dropdown absolute left-0 mt-2 w-full bg-dark-gray border border-gray rounded-sm shadow-md">
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
                        <GraphCard title={"Tidal Times"} />
                        <GraphCard title={"Wave Height"} />
                        <CardList title={"Hourly"} data={weatherData?.forecast?.forecastday[0].hour} />
                        <CardList title={"Daily"} data={weatherData?.forecast?.forecastday} />
                    </div>
                )}
            </main>
        </>
  )
}

export default Home;
