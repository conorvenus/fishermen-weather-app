function GraphCard({ title }) {
    return (
        <div className="flex flex-col gap-2 text-light-gray w-full">
            <h1>{title}</h1>
            <div className="bg-dark-gray border border-gray rounded-2xl w-full min-h-[150px] shadow-primary grid text-center items-center p-8">
                <canvas id={title.replace(" ", "-").toLowerCase()}></canvas>
            </div>
        </div>
    )
}

export default GraphCard