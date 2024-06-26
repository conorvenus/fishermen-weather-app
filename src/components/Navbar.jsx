import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import localforage from 'localforage';
import { useOnline } from '../hooks/UseOnline.jsx'

function Navbar() {
    const [isLocked, setIsLocked] = useState(false);
    const { isOnline } = useOnline();
    const [isDark, setIsDark] = useState(false);

    // Frame motion animation for the theme button to pop up on hover
    const themeAnimation = {
        themeMotion: {
            height: '40px'
        }
    };

    // Toggle the theme between light and dark
    function toggleTheme() {
        // Set the theme in local storage and toggle the theme
        setIsDark(isDark => {
            localforage.setItem('theme', isDark ? 'light' : 'dark')
            return !isDark
        })
        // Toggle it on the body element, which will tell Tailwind to use the dark theme
        document.documentElement.classList.toggle("dark")
    }

    // When the component loads, check if the theme is dark in local storage
    useEffect(() => {
        // If the theme is dark, set the dark theme on the body element and the state
        localforage.getItem('theme').then((value) => {
            if (value === 'dark') {
                setIsDark(true)
                document.documentElement.classList.add("dark")
            }
        })
    }, [])

    // Lock and unlock the app
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

            <motion.nav initial={{y: 100, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 1, delay: 0.8}} whileTap={"themeMotion"} whileHover={"themeMotion"} className="grid grid-cols-3 gap-x-8 gap-y-4 relative place-content-center">
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