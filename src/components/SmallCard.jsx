function SmallCard({ data }) {
    return (
        <div className="bg-dark-gray border border-gray rounded-2xl p-4 h-[150px] shadow-primary">
            {data?.day ? (
                <>
                    <h1 className="text-white font-medium">{data?.date}</h1>
                    <h2 className="text-light-gray">{data?.day?.avgtemp_c} &deg;</h2>
                    <p className="text-light-gray">{data?.day?.condition?.text}</p>
                </>
            ) : (
                <>
                    <h1 className="text-white font-medium">{data?.time?.split(' ')[1]}</h1>
                    <h2 className="text-light-gray">{data?.temp_c}&deg;</h2>
                    <p className="text-light-gray">{data?.condition?.text}</p>
                </>
            )}
        </div>
    )
}

export default SmallCard