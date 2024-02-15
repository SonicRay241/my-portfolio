"use client"

import { FC, useRef, useState } from "react"
import { Property } from "csstype"
import { Variants, motion, cubicBezier } from "framer-motion"
import { useIsInViewport } from "@/libs/hooks"

const About:
FC<{ 
    mouseEnterHandler: (size: number, color: Property.BackgroundColor, blendMode?: Property.MixBlendMode) => void, 
    mouseLeaveHandler: () => void,  
}>
= (props) => {
    const titleRef = useRef<HTMLHeadingElement>(null)
    const titleInViewport = useIsInViewport(titleRef)

    const paragraphRef = useRef<HTMLParagraphElement>(null)
    const paragraphInViewport = useIsInViewport(titleRef)

    const variants: Variants = {
        title: {
            y: titleInViewport ? 0 : 72,
            transition: {
                duration: titleInViewport ? 0.75 : 0,
                ease: cubicBezier(0.76, 0, 0.24, 1)
            }
        },
        paragraph: {
            y: paragraphInViewport ? 0 : 72,
            opacity: paragraphInViewport ? 1 : 0,
            transition: {
                duration: paragraphInViewport ? 0.75 : 0,
                ease: cubicBezier(0.76, 0, 0.24, 1),
                delay: paragraphInViewport ? 0.75: 0
            },
        }
    }


    return (
        <div className="flex md:flex-row flex-col w-full bg-black rounded-t-2xl py-32 px-6" onMouseEnter={() => props.mouseEnterHandler(40, "white", "normal")}>
            <div className="w-full md:w-2/5 h-fit overflow-hidden md:pb-0 pb-12">
                <motion.h1 
                    className="text-7xl text-white w-fit"
                    variants={variants}
                    ref={titleRef}
                    animate="title"
                    onMouseEnter={() => props.mouseEnterHandler(120, "white")} 
                    onMouseLeave={() => props.mouseEnterHandler(40, "white", "normal")}
                >
                    About
                </motion.h1>
                
            
            </div>
            <div className="w-full md:w-3/5">
                <motion.p 
                className="text-white text-3xl overflow-hidden"
                variants={variants}
                ref={paragraphRef}
                animate="paragraph"
                onMouseEnter={() => props.mouseEnterHandler(200, "white")} 
                onMouseLeave={() => props.mouseEnterHandler(40, "white", "normal")}>
                    I&apos;m a passionate web developer adept at crafting purpose-driven software solutions using diverse tools. Currently, I balance studies with a role at <a href="http://ict.binus.edu/" className="text-red-500 hover:underline">BINUS IT Division</a>, thriving on collaboration and continuous learning.
                </motion.p>
            </div>
        </div>
    )
}

export default About