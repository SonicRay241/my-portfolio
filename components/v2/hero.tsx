"use client";

import { MouseEvent, RefObject, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Logo from "./logo";
import BlurText from "./blurtext";
import SpanWords from "./spanwords";

export default function Hero(props: {
  ref?: RefObject<HTMLDivElement | null>
}) {
  const paragraphA = useRef<HTMLDivElement>(null);
  const paragraphB = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: props.ref,
    offset: ["start start", "end start"],
  });

  const posX = useMotionValue(0);
  const posY = useMotionValue(0);
  const posXA = useTransform(
    () => posX.get() - (paragraphA.current?.getBoundingClientRect().left || 100)
  );
  const posXB = useTransform(
    () => posX.get() - (paragraphB.current?.getBoundingClientRect().left || 100)
  );
  const posYA = useTransform(
    () => posY.get() - (paragraphA.current?.getBoundingClientRect().top || 100)
  );
  const posYB = useTransform(
    () => posY.get() - (paragraphB.current?.getBoundingClientRect().top || 100)
  );

  const size = useSpring(0, { stiffness: 300, damping: 15 });
  const maskA = useMotionTemplate`radial-gradient(circle ${size}px at ${posXA}px ${posYA}px, #000 30%, transparent 100%)`;
  const maskB = useMotionTemplate`radial-gradient(circle ${size}px at ${posXB}px ${posYB}px, #000 30%, transparent 100%)`;

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05])
  const heroBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"])
  const heroRotate = useTransform(scrollYProgress, [0, 1], [0, 15])
  const heroTranslate = useTransform(scrollYProgress, [0, 1], [0, -20])

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - rect.left;
    const y = e.pageY - rect.top;
    posX.set(x);
    posY.set(y);
  }

  function handleEnter() {
    size.set(120);
  }

  function handleLeave() {
    size.set(0);
  }

  const paragraphAValue =
    "Rayhan is an enthusiast in data science and AI with a strong interest in transforming data into practical solutions. His work spans a range of challenges, from training XGboost models to categorizing obesity based on health metrics, and building LSTMs for forecasting sales, pricing, and air quality.";
  const paragraphBValue =
    "He focuses not only on model performance but also on efficiency. Exploring techniques like data augmentation, precision trade-offs, and lightweight architectures to create solutions that are both effective and scalable. To him, AI is about blending technical skill with creativity to uncover insights and solve real-world problems.";

  return (
    <div className="overflow-hidden" ref={props.ref}>
      <motion.div
        className="sticky top-0 px-4 pt-2 rig w-full grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-0"
        onMouseMove={handleMove}
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          filter: heroBlur,
          rotateX: heroRotate,
          translateY: heroTranslate
        }}
      >
        <div className="w-full h-full">
          <Logo />
        </div>
        <div
          className="relative block px-1"
          ref={paragraphA}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <BlurText
            text={paragraphAValue}
            delay={20}
            animateBy="words"
            direction="bottom"
            className="text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl text-zinc-400 pointer-events-none"
          />
          <motion.p
            className="text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl absolute top-0 left-1 right-1 text-white pointer-events-none flex flex-wrap"
            style={{
              WebkitMaskImage: maskA,
              WebkitMaskRepeat: "no-repeat",
              maskImage: maskA,
              maskRepeat: "no-repeat",
            }}
          >
            <SpanWords text={paragraphAValue} />
          </motion.p>
        </div>
        <div
          className="relative block px-1"
          ref={paragraphB}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <BlurText
            text={paragraphBValue}
            delay={20}
            animateBy="words"
            direction="bottom"
            className="text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl text-zinc-400 pointer-events-none"
          />
          <motion.p
            className="text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl absolute top-0 left-1 right-1 text-white pointer-events-none flex flex-wrap"
            style={{
              WebkitMaskImage: maskB,
              WebkitMaskRepeat: "no-repeat",
              maskImage: maskB,
              maskRepeat: "no-repeat",
            }}
          >
            <SpanWords text={paragraphBValue} />
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
