"use client"

import { useEffect, useRef, useState, FC} from "react";
import { Variants, motion } from "framer-motion"
import { Property } from "csstype"
import NavBar from "../components/Navbar";

type T2dCoord = {
  x: number
  y: number
}

const Page = () => {
  const isMobileDevice = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const defaultCursorColor: Property.BackgroundColor = "black"
  const defaultCursorSize: number = 40

  const [mousePos, setMousePos] = useState<T2dCoord>({x: 0, y: 0})
  const [cursorSize, setCursorSize] = useState(defaultCursorSize)
  const [cursorBlendMode, setCursorBlendMode] = useState<Property.MixBlendMode>("normal")
  const [cursorColor, setCursorColor] = useState<Property.BackgroundColor>("transparent")
  const [renderCursor, setRenderCursor] = useState<boolean>(false)

  const cursor = useRef<HTMLDivElement | null>(null)


  useEffect(() => {
    if (!renderCursor) setMousePos({x: window.innerWidth/2, y: window.innerHeight/2} )
    const mouseMoveEvent = (e: MouseEvent) => {
      if (!renderCursor) {
        setRenderCursor(true)
        setCursorColor(defaultCursorColor)
      }
      setMousePos({x: e.clientX, y: e.clientY})
    }

    window.addEventListener("mousemove", mouseMoveEvent)

    return () => {
      window.removeEventListener("mousemove", mouseMoveEvent)
    }
  }, [renderCursor])

  const variants: Variants = {
    default: {
      x: mousePos.x,
      y: mousePos.y,
      height: cursorSize,
      width: cursorSize,
      top: -cursorSize/2,
      left: -cursorSize/2,
      mixBlendMode: cursorBlendMode,
      backgroundColor: cursorColor,
    },
  }

  const mouseEnter: (size: number, color: Property.BackgroundColor) => void = (size, color) => {
    setCursorSize(Math.max(size, defaultCursorSize))
    setCursorColor(color)
    setCursorBlendMode("difference")
  }
  
  const mouseLeave = () => {
    setCursorSize(defaultCursorSize)
    setCursorBlendMode("normal")
    setCursorColor(defaultCursorColor)
  }

  return (
    <main className="h-screen w-screen bg-white">
      <motion.div 
        className="fixed z-50 rounded-full pointer-events-none hidden sm:block"
        variants={variants} 
        animate="default"
        ref={cursor}
      >
      </motion.div>
      {/* <NavBar mouseEnterHandler={(size, color) => mouseEnter(size, color)} mouseLeaveHandler={mouseLeave}/> */}
      <div className="flex h-full w-full justify-center items-center">
        <div className="w-[320px] sm:w-[540px] md:w-[640px] lg:w-[960px]">
          <h1 className="text-4xl text-black text-center w-fit" onMouseEnter={() => mouseEnter(120, "white")} onMouseLeave={mouseLeave}>{isMobileDevice() ? "Mobile" : "Web"}</h1>
        </div>
      </div>
    </main>
  );
}
Page.displayName = "Page"

export default Page