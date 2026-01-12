"use client";

import { usePathContext } from "@/app/(versions)/(v2)/pathcontext";
import { AnimatePresence, Variants } from "motion/react";
import * as m from "motion/react-m"
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function TransitionRoot(props: { children: ReactNode }) {
  const [jsCheck, setJSCheck] = useState(false)
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

  useEffect(() => {
    setJSCheck(true)
  }, [])

  if (!jsCheck) return null

  return (
    <AnimatePresence mode="wait">
      <m.div
        variants={variants}
        initial={loaded ? "blur" : "focus"}
        animate={loaded ? "focus" : "blur"}
        transition={{
          type: "spring",
          bounce: 0,
        }}
      >
        {props.children}
      </m.div>
    </AnimatePresence>
  );
}
