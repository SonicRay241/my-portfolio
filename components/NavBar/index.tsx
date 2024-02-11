import { useEffect, useState, FC } from "react";
import { Variants, motion, AnimatePresence } from "framer-motion"
import { Property } from "csstype"
import { HamburgerMenuIcon, Cross2Icon } from "@radix-ui/react-icons"
import { memo } from "react";

const NavLink: 
  FC<{
    title: string, 
    divRef: HTMLDivElement | null, 
    closeMenuCallBack: () => void, 
    mobile: boolean,
    mouseEnterHandler: (size: number, color: Property.BackgroundColor) => void, 
    mouseLeaveHandler: () => void

  }> = (props) => {

  const mobileVariants: Variants = {
    initial: {
      x: "-100vw",
      transition: {
        duration: 0.5
      }
    },
    open: {
      x: 0,
      transition: {
        duration: 0.7
      }
    },
    
  }

  return (
    <motion.div 
      variants={props.mobile ? mobileVariants : undefined} 
      initial={props.mobile ? "initial" : undefined} 
      animate={props.mobile ? "open" : undefined} 
      onMouseEnter={()=>props.mouseEnterHandler(60, "white")} 
      onMouseLeave={props.mouseLeaveHandler}
    >
      <h1 onClick={()=>{if (props.divRef) {props.divRef.scrollIntoView()}; props.closeMenuCallBack()}} 
          className="cursor-pointer text-lg"
      >
        {props.title}
      </h1>
    </motion.div>
  )
}

const NavBar: 
  FC<{
    mouseEnterHandler: (size: number, color: Property.BackgroundColor) => void, 
    mouseLeaveHandler: () => void, 
    mobile: boolean, 
    links: { title: string, ref: HTMLDivElement | null }[]}> 
= memo(({ mouseEnterHandler, mouseLeaveHandler, mobile, links }) => {
    const [showBigMenu, setShowBigMenu] = useState(false)

    const menuVars: Variants = {
        init: {
            scaleX: 0,
        },
        animate: {
            scaleX: 1,
            transition: {
              duration: 0.3,
              ease: [0.12, 0, 0.39, 0]
            }
        }, 
        exit: {
            scaleX: 0,
            transition: {
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1]
            }
        }
    }

  return (
    <>
      {
        !mobile ?
          <div className="fixed flex justify-end gap-6 w-screen h-10 backdrop-blur-xl px-10">
            {links.map((e)=>{
              return (
                <NavLink 
                  key = {e.title}
                  title={e.title} 
                  divRef={e.ref} 
                  closeMenuCallBack={() => setShowBigMenu(false)} 
                  mobile={mobile} 
                  mouseEnterHandler={(size, color) => mouseEnterHandler(size, color)} 
                  mouseLeaveHandler={mouseLeaveHandler}/>
              )
            })}
          </div>

        :
        <>
        <div className="fixed top-3 right-3 cursor-pointer active:bg-black active:bg-opacity-20 p-2 rounded-full" onClick={()=>setShowBigMenu(!showBigMenu)}>
          <HamburgerMenuIcon height={32} width={32} />
        </div>
        <AnimatePresence>
        { showBigMenu && 
            <motion.div className="fixed w-screen h-screen z-10 bg-[#FF5900] origin-left" variants={menuVars} initial="init" animate="animate" exit="exit">
                <div className="absolute top-3 right-3 cursor-pointer active:bg-white active:bg-opacity-20 p-2 rounded-full" onClick={()=>setShowBigMenu(!showBigMenu)}>
                  <Cross2Icon height={32} width={32} color="white" />
                </div>
                <div className="flex w-full h-full justify-center">
                  {links.map((e)=>{
                    return (
                        <NavLink 
                          key={e.title} 
                          title={e.title} 
                          divRef={e.ref} 
                          closeMenuCallBack={() => setShowBigMenu(false)} 
                          mobile={mobile} 
                          mouseEnterHandler={(size, color) => mouseEnterHandler(size, color)} 
                          mouseLeaveHandler={mouseLeaveHandler}
                        />
                    )
                  })}
                </div>
            </motion.div>
        }
        </AnimatePresence>
        </>
      }
      
      
    </>
  )
})
NavBar.displayName = "NavBar"
export default NavBar