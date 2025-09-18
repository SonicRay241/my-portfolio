"use client"

import { bebasNeue } from "@/libs/fonts"
import { motion, useTransform, useScroll } from "framer-motion"
import ContactLinks from "@/components/v1/ContactLinks"
import { TContactData } from "@/libs/types"
import { FC } from "react"
import MyImage from "@/public/mehd.png"
import Image from "next/image"

const HeroMobile: FC<{
    onLoaded: () => void
}> = (props) => {
    const contacts: TContactData[] = [
        {
            title: "Github",
            url: "https://github.com/SonicRay241"
        },
        {
            title: "LinkedIn",
            url: "https://www.linkedin.com/in/rayhan-permana-733129292/"
        },
    ]
    const { scrollYProgress } = useScroll()
    const y = useTransform(scrollYProgress, [0,2], [0, 600])


    return (
        <div className="flex w-full h-screen items-center justify-center">
            <motion.div className="px-4" style={{y: y}}>
                <div className="flex justify-center items-center w-full mb-10">
                    <Image 
                        src={MyImage} 
                        alt="Rayhan Permana"
                        style={{
                            borderRadius: "100%",
                            border: "2px solid black",
                            aspectRatio: "1/1",
                            objectPosition: "45% 0"
                        }}
                        className="object-cover w-1/2"
                        onLoadingComplete={props.onLoaded}
                    />
                </div>
                <h1 className="text-4xl font-medium mb-3 w-full text-center">Hello, I&apos;m <span className=" text-violet-600">Rayhan</span></h1>
                <p className="text-2xl mb-6 w-full text-center">A student in BINUS University who is also a Software Engineer.</p>
                <div className="flex flex-wrap gap-2 justify-center">
                    {contacts.map((c, n) => {
                        return (
                            <ContactLinks 
                                contactData={c}
                                mouseEnterHandler={()=>{}}
                                mouseLeaveHandler={()=>{}}
                                key={n}
                            />
                        )
                    })}
                </div>
            </motion.div>
        </div>
    )
}

export default HeroMobile