import { useEffect, useState } from "react"
import BigCard from "../components/BigCard.jsx"
import CardList from "../components/CardList.jsx"
import GlowCircle from "../components/GlowCircle.jsx"
import WeatherInfo from "../components/WeatherInfo.jsx"
import { useLocations } from "../hooks/UseLocations.jsx"

const key = "905f1a7f4bc64c91bb1150432240403"

function Home() {
    const [weatherData, setWeatherData] = useState({})
    const [location, setLocation] = useState('')
    const { getSelectedLocation, addLocation, selectLocation } = useLocations()

    async function fetchData(loc) {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?q=${loc}`, {
            method: 'GET',
            headers: {
                'key': key,
            }
        })
        const data = await response.json()
        if (response.ok) {
            setWeatherData(data)
            const location = {
                name: data.location.name,
                country: data.location.country,
                selected: false
            }
            addLocation(location)
            selectLocation(location)
        }
    }

    useEffect(() => {
        fetchData(getSelectedLocation()?.name ?? "London")
    }, [])
  
    function handleSubmit(event) {
        event.preventDefault()
        fetchData(location)
    }
    
  return (
    <>
        <GlowCircle x={0} y={0} opacity={0.15} blur={60} />

        <header className="flex w-full h-fit px-8">
            <form className="flex items-center gap-4 w-full" onSubmit={handleSubmit}>
                <div className="flex items-center gap-4 bg-dark-gray border border-gray rounded-2xl w-full py-2 px-4 shadow-primary">
                    <i className="fas fa-search text-light-gray"></i>
                    <input type="text" className="bg-transparent outline-none text-light-gray w-full" value={location} onChange={e => setLocation(e.target.value)} />
                </div>
                <button type="submit" className={`bg-blue pulsing-btn rounded-full flex justify-center items-center h-full aspect-square shadow-primary`}>
                    <i className="fa-solid fa-arrow-pointer"></i>
                </button>
            </form>
        </header>

        <main className="flex items-center flex-col gap-4 w-full h-full overflow-auto px-8 py-8 rounded-[80px]">
            <WeatherInfo temperature={weatherData?.current?.temp_c} summary={"Sunny"} location={weatherData?.location} />
            <BigCard wind={weatherData?.current?.wind_kph} rain={weatherData?.current?.precip_mm} humidity={weatherData?.current?.humidity} />
            <CardList />
            <BigCard wind={weatherData?.current?.wind_kph} rain={weatherData?.current?.precip_mm} humidity={weatherData?.current?.humidity} />
            <CardList />
            <BigCard wind={weatherData?.current?.wind_kph} rain={weatherData?.current?.precip_mm} humidity={weatherData?.current?.humidity} />
            <CardList />
        </main>
    </>
  )
}

export default Home