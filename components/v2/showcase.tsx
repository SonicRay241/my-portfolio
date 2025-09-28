"use client";

import { RefObject, useRef } from "react";
import ProjectCard from "./projectcard";
import ScrollVelocity from "./scrollvelocity";
import { motion, useScroll, useTransform } from "motion/react";
import { ShowcaseMeta, showcases } from "@/libs/showcasemeta";
import { useMediaQuery } from "@mui/material";

export default function Showcase(props: {
  heroRef: RefObject<HTMLDivElement | null>
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: props.heroRef,
    offset: ["start start", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1])
  const filter = useTransform(scrollYProgress, [0, 1], ["brightness(0.5) blur(2px)", "brightness(1) blur(0px)"])
  const pointerEvents = useTransform(scrollYProgress, [0, 0.99, 1], ["none", "none", "auto"])

  return (
    <motion.div
      className="pt-2 md:pt-8 text-zinc-700"
      ref={ref}
      style={{
        scale,
        filter,
        pointerEvents
      }}
    >
      <Grid />
    </motion.div>
  );
}

function Grid() {
  const columns: ShowcaseMeta[][] = [[], [], []];
  showcases.forEach((val, i) => {
    columns[i % 3].push(val);
  });

  const renderGrid = useMediaQuery("(min-width:768px)");

  return (
    <div className="sticky top-0 grid grid-cols-1 md:grid-cols-3 gap-4 px-4 min-h-screen">
      {renderGrid ? (
        <>
          <div className="flex flex-col gap-6">
            {columns[0].map((v, k) => (
              <ProjectCard
                title={v.name}
                description={v.description}
                thumbnailUrl={`${v.path}/${v.thumbnailName}`}
                thumbnailType={v.thumbnailType}
                key={k}
              />
            ))}
          </div>
          <div className="flex flex-col gap-6">
            {columns[1].map((v, k) => (
              <ProjectCard
                title={v.name}
                description={v.description}
                thumbnailUrl={`${v.path}/${v.thumbnailName}`}
                thumbnailType={v.thumbnailType}
                key={k}
              />
            ))}
          </div>
          <div className="flex flex-col gap-6">
            {columns[2].map((v, k) => (
              <ProjectCard
                title={v.name}
                description={v.description}
                thumbnailUrl={`${v.path}/${v.thumbnailName}`}
                thumbnailType={v.thumbnailType}
                key={k}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-6">
          {showcases.map((v, k) => (
            <ProjectCard
              title={v.name}
              description={v.description}
              thumbnailUrl={`${v.path}/${v.thumbnailName}`}
              thumbnailType={v.thumbnailType}
              key={k}
            />
          ))}
        </div>
      )
      }
    </div>
  )
}
