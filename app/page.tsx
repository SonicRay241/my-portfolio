"use client"

import { useEffect, useRef, useState, useReducer, StyleHTMLAttributes } from "react";
import { Variants, motion } from "framer-motion"
import { Property } from "csstype"

type T2dCoord = {
  x: number
  y: number
}

const Page = () => {
  const [mousePos, setMousePos] = useState<T2dCoord>({x:0, y:0})
  const [cursorSize, setCursorSize] = useState(40)
  const [cursorBlendMode, setCursorBlendMode] = useState<Property.MixBlendMode>("normal")
  const [cursorColor, setCursorColor] = useState<Property.BackgroundColor>("black")

  const cursor = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mouseMoveEvent = (e: MouseEvent) => {
      setMousePos({x: e.clientX, y: e.clientY})
    }

    window.addEventListener("mousemove", mouseMoveEvent)

    return () => {
      window.removeEventListener("mousemove", mouseMoveEvent)
    }
  })

  const variants: Variants = {
    default: {
      x: mousePos.x,
      y: mousePos.y,
      height: cursorSize,
      width: cursorSize,
      top: -cursorSize/2,
      left: -cursorSize/2,
      mixBlendMode: cursorBlendMode,
      backgroundColor: cursorColor
    },
  }

  const mouseEnter: (size: number, color: Property.BackgroundColor) => void = (size, color) => {
    setCursorSize(Math.min(size, 40))
    setCursorColor(color)
    setCursorBlendMode("difference")
  }
  
  const mouseLeave = () => {
    setCursorSize(40)
    setCursorBlendMode("normal")
    setCursorColor("black")
  }

  return (
    <main className="h-screen w-screen bg-white">
      <motion.div 
        className="fixed z-50 rounded-full pointer-events-none"
        variants={variants} 
        animate="default"
        ref={cursor}
      >
      </motion.div>
      <div className="flex h-full justify-center items-center">
        <h1 className="text-4xl" onMouseEnter={() => mouseEnter(200, "white")} onMouseLeave={mouseLeave}>AMOGUS</h1>
      </div>
    </main>
  );
}

export default Page