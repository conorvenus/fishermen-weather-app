function Pin({ location }) {
    return (
        <div className="bg-dark-gray border border-gray h-full max-h-60 rounded-2xl w-full shadow-primary text-center p-4 grid grid-cols-3 gap-4 items-center">
            <div className="rounded-2xl shadow-primary overflow-hidden h-full">
                <img className="h-full w-full object-cover" src="https://wallpapers.com/images/hd/beautiful-sunset-pictures-ir85pxnajbekgbhh.jpg" />
            </div>
            <div className="flex flex-col items-start gap-2 col-span-2">
                <h1 className="text-white font-medium text-left">{location?.name}, <span className="font-normal text-light-gray">{location?.country}</span></h1>
                <div className="flex items-center gap-2">
                    <div className="flex shadow-primary items-center gap-2 bg-gray rounded-lg px-2 py-1 text-xs text-light-gray">
                        <i className="fa-solid fa-download"></i>
                        <p>Next 7 Days</p>
                    </div>
                </div>
                <button className="bg-gray rounded-lg px-2 py-1 shadow-primary font-bold flex items-center gap-2 text-xs">
                    <i className="fa-solid fa-eye-slash"></i>
                    Viewing
                </button>
            </div>
        </div>
    )
}

export default Pin