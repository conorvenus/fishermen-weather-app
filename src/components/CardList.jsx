import SmallCard from "./SmallCard"

function CardList({ title, data }) {
    return (
        <div className="flex flex-col gap-2 text-light-gray w-full">
            <h1>{title}</h1>
            <section className="flex w-full overflow-x-auto overflow-y-hidden gap-4 pb-2">
                {data?.map((item, idx) => (
                    <div key={idx} className="flex-none w-[calc((100%-2rem)/3)]">
                        <SmallCard data={item} />
                    </div>
                ))}
            </section>
        </div>
    ) 
}

export default CardList