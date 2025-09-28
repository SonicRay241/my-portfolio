"use client"

import { usePathContext } from "@/app/(v2)/pathcontext";
import { AnimatePresence, motion } from "motion/react"
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react"

export default function TransitionRoot(props: {
  children: ReactNode;
}) {
  const { path } = usePathContext()
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div key={path}>
        <div className="">
          {props.children}
        </div>
        <motion.div
          className="fixed top-0 left-0 right-0 bottom-0 z-90 bg-violet-600 origin-top z-80"
          initial={{
            scaleY: 0
          }}
          animate={{
            scaleY: 0
          }}
          exit={{
            scaleY: 1
          }}
          transition={{
            ease: [0.22, 1, 0.36, 1],
            duration: 0.7
          }}
        />
        <motion.div
          className="fixed top-0 left-0 right-0 bottom-0 z-90 bg-violet-600 origin-bottom z-80"
          initial={{
            scaleY: 1
          }}
          animate={{
            scaleY: 0
          }}
          exit={{
            scaleY: 0
          }}
          transition={{
            ease: [0.22, 1, 0.36, 1],
            duration: 0.7
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
}