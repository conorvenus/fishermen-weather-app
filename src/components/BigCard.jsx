function BigCard({ title, data }) {
    return (
        <div className="flex flex-col gap-2 text-light-gray w-full">
            <h1>{title}</h1>
            <div className="bg-dark-gray border border-gray rounded-2xl w-full min-h-[150px] shadow-primary grid grid-cols-3 text-center items-center">
                {data.map((item, idx) => ( 
                    <div key={idx} className="h-[60%] w-full flex items-center flex-col justify-center border border-l-0 border-y-0 border-r-light-gray/20">
                        <h1 className="font-bold">{item.value} {item.unit}</h1>
                        <p className="text-light-gray">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BigCard