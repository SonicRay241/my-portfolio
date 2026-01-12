"use client";

import { RefObject, useRef } from "react";
import ProjectCard from "./projectcard";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m"
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
  const pointerEvents = useTransform(scrollYProgress, [0, 0.6, 1], ["none", "none", "auto"])

  return (
    <m.div
      className="pt-2 md:pt-8 text-zinc-700"
      ref={ref}
      style={{
        scale,
        filter,
        pointerEvents
      }}
    >
      <Grid />
    </m.div>
  );
}

function Grid() {
  const columns: (ShowcaseMeta & { id: string })[][] = [[], [], []];
  Object.entries(showcases).forEach((val, i) => {
    columns[i % 3].push({ id: val[0], ...val[1] });
  });

  const renderGrid = useMediaQuery("(min-width:768px)");

  return (
    <div className="sticky top-0 grid grid-cols-1 md:grid-cols-3 gap-4 px-4 min-h-screen">
      {renderGrid ? (
        <>
          <div className="flex flex-col gap-6">
            {columns[0].map((v, k) => (
              <ProjectCard
                id={v.id}
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
                id={v.id}
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
                id={v.id}
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
          {Object.entries(showcases).map((v, k) => (
            <ProjectCard
              id={v[0]}
              title={v[1].name}
              description={v[1].description}
              thumbnailUrl={`${v[1].path}/${v[1].thumbnailName}`}
              thumbnailType={v[1].thumbnailType}
              key={k}
            />
          ))}
        </div>
      )
      }
    </div>
  )
}
