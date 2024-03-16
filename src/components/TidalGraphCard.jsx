import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function TidalGraphCard({ title, tidalData }) {
  const chartRefs = useRef([]);

  useEffect(() => {
    tidalData.forEach((dayData, index) => {
      const chartRef = chartRefs.current[index];
      if (!chartRef) {
        return;
      }

      const ctx = chartRef.getContext('2d');

      // Destroy the previous chart if it exists
      if (Chart.getChart(ctx)) {
        Chart.getChart(ctx).destroy();
      }

      // Setup labels and data for the tidal chart
      const labels = dayData.tideDetails.map(detail => detail.tideTime);
      const dataPoints = dayData.tideDetails.map(detail => detail.tideHeight_mt);

      // Instantiate a new Chart
      chartRefs.current[index] = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: `Tidal Height on ${dayData.date} (m)`,
            data: dataPoints,
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
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

    // Cleanup function to destroy all chart instances
    return () => {
      chartRefs.current.forEach((chartRef) => {
        const chartInstance = Chart.getChart(chartRef);
        if (chartInstance) {
          chartInstance.destroy();
        }
      });
    };
  }, [tidalData]);

  return (
    <div className="flex flex-col gap-2 text-light-gray w-full">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex overflow-x-auto">
        {tidalData.map((_, index) => (
          <div key={index} className="flex-shrink-0 w-[300px] sm:w-[600px] h-[200px] border-r border-gray-800">
            <canvas ref={(el) => (chartRefs.current[index] = el)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TidalGraphCard;
