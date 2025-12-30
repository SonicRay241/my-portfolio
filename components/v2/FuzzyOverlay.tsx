"use client"

import blackNoise from "@/public/black-noise.png"

export default function FuzzyOverlay() {
    return (
        <div
            style={{
                backgroundImage: `url(${blackNoise.src})`,
            }}
            className="pointer-events-none fixed -inset-[100%] opacity-5 animate-noise"
        />
    );
};