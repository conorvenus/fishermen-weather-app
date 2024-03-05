function BigCard({ wind, rain, humidity }) {
    return (
        <div className="bg-dark-gray border border-gray rounded-2xl w-full min-h-[150px] shadow-primary grid grid-cols-3 text-center items-center">
            <div className="h-[60%] w-full flex items-center flex-col justify-center border border-l-0 border-y-0 border-r-light-gray/20">
                <h1 className="font-bold">{wind} km/h</h1>
                <p className="text-light-gray">Wind</p>
            </div>
            <div className="h-[60%] w-full flex items-center flex-col justify-center border border-l-0 border-y-0 border-r-light-gray/20">
                <h1 className="font-bold">{rain} mm</h1>
                <p className="text-light-gray">Precipitation</p>
            </div>
            <div className="h-full w-full flex items-center flex-col justify-center">
                <h1 className="font-bold">{humidity}%</h1>
                <p className="text-light-gray">Humidity</p>
            </div>
        </div>
    )
}

export default BigCard