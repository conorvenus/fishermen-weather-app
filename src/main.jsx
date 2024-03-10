import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.jsx'
import Pins from './pages/Pins.jsx'
import Navbar from './components/Navbar.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { LocationProvider } from './hooks/UseLocations.jsx'

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
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LocationProvider>
      <RouterProvider router={router} />
    </LocationProvider>
  </React.StrictMode>,
)