"use client"

import { animate, AnimatePresence, motion, useMotionValue } from "motion/react"
import { useVersion, useVersionModal } from "./_versionContext"
import CloseIcon from "@mui/icons-material/Close"
import { useEffect, useRef, useState } from "react"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import Link from "next/link"

export default function VersionModal() {
  const [show, setShow] = useVersionModal()

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center"
          initial={{
            backdropFilter: "blur(0px) brightness(1)",
            opacity: 0,
          }}
          animate={{
            backdropFilter: "blur(10px) brightness(0.6)",
            opacity: 1,
          }}
          exit={{
            backdropFilter: "blur(0px) brightness(1)",
            opacity: 0,
          }}
        >
          <button
            className="absolute top-4 right-4"
            onClick={() => setShow(false)}
          >
            <CloseIcon fontSize="large" className="text-white" />
          </button>
          <FramerCarousel />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const items = [
  {
    url: '/assets/preview/v1.png',
    title: 'Version 1',
    href: '/v1'
  },
  {
    url: '/assets/preview/v2.png',
    title: 'Version 2',
    href: '/'
  }
];

function FramerCarousel() {
  const [version] = useVersion();
  const [show, setShow] = useVersionModal()
  const [index, setIndex] = useState(version);
  const containerRef = useRef<HTMLDivElement>(null);

  const CONTAINER_WIDTH_INIT = 384

  const x = useMotionValue(-index * CONTAINER_WIDTH_INIT);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      const targetX = -index * containerWidth; 3

      animate(x, targetX, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      });
    }
  }, [index, x]);

  return (
    <div className='w-full max-w-3xl h-full flex items-center lg:p-10 sm:p-4 p-2'>
      <div className='relative flex flex-col gap-3'>
        <div className='relative overflow-hidden rounded-lg' ref={containerRef}>
          <motion.div className='flex' style={{ x }}>
            {items.map((item, idx) => (
              <div key={idx} className='relative shrink-0 w-full h-full group'>
                <img
                  src={item.url}
                  alt={item.title}
                  className={`w-full h-96 object-cover rounded-lg select-none pointer-events-none transition-all ${idx != version && "group-hover:brightness-75"}`}
                  draggable={false}
                />
                {idx != version && (
                  <Link
                    className={`flex justify-center items-center gap-2 opacity-0 absolute left-0 top-0 size-full backdrop-blur-lg font-medium text-white rounded-lg transition-opacity text-xl ${idx != version && "group-hover:opacity-100"}`}
                    href={item.href}
                    onClick={() => setShow(false)}
                  >
                    Visit V{idx + 1}
                  </Link>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <motion.button
          disabled={index <= 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          className={`absolute -left-16 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-lg transition-transform z-10
              ${index === 0
              ? 'opacity-20 cursor-not-allowed'
              : 'bg-white hover:scale-110 hover:opacity-100 opacity-70'
            }`}
        >
          <ChevronLeftIcon fontSize="large" />
        </motion.button>

        {/* Next Button */}
        <motion.button
          disabled={index >= items.length - 1}
          onClick={() => {
            setIndex((i) => Math.min(items.length - 1, i + 1))
          }}
          className={`absolute -right-16 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-lg transition-transform z-10
              ${index === items.length - 1
              ? 'opacity-20 cursor-not-allowed'
              : 'hover:scale-110 hover:opacity-100 opacity-70'
            }`}
        >
          <ChevronRightIcon fontSize="large" />
        </motion.button>
        {/* Progress Indicator */}
        <div className='absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-white' : 'w-2 bg-white/50'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
