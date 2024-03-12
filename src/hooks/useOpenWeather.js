import { useState, useEffect } from 'react';

const useOpenWeather = (city) => {
    const API_KEY = 'c71e8f930b674cc9033f4f2b9d9b7f36'; // Use environment variable
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
                if (!response.ok) throw new Error('Weather data fetching failed');
                const json = await response.json();
                setData(json);
            } catch (err) {
                setError(err.toString());
            } 
        };
        fetchData();
    }, [city]); 
    console.log(data?.main?.pressure);
    return { data, error };
};

export default useOpenWeather;
