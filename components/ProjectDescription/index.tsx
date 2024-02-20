"use client"

import { Variants, motion } from "framer-motion"
import { FC, useState, useEffect } from "react"
import CloseIcon from '@mui/icons-material/Close';
import { TProjectData } from "@/libs/types";
import { Property } from "csstype"
import ContactLinks from "@/components/ContactLinks";

const ProjectDescription: 
FC<{
    show: boolean,
    closeCallback: () => void,
    projectData: TProjectData | null,
    mouseEnterHandler: (size: number, color: Property.BackgroundColor, blendMode?: Property.MixBlendMode) => void, 
    mouseLeaveHandler: () => void,
}> = (props) => {
    const [render, setRender] = useState(false)

    useEffect(()=>{
        if (!render)
        setTimeout(()=>{
            setRender(true)
        }, 500)
    })

    const variants: Variants = {
        container: {
            scaleY: props.show ? 1 : 0,
            transition: {
                delay: props.show ? 0 : 0.25,
                ease: [0.45, 0, 0.55, 1],
            }
        },
        title: {
            opacity: props.show ? 1 : 0,
            y: props.show ? 0 : 50,
            transition: {
                delay: props.show ? 0.25 : 0,
                ease: [0.45, 0, 0.55, 1],
            }
        }
    }
    
    return (
        <>
            <motion.div 
                className="fixed w-screen h-[50vh] z-30 origin-bottom scale-y-0 bottom-0"
                variants={variants}
                animate="container"
            >
                <div className="w-full h-full bg-white origin-bottom drop-shadow-lg p-6 rounded-2xl" style={{opacity: render ? 1 : 0}}>
                    <motion.div 
                        className="absolute h-8 w-8 top-6 left-6" 
                        onClick={props.closeCallback}
                        onMouseEnter={()=>props.mouseEnterHandler(60, "white")}
                        onMouseLeave={()=>props.mouseEnterHandler(40, "black", "normal")}
                        >
                        <CloseIcon className="h-full w-full"/>
                    </motion.div>
                        <div className="flex w-full h-full p-8 justify-center items-center">
                            <div 
                                className="max-w-screen-md"
                                >
                                <motion.h1 
                                    className="text-5xl text-black w-fit"
                                    variants={variants}
                                    animate="title"
                                    onMouseEnter={()=>props.mouseEnterHandler(100, "white")}
                                    onMouseLeave={()=>props.mouseEnterHandler(40, "black", "normal")}
                                    >
                                    <span className="text-violet-600">/</span>{props.projectData?.name ?? "(null)"}
                                </motion.h1>
                                <br/>
                                <motion.h2 
                                    className="text-2xl text-black w-fit"
                                    variants={variants}
                                    animate="title"
                                    onMouseEnter={()=>props.mouseEnterHandler(100, "white")}
                                    onMouseLeave={()=>props.mouseEnterHandler(40, "black", "normal")}
                                    >
                                    {props.projectData?.description ?? "(null)"}
                                </motion.h2>
                                <br />
                                <motion.div
                                    className="flex gap-4 w-fit"
                                    variants={variants}
                                    animate="title"
                                >
                                    {props.projectData?.urls.map((d, n) => {
                                        return (
                                            <ContactLinks 
                                            mouseEnterHandler={props.mouseEnterHandler} 
                                            mouseLeaveHandler={props.mouseLeaveHandler}
                                            contactData={{title: d.title, url: d.url}}
                                            key={n}
                                            />
                                            )
                                        })}
                                </motion.div>
                            </div>
                        </div>                                
                </div>
            </motion.div>
        </>
    )
}

export default ProjectDescription