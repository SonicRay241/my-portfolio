"use client"

import { FC, useState } from "react"
import { Property } from "csstype"
import { useScroll, useTransform, motion, useTime, Transition } from "framer-motion"
import Project from "@/components/v1/Project"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { TProjectData } from "@/libs/types"

import projectList from "@/libs/projectList"

const Projects:
FC<{ 
    mouseEnterHandler: (size: number, color: Property.BackgroundColor, blendMode?: Property.MixBlendMode) => void, 
    mouseLeaveHandler: () => void,
    descriptionCallback: (projectData: TProjectData) => void
    isMobile: boolean
}>
= (props) => {
    const { scrollYProgress } = useScroll()
    const titleX = useTransform(scrollYProgress, [0,1], [0, -800])
    const projectsParallax = useTransform(scrollYProgress, [0,1], [0, -400])

    return (
        <>
            <div 
                className="w-full h-fit bg-white bg-[linear-gradient(to_right,#80808080_1px,transparent_1px),linear-gradient(to_bottom,#80808080_1px,transparent_1px)] bg-[size:64px_64px] pt-8" 
                onMouseEnter={()=>props.mouseEnterHandler(40, "black", "normal")}
            >
                <div 
                    className="overflow-hidden mx-8 border-2 border-black rounded-xl"
                    onMouseEnter={()=>props.mouseEnterHandler(180, "white", "difference")}
                    onMouseLeave={()=>props.mouseEnterHandler(40, "black", "normal")}
                    style={{
                        marginLeft: !props.isMobile ? 32 : 16,
                        marginRight: !props.isMobile ? 32 : 16,
                    }}
                >
                    <motion.h1 
                        className="text-nowrap whitespace-nowrap mb-3" 
                        style={{
                            x: titleX, 
                            transition: "all 4s cubic-bezier(0.165, 0.84, 0.44, 1), font-size 0s",
                            height: !props.isMobile ? 128 : 72,
                            fontSize: !props.isMobile ? 128 : 72,
                            lineHeight: 1,
                        }}
                    >
                        MY PROJECTS - MY PROJECTS - MY PROJECTS - MY PROJECTS - MY PROJECTS
                    </motion.h1>
                </div>
                <motion.div 
                    className="flex w-full flex-col"
                    style={{
                        y: projectsParallax,
                        transition: "transform 500ms cubic-bezier(0.165, 0.84, 0.44, 1)",
                        translateY: !props.isMobile ? 192 : 312,
                        gap: props.isMobile ? 128 : 0
                    }}
                >
                    {projectList.map((projectData, idx) => {
                        return (
                            <Project 
                                key={idx}
                                mouseEnterHandler={props.mouseEnterHandler} 
                                mouseLeaveHandler={props.mouseLeaveHandler}
                                projectData={projectData}
                                descriptionCallback={props.descriptionCallback}
                                isMobile={props.isMobile}
                            />
                            )
                        })}
                    <div className="flex w-full justify-center">
                        <h1
                            style={{
                                transform: `translateY(${!props.isMobile ? 96 : 0}px)`,
                                fontSize: !props.isMobile ? 48 : 24
                            }}
                            onMouseEnter={()=>props.mouseEnterHandler(100, "white", "difference")}
                            onMouseLeave={()=>props.mouseEnterHandler(40, "black", "normal")}
                        >
                            More Coming Soon!
                        </h1>
                    </div>
                </motion.div>
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
        </>
    )
}

export default Projects