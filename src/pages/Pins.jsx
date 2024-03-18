import GlowCircle from "../components/GlowCircle.jsx"
import Pin from "../components/Pin.jsx"
import { useLocations } from "../hooks/UseLocations.jsx"

function Pins() {
  const { locations } = useLocations()

  return (
    <>
        <GlowCircle x={0} y={0} opacity={0.15} blur={60} />
        <main className="grid grid-cols-1 gap-4 w-full h-full overflow-auto px-8 py-8">
            {locations.map((location, idx) => (
                <Pin key={idx} location={location} delay={idx*0.2} />
            ))}
       </main>
    </>
  )
}

export default Pins