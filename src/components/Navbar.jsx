import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import SettingsIcon from './SettingsIcon'
import { useTheme } from './ThemeContext'; // Import useTheme hook

function Navbar() {
    const [isLocked, setIsLocked] = useState(false);
    const { theme, toggleTheme } = useTheme(); // Using theme context

    function handleLockClick() {
        setIsLocked(true)
    }

    function handleUnlockClick() {
        setIsLocked(false)
    }

    return (
        <>
            {isLocked && <div className="fixed inset-0 bg-black opacity-50 z-50"></div>} {/* Overlay when locked */}
            <Outlet />

            <nav className={`grid grid-cols-3 gap-8 relative ${theme === 'light' ? 'light' : 'dark'}`}> {/* Apply theme class */}
                <NavLink to="/" className={({ isActive }) => `flex flex-col items-center justify-center text-light-gray ${isActive ? "nav-selected" : ""}` }>
                    <i className="fa-solid fa-home"></i>
                    Home
                </NavLink>
                {isLocked ? (
                    <button onClick={handleUnlockClick} className="bg-blue rounded-full flex justify-center items-center p-4 shadow-primary z-50 relative"><i className="fa-solid fa-unlock"></i></button>
                ) : (
                    <button onClick={handleLockClick} className="bg-blue rounded-full flex justify-center items-center p-4 shadow-primary z-50 relative"><i className="fa-solid fa-lock"></i></button>
                )}
                <NavLink to="/pins" className={({ isActive }) => `flex flex-col items-center justify-center text-light-gray ${isActive ? "nav-selected" : ""}` }>
                    <i className="fa-solid fa-location-dot"></i>
                    Pins
                </NavLink>
                <NavLink to="/settings" className={({ isActive }) => `flex flex-col items-center justify-center text-light-gray ${isActive ? "nav-selected" : ""}` }>
                    <SettingsIcon />
                    Settings
                </NavLink>
                <button onClick={toggleTheme} className="text-white bg-blue rounded-full flex justify-center items-center p-4 shadow-primary z-50 relative">
                    {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
                </button>
            </nav>
        </>
    )
}

export default Navbar