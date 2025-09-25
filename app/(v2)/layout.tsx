"use client"

import FuzzyOverlay from "@/components/v2/FuzzyOverlay";
import VersionOverlay from "@/components/v2/VersionOverlay";
import { aeonik, vt323 } from "@/libs/fonts";
import { ReactNode } from "react";
import { ReactLenis } from "lenis/react"
import "./v2.css"

const font = aeonik

export default function Layout(props: {
    children: ReactNode
}) {
    return (
        <>
            <ReactLenis root />
            <div className="w-full min-h-screen">
                <div className={`${font.className} relative min-h-screen pt-2`}>
                    {props.children}
                </div>
                <VersionOverlay
                    font={vt323}
                    version={2}
                    className="text-lg text-zinc-700/60"
                />
                <FuzzyOverlay />
            </div>
        </>
    )
}