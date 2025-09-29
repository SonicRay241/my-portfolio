"use client";

import { usePathContext } from "@/app/(v2)/pathcontext";
import { AnimatePresence, motion, Variants } from "motion/react";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function TransitionRoot(props: { children: ReactNode }) {
  const { path } = usePathContext();
  const pathname = usePathname();

  const loaded = path == pathname;

  const variants: Variants = {
    focus: {
      scale: 1,
      filter: "blur(0px)",
      opacity: 1
    },
    blur: {
      scale: 0.95,
      filter: "blur(2px)",
      opacity: 0
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={variants}
        initial={loaded ? "blur" : "focus"}
        animate={loaded ? "focus" : "blur"}
        transition={{
          type: "spring",
          opacity: {
            bounce: 0.1
          }
        }}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  );
}
