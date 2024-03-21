import GlowCircle from "../components/GlowCircle.jsx"
import Pin from "../components/Pin.jsx"
import { useLocations } from "../hooks/UseLocations.jsx"

function Pins() {
  // Get the saved locations from the useLocations hook (local storage)
  const { locations } = useLocations()

  return (
    <>
        <GlowCircle x={0} y={0} opacity={0.15} blur={60} />
        <main className="grid grid-cols-1 gap-4 w-full h-full overflow-auto px-8 py-8">
            {/* For each location, render a card/component for them */}
            {locations.map((location, idx) => (
                <Pin key={idx} location={location} delay={idx*0.2} />
            ))}
       </main>
    </>
  )
}

export default Pins