import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.jsx'
import Pins from './pages/Pins.jsx'
import Navbar from './components/Navbar.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { LocationProvider } from './hooks/UseLocations.jsx'
import { OnlineProvider } from './hooks/UseOnline.jsx'

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('./sw.js')
//       .then(reg => {
//         console.log('Service Worker registered')
//       })
//       .catch(err => {
//         console.log('Service Worker registration failed: ', err)
//       })
//   })
// }

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
    <OnlineProvider>
      <LocationProvider>
        <RouterProvider router={router} />
      </LocationProvider>
    </OnlineProvider>
  </React.StrictMode>,
)