"use client";

import ScrollVelocity from "./scrollvelocity";
import { motion } from "motion/react";

export default function Showcase() {
  return (
    <div className="pt-8 text-zinc-700">
      <Scroller />
    </div>
  );
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
        texts={["HIGHLIGHTS"]}
        className="text-sm font-bold"
        numCopies={30}
      />
    </motion.div>
  );
}
