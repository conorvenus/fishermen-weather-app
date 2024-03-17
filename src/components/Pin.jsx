import { useState, useEffect } from "react";
import { useLocations } from "../hooks/UseLocations.jsx";
import { useNavigate } from "react-router-dom";
import localforage from "localforage";

const key = "wHBQCr2BBprazJ9nCrxf6Xhkp17PCcHlflHy40EuUJkdm8F2BPNhz6Gd";

function Pin({ location }) {
    const [image, setImage] = useState(null);
    const { selectLocation, removeLocation } = useLocations();
    const navigate = useNavigate();

    async function fetchImage() {
        const cachedImage = await localforage.getItem(`image-${location.name}`);
        if (cachedImage) {
            setImage(cachedImage);
        }

        try {
            const response = await fetch(`https://api.pexels.com/v1/search?query=${location?.name}&per_page=1`, {
                method: "GET",
                headers: {
                    Authorization: key
                }
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            const newImage = data.photos[0].src.large;
            setImage(newImage);  // update cache
            
            await localforage.setItem(`image-${location.name}`, newImage);
        } catch (error) {
            console.error("Error fetching or caching image:", error);

            if (!cachedImage) {
                // if no image at all
                setImage(null);
            }
        }
    }

    useEffect(() => {
        fetchImage();
    }, [location.name]); // fethcing again when location changes

    function viewLocation() {
        selectLocation(location);
        navigate("/");
    }

    return (
        <div className="bg-dark-gray border border-gray h-full max-h-60 rounded-2xl w-full shadow-primary text-center p-4 grid grid-cols-3 gap-4 items-center">
            <div className="rounded-2xl shadow-primary overflow-hidden h-full">
                {image ? 
                <img className="h-full w-full object-cover" src={image} alt={location?.name} /> :
                <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded bg-dark-gray">
                    <span className="text-white">Loading...</span>
                </div>}
            </div>
            <div className="flex flex-col items-start gap-2 col-span-2">
                <h1 className="text-white font-medium text-left">
                    {location?.name}, <span className="font-normal text-light-gray">{location?.country}</span>
                </h1>
                <div className="flex items-center gap-2">
                    <div className="flex shadow-primary items-center gap-2 bg-gray rounded-lg px-2 py-1 text-xs text-light-gray">
                        <i className="fa-solid fa-download"></i>
                        <p>Next 7 Days</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {location.selected ? (
                        <button disabled className="bg-gray rounded-lg px-2 py-1 shadow-primary font-bold flex items-center gap-2 text-xs">
                            <i className="fa-solid fa-eye-slash"></i>Viewing</button>
                    ) : (
                        <button onClick={viewLocation} className="bg-blue rounded-lg px-2 py-1 shadow-primary font-bold flex items-center gap-2 text-xs">
                            <i className="fa-solid fa-eye"></i>View</button>
                    )}
                    <button onClick={() => removeLocation(location)} className="bg-gray rounded-lg px-2 py-1 shadow-primary font-bold flex items-center gap-2 text-xs">
                        <i className="fa-solid fa-trash"></i>Remove</button>
                </div>
            </div>
        </div>
    );
}

export default Pin;
