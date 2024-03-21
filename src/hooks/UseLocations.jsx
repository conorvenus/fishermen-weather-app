import { createContext, useState, useContext, useEffect } from "react"
import localforage from "localforage"

const LocationContext = createContext(null)

function LocationProvider({ children }) {
    const [locations, setLocations] = useState([])

    // When the component loads, get the locations from local storage
    useEffect(() => {
        localforage.getItem('locations').then(value => {
            if (value) {
                // If there are locations in local storage, set the locations state
                setLocations(value)
            }
        })
    }, [])

    // When the locations state changes, update the local storage (saving it persistently)
    useEffect(() => {
        localforage.setItem('locations', locations)
    }, [locations])


    function addLocation(location) {
        setLocations(locations => {
            let existing = locations.find(l => l.name === location.name && l.country === location.country)
            if (existing) {
                // If the location already exists, update the data and lastUpdated fields (the "cache")
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
            // If the location doesn't exist, add a new one to the locations state
            return [...locations, location]
        })
    }

    function removeLocation(location) {
        // Remove the location from the locations state, by filtering out the location
        setLocations(locations => locations.filter(l => l !== location))
    }

    function getSelectedLocation() {
        // Find the selected location from the locations state
        return locations.find(l => l.selected)
    }

    function selectLocation(location) {
        // Set the location to selected in the locations state
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