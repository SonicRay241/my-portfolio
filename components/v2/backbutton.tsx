"use client";

import { usePathContext } from "@/app/(v2)/pathcontext";
import GlassSurface from "./glasssurface";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { motion, useSpring } from "motion/react";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function BackButton() {
  const buttonScale = useSpring(1, { stiffness: 500 });

  const router = useRouter();
  const { path, setPath } = usePathContext();

  function handleTransition(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setPath("/");

    if (path != "/") {
      setTimeout(() => {
        router.push("/");
      }, 500);
    }
  }

  return (
    <div className="relative w-10 h-10 pointer-events-auto">
      <motion.div
        className="absolute top-0 left-0"
        initial={{
          translateY: -10,
          translateX: -10,
        }}
        animate={{
          translateY: 0,
          translateX: 0,
        }}
        exit={{
          opacity: 0,
          translateY: -10,
          translateX: -10,
        }}
        style={{
          scale: buttonScale,
        }}
        transition={{
          type: "spring",
          duration: 0.4,
          bounce: 0.4,
        }}
      >
        <GlassSurface width={40} height={40} borderRadius={20} />
      </motion.div>
      <motion.button
        initial={{
          opacity: 0,
          translateY: -10,
          filter: "blur(10px) brightness(2)",
        }}
        animate={{
          opacity: 0.6,
          translateY: 0,
          filter: "blur(0px) brightness(1)",
          transition: {
            filter: {
              delay: 0.1,
            },
          },
        }}
        exit={{
          opacity: 0,
          translateY: -10,
          filter: "blur(10px) brightness(2)",
        }}
        whileTap={{
          filter: "brightness(1.2)",
          background: "#fff2",
          opacity: 0.9,
          transition: {
            type: "spring",
          },
        }}
        style={{
          scale: buttonScale
        }}
        transition={{
          type: "spring",
          bounce: 0.6,
          duration: 0.4,
        }}
        onTapStart={() => buttonScale.set(1.1)}
        onTapCancel={() => buttonScale.set(1)}
        className="peer absolute top-0 left-0 w-10 h-10 flex justify-center items-center rounded-full bg-black/60"
        onClick={(e) => {
          buttonScale.set(1);
          handleTransition(e);
        }}
      >
        <ArrowBackIosIcon fontSize="small" className="size-2 text-zinc-100 translate-x-1" />
      </motion.button>
    </div>
  );
}
