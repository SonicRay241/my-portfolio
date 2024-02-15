"use client"

import { useEffect, useRef, useState } from "react";
import { Variants, motion } from "framer-motion"
import { Property } from "csstype"
import Hero from "@/components/Hero";
import HeroMobile from "@/components/HeroMobile";

type T2dCoord = {
  x: number
  y: number
}

const Page = () => {
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const [screenHeight, setScreenHeight] = useState(0)

  const defaultCursorColor: Property.BackgroundColor = "transparent"
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
    setTimeout(()=>{
      setScreenHeight(window.innerHeight)
    }, 1000)
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

  const overlayVariants: Variants = {
    default: {
      top: screenHeight,
    }
  }

  function cursorChange(size: number, color: Property.BackgroundColor, blend: Property.MixBlendMode = "difference") {
    setCursorSize(Math.max(size, defaultCursorSize))
    setCursorColor(color)
    setCursorBlendMode(blend)
  }
  
  const defaultCursor = () => {
    setCursorSize(defaultCursorSize)
    setCursorBlendMode("normal")
    setCursorColor(defaultCursorColor)
  }

  return (
    <main className="h-screen w-full bg-transparent">
      <motion.div className="fixed z-50 h-screen w-screen bg-black" variants={overlayVariants} animate="default"/>
      { !isMobileDevice && 
        <motion.div 
          className="fixed z-40 rounded-full pointer-events-none hidden sm:block transition-colors"
          variants={variants} 
          animate="default"
          ref={cursor}
        /> 
      }
      
      {/* <NavBar mouseEnterHandler={(size, color) => cursorChange(size, color)} mouseLeaveHandler={mouseLeave} mobile={isMobileDevice} links={navbarChildren}/> */}
      <div className="w-full h-screen">
        { !isMobileDevice && <Hero/> }
        <div className="w-full h-screen">
          { isMobileDevice && <HeroMobile/> }
        </div>
        <div className="flex w-full h-1/2 justify-center items-center bg-black" onMouseEnter={() => cursorChange(40, "white", "normal")} onMouseLeave={defaultCursor}>
          <div className="w-[320px] sm:w-[540px] md:w-[640px] lg:w-[960px]">
            <h1 className="text-4xl text-white text-center w-fit mt-" onMouseEnter={() => cursorChange(120, "white")} onMouseLeave={() => cursorChange(40, "white", "normal")}>{isMobileDevice ? "Mobile" : "Web"}</h1>

          </div>
        </div>
      </div>
    </main>
  );
}
Page.displayName = "Page"

export default Page