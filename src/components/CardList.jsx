import SmallCard from "./SmallCard"

function CardList() {
    return (
        <section className="grid grid-cols-3 w-full gap-4">
            <SmallCard />
            <SmallCard />
            <SmallCard />
        </section>
    ) 
}

export default CardList