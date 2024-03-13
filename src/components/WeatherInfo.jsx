function WeatherInfo({ temperature, summary, location, icon }) {
    return (
        <>
            <section className="text-center flex flex-col items-center justify-center gap-2 mb-8 lg:col-span-2">
                <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-2 ">
                    {icon}
                    <h1 className="font-bold text-7xl lg:text-8xl">{temperature}&deg;</h1>
                </div>
                <p className="text-light-gray"><span className="text-white font-bold">{summary}</span> in {location?.name}, {location?.country}</p>
            </section>
        </>
    )
}

export default WeatherInfo