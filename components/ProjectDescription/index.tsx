"use client"

import { Variants, motion } from "framer-motion"
import { FC } from "react"
import CloseIcon from '@mui/icons-material/Close';
import { TProjectData } from "@/libs/types";
import { Property } from "csstype"

const ProjectDescription: 
FC<{
    show: boolean,
    closeCallback: () => void,
    projectData: TProjectData | null,
    mouseEnterHandler: (size: number, color: Property.BackgroundColor, blendMode?: Property.MixBlendMode) => void, 
    mouseLeaveHandler: () => void,
}> = (props) => {
    const variants: Variants = {
        container: {
            scaleY: props.show ? 1 : 0,
            transition: {
                ease: [0.76, 0, 0.24, 1],
            }
        },
    }
    
    return (
        <motion.div 
            className="fixed w-screen h-[30vh] z-40 origin-bottom scale-y-0 bottom-0"
            variants={variants}
            animate="container"
        >
            <div className="w-full h-full bg-white origin-bottom drop-shadow-lg p-6">
                <motion.div 
                    className="absolute h-8 w-8 top-6 left-6" 
                    onClick={props.closeCallback}
                    onMouseEnter={()=>props.mouseEnterHandler(60, "white")}
                    onMouseLeave={()=>props.mouseEnterHandler(40, "black", "normal")}
                >
                    <CloseIcon className="h-full w-full"/>
                </motion.div>
                { props.projectData ? 
                    <div className="flex w-full h-full p-8 justify-center items-center">
                        <div 
                            onMouseEnter={()=>props.mouseEnterHandler(100, "white")}
                            onMouseLeave={()=>props.mouseEnterHandler(40, "black", "normal")}
                        >
                            <h1 className="text-5xl text-black">{props.projectData.name}</h1>
                            <h2 className="text-2xl text-black">{props.projectData.description}</h2>
                        </div>
                    </div>
                    :
                    <div className="flex h-full justify-center items-center">
                        <h1 className="text-2xl text-black">Houston, we have a problem</h1>
                    </div>
                }
            </div>
        </motion.div>
    )
}

export default ProjectDescription