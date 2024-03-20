import { createContext, useContext, useEffect, useState } from 'react';

const OnlineContext = createContext(null);

function OnlineProvider({ children }) {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        window.addEventListener('online', () => setIsOnline(true));
        window.addEventListener('offline', () => setIsOnline(false));

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