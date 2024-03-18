import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

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

            <motion.nav initial={{y: 100, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 1, delay: 0.8}} className="grid grid-cols-3 gap-8 relative">
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
            </motion.nav>
        </>
    )
}

export default Navbar