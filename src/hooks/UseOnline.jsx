import { createContext, useContext, useEffect, useState } from 'react';

const OnlineContext = createContext(null);

function OnlineProvider({ children }) {
    // On page load, check if the user is online using the navigator.onLine API
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    // Add event listeners for online and offline events
    useEffect(() => {
        // When the user goes online, set isOnline to true, and vice versa
        window.addEventListener('online', () => setIsOnline(true));
        window.addEventListener('offline', () => setIsOnline(false));

        // Remove event listeners when the component is not rendered anymore
        return () => {
            window.removeEventListener('online', () => setIsOnline(true));
            window.removeEventListener('offline', () => setIsOnline(false));
        };
    }, []);

    return (
        <OnlineContext.Provider value={{isOnline}}>
            {children}
        </OnlineContext.Provider>
    );
}

function useOnline() {
    const context = useContext(OnlineContext);
    if (!context) {
        throw new Error("useOnline must be used within a OnlineProvider");
    }
    return context;
}

export { OnlineProvider, useOnline };