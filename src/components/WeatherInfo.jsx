function WeatherInfo({ temperature, summary, location, icon }) {
    return (
        <>
            <section className="text-center flex flex-col items-center justify-center mb-8">
                {icon}
                <h1 className="font-bold text-7xl">{temperature}&deg;</h1>
                <p className="text-light-gray">{summary} in {location?.name}, {location?.country}</p>
            </section>
        </>
    )
}

export default WeatherInfo