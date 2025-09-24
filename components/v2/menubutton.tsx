"use client";

import GlassSurface from "./glasssurface";
import MenuIcon from "@mui/icons-material/Menu";
import { AnimatePresence, motion, useSpring } from "motion/react";
import {
  ButtonHTMLAttributes,
  useState,
  ReactNode,
  useRef,
  useEffect,
} from "react";

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
      {showRefraction && (
        <motion.div
          className={`fixed bottom-4 right-4`}
          style={{
            scale: buttonScale,
          }}
          transition={{
            type: "spring",
          }}
        >
          <GlassSurface width={40} height={40} borderRadius={20} />
        </motion.div>
      )}

      <AnimatePresence>
        {!menuOpen && (
          <motion.button
            initial={{
              opacity: 0,
              filter: "blur(10px) brightness(2)",
            }}
            animate={{
              opacity: 0.6,
              filter: "blur(0px) brightness(1)",
              transition: {
                filter: {
                  delay: 0.1,
                },
              },
            }}
            exit={{
              opacity: 0,
              filter: "blur(10px) brightness(2)",
            }}
            whileTap={{
              scale: 1.1,
              filter: "brightness(2)",
              opacity: 0.9,
              transition: {
                type: "spring",
                stiffness: 500,
              },
            }}
            onTapStart={() => buttonScale.set(1.1)}
            onTapCancel={() => buttonScale.set(1)}
            onMouseLeave={() => buttonScale.set(1)}
            className="peer fixed bottom-4 right-4 w-10 h-10 flex justify-center items-center"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon className="size-2 text-zinc-300" />
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
            <MenuSelect />
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function MenuSelect() {
  const bubbleOffsetY = useSpring(0);
  const bubbleHeight = useSpring(0);

  return (
    <motion.div
      className="fixed bottom-4 right-4 origin-bottom-right"
      initial={{
        scale: 0.0,
      }}
      animate={{
        scale: 1,
        transition: {
          filter: {
            duration: 0.7,
          },
          duration: 0.6,
          type: "spring",
        },
      }}
      exit={{
        scale: 0.0,
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
    >
      <div className="relative w-full h-full">
        <GlassSurface width={160} height={288} borderRadius={20} />
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-zinc-300/20 rounded-[20px] p-2"
          initial={{
            opacity: 0,
            filter: "blur(10px) brightness(2)",
          }}
          animate={{
            opacity: 1,
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
            filter: "blur(10px) brightness(2)",
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
        >
          {/* <motion.div className="absolute w-full rounded-xl bg-black/10"></motion.div> */}
          <MenuSelectButton trigger={() => {}}>
            <span>Projects</span>
          </MenuSelectButton>
        </motion.div>
      </div>
    </motion.div>
  );
}

function MenuSelectButton(
  props: ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: ReactNode;
    trigger: (height: number, offsetY: number) => void;
  }
) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { trigger, ...buttonProps } = props;

  function onHover() {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();

    trigger(rect.height, rect.top);
  }

  return (
    <button
      className={`flex gap-1 w-full px-3 py-2 rounded-xl text-sm font-medium text-zinc-300/70 ${props.className}`}
      onMouseEnter={onHover}
      ref={buttonRef}
      {...buttonProps}
    >
      {props.children}
    </button>
  );
}
