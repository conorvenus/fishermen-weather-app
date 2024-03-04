import BigCard from "../components/BigCard.jsx"
import CardList from "../components/CardList.jsx"
import GlowCircle from "../components/GlowCircle.jsx"
import SmallCard from "../components/SmallCard.jsx"
import WeatherInfo from "../components/WeatherInfo.jsx"
import StormIcon from "../icons/StormIcon.jsx"

function Home() {
  return (
    <>
        <GlowCircle x={0} y={0} opacity={0.15} blur={60} />

        <header className="flex w-full h-fit px-8">
            <form className="flex items-center gap-4 w-full">
                <div className="flex items-center gap-4 bg-dark-gray border border-gray rounded-2xl w-full py-2 px-4 shadow-primary">
                    <i className="fas fa-search text-light-gray"></i>
                    <input type="text" className="bg-transparent outline-none text-light-gray w-full" />
                </div>
                <button type="submit" className={`bg-blue pulsing-btn rounded-full flex justify-center items-center h-full aspect-square shadow-primary`}>
                    <i className="fa-solid fa-arrow-pointer"></i>
                </button>
            </form>
        </header>

        <main className="flex items-center flex-col gap-4 w-full h-full overflow-auto px-8 py-8 rounded-[80px]">
            <WeatherInfo temperature={10} summary={"Mostly clear"} location={"Mile End, United Kingdom"} />
            <BigCard wind={20} rain={90} humidity={100} />
            <CardList />
            <BigCard wind={20} rain={90} humidity={100} />
            <CardList />
            <BigCard wind={20} rain={90} humidity={100} />
            <CardList />
        </main>
    </>
  )
}

export default Home