import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.jsx'
import Pins from './pages/Pins.jsx'
import Navbar from './components/Navbar.jsx'
import SettingsPage from './components/SettingsPage.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { LocationProvider } from './hooks/UseLocations.jsx'
import { ThemeProvider } from './ThemeContext'


const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/pins',
        element: <Pins />
      },
      {
        path: '/settings', // Add a new route for SettingsPage
        element: <SettingsPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ThemeProvider>
  <Router>
    <LocationProvider>
      <RouterProvider router={router} />
    </LocationProvider>
  </Router>
  </ThemeProvider>
  </React.StrictMode>,
)