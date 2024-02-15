"use client"

import { bebasNeue } from "@/libs/fonts"
import { motion, useTransform, useScroll } from "framer-motion"

const HeroMobile = () => {
    const { scrollYProgress } = useScroll()
    const y = useTransform(scrollYProgress, [0,2], [0, 600])

    return (
        <div className="flex w-full h-full items-center justify-center bg-[radial-gradient(#aaa_1px,#fff_1px)] [background-size:16px_16px]">
            <motion.div className="px-4" style={{translateY: y}}>
                <h1 className={`text-8xl ${bebasNeue.className}`}>Rayhan Permana</h1>
                <p className={`text-2xl ${bebasNeue.className}`}>A full-stack web developer &</p>
                <p className={`text-2xl ${bebasNeue.className}`}>data science student.</p>
            </motion.div>
        </div>
    )
}

export default HeroMobile