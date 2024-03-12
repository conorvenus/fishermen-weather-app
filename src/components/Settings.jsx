import React, { useState } from 'react';

function SettingsPage() {
    const [windUnit, setWindUnit] = useState('mph');
    const [temperatureUnit, setTemperatureUnit] = useState('celsius');
    

    const handleUnitChange = (unitType, unit) => {
        switch (unitType) {
            case 'wind':
                setWindUnit(unit);
                break;
            case 'temperature':
                setTemperatureUnit(unit);
                break;
            default:
                break;
        }
        
    };

    return (
        <div className="container">
            <h1>Settings</h1>
            <div className="settings">
                <h2>Wind Speed Unit:</h2>
                <div className="unit-options">
                    <button
                        className={`unit-btn ${windUnit === 'mph' && 'selected'}`}
                        onClick={() => handleUnitChange('wind', 'mph')}
                    >
                        mph
                    </button>
                    <button
                        className={`unit-btn ${windUnit === 'kmh' && 'selected'}`}
                        onClick={() => handleUnitChange('wind', 'kmh')}
                    >
                        km/h
                    </button>
                </div>
            </div>
            <div className="settings">
                <h2>Temperature Unit:</h2>
                <div className="unit-options">
                    <button
                        className={`unit-btn ${temperatureUnit === 'celsius' && 'selected'}`}
                        onClick={() => handleUnitChange('temperature', 'celsius')}
                    >
                        Celsius
                    </button>
                    <button
                        className={`unit-btn ${temperatureUnit === 'fahrenheit' && 'selected'}`}
                        onClick={() => handleUnitChange('temperature', 'fahrenheit')}
                    >
                        Fahrenheit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;