import SmallCard from "./SmallCard"

function CardList({ title, data }) {
    return (
        <div className="flex flex-col gap-2 text-light-gray w-full">
            <h1>{title}</h1>
            <section className="grid grid-cols-3 w-full gap-4">
                {data?.map((item, idx) => (
                    <SmallCard key={idx} data={item} />   
                ))}
            </section>
        </div>
    ) 
}

export default CardList