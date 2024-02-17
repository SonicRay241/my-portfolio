"use client"

import { FC } from "react"
import { Property } from "csstype"
import { useScroll, useTransform, motion, useTime, Transition } from "framer-motion"
import Project from "@/components/Project"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import projectList from "@/libs/projectList"

const Projects:
FC<{ 
    mouseEnterHandler: (size: number, color: Property.BackgroundColor, blendMode?: Property.MixBlendMode) => void, 
    mouseLeaveHandler: () => void,  
}>
= (props) => {
    const { scrollYProgress } = useScroll()
    const titleX = useTransform(scrollYProgress, [0,1], [0, -800])

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
            <div className="flex w-full flex-col">
                {projectList.map((projectData, idx) => {
                    return (
                        <Project 
                            key={idx}
                            mouseEnterHandler={props.mouseEnterHandler} 
                            mouseLeaveHandler={props.mouseLeaveHandler}
                            projectData={projectData}
                        />
                    )
                })}
                
                <div 
                    className="sticky flex w-fit bottom-0 pl-3 pb-3 flex-row gap-3 items-center" 
                    onMouseEnter={()=>props.mouseEnterHandler(100, "white")}
                    onMouseLeave={()=>props.mouseEnterHandler(40, "black", "normal")}>
                    <h1>SCROLL<br/>DOWN</h1>
                    <div className="flex justify-center items-center h-12 w-12 rounded border-2 border-black">
                        <motion.div 
                            className=""
                            transition={{
                                duration: 0.4,
                                repeat: Infinity,
                                ease: "easeOut",
                                repeatType: "reverse"
                            }}
                            animate={{
                                y: ["10px", "-10px"]
                            }}
                        >
                            <ArrowDownwardIcon/>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Projects