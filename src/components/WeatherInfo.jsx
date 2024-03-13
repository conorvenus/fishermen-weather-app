function WeatherInfo({ temperature, summary, location, icon, coordinates }) {
    return (
        <>
            <section className="text-center flex flex-col items-center gap-2 justify-center mb-8">
                {icon}
                <h1 className="font-bold text-7xl">{temperature}&deg;</h1>
                <p className="text-light-gray">{summary} in {location?.name}, {location?.country}</p>
                <div className="coordinates-display flex gap-8 text-white font-bold text-lg">
                    <p>Lat: <span className="text-light-gray font-medium ml-1">{coordinates.latitude}</span></p>
                    <p>Lon: <span className="text-light-gray font-medium ml-1">{coordinates.longitude}</span></p>
                </div>
            </section>
        </>
    )
}

export default WeatherInfo