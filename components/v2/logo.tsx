"use client"

import { useVersionModal } from "@/app/(versions)/_versionContext";
import * as m from "motion/react-m"

export default function Logo() {
    const logoTitle = "rayhan.".split("")
    const DURATION = 0.25
    const STAGGER = 0.0125

    const [showModal, setShowModal] = useVersionModal()

    return (
        <button className="flex items-center" onClick={() => setShowModal(true)} >
            <div className="text-2xl text-violet-600 font-bold pr-1">
                /
            </div>
            <m.div
                initial="initial"
                whileHover="hovered"
                className="relative block text-xl text-white overflow-hidden whitespace-nowrap"
            >
                <div>
                    {logoTitle.map((c, i) => {
                        return (
                            <m.span
                                key={i}
                                variants={{
                                    initial: { y: 0 },
                                    hovered: { y: "-100%" }
                                }}
                                transition={{
                                    duration: DURATION,
                                    ease: "circInOut",
                                    delay: STAGGER * i
                                }}
                                className={`inline-block ${c == " " ? "w-1" : ""}`}
                            >
                                {c}
                            </m.span>
                        )
                    })}
                </div>
                <div className="absolute inset-0">
                    {logoTitle.map((c, i) => {
                        return (
                            <m.span
                                key={i}
                                variants={{
                                    initial: { y: "100%", textDecoration: "none" },
                                    hovered: { y: 0, textDecoration: "underline", textDecorationColor: "#8b5cf6" }
                                }}
                                transition={{
                                    duration: DURATION,
                                    ease: "circInOut",
                                    delay: STAGGER * i
                                }}
                                className={`inline-block ${c == " " ? "w-1" : ""}`}
                            >
                                {c}
                            </m.span>
                        )
                    })}
                </div>
            </m.div>
        </button>
    )
}