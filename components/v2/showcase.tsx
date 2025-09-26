"use client";

import { RefObject } from "react";
import ProjectCard from "./projectcard";
import ScrollVelocity from "./scrollvelocity";
import { motion, useScroll, useTransform } from "motion/react";

export default function Showcase(props: {
  heroRef?: RefObject<HTMLDivElement | null>
}) {
  return (
    <div className="pt-8 text-zinc-700">
      <Scroller />
      <Grid />
    </div>
  );
}

function Grid() {
  return (
    <motion.div
      className="sticky top-0 grid grid-cols-3 gap-4 pt-2 px-4 min-h-screen"
    >
      <div className="flex flex-col">
        {/* <ProjectCard
          title="Blog"
          imageUrl="/projects/Blog.png"
        /> */}
      </div>
      <div className="flex flex-col">
        {/* <ProjectCard
          title="Blog"
          imageUrl="/projects/Portfolio.png"
        /> */}
      </div>
      <div className="flex flex-col"></div>
    </motion.div>
  )
}

function Scroller() {
  return (
    <motion.div
      initial={{
        filter: "blur(10px)",
        opacity: 0,
      }}
      animate={{
        filter: "blur(0px)",
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
    >
      <ScrollVelocity
        texts={["SCROLL DOWN"]}
        className="text-sm font-bold"
        numCopies={50}
      />
    </motion.div>
  );
}
