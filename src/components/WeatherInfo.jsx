import StormIcon from "../icons/StormIcon"

function WeatherInfo({ temperature, summary, location }) {
    return (
        <>
            <section className="text-center flex flex-col items-center justify-center mb-8">
                <StormIcon />
                <h1 className="font-bold text-7xl">{temperature}&deg;</h1>
                <p className="text-light-gray">{summary} in {location}</p>
            </section>
        </>
    )
}

export default WeatherInfo