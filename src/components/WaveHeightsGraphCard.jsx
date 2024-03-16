import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function WaveHeightsGraphCard({ title, waveHeightData }) {
    // Refs array to keep track of canvas references
    const chartRefs = useRef([]);
  
    useEffect(() => {
      // Function to draw charts
      function drawCharts() {
        // Map over waveHeightData and for each element, create a new Chart instance
        waveHeightData.forEach((dayData, index) => {
          const canvasRef = chartRefs.current[index];
          if (!canvasRef) return;
  
          const ctx = canvasRef.getContext('2d');
          // Format the labels for the chart by mapping over the hourlyData
          const formattedLabels = dayData.hourlyData.map(hour => `${parseInt(hour.time, 10) / 100}h`);
          const dataPoints = dayData.hourlyData.map(hour => hour.waveHeight);

          // Create a new Chart instance on the given data
          new Chart(ctx, {
            type: 'line',
            data: {
              labels: formattedLabels,
              datasets: [{
                label: `Wave Height on ${dayData.date} (m)`,
                data: dataPoints,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                fill: true,
                tension: 0.1
              }]
            },
            options: {
              scales: {
                y: {
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
        });
      }
  
      // If waveHeightData is loaded, draw the charts
      if (waveHeightData.length > 0) {
        drawCharts();
      }
  
      // destroy charts before redrawing
      return () => {
        chartRefs.current.forEach(ref => {
          if (ref) {
            const chartInstance = Chart.getChart(ref); 
            if (chartInstance) {
              chartInstance.destroy();
            }
          }
        });
      };
    }, [waveHeightData]);
  
    return (
        <div className="flex flex-col gap-2 text-light-gray w-full">
          <h1 className="text-xl font-bold">{title}</h1>
          <div className="flex overflow-x-auto">
            {/* Map over waveHeightData array and for each element, create a div with a canvas element inside it. */}
            {waveHeightData.map((_, index) => (
              <div key={index} className="flex-shrink-0 w-[300px] sm:w-[600px] h-[200px] border-r border-gray-800">
                <canvas ref={el => chartRefs.current[index] = el} />
              </div>
            ))}
          </div>
        </div>
      );
    }
  
  export default WaveHeightsGraphCard;