"use client";

import { useInView } from "framer-motion"
import { useState, useEffect, useRef, RefObject } from "react";

export function useIsInViewport(ref: RefObject<any>) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    (observer.current = new IntersectionObserver(([entry]) =>
      setIsIntersecting(entry.isIntersecting)
    )),
      observer.current?.observe(ref.current);

    return () => {
      observer.current?.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}

export function useSentinel(offset = 0, sentinelTag="sentinel") {
  const ref = useRef<Element>(null)

  useEffect(() => {
    ref.current = document.querySelector(`[data-${sentinelTag}]`)
  }, [])

  const inView = useInView(ref, {
    margin: `${offset}px 0px 0px 0px`,
    amount: 0
  })

  return !inView
}