"use client"

import { slugify } from "@/libs/utils"
import { useLenis } from "lenis/react"
import { RefObject, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView, useTransform } from "motion/react"
import { useSentinel } from "@/libs/hooks"

type TocItem = {
  level: 1 | 2 | 3
  text: string
  id: string
}

function removeCodeBlocks(markdown: string) {
  return markdown.replace(/```[\s\S]*?```/g, "")
}

function extractToc(markdown: string): TocItem[] {
  const cleaned = removeCodeBlocks(markdown)
  const lines = cleaned.split("\n")

  return lines
    .map(line => {
      const match = line.match(/^(#{1,3})\s+(.*)$/)
      if (!match) return null

      const level = match[1].length as 1 | 2 | 3
      const text = match[2].trim()

      return {
        level,
        text,
        id: slugify(text)
      }
    })
    .filter(Boolean) as TocItem[]
}

function useActiveHeading(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [lastScrollTop, setLastScrolltop] = useState(0)

  useEffect(() => {
    if (!ids.length || !window) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .map(entry => ({
            id: entry.target.id,
            top: entry.boundingClientRect.top
          }))

        if (!visible.length) return

        if (window && lastScrollTop > window.scrollY) {
          visible.sort((a, b) => a.top - b.top)
        }

        setActiveId(visible[0].id)
      },
      {
        rootMargin: "-70px 0px -70% 0px",
        threshold: 0
      }
    )

    function onScroll(e: Event) {
      const currentScrollY = window.scrollY;
      setLastScrolltop(currentScrollY)
    }

    window.addEventListener("scroll", onScroll)

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [ids])

  return activeId
}

export default function ContentList(props: {
  markdown: string;
  parentRef?: RefObject<HTMLDivElement>;
}) {
  const toc = extractToc(props.markdown)
  const activeId = useActiveHeading(toc.map(i => i.id))

  const display = useSentinel()

  return (
    <AnimatePresence>
      {display && (
        <motion.aside
          className="hidden md:block w-fit pr-8 max-h-[50dvh] overflow-y-auto overscroll-contain [mask-image:linear-gradient(to_bottom,transparent_0px,black_2rem,black_calc(100%-2rem),transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0px,black_2rem,black_calc(100%-2rem),transparent_100%)]"
          data-lenis-prevent
          tabIndex={0}
          initial={{
            opacity: 0,
            x: -5,
            filter: "brightness(2) blur(2px)",
            transition: {
              bounce: 0
            }
          }}
          animate={{
            opacity: 1,
            x: 0,
            filter: "brightness(1) blur(0px)"
          }}
          exit={{
            opacity: 0,
            x: -5,
            filter: "brightness(2) blur(2px)"
          }}
        >
          <ul className="py-8">
            {toc.map(item => (
              <li
                key={item.id}
                style={{ marginLeft: (item.level - 1) * 16 }}
              >
                <TocItem isActive={activeId == item.id} {...item} />
              </li>
            ))}
          </ul>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

function TocItem(props: {
  id: string;
  text: string;
  isActive: boolean
}) {
  const lenis = useLenis()
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!props.isActive || !buttonRef) return
    buttonRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    })
  }, [props.isActive])

  return (
    <button
      onClick={() => {
        if (!lenis) return
        const el = document.getElementById(props.id)
        if (el) {
          lenis.scrollTo(el, {
            offset: -80,
            duration: 1
          })
        }
      }}
      className={`relative transition-colors text-left flex flex-col 2xl:gap-1 ${props.isActive ? "text-white" : "text-zinc-500"}`}
      ref={buttonRef}
    >
      <span>{props.text}</span>
      <motion.span
        className="h-0.5 bg-violet-600"
        initial={{
          width: 0
        }}
        animate={{
          width: props.isActive ? "100%" : 0
        }}
        exit={{
          width: 0
        }}
      />
    </button>
  )
}