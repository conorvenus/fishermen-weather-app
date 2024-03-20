import { getWeatherIcon } from "../utils"

function SmallCard({ data }) {
    return (
        <div className="small-card flex flex-col items-center justify-center gap-1 dark:bg-dark-gray border dark:border-gray rounded-2xl p-4 min-h-[200px] shadow-primary bg-white border-white">
            {data?.day ? (
                <>
                    {getWeatherIcon(data?.day?.condition?.code)}
                    <h1 className="dark:text-white text-black font-medium">{data?.date}</h1>
                    <h2 className="dark:text-light-gray text-gray">{data?.day?.avgtemp_c}&deg;</h2>
                </>
            ) : (
                <>
                    {getWeatherIcon(data?.condition?.code)}
                    <h1 className="dark:text-white text-black font-medium">{data?.time?.split(' ')[1]}</h1>
                    <h2 className="dark:text-light-gray text-gray">{data?.temp_c}&deg;</h2>
                </>
            )}
        </div>
    )
}

export default SmallCard