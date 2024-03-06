import GlowCircle from "../components/GlowCircle.jsx"
import Pin from "../components/Pin.jsx"

function Pins() {
  return (
    <>
        <GlowCircle x={0} y={0} opacity={0.15} blur={60} />
        <main className="grid grid-cols-1 gap-4 w-full h-full overflow-auto px-8 py-8">
            <Pin />
            <div className="bg-dark-gray border border-gray rounded-2xl max-h-60 w-full h-full shadow-primary text-center p-4 grid grid-cols-3 gap-4 items-center">
                <div className="rounded-2xl shadow-primary overflow-hidden h-full">
                    <img className="h-full w-full object-cover" src="https://img.freepik.com/premium-photo/beautiful-ocean-with-clear-water-3d-illustrated_768106-3676.jpg" />
                </div>
                <div className="flex flex-col items-start gap-2 col-span-2">
                    <h1 className="text-white font-medium text-left">Southend-on-Sea, <span className="font-normal text-light-gray">Essex</span></h1>
                    <div className="flex items-center gap-2">
                        <div className="flex shadow-primary items-center gap-2 bg-gray rounded-lg px-2 py-1 text-xs text-light-gray">
                            <i className="fa-solid fa-download"></i>
                            <p>Next 2 Weeks</p>
                        </div>
                    </div>
                    <button className="bg-blue rounded-lg px-2 py-1 text-xs shadow-primary font-bold flex items-center gap-2">
                        <i className="fa-solid fa-eye"></i>
                        View
                    </button>
                </div>
            </div>
            <div className="bg-dark-gray border border-gray rounded-2xl w-full min-h-[150px] shadow-primary grid grid-cols-3 text-center items-center">
            </div>
       </main>
    </>
  )
}

export default Pins