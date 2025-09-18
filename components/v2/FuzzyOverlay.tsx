"use client"

import { motion } from "framer-motion"
import blackNoise from "@/public/black-noise.png"
import noise from "@/public/noise.png"

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
            // You can download these PNGs here:
            // https://www.hover.dev/black-noise.png
            // https://www.hover.dev/noise.png
            style={{
                backgroundImage: `url(${blackNoise.src})`,
                // backgroundImage: `url(${noise.src})`,
                // backgroundImage: "https://www.hover.dev/black-noise.png",
                // backgroundImage: 'url("/noise.png")',
            }}
            className="pointer-events-none fixed -inset-[100%] opacity-5 z-50"
        />
    );
};