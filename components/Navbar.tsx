import { useEffect, useRef, useState, FC} from "react";
import { Variants, motion } from "framer-motion"
import { Property } from "csstype"
import { HamburgerMenuIcon, Cross2Icon } from "@radix-ui/react-icons"
import { memo } from "react";

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
export default NavBar