import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

function Navbar() {
    const [isLocked, setIsLocked] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isDark, setIsDark] = useState(false);

    const themeAnimation = {
        themeMotion: {
            height: '40px'
        }
    };

    function toggleTheme() {
        setIsDark(!isDark)
        document.documentElement.classList.toggle("dark")
    }

    useEffect(() => {
        window.addEventListener('online', () => setIsOnline(true));
        window.addEventListener('offline', () => setIsOnline(false));

        return () => {
            window.removeEventListener('online', () => setIsOnline(true));
            window.removeEventListener('offline', () => setIsOnline(false));
        }
    }, [])

    function handleLockClick() {
        setIsLocked(true)
    }

    function handleUnlockClick() {
        setIsLocked(false)
    }

    return (
        <>
            {!isOnline && (
                <div className="dark:bg-dark-gray bg-white shadow-primary p-4 opacity-50 flex justify-center items-center rounded-2xl animate-pulse">
                    <p className="dark:text-light-gray text-gray font-medium">You are offline, and will see stale data!</p>
                </div>
            )} {/* Overlay when offline */}
            {isLocked && <div className="fixed inset-0 bg-black opacity-50 z-50"></div>} {/* Overlay when locked */}
            <Outlet />

            <motion.nav initial={{y: 100, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 1, delay: 0.8}} whileHover={"themeMotion"} className="grid grid-cols-3 gap-x-8 gap-y-4 relative place-content-center">
                <NavLink to="/" className={({ isActive }) => `flex flex-col items-center justify-center dark:text-light-gray text-gray ${isActive ? "nav-selected" : ""}` }>
                    <i className="fa-solid fa-home"></i>
                    Home
                </NavLink>
                {isLocked ? (
                    <button onClick={handleUnlockClick} className="bg-blue text-white rounded-full flex justify-center items-center p-4 shadow-primary z-50 relative"><i className="fa-solid fa-unlock"></i></button>
                ) : (
                    <button onClick={handleLockClick} className="bg-blue text-white rounded-full flex justify-center items-center p-4 shadow-primary z-50 relative"><i className="fa-solid fa-lock"></i></button>
                )}
                <NavLink to="/pins" className={({ isActive }) => `flex flex-col items-center justify-center dark:text-light-gray text-gray ${isActive ? "nav-selected" : ""}` }>
                    <i className="fa-solid fa-location-dot"></i>
                    Pins
                </NavLink>
                <motion.button initial={{height: 0, lineHeight: 0, padding: 0, overflow: 'hidden'}} variants={themeAnimation} transition={{duration: 0.5}} onClick={toggleTheme} className="bg-blue text-white rounded-full flex justify-center items-center p-4 shadow-primary z-50 col-span-3"><i className={`fa-solid ${isDark ? 'fa-moon' : 'fa-sun'}`}></i></motion.button>
            </motion.nav>
        </>
    )
}

export default Navbar