function BigCard({ wind, rain, humidity, data1, data2, data3, m1, m2, m3 }) {
    return (
        <div className="bg-dark-gray border border-gray rounded-2xl w-full min-h-[150px] shadow-primary grid grid-cols-3 text-center items-center">
            <div className="h-[60%] w-full flex items-center flex-col justify-center border border-l-0 border-y-0 border-r-light-gray/20">
                <h1 className="font-bold">{wind} {m1}</h1>
                <p className="text-light-gray">{data1}</p>
            </div>
            <div className="h-[60%] w-full flex items-center flex-col justify-center border border-l-0 border-y-0 border-r-light-gray/20">
                <h1 className="font-bold">{rain} {m2}</h1>
                <p className="text-light-gray">{data2}</p>
            </div>
            <div className="h-full w-full flex items-center flex-col justify-center">
                <h1 className="font-bold">{humidity}{m3}</h1>
                <p className="text-light-gray">{data3}</p>
            </div>
        </div>
    )
}

export default BigCard