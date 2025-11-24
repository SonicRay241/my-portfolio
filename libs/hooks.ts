"use client";

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