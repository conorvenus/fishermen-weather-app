import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function Navbar() {
    const [isLocked, setIsLocked] = useState(false);

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

            <nav className="grid grid-cols-3 gap-8 relative">
                <NavLink to="/" className={({ isActive }) => `flex flex-col items-center justify-center text-light-gray ${isActive ? "nav-selected" : ""}` }>
                    <i className="fa-solid fa-home"></i>
                    Home
                </NavLink>
                {isLocked ? (
                    <button onClick={handleUnlockClick} className="bg-green rounded-full flex justify-center items-center p-4 shadow-primary z-50 relative"><i className="fa-solid fa-unlock"></i></button>
                ) : (
                    <button onClick={handleLockClick} className="bg-blue rounded-full flex justify-center items-center p-4 shadow-primary z-50 relative"><i className="fa-solid fa-lock"></i></button>
                )}
                <NavLink to="/pins" className={({ isActive }) => `flex flex-col items-center justify-center text-light-gray ${isActive ? "nav-selected" : ""}` }>
                    <i className="fa-solid fa-location-dot"></i>
                    Pins
                </NavLink>
            </nav>
        </>
    );
}

export default Navbar
