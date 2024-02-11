"use client"

import { useEffect, useRef, useState, FC} from "react";
import { Variants, motion } from "framer-motion"
import { Property } from "csstype"
import NavBar from "@/components/NavBar";

type T2dCoord = {
  x: number
  y: number
}

const Page = () => {
  const [isMobileDevice, setIsMobileDevice] = useState(false)

  const defaultCursorColor: Property.BackgroundColor = "black"
  const defaultCursorSize: number = 40

  const [mousePos, setMousePos] = useState<T2dCoord>({x: 0, y: 0})
  const [cursorSize, setCursorSize] = useState(defaultCursorSize)
  const [cursorBlendMode, setCursorBlendMode] = useState<Property.MixBlendMode>("normal")
  const [cursorColor, setCursorColor] = useState<Property.BackgroundColor>("transparent")
  const [renderCursor, setRenderCursor] = useState<boolean>(false)
  const [cursorClicking, setCursorClicking] = useState<boolean>(false)

  const cursor = useRef<HTMLDivElement | null>(null)

  const testRef = useRef<HTMLDivElement | null>(null)

  const navbarChildren: { title: string, ref: HTMLDivElement | null }[] = [
    { title: "test", ref: testRef.current }
  ]


  useEffect(() => {
    setIsMobileDevice(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
    if (!renderCursor) setMousePos({x: window.innerWidth/2, y: window.innerHeight/2} )

    const mouseMoveEvent = (e: MouseEvent) => {
      if (!renderCursor) {
        setRenderCursor(true)
        setCursorColor(defaultCursorColor)
      }
      setMousePos({x: e.clientX, y: e.clientY})
    }

    const mousedownEvent = (e: MouseEvent) => {
      setCursorClicking(true)
    }

    const mouseupEvent = (e: MouseEvent) => {
      setCursorClicking(false)
    }

    window.addEventListener("mousemove", mouseMoveEvent)
    window.addEventListener("mousedown", mousedownEvent)
    window.addEventListener("mouseup", mouseupEvent)

    return () => {
      window.removeEventListener("mousemove", mouseMoveEvent)
      window.addEventListener("mousedown", mousedownEvent)
      window.addEventListener("mouseup", mouseupEvent)
    }
  }, [renderCursor])

  const variants: Variants = {
    default: {
      x: mousePos.x,
      y: mousePos.y,
      height: cursorSize * (cursorClicking ? 1.5 : 1),
      width: cursorSize * (cursorClicking ? 1.5 : 1),
      top: -(cursorSize * (cursorClicking ? 1.5 : 1))/2,
      left: -(cursorSize * (cursorClicking ? 1.5 : 1))/2,
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
    <main className="h-screen w-full bg-white">
      { !isMobileDevice && 
        <motion.div 
          className="fixed z-50 rounded-full pointer-events-none hidden sm:block"
          variants={variants} 
          animate="default"
          ref={cursor}
        /> 
      }
      
      <NavBar mouseEnterHandler={(size, color) => mouseEnter(size, color)} mouseLeaveHandler={mouseLeave} mobile={isMobileDevice} links={navbarChildren}/>
      <div className="flex w-full h-fit justify-center items-center">
        <div className="w-[320px] sm:w-[540px] md:w-[640px] lg:w-[960px]">
          <h1 className="text-4xl text-black text-center w-fit mt-52 mb-96 h-96" onMouseEnter={() => mouseEnter(120, "white")} onMouseLeave={mouseLeave}>{isMobileDevice ? "Mobile" : "Web"}</h1>
          <div className="w-20 h-7 bg-red-600" ref={testRef}></div>
        </div>
      </div>
    </main>
  );
}
Page.displayName = "Page"

export default Page