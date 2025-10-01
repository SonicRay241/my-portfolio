"use client";

import GlassSurface from "./glasssurface";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { AnimatePresence, motion, useSpring } from "motion/react";
import {
  useState,
  ReactNode,
  useRef,
  useEffect,
  MouseEventHandler,
  AnchorHTMLAttributes,
} from "react";
import Link from "next/link";
import TransitionLink from "./transitionlink";

export default function Menubutton() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showRefraction, setShowRefraction] = useState(false);
  const buttonScale = useSpring(1, { stiffness: 500 });

  useEffect(() => {
    if (!showRefraction)
      setTimeout(() => {
        setShowRefraction(true);
      }, 200);
    else setShowRefraction(false);
  }, [menuOpen]);

  return (
    <>
      <AnimatePresence>
        {showRefraction && (
          <motion.div
            className={`fixed bottom-4 right-4`}
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
              bounce: 0.4
            }}
          >
            <GlassSurface width={40} height={40} borderRadius={20} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!menuOpen && (
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
              scale: 1.1,
              filter: "brightness(1.2)",
              background: "#fff2",
              opacity: 0.9,
              transition: {
                type: "spring",
              },
            }}
            transition={{
              type: "spring",
              bounce: 0.6,
              duration: 0.4
            }}
            onTapStart={() => buttonScale.set(1.1)}
            onTapCancel={() => buttonScale.set(1)}
            className="peer fixed bottom-4 right-4 w-10 h-10 flex justify-center items-center rounded-full bg-black/40"
            onClick={() => {
              setMenuOpen(true)
              buttonScale.set(1)
            }}
          >
            <MenuIcon className="size-2 text-zinc-100" />
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {menuOpen && (
          <>
            <div
              className="fixed top-0 left-0 right-0 bottom-0"
              onClick={() => setMenuOpen(false)}
            />
            <MenuSelect onClose={() => setMenuOpen(false)} />
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function MenuSelect(props: {
  onClose: () => void;
}) {
  const [ready, setReady] = useState(false);

  const bubbleOffsetY = useSpring(0);
  const bubbleHeight = useSpring(0);
  const bubbleOpacity = useSpring(1);

  const shiftX = useSpring(0, { stiffness: 200, damping: 20 });
  const shiftY = useSpring(0, { stiffness: 200, damping: 20 });
  const scaleX = useSpring(1, { stiffness: 200, damping: 20 });
  const scaleY = useSpring(1, { stiffness: 200, damping: 20 });

  const prevX = useRef(0);
  const prevY = useRef(0);
  const idleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  function menuHover(height: number, offsetY: number) {
    if (!parentRef.current) return

    bubbleOffsetY.set(offsetY - parentRef.current.getBoundingClientRect().top - 8)
    bubbleHeight.set(height)
    bubbleOpacity.set(1)
  }

  const handleMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const deltaX = e.clientX - prevX.current;
    const deltaY = e.clientY - prevY.current;

    prevX.current = e.clientX;
    prevY.current = e.clientY;

    // Direction (-1, 0, +1)
    const dirX = deltaX === 0 ? 0 : deltaX > 0 ? 1 : -1;
    const dirY = deltaY === 0 ? 0 : deltaY > 0 ? 1 : -1;

    shiftX.set(dirX * 5);
    shiftY.set(dirY * 5);
    scaleX.set(dirX !== 0 ? 1.05 : 1);
    scaleY.set(dirY !== 0 ? 1.05 : 1);

    // Reset idle timer
    if (idleTimeout.current) clearTimeout(idleTimeout.current);
    idleTimeout.current = setTimeout(() => {
      shiftX.set(0);
      shiftY.set(0);
      scaleX.set(1);
      scaleY.set(1);
    }, 150);
  };

  function handleLeave() {
    bubbleOpacity.set(0)
    // bubbleHeight.set(180)
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4"
      initial={{
        scale: 0,
        translateY: 80,
        translateX: 40,
      }}
      animate={{
        scale: 1,
        translateY: 0,
        translateX: 0,
        transition: {
          duration: 0.6,
          type: "spring",
        },
      }}
      exit={{
        scale: 0,
        translateY: 80,
        translateX: 40,
        transition: {
          duration: 0.4,
          delay: 0.1,
          type: "spring",
          bounce: 0,
        },
      }}
      whileTap={{
        scale: 0.97
      }}
      style={{
        x: shiftX,
        y: shiftY,
        scaleX: scaleX,
        scaleY: scaleY,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="relative">
        <GlassSurface width={140} height={100} borderRadius={20} />
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-black/40 rounded-[20px] p-2 overflow-hidden"
          ref={parentRef}
          initial={{
            opacity: 0,
            filter: "blur(10px) brightness(1.2)",
          }}
          animate={{
            opacity: 0.9,
            filter: "blur(0px) brightness(1)",
            transition: {
              filter: {
                duration: 0.7,
              },
              duration: 0.6,
              type: "spring",
            },
          }}
          exit={{
            opacity: 0,
            filter: "blur(10px) brightness(1.2)",
            transition: {
              filter: {
                duration: 0.6,
                delay: 0,
              },
              duration: 0.7,
              delay: 0.1,
              type: "spring",
            },
          }}
          onAnimationComplete={() => setReady(true)}
          style={{
            pointerEvents: ready ? "auto" : "none",
          }}
        >
          <motion.div
            className="absolute top-2 left-1.5 right-1.5 bg-zinc-100/20 rounded-[16px] pointer-events-none -z-10"
            style={{
              height: bubbleHeight,
              translateY: bubbleOffsetY,
              opacity: bubbleOpacity
            }}
          />
          <MenuSelectButton trigger={menuHover} href="/" onClick={props.onClose}>
            <HomeIcon fontSize="small" className="" />
            <span>Home</span>
          </MenuSelectButton>
          <MenuSelectButton trigger={menuHover} href="/about" onClick={props.onClose}>
            <EmojiPeopleIcon fontSize="small" className="" />
            <span>About</span>
          </MenuSelectButton>
          {/* <MenuSelectButton trigger={menuHover} href="/" onClick={props.onClose}>
            <AutoAwesomeIcon fontSize="small" className="" />
            <span>Projects</span>
          </MenuSelectButton> */}
        </motion.div>
      </div>
    </motion.div>
  );
}

function MenuSelectButton(
  props: AnchorHTMLAttributes<HTMLAnchorElement> & {
    children?: ReactNode;
    trigger: (height: number, offsetY: number) => void;
    href: string;
  }) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const { trigger, ...buttonProps } = props;

  function onHover() {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();

    trigger(rect.height, rect.top);
  }

  return (
    <TransitionLink
      className={`flex items-center gap-2 w-full px-2 py-2 rounded-xl font-medium text-zinc-100 hover:text-white transition-colors ${props.className}`}
      onMouseEnter={onHover}
      ref={buttonRef}
      {...buttonProps}
    >
      {props.children}
    </TransitionLink>
  );
}
