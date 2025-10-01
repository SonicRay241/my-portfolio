"use client";

import GlassSurface from "./glasssurface";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import TransitionLink from "./transitionlink";
import { ReactNode, useEffect, useRef, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import { usePathContext } from "@/app/(v2)/pathcontext";
import BackButton from "./backbutton";

export default function Menubar() {
  const { path } = usePathContext();

  const barOffsetX = useSpring(0);

  const bubbleWidth = useSpring(0);
  const bubbleOffsetX = useSpring(0);
  const bubbleOpacity = useSpring(1);

  const glassBubbleWidth = useSpring(0);
  const glassBubbleOffsetX = useSpring(0);
  const glassBubbleScale = useSpring(1, { bounce: 0 });
  const glassBubbleShow = useMotionValue("none");

  function moveIndicator(width: number, offsetLeft: number) {
    const isWebkit =
      /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);

    const svgDisabled = isWebkit || isFirefox;

    bubbleWidth.set(width);
    bubbleOffsetX.set(offsetLeft);

    if (!svgDisabled) {
      bubbleOpacity.set(0);
      glassBubbleShow.set("block");
      glassBubbleScale.set(1.5);
      glassBubbleWidth.set(width);
      glassBubbleOffsetX.set(offsetLeft);
    }

    setTimeout(() => {
      glassBubbleScale.set(0);
      if (!svgDisabled) {
        bubbleOpacity.set(1);
      }
    }, 250);
    setTimeout(() => {
      if (!svgDisabled) {
        glassBubbleShow.set("none");
      }
    }, 400);
  }

  useEffect(() => {
    if (path.includes("/project")) {
      barOffsetX.set(20);
    } else {
      barOffsetX.set(0);
    }
  }, [path]);

  return (
    <>
      <div className="fixed bottom-2 left-2 right-2 flex justify-center items-center gap-4 pointer-events-none">
        <motion.div
          style={{
            x: barOffsetX,
          }}
        >
          <GlassSurface
            width={144}
            height={56}
            borderRadius={28}
            displace={1}
            className="pointer-events-auto"
          >
            <div className="relative flex justify-center gap-2 items-center w-full h-full rounded-[24px] bg-black/60">
              <Menubutton
                title="Home"
                href="/"
                icon={<HomeIcon />}
                trigger={moveIndicator}
              />
              <Menubutton
                title="About"
                href="/about"
                icon={<EmojiPeopleIcon />}
                trigger={moveIndicator}
              />
              <motion.div
                className="absolute top-1 left-0 h-12 bg-zinc-100/40 rounded-full pointer-events-none -z-10"
                style={{
                  width: bubbleWidth,
                  translateX: bubbleOffsetX,
                  opacity: bubbleOpacity,
                }}
              />
            </div>
          </GlassSurface>
        </motion.div>
      </div>
      <div className="fixed bottom-2 left-2 right-2 flex justify-center pointer-events-none">
        <div className="relative w-36 h-14">
          <motion.div
            className="absolute top-1 left-0 h-12 pointer-events-none origin-center"
            style={{
              width: glassBubbleWidth,
              translateX: glassBubbleOffsetX,
              scale: glassBubbleScale,
              display: glassBubbleShow,
            }}
          >
            <GlassSurface
              width={72}
              height={48}
              borderRadius={24}
              borderWidth={0}
              greenOffset={5}
              blueOffset={10}
              distortionScale={-60}
            />
          </motion.div>
        </div>
        <div className="fixed bottom-2 left-2 right-2 flex justify-center items-center gap-4 pointer-events-none">
          <AnimatePresence mode="wait">
            {path.includes("/project") && (
              <motion.div
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                }}
                exit={{
                  scale: 0,
                }}
                className="w-10 h-10"
              >
                <BackButton />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="relative w-36 h-14" />
        </div>
      </div>
    </>
  );
}

function Menubutton(props: {
  title: string;
  href: string;
  icon: ReactNode;
  trigger: (width: number, offsetLeft: number) => void;
}) {
  const bubblePadding = 8;
  const { path } = usePathContext();
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.offsetParent && path == props.href) {
      const rect = ref.current.getBoundingClientRect();
      const parentRect = ref.current.offsetParent.getBoundingClientRect();
      const fullXOffset = rect.left - parentRect.left;
      props.trigger(
        ref.current.clientWidth + bubblePadding * 2,
        fullXOffset - bubblePadding
      );
    }
  }, [path]);

  return (
    <TransitionLink
      href={props.href}
      className={`flex flex-col items-center justify-center transition-colors h-full aspect-square ${
        path == props.href ? "text-violet-100" : "text-zinc-400"
      }`}
      ref={ref}
    >
      {props.icon}
      <span className="text-2xs font-medium">{props.title}</span>
    </TransitionLink>
  );
}
