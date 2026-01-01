"use client"

import { TNavChild } from "@/libs/types"
import { Variants, motion } from "motion/react"
import { useState, FC, Dispatch, SetStateAction } from "react"
import { Property } from "csstype"

const Chip: FC<{
  data: TNavChild,
  mouseEnterHandler: (size: number, color: Property.BackgroundColor, blendMode?: Property.MixBlendMode) => void,
  mouseLeaveHandler: () => void,
}> = (props) => {
  return (
    <div
      className="p-2 rounded-md hover:cursor-pointer hover:underline"
      onClick={() => props.data.ref.current?.scrollIntoView()}
    >
      <h2>
        {props.data.title}
      </h2>
    </div>
  )
}

const NavBar: FC<{
  data: TNavChild[],
  mouseEnterHandler: (size: number, color: Property.BackgroundColor, blendMode?: Property.MixBlendMode) => void,
  mouseLeaveHandler: () => void,
}> = (props) => {
  const [opacity, setOpacity] = useState(0)

  const variants: Variants = {
    hover: {
      opacity: opacity
    }
  }

  return (
    <motion.div
      className="fixed rounded-2xl bg-white border border-gray-700 px-4 py-3 flex items-center flex-wrap z-30 bottom-4 left-1/2 -translate-x-1/2"
      onHoverStart={() => setOpacity(1)}
      onHoverEnd={() => setOpacity(0)}
      variants={variants}
      animate="hover"
      onMouseEnter={() => props.mouseEnterHandler(40, "transparent", "normal")}
      onMouseLeave={() => props.mouseEnterHandler(40, "black", "normal")}
    >
      {props.data.map((d, n) => {
        return (
          <Chip
            data={d}
            mouseEnterHandler={props.mouseEnterHandler}
            mouseLeaveHandler={props.mouseLeaveHandler}
            key={n}
          />
        )
      })}
    </motion.div>
  )
}

export default NavBar