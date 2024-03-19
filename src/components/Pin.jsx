import { useState, useEffect } from "react"
import { useLocations } from "../hooks/UseLocations.jsx"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import timesago from 'timesago'
import { capitalize } from "../utils.jsx"

const key = "wHBQCr2BBprazJ9nCrxf6Xhkp17PCcHlflHy40EuUJkdm8F2BPNhz6Gd"

function Pin({ location, delay }) {
    const [image, setImage] = useState(null)
    const { selectLocation, removeLocation } = useLocations()
    const navigate = useNavigate()

    async function fetchImage() {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${location?.name}&per_page=1`, {
            method: "GET",
            headers: {
                Authorization: key
            }
        })
        const data = await response.json()
        if (data.photos.length > 0) {
            setImage(data.photos[0].src.large)
        }
    }

    useEffect(() => {
        fetchImage()
    }, [])

    function viewLocation() {
        selectLocation(location)
        navigate("/")
    }

    return (
        <motion.div initial={{y: -100, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 1, delay}} className="bg-dark-gray border border-gray h-full max-h-60 rounded-2xl w-full shadow-primary text-center p-4 grid grid-cols-3 gap-4 items-center">
            <div className="rounded-2xl shadow-primary overflow-hidden h-full">
                {image ? 
                <img className="h-full w-full object-cover" src={image} /> :
                <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded bg-dark-gray animate-pulse">
                    <svg className="w-10 h-10 text-gray" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                    </svg>
                </div>}
            </div>
            <div className="flex flex-col items-start gap-2 col-span-2">
                <h1 className="text-white font-medium text-left">{location?.name}, <span className="font-normal text-light-gray">{location?.country}</span></h1>
                <div className="flex items-center gap-2">
                    <div className="flex shadow-primary items-center gap-2 bg-gray rounded-lg px-2 py-1 text-xs text-light-gray">
                        <i className="fa-solid fa-download"></i>
                        <p>{capitalize(timesago(location?.lastUpdated))}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {location.selected ? (
                        <button disabled className="bg-gray rounded-lg px-2 py-1 shadow-primary font-bold flex items-center gap-2 text-xs">
                            <i className="fa-solid fa-eye-slash"></i>
                            Viewing
                        </button>
                    ) : (
                        <button onClick={viewLocation} className="bg-blue rounded-lg px-2 py-1 shadow-primary font-bold flex items-center gap-2 text-xs">
                            <i className="fa-solid fa-eye"></i>
                            View
                        </button>
                    )}
                    <button onClick={() => removeLocation(location)} className="bg-gray rounded-lg px-2 py-1 shadow-primary font-bold flex items-center gap-2 text-xs">
                        <i className="fa-solid fa-trash"></i>
                        Remove
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default Pin