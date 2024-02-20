"use client"

import { useEffect, useRef, useState } from "react";
import { Variants, motion } from "framer-motion"
import { Property } from "csstype"
import Hero from "@/components/Hero";
import HeroMobile from "@/components/HeroMobile";
import About from "@/components/About";
import Projects from "@/components/Projects";
import LoadingBar from "@/components/LoadingBar";
import ProjectDescription from "@/components/ProjectDescription";
import { TNavChild, TProjectData } from "@/libs/types";
import NavBar from "@/components/NavBar";

type T2dCoord = {
  x: number
  y: number
}

const Page = () => {
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const [overlayScale, setOverlayScale] = useState(1)
  const [showProjectDescription, setShowProjectDescription] = useState(false)

  const [descriptionData, setDescriptionData] = useState<TProjectData | null>(null)

  const defaultCursorColor: Property.BackgroundColor = "transparent"
  const defaultCursorSize: number = 40

  const [mousePos, setMousePos] = useState<T2dCoord>({x: 0, y: 0})
  const [cursorSize, setCursorSize] = useState(defaultCursorSize)
  const [cursorBlendMode, setCursorBlendMode] = useState<Property.MixBlendMode>("normal")
  const [cursorColor, setCursorColor] = useState<Property.BackgroundColor>("transparent")
  const [cursorBorderColor, setCursorBorderColor] = useState<Property.BorderColor>("transparent")
  const [renderCursor, setRenderCursor] = useState<boolean>(false)
  const [cursorClicking, setCursorClicking] = useState<boolean>(false)

  const cursor = useRef<HTMLDivElement | null>(null)

  const aboutRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  const navbarData: TNavChild[] = [
    {
      title: "About",
      ref: aboutRef
    },
    {
      title: "Projects",
      ref: projectsRef
    }
  ]

  useEffect(() => {
    // setTimeout(()=>{
    //   setOverlayScale(0)
    // }, 1000)
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
      window.removeEventListener("mousedown", mousedownEvent)
      window.removeEventListener("mouseup", mouseupEvent)
      document.body.style.overflow = "auto"
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
      borderWidth: 2,
      borderColor: cursorBorderColor
    },
  }

  const overlayVariants: Variants = {
    default: {
      scaleY: overlayScale,
    },
    darken: {
      opacity: showProjectDescription ? 0.4 : 0,
      pointerEvents: showProjectDescription ? "all" : "none"
    },
    main: {
      // position: showProjectDescription ? "fixed" : "static",
      scale: showProjectDescription ? 0.9 : 1,
      borderRadius: showProjectDescription ? 40 : 0,
      borderColor: "black"
    }
  }

  const cursorChange = (size: number, color: Property.BackgroundColor, blend: Property.MixBlendMode = "difference", border: Property.BorderColor = "transparent") => {
    setCursorSize(Math.max(size, defaultCursorSize))
    setCursorColor(color)
    setCursorBlendMode(blend)
    setCursorBorderColor(border)
  }
  
  const defaultCursor = () => {
    setCursorSize(defaultCursorSize)
    setCursorBlendMode("normal")
    setCursorColor(defaultCursorColor)
    setCursorBorderColor("transparent")
  }

  const handleDescription = (data: TProjectData) => {
    setShowProjectDescription(true)
    setDescriptionData(data)
    if (document) {
      document.body.style.overflow = "hidden"
    }
  }

  const handleDescriptionClose = () => {
    setShowProjectDescription(false)
    if (document) {
      document.body.style.overflow = "auto"
    }
    setTimeout(()=>{
      setDescriptionData(null)
    }, 250)
  }

  return (
    <>
      <ProjectDescription 
        show={showProjectDescription} 
        closeCallback={handleDescriptionClose}
        projectData={descriptionData}
        mouseEnterHandler={cursorChange}
        mouseLeaveHandler={defaultCursor}
      />
      <motion.div 
        className="fixed bg-black w-screen h-screen z-30 top-0"
        variants={overlayVariants}
        animate="darken"
        onClick={handleDescriptionClose}
      />
      <motion.div 
        className="fixed flex justify-center items-center z-50 h-screen w-screen bg-black origin-bottom" 
        variants={overlayVariants}
        animate="default"
      >
        <LoadingBar/>
      </motion.div>
      <NavBar 
        data={navbarData}
        mouseEnterHandler={cursorChange}
        mouseLeaveHandler={defaultCursor}
      />
      <main className="h-screen w-full">
          <div 
            className="bg-white w-screen z-20 top-0"
          />
          { !isMobileDevice && 
            <motion.div 
              className="fixed z-40 rounded-full pointer-events-none hidden sm:flex transition-colors"
              variants={variants} 
              animate="default"
              ref={cursor}
            /> 
          }
          {/* <NavBar mouseEnterHandler={(size, color) => cursorChange(size, color)} mouseLeaveHandler={mouseLeave} mobile={isMobileDevice} links={navbarChildren}/> */}
          <motion.div 
            className="flex items-center justify-center"
            variants={overlayVariants}
            animate="main"
          >
            <div className="w-full h-full">
              { !isMobileDevice && <Hero onLoaded={()=>setOverlayScale(0)}/> }
            <div className="w-full h-[120vh]" onMouseEnter={defaultCursor}>
              { isMobileDevice && <HeroMobile/> }
            </div>
            <div ref={aboutRef}>
              <About
                mouseEnterHandler={cursorChange}
                mouseLeaveHandler={defaultCursor}
                />
            </div>
            <div ref={projectsRef}>
              <Projects
                mouseEnterHandler={cursorChange}
                mouseLeaveHandler={defaultCursor}
                descriptionCallback={handleDescription}
                />
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}
Page.displayName = "Page"

export default Page