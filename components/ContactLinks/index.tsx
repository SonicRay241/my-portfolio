"use client"

import { Variants, motion } from "framer-motion"
import { FC, useState } from "react"
import { Property } from "csstype"
import { ArrowOutward } from "@mui/icons-material"
import { TContactData } from "@/libs/types"

const ContactLinks: FC<{
    contactData: TContactData,
    mouseEnterHandler: (size: number, color: Property.BackgroundColor, blendMode?: Property.MixBlendMode) => void, 
    mouseLeaveHandler: () => void,
}> = (props) => {
    const [bgColor, setBgColor] = useState<Property.BackgroundColor>("white")
    const [textColor, setTextColor] = useState<Property.Color>("black")

    const variants: Variants = {
        button: {
            backgroundColor: bgColor,
            color: textColor,
        }
    }

    const onDownHandler = () => {
        setBgColor("black")
        setTextColor("white")
        props.mouseEnterHandler(100, "white")
    }
    
    const onUpHandler = () => {
        setBgColor("white")
        setTextColor("black")
        props.mouseEnterHandler(40, "black", "normal")
    }

    return (
        <motion.div 
            className="w-fit p-2 border-2 border-black rounded-lg"
            variants={variants}
            animate="button"
            onMouseEnter={onDownHandler}
            onMouseLeave={onUpHandler}
        >
            <a 
                className="w-fit"
                href={props.contactData.url}
                target="_blank"
            >
                <div className="flex h-7">
                    <h1 className="text-2xl">{props.contactData.title}</h1>
                    <ArrowOutward className="h-full"/>
                </div>
            </a>
        </motion.div>
    )
}

export default ContactLinks