"use client"

import { motion } from "motion/react"
import blackNoise from "@/public/black-noise.png"

export default function FuzzyOverlay() {
    return (
        <motion.div
            initial={{
                transform: "translateX(-10%) translateY(-10%)"
            }}
            animate={{
                transform: "translateX(10%) translateY(10%)",
            }}
            transition={{
                repeat: Infinity,
                duration: 0.2,
                ease: "linear",
                repeatType: "mirror",
            }}
            style={{
                backgroundImage: `url(${blackNoise.src})`,
            }}
            className="pointer-events-none fixed -inset-[100%] opacity-5 z-50"
        />
    );
};