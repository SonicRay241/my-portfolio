"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Logo from "./logo";
import BlurText from "./blurtext";

export default function Hero() {
  const paragraphA = useRef<HTMLDivElement>(null);
  const paragraphB = useRef<HTMLDivElement>(null);

  const posX = useMotionValue(0);
  const posY = useMotionValue(0);
  const posXA = useTransform(
    () => posX.get() - (paragraphA.current?.getBoundingClientRect().left || 100)
  );
  const posXB = useTransform(
    () => posX.get() - (paragraphB.current?.getBoundingClientRect().left || 100)
  );
  const size = useSpring(60, { stiffness: 300, damping: 15 });
  const maskB = useMotionTemplate`radial-gradient(circle ${size}px at ${posXB}px ${posY}px, #000 30%, transparent 100%)`;
  const maskA = useMotionTemplate`radial-gradient(circle ${size}px at ${posXA}px ${posY}px, #000 30%, transparent 100%)`;

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
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
    "I'm Rayhan, an enthusiast in data science and AI with a strong interest in transforming data into practical solutions. My work spans a range of challenges, from training XGboost models to categorize obesity based on health metrics, to applying TrOCR to read doctor's handwritten prescriptions, and building LSTMs for forecasting sales, pricing, and air quality.";
  const paragraphBValue =
    "I focus not only on model performance but also on efficiency. Exploring techniques like data augmentation, precision trade-offs, and lightweight architectures to create solutions that are both effective and scalable. To me, AI is about blending technical skill with creativity to uncover insights and solve real-world problems.";

  return (
    <div className="px-4 w-full grid grid-cols-3" onMouseMove={handleMove}>
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
          className="text-sm md:text-base text-zinc-500 pointer-events-none"
        />
        <motion.p
          className="text-sm md:text-base absolute top-0 left-1 right-1 text-zinc-300 pointer-events-none flex flex-wrap"
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
          className="text-sm md:text-base text-zinc-500 pointer-events-none"
        />
        <motion.p
          className="text-sm md:text-base absolute top-0 left-1 right-1 text-zinc-300 pointer-events-none flex flex-wrap"
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
    </div>
  );
}

function SpanWords(props: { text: string }) {
  const words = props.text.split(" ");

  return (
    <>
      {words.map((v, k) => {
        return (
          <span className="inline-block" key={k}>
            {v}
            {k < words.length - 1 && "\u00A0"}
          </span>
        );
      })}
    </>
  );
}
