import { motion } from 'framer-motion'

function GraphCard({ title }) {
    return (
        <motion.div initial={{y: -100, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 1, delay: 0.6}} className="flex flex-col gap-2 dark:text-light-gray text-gray w-full">
            <h1>{title}</h1>
            <div className="dark:bg-dark-gray border dark:border-gray bg-white border-white rounded-2xl w-full min-h-[150px] shadow-primary grid text-center items-center p-8">
                <canvas id={title.replace(" ", "-").toLowerCase()}></canvas>
            </div>
        </motion.div>
    )
}

export default GraphCard