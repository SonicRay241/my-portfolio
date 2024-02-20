"use client"

import { FC, useRef, useState, RefObject } from "react"
import { Property } from "csstype"
import { Variants, motion, cubicBezier } from "framer-motion"
import { useIsInViewport } from "@/libs/hooks"

const Contacts: FC<{
    
}> = () => {
    return (
        <div className="w-28">

        </div>
    )
}

const About: FC<{ 
    mouseEnterHandler: (size: number, color: Property.BackgroundColor, blendMode?: Property.MixBlendMode) => void, 
    mouseLeaveHandler: () => void,
}>
= (props) => {
    const aboutRef = useRef<HTMLDivElement>(null)
    const titleInViewport = useIsInViewport(aboutRef)
    const paragraphInViewport = useIsInViewport(aboutRef)

    const aboutText = ["A", "b", "o", "u", "t"]

    const variants: Variants = {
        titleContainer: {
            transition: {
                staggerChildren: 0.5
            }
        },
        title0: {
            y: titleInViewport ? 0 : 72,
            transition: {
                duration: titleInViewport ? 0.75 : 0,
                ease: cubicBezier(0.76, 0, 0.24, 1),
            }
        },
        title1: {
            y: titleInViewport ? 0 : 72,
            transition: {
                duration: titleInViewport ? 0.75 : 0,
                ease: cubicBezier(0.76, 0, 0.24, 1),
                delay: titleInViewport ? 0.1 : 0
            }
        },
        title2: {
            y: titleInViewport ? 0 : 72,
            transition: {
                duration: titleInViewport ? 0.75 : 0,
                ease: cubicBezier(0.76, 0, 0.24, 1),
                delay: titleInViewport ? 0.2 : 0
            }
        },
        title3: {
            y: titleInViewport ? 0 : 72,
            transition: {
                duration: titleInViewport ? 0.75 : 0,
                ease: cubicBezier(0.76, 0, 0.24, 1),
                delay: titleInViewport ? 0.3 : 0
            }
        },
        title4: {
            y: titleInViewport ? 0 : 72,
            transition: {
                duration: titleInViewport ? 0.75 : 0,
                ease: cubicBezier(0.76, 0, 0.24, 1),
                delay: titleInViewport ? 0.4 : 0
            }
        },
        paragraph: {
            y: paragraphInViewport ? 0 : 72,
            opacity: paragraphInViewport ? 1 : 0,
            transition: {
                duration: paragraphInViewport ? 0.75 : 0,
                ease: cubicBezier(0.76, 0, 0.24, 1),
                delay: paragraphInViewport ? 0.75 : 0
            },
        }
    }


    return (
        <div className="flex justify-center w-full bg-[#050505] pt-20 pb-28 px-6 drop-shadow-lg" ref={aboutRef} onMouseEnter={() => props.mouseEnterHandler(40, "white", "normal")}>
            <div className="flex max-w-screen-xl lg:flex-row flex-col lg:gap-0 gap-11">
            <div className="w-full lg:w-2/5 h-fit overflow-hidden">
                <div 
                    className="flex flex-row text-7xl text-white w-fit lg:ml-8"
                    onMouseEnter={() => props.mouseEnterHandler(120, "white")} 
                    onMouseLeave={() => props.mouseEnterHandler(40, "white", "normal")}
                    >
                    { aboutText.map((s, n)=>{
                        return (
                            <motion.h1 
                                variants={variants}
                                animate={`title${n}`} 
                                key={n}
                            >
                                {s}
                        </motion.h1>)
                    }) }
                </div>
                {/* <motion.h1 
                    className="text-7xl text-white w-fit lg:ml-8"
                    variants={variants}
                    animate="title"
                    onMouseEnter={() => props.mouseEnterHandler(120, "white")} 
                    onMouseLeave={() => props.mouseEnterHandler(40, "white", "normal")}
                    >
                    About
                </motion.h1> */}
                
            
                </div>
                <div className="w-full lg:w-3/5">
                    <motion.p 
                    className="text-white md:text-xl text-lg overflow-hidden"
                    variants={variants}
                    animate="paragraph"
                    onMouseEnter={() => props.mouseEnterHandler(240, "white")} 
                    onMouseLeave={() => props.mouseEnterHandler(40, "white", "normal")}>
                        {/* I&apos;m a passionate web developer adept at crafting purpose-driven software solutions using diverse tools. 
                        Currently, I balance studies with a role at <a href="http://ict.binus.edu/" className="text-red-500 hover:underline">BINUS IT Division</a>, 
                        thriving on collaboration and continuous learning. */}
                        {/* I&apos;m a dedicated web developer and a data science student, propelled by an unwavering passion for technology and innovation. 
                        My journey into programming was ignited by an insatiable curiosity and a fervent desire to create solutions 
                        that make a meaningful impact. With each project, I dive deep into the realm of versatile tools, harnessing 
                        a diverse array of technologies to sculpt software solutions finely tuned to their intended purpose. 
                        <br/><br/>Whether it&apos;s crafting intuitive user interfaces, architecting robust backend systems, or fine-tuning 
                        performance, I thrive on the challenges and rewards that each endeavor brings. Currently, I&apos;m 
                        diligently pursuing my academic aspirations while immersing myself in real-world experiences as a valued 
                        member of <a href="http://ict.binus.edu/" target="_blank" className="text-violet-600 hover:underline">BINUS IT Division</a>. 
                        Here, amidst dynamic projects and alongside talented peers, I contribute my expertise to push boundaries and 
                        achieve collective goals. */}
                        I&apos;m a passionate web developer and data science student driven by curiosity and a commitment to impactful innovation. 
                        From crafting intuitive interfaces to architecting robust backend systems, I thrive on diverse technological challenges. 
                        Currently balancing academic pursuits with real-world experiences at <a href="http://ict.binus.edu/" target="_blank" className="text-violet-600 hover:underline">BINUS IT Division</a>, I collaborate with talented peers to push boundaries and achieve collective goals.
                        {/* I&apos;m a */}
                        {/* I&apos;m a dedicated web developer driven by a profound passion for technology and innovation.
                        My journey into the realm of programming began with an insatiable curiosity and a desire to create impactful solutions.
                        As a fervent believer in the power of versatile tools, I relish the opportunity to employ 
                        a diverse array of technologies to craft software solutions tailored to their intended purpose.
                        <br/><br/> Whether it's designing intuitive user interfaces, architecting robust backend systems,
                        or optimizing performance, I thrive on the challenges and rewards that each project presents.
                        Currently, I&apos;m pursuing my academic endeavors while also immersing myself in real-world 
                        experiences as part of the <a href="http://ict.binus.edu/" className="text-red-500 hover:underline">BINUS IT Division</a>, 
                        where I contribute to dynamic projects and collaborate with talented individuals to push boundaries 
                    and achieve collective goals. */}
                    </motion.p>

                </div>
            </div>
        </div>
    )
}

export default About