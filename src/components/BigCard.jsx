import { motion } from 'framer-motion'

function BigCard({ title, data }) {
    return (
        <motion.div initial={{y: -100, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 1, delay: 0.4}}  className="flex flex-col gap-2 dark:text-light-gray text-gray w-full">
            <h1>{title}</h1>
            <div className="dark:bg-dark-gray border dark:border-gray bg-white border-white rounded-2xl w-full min-h-[200px] shadow-primary grid grid-cols-3 text-center items-center">
                {data && data.map((item, idx) => ( 
                    <div key={idx} className={`h-[60%] w-full flex items-center flex-col justify-center border border-l-0 border-y-0 ${idx !== data.length - 1 ? 'dark:border-r-light-gray/20 border-r-gray/20' : 'border-r-0'} dark:text-light-gray text-dark-gray`}>
                        <h1 className="font-bold">{item.value} {item.unit}</h1>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

export default BigCard