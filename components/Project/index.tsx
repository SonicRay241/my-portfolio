"use client"

import { motion } from "framer-motion"
import Image, { StaticImageData } from "next/image"
import { FC, useState, useRef, MouseEvent, Suspense } from "react"
import { Property } from "csstype"
import LoadingBar from "@/components/LoadingBar"
import { TProjectData } from "@/libs/types"

const Project: 
FC<{ 
    mouseEnterHandler: (size: number, color: Property.BackgroundColor, blendMode?: Property.MixBlendMode) => void, 
    mouseLeaveHandler: () => void,
    projectData: TProjectData
}> = (props) => {
    const ROTATION_RANGE = 32.5;
    const HALF_ROTATION_RANGE = 32.5 / 2;

    const cardRef = useRef<HTMLDivElement>(null);

    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (event: MouseEvent) => {
        if (!cardRef.current) return;
    
        const rect = cardRef.current.getBoundingClientRect();
    
        const width = rect.width;
        const height = rect.height;
    
        const mouseX = (event.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (event.clientY - rect.top) * ROTATION_RANGE;
    
        const rY = mouseX / width - HALF_ROTATION_RANGE;
        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    
        setRotateX(rX);
        setRotateY(rY);
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        props.mouseEnterHandler(40, "black", "normal")
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <div className="flex w-full h-fit drop-shadow-2xl justify-center">
            <div className="flex justify-center items-center w-full max-w-screen-lg md:p-28 p-3">
                <motion.div 
                    className="w-full h-full rounded-xl p-4"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={()=>props.mouseEnterHandler(40, "transparent", "normal")}
                    onMouseLeave={handleMouseLeave}
                    ref={cardRef}
                    style={{
                        transformStyle: "preserve-3d",
                        background: `linear-gradient(${props.projectData.bgFrom}, ${props.projectData.bgTo})`
                    }}
                    animate={{
                        rotateX,
                        rotateY,
                    }}
                >
                    <Suspense fallback={<LoadingBar/>}>
                        <Image 
                            src={props.projectData.image} 
                            alt={props.projectData.imageAlt} 
                            quality={100}
                            className="object-contain drop-shadow-lg" 
                            style={{
                                transform: "translateZ(75px)",
                                transformStyle: "preserve-3d",
                            }}
                        />
                    </Suspense>
                    <div className="absolute bottom-0 left-0 p-4">
                        <h1 className="text-white text-3xl">{props.projectData.name}</h1>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Project