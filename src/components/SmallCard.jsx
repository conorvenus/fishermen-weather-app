import { getWeatherIcon } from "../utils"

function SmallCard({ data }) {
    return (
        <>
        {data?.day ? (
            <div className="flex-none w-[calc((100%-2rem)/3)]">
                <div className="small-card flex flex-col items-center justify-center gap-1 dark:bg-dark-gray border dark:border-gray rounded-2xl p-4 min-h-[200px] shadow-primary bg-white border-white">
                    {getWeatherIcon(data?.day?.condition?.code)}
                    <h1 className="dark:text-white text-black font-medium">{data?.date}</h1>
                    <h2 className="dark:text-light-gray text-gray">{data?.day?.avgtemp_c}&deg;</h2>
                </div>
            </div>
            ) : (
                data?.time_epoch >= new Date().valueOf() / 1000 && (
                    <div className="flex-none w-[calc((100%-2rem)/3)]">
                        <div className="small-card flex flex-col items-center justify-center gap-1 dark:bg-dark-gray border dark:border-gray rounded-2xl p-4 min-h-[200px] shadow-primary bg-white border-white">
                            {getWeatherIcon(data?.condition?.code)}
                            <h1 className="dark:text-white text-black font-medium">{data?.time?.split(' ')[1]}</h1>
                            <h2 className="dark:text-light-gray text-gray">{data?.temp_c}&deg;</h2>
                        </div>
                    </div>
                )
            )}
        </>
    )
}

export default SmallCard