"use client"

import { FC } from "react"
import { Property } from "csstype"
import Image from "next/image"
import NextIcon from "@/public/next.png"
import ContactLinks from "@/components/ContactLinks"
import { TContactData } from "@/libs/types"

const Contacts: FC<{
    mouseEnterHandler: (size: number, color: Property.BackgroundColor, blendMode?: Property.MixBlendMode) => void, 
    mouseLeaveHandler: () => void,
}> = (props) => {
    const contacts: TContactData[] =[
        {
            title: "Github",
            url: "https://github.com/SonicRay241"
        },
        {
            title: "LinkedIn",
            url: "https://www.linkedin.com/in/rayhan-permana-733129292/"
        },
        {
            title: "Instagram",
            url: "https://www.instagram.com/rayy.dev?igsh=cDFyaTg5Nmd3cDVv"
        }
    ]

    return (
        <div className="bg-white py-12 px-8 h-96 border-t-2 border-black">
            <div 
                className=""
            >     
                <h1 
                    className="text-7xl mb-16 w-fit h-fit"
                    onMouseEnter={()=>props.mouseEnterHandler(100, "white", "difference")}
                    onMouseLeave={()=>props.mouseEnterHandler(40, "black", "normal")}
                >
                    <span className="text-violet-600">/</span>RAYHAN PERMANA
                </h1>
            </div>
            <div className="flex">
                <div className="w-full">
                    <div 
                        className="flex flex-wrap gap-2 w-fit"
                        onMouseEnter={()=>props.mouseEnterHandler(100, "white", "difference")}
                        onMouseLeave={()=>props.mouseEnterHandler(40, "black", "normal")}
                    >
                        <h2 className="text-xl">Made with</h2>
                        <a 
                            className="h-7 w-7 hover:cursor-pointer"
                            href="https://nextjs.org/"
                            target="_blank"
                        >
                            <Image src={NextIcon} alt="React Icon" quality={50} height={28} className=""/>
                        </a>
                        <h2 className="text-xl">in Jakarta, Indonesia.</h2>
                    </div>
                </div>
                <div className="flex w-full gap-5 justify-end">
                    {contacts.map((c, n)=>{
                        return (
                            <ContactLinks 
                                contactData={c}
                                mouseEnterHandler={props.mouseEnterHandler}
                                mouseLeaveHandler={props.mouseLeaveHandler}
                                key={n}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Contacts