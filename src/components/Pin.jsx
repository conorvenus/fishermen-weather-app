import { useState, useEffect } from "react"
import { useLocations } from "../hooks/UseLocations.jsx"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { format } from "timeago.js"
import { capitalizeEachWord } from "../utils.jsx"

const PEXELS_API_KEY = "wHBQCr2BBprazJ9nCrxf6Xhkp17PCcHlflHy40EuUJkdm8F2BPNhz6Gd"

function Pin({ location, delay }) {
    const [image, setImage] = useState(null)
    const { selectLocation, removeLocation } = useLocations()
    const navigate = useNavigate()

    // Fetch image from Pexels API
    async function fetchImage() {
        try {
            const response = await fetch(`https://api.pexels.com/v1/search?query=${location?.name}&per_page=1`, {
                method: "GET",
                headers: {
                    Authorization: PEXELS_API_KEY
                }
            })
            if (!response.ok) throw new Error("Failed to fetch image")
            const data = await response.json()
            // If there are photos, set the image to the first one 
            if (data.photos.length > 0) {
                setImage(data.photos[0].src.large)
            }
        } catch (error) {
            console.error(error)
        }
    }

    // Fetch image when the pin card loads
    useEffect(() => {
        fetchImage()
    }, [])

    // When the user clicks on the view button, select the location and navigate to the home page
    function viewLocation() {
        selectLocation(location)
        navigate("/")
    }

    return (
        <motion.div initial={{y: -100, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 1, delay}} className="dark:bg-dark-gray border dark:border-gray bg-white border-white h-full max-h-60 rounded-2xl w-full shadow-primary text-center p-4 grid grid-cols-3 gap-4 items-center">
            <div className="rounded-2xl shadow-primary overflow-hidden h-full">
                {image ? 
                <img className="h-full w-full object-cover" src={image} /> : (
                    // Image placeholder taken and modified from https://flowbite.com/docs/components/skeleton/
                    <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded dark:bg-dark-gray bg-light-gray animate-pulse">
                        <svg className="w-10 h-10 text-gray" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                        </svg>
                    </div>
                )}
            </div>
            <div className="flex flex-col items-start gap-2 col-span-2">
                <h1 className="dark:text-white text-black font-medium text-left">{location?.name}, <span className="font-normal dark:text-light-gray text-gray">{location?.country}</span></h1>
                <div className="flex items-center gap-2">
                    <div className="flex shadow-primary items-center gap-2 dark:bg-gray bg-light-gray text-white rounded-lg px-2 py-1 text-xs">
                        <i className="fa-solid fa-download"></i>
                        <p>{capitalizeEachWord(format(location?.lastUpdated))}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {location.selected ? (
                        <button disabled className="dark:bg-gray bg-light-graytext-white rounded-lg px-2 py-1 shadow-primary font-bold flex items-center gap-2 text-xs">
                            <i className="fa-solid fa-eye-slash"></i>
                            Viewing
                        </button>
                    ) : (
                        <button onClick={viewLocation} className="bg-blue text-white rounded-lg px-2 py-1 shadow-primary font-bold flex items-center gap-2 text-xs">
                            <i className="fa-solid fa-eye"></i>
                            View
                        </button>
                    )}
                    <button onClick={() => removeLocation(location)} className="dark:bg-gray bg-light-gray text-white rounded-lg px-2 py-1 shadow-primary font-bold flex items-center gap-2 text-xs">
                        <i className="fa-solid fa-trash"></i>
                        Remove
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default Pin