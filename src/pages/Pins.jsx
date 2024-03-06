import GlowCircle from "../components/GlowCircle.jsx"
import Pin from "../components/Pin.jsx"

function Pins() {
  return (
    <>
        <GlowCircle x={0} y={0} opacity={0.15} blur={60} />
        <main className="grid grid-cols-1 gap-4 w-full h-full overflow-auto px-8 py-8">
            <Pin location={{
                name: "St Ives",
                country: "United Kingdom"
            }} />
            <Pin location={{
                name: "Southend-on-Sea",
                country: "United Kingdom"
            }} />
            <Pin location={{
                name: "Madrid",
                country: "Spain"
            }} />
       </main>
    </>
  )
}

export default Pins