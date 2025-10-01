"use client"

import GlassSurface from "./glasssurface";
import { motion, useSpring } from "motion/react"
import TransitionLink from "./transitionlink";
import { ReactNode, useEffect, useRef } from "react";
import HomeIcon from '@mui/icons-material/Home';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { usePathname } from "next/navigation";
import { usePathContext } from "@/app/(v2)/pathcontext";

export default function Menubar() {
  const bubbleWidth = useSpring(0)
  const bubbleOffsetX = useSpring(0)

  function moveIndicator(width: number, offsetLeft: number) {
    bubbleWidth.set(width)
    bubbleOffsetX.set(offsetLeft)
  }

  return (
    <div className="fixed bottom-2 left-2 right-2 flex justify-center pointer-events-none">
      <GlassSurface
        width={144}
        height={56}
        borderRadius={28}
        displace={1}
        className="pointer-events-auto"
      >
        <div className="relative flex justify-center gap-2 items-center w-full h-full rounded-[24px] bg-black/60 overflow-hidden">
          <Menubutton
            title="Home"
            href="/"
            icon={<HomeIcon/>}
            trigger={moveIndicator}
          />
          <Menubutton
            title="About"
            href="/about"
            icon={<EmojiPeopleIcon/>}
            trigger={moveIndicator}
          />
          <motion.div
            className="absolute top-1 left-0 h-12 bg-zinc-100/40 rounded-full pointer-events-none -z-10"
            style={{
              width: bubbleWidth,
              translateX: bubbleOffsetX,
            }}
          />
        </div>
      </GlassSurface>
    </div>
  );
}

function Menubutton(props: {
  title: string;
  href: string;
  icon: ReactNode;
  trigger: (width: number, offsetLeft: number) => void 
}) {
  const bubblePadding = 8
  const { path } = usePathContext()
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (ref.current && ref.current.offsetParent && path == props.href) {
      const rect = ref.current.getBoundingClientRect();
      const parentRect = ref.current.offsetParent.getBoundingClientRect();
      const fullXOffset = rect.left - parentRect.left;
      props.trigger(ref.current.clientWidth + bubblePadding*2, fullXOffset - bubblePadding)
    }
  }, [path])

  return (
    <TransitionLink
      href={props.href}
      className={`flex flex-col items-center justify-center transition-colors h-full aspect-square ${path == props.href ? "text-violet-100" : "text-zinc-400"}`}
      ref={ref}
    >
      {props.icon}
      <span className="text-2xs font-medium">
        {props.title}
      </span>
    </TransitionLink>
  )
}