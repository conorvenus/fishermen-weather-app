import { motion } from 'framer-motion'

function WeatherInfo({ temperature, summary, location, icon, coordinates }) {
    return (
        <>
            <motion.section initial={{y: -100, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 1, delay: 0.2}} className="text-center flex flex-col items-center justify-center gap-2 mb-8 lg:col-span-2">
                <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-2 ">
                    {icon}
                    <h1 className="font-bold text-7xl lg:text-8xl">{temperature}&deg;</h1>
                </div>
                <p className="dark:text-light-gray text-gray"><span className="dark:text-white font-bold">{summary}</span> in {location?.name}, {location?.country}</p>
                <div className="coordinates-display flex gap-8 font-bold text-lg dark:text-white text-black">
                    <p>Lat: <span className="dark:text-light-gray text-gray font-medium ml-1">{coordinates.latitude}</span></p>
                    <p>Lon: <span className="dark:text-light-gray text-gray font-medium ml-1">{coordinates.longitude}</span></p>
                </div>
            </motion.section>
        </>
    )
}

export default WeatherInfo