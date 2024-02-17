"use client"

import { FC } from "react"
import { Property } from "csstype"
import { useScroll, useTransform, motion } from "framer-motion"
import ProjectDescLeft from "@/components/ProjectDescLeft"

const Projects:
FC<{ 
    mouseEnterHandler: (size: number, color: Property.BackgroundColor, blendMode?: Property.MixBlendMode) => void, 
    mouseLeaveHandler: () => void,  
}>
= (props) => {
    const { scrollYProgress } = useScroll()
    const titleX = useTransform(scrollYProgress, [0,1], [0, -800])
    const titleY = useTransform(scrollYProgress, [0.5, 1], [0, 600])

    return (
        <div 
            className="w-full h-fit bg-white bg-[linear-gradient(to_right,#80808080_1px,transparent_1px),linear-gradient(to_bottom,#80808080_1px,transparent_1px)] bg-[size:64px_64px]" 
            onMouseEnter={()=>props.mouseEnterHandler(40, "black", "normal")}
        >
            <div 
            className="overflow-hidden mb-8"
            onMouseEnter={()=>props.mouseEnterHandler(180, "white", "difference")}
            onMouseLeave={()=>props.mouseEnterHandler(40, "black", "normal")}
            >
                <motion.h1 
                className="lg:text-9xl text-7xl text-nowrap lg:h-32 h-[72px] whitespace-nowrap" 
                style={{x: titleX, transition: "all 4s cubic-bezier(0.165, 0.84, 0.44, 1), font-size 0s"}}
                >
                    MY PROJECTS - MY PROJECTS - MY PROJECTS - MY PROJECTS - MY PROJECTS
                </motion.h1>
            </div>
            <div className="flex w-full flex-col gap-40">
                <ProjectDescLeft/>
            </div>
        </div>
    )
}

export default Projects