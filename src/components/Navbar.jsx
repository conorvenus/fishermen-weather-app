import { NavLink, Outlet } from 'react-router-dom'

function Navbar() {
    return (
        <>
            <Outlet />

            <nav className="grid grid-cols-3 gap-8">
                <NavLink to="/" className={({ isActive }) => `flex flex-col items-center justify-center text-light-gray ${isActive ? "nav-selected" : ""}` }>
                    <i className="fa-solid fa-home"></i>
                    Home
                </NavLink>
                <button className="bg-blue rounded-full flex justify-center items-center p-4 shadow-primary"><i className="fa-solid fa-lock"></i></button>
                <NavLink to="/pins" className={({ isActive }) => `flex flex-col items-center justify-center text-light-gray ${isActive ? "nav-selected" : ""}` }>
                    <i className="fa-solid fa-location-dot"></i>
                    Pins
                </NavLink>
            </nav>
        </>
    )
}

export default Navbar