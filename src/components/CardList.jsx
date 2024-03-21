import { useEffect, useState } from "react"
import SmallCard from "./SmallCard"

function CardList({ title, data }) {
    return (
        <div className="flex flex-col gap-2 dark:text-light-gray text-black w-full">
            <h1 className="dark:text-light-gray text-gray">{title}</h1>
            <section className="flex w-full overflow-x-auto overflow-y-hidden gap-4 pb-2">
                {data && data?.map((item, idx) => (
                    <SmallCard key={idx} data={item} />
                ))}
            </section>
        </div>
    ) 
}

export default CardList