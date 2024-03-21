import { createContext, useState, useContext, useEffect } from "react"
import localforage from "localforage"

const LocationContext = createContext(null)

function LocationProvider({ children }) {
    const [locations, setLocations] = useState([])

    useEffect(() => {
        localforage.getItem('locations').then(value => {
            if (value) {
                setLocations(value)
            }
        })
    }, [])

    useEffect(() => {
        localforage.setItem('locations', locations)
    }, [locations])

    function addLocation(location) {
        setLocations(locations => {
            let existing = locations.find(l => l.name === location.name && l.country === location.country)
            if (existing) {
                return locations.map(l => {
                    if (l === existing) {
                        return {
                            ...l,
                            data: location.data,
                            lastUpdated: new Date().toISOString()
                        }
                    }
                    return l
                })
            }
            return [...locations, location]
        })
    }

    function removeLocation(location) {
        setLocations(locations => locations.filter(l => l !== location))
    }

    function getSelectedLocation() {
        return locations.find(l => l.selected)
    }

    function selectLocation(location) {
        setLocations(locations => locations.map(l => {
            l.selected = l.name === location.name && l.country === location.country
            return l
        }))
    }

    return (
        <LocationContext.Provider value={{addLocation, removeLocation, selectLocation, getSelectedLocation, locations}}>
            {children}
        </LocationContext.Provider>
    );
} 

function useLocations() {
    const context = useContext(LocationContext)
    if (!context) {
        throw new Error("useLocation must be used within a LocationProvider")
    }
    return context
}

export { LocationProvider, useLocations }