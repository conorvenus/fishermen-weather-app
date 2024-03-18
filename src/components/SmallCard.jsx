import { getWeatherIcon } from "../utils"

function SmallCard({ data }) {
    return (
        <div className="small-card flex flex-col items-center justify-center gap-1 bg-dark-gray border border-gray rounded-2xl p-4 min-h-[200px] shadow-primary">
            {data?.day ? (
                <>
                    {getWeatherIcon(data?.day?.condition?.code)}
                    <h1 className="text-white font-medium">{data?.date}</h1>
                    <h2 className="text-light-gray">{data?.day?.avgtemp_c}&deg;</h2>
                </>
            ) : (
                <>
                    {getWeatherIcon(data?.condition?.code)}
                    <h1 className="text-white font-medium">{data?.time?.split(' ')[1]}</h1>
                    <h2 className="text-light-gray">{data?.temp_c}&deg;</h2>
                </>
            )}
        </div>
    )
}

export default SmallCard