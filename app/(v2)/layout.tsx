"use client"

import FuzzyOverlay from "@/components/v2/FuzzyOverlay";
import VersionOverlay from "@/components/v2/VersionOverlay";
import { aeonik, vt323 } from "@/libs/fonts";
import { ReactNode } from "react";
import { ReactLenis } from "lenis/react"

const font = aeonik

export default function Layout(props: {
    children: ReactNode
}) {
    return (
        <>
            <ReactLenis root />
            <div className="w-full min-h-screen bg-zinc-900">
                <div className={`${font.className} min-h-screen pt-2`}>
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