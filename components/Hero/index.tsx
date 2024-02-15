"use client"

import { useEffect, useState } from "react"
import { motion, useTransform, useScroll } from "framer-motion"
import { bebasNeue } from "@/libs/fonts"
import MyImage from "@/public/mehd.png"
import Image from "next/image"

const Hero = () => {
    const [bgOffset, setBgOffset] = useState(100)
    const { scrollYProgress } = useScroll()

    const x1 = useTransform(scrollYProgress, [0,5], [0, 600])
    const x2 = useTransform(scrollYProgress, [0,5], [0, -600])

    useEffect(() => {
        setTimeout(()=>{
            setBgOffset(0)
        }, 1000)
    })

    return (
        <div className="fixed w-full h-screen text-zinc-900 overflow-hidden -z-10 bg-[radial-gradient(#aaa_1px,#fff_1px)] [background-size:16px_16px]">
            <div className="absolute w-full h-full">
                <Image src={MyImage} alt="Rayhan Permana" quality={100} className="h-full object-cover" />
            </div>
            <div className="absolute flex w-full h-full -z-20 justify-center overflow-hidden">
                <div className="w-full">
                {Array.from(Array(4).keys()).map((n) =>
                    <div key={n}>
                        <motion.h1 className={`text-9xl -z-50 whitespace-nowrap text-center ${bebasNeue.className}`} style={{x: x1, transition: "all 2s cubic-bezier(0.165, 0.84, 0.44, 1), font-size 0s", translateX: -300 + bgOffset}}>Rayhan Permana Rayhan Permana Rayhan Permana</motion.h1>
                        <motion.h1 className={`text-9xl -z-50 whitespace-nowrap text-center ${bebasNeue.className}`} style={{x: x2, transition: "all 2s cubic-bezier(0.165, 0.84, 0.44, 1), font-size 0s", translateX: -bgOffset}}>Rayhan Permana Rayhan Permana Rayhan Permana</motion.h1>
                    </div>
                )}
                </div>
            </div>
        </div>
    )
}

export default Hero