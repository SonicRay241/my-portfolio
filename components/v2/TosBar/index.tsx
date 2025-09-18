"use client"

import { ReactNode } from "react"
// import TosContent from "./tocContent"

export default function ContentBar(props: {
    children: ReactNode,
}) {
    return (
        <div className="flex w-full h-screen">
            
            <div className="w-full">
                {props.children}
            </div>
        </div>
    )
}