// WeatherGraphs.jsx
import React, { useEffect, useRef } from "react";
import GraphCard from "../components/GraphCard.jsx";
import Chart from "chart.js/auto";

// const WORLD_WEATHER_API_KEY = '5d566da289364451abf110654241303'; //old
const WORLD_WEATHER_API_KEY = 'bd5271cc0f444116a32190453241803'; //new

const WeatherGraphs = ({ coordinates }) => {
    const tidalChartRef = useRef(null);
    const waveChartRef = useRef(null);

    useEffect(() => {
        if (coordinates.latitude != null && coordinates.longitude != null) {
            fetchTidalData();
            fetchWaveHeightData();
        }
    }, [coordinates]);


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

    function DrawTidalHeight(tidalData) {
        const ctx = document.getElementById('tidal-times').getContext('2d');
        if (tidalChartRef.current) tidalChartRef.current.destroy();
    
        const labels = tidalData.map(data => data.tideTime);
        const dataPoints = tidalData.map(data => data.tideHeight_mt);
    
        // Create gradient
        const tidalGradient = ctx.createLinearGradient(0, 0, 0, 350);
        tidalGradient.addColorStop(0, 'rgba(98, 60, 234, 0.5)'); // Full color at the top
        tidalGradient.addColorStop(1, 'rgba(98, 60, 234, 0)'); // Fully transparent at the bottom

        tidalChartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Tidal Height (m)',
                    data: dataPoints,
                    backgroundColor: tidalGradient, // Use the gradient for the fill color
                    borderColor: 'rgba(98, 60, 234, 1)',
                    borderWidth: 2,
                    fill: true, 
                }]
            },
            options: {
                tension: 0.4,//curving the graph
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
    
    function DrawWaveHeight(waveHeightData) {
        const ctx = document.getElementById('wave-height').getContext('2d');
        if (waveChartRef.current) waveChartRef.current.destroy();
    
        // Create gradient
        const waveHeightGradient = ctx.createLinearGradient(0, 0, 0, 350);
        waveHeightGradient.addColorStop(0, 'rgba(54, 162, 235, 0.5)'); // Full color at the top
        waveHeightGradient.addColorStop(1, 'rgba(54, 162, 235, 0)'); // Fully transparent at the bottom

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
                    backgroundColor: waveHeightGradient,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    fill: true
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
            <GraphCard title={"Tidal Times"} />
            <GraphCard title={"Wave Height"} />
        </>
    );
};

export default WeatherGraphs;
