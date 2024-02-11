"use client"

import { useEffect, useRef, useState, FC} from "react";
import { Variants, motion } from "framer-motion"
import { Property } from "csstype"
import { HamburgerMenuIcon, Cross2Icon } from "@radix-ui/react-icons"
import { memo } from "react";

type T2dCoord = {
  x: number
  y: number
}

const NavBar: FC<{mouseEnterHandler: (size: number, color: Property.BackgroundColor) => void, mouseLeaveHandler: () => void}> 
= memo(({mouseEnterHandler, mouseLeaveHandler}) => {
  const [showBigMenu, setShowBigMenu] = useState(false)

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 640 && showBigMenu) setShowBigMenu(false)
    })

    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth > 640 && showBigMenu) setShowBigMenu(false)
      })
    }
  })

  const menuVars: Variants = {
    init: {
      scaleX: 0,
    },
    animate: {
      scaleX: 1,
    }, 
    exit: {
      scaleX: 0
    }
  }

  return (
    <>
      <div className="hidden fixed w-screen h-10 backdrop-blur-xl sm:block">
        <h1 
          className="text-xl" 
          onMouseEnter={() => mouseEnterHandler(60, "white")} 
          onMouseLeave={mouseLeaveHandler}>
            Home
        </h1>
      </div>
      <div className="fixed sm:hidden top-3 right-3 cursor-pointer" onClick={()=>setShowBigMenu(!showBigMenu)}>
        <HamburgerMenuIcon height={32} width={32} />
      </div>
      { showBigMenu && 
        <motion.div className="fixed sm:hidden w-screen h-screen z-10 bg-[#FF5900] origin-right" variants={menuVars} initial="init" animate="animate" exit="exit">
            <div className="absolute top-3 right-3 cursor-pointer" onClick={()=>setShowBigMenu(!showBigMenu)}>
              <Cross2Icon height={32} width={32} color="white" />
            </div>
        </motion.div>
      }
    </>
  )
})

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
Page.displayName = "Main"

export default Page