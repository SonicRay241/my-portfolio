"use client"

import { motion } from "motion/react";
import Link from "next/link";

export default function Logo() {
    const logoTitle = "rayhan.".split("")
    const DURATION = 0.25
    const STAGGER = 0.0125

    return (
        <Link className="flex" href="/">
            <div className="text-xl text-violet-500 font-bold pr-1">
                /
            </div>
            <motion.div
                initial="initial"
                whileHover="hovered"
                className="relative block text-lg text-white overflow-hidden whitespace-nowrap"
            >
                <div>
                    {logoTitle.map((c, i) => {
                        return (
                            <motion.span
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
                            </motion.span>
                        )
                    })}
                </div>
                <div className="absolute inset-0">
                    {logoTitle.map((c, i) => {
                        return (
                            <motion.span
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
                            </motion.span>
                        )
                    })}
                </div>
            </motion.div>
        </Link>
    )
}