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
    isMobile: boolean
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
        <div 
            className="bg-white py-12 h-min-96 border-t-2 border-black overflow-hidden"
            style={{
                paddingLeft: props.isMobile ? 12 : 32,
                paddingRight: props.isMobile ? 12 : 32,
            }}
        >
            <div>     
                <h1 
                    className="mb-16 w-fit h-fit"
                    onMouseEnter={()=>props.mouseEnterHandler(100, "white", "difference")}
                    onMouseLeave={()=>props.mouseEnterHandler(40, "black", "normal")}
                    style={{
                        fontSize: !props.isMobile ? 72 : 40,
                        marginBottom: !props.isMobile ? 64 : 0
                    }}
                >
                    <span className="text-violet-600">/</span>RAYHAN PERMANA
                </h1>
            </div>
            <div 
                className="flex"
                style={{
                    flexDirection: props.isMobile ? "column" : "row",
                    gap: props.isMobile ? 16 : 0
                }}
            >
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
                            <Image src={NextIcon} alt="NextJS Icon" quality={50} height={28} className=""/>
                        </a>
                        <h2 className="text-xl">in Jakarta, Indonesia.</h2>
                    </div>
                </div>
                <div 
                    className="flex w-full gap-5 flex-wrap"
                    style={{
                        justifyContent: props.isMobile ? "start" : "end"
                    }}
                >
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