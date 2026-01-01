"use client"

import { useEffect, useRef, useState } from "react";

export default function LazyImage(props: {
  src?: string | Blob,
  alt?: string,
  className?: string,
  rootMargin?: string,
  loadingText?: string,
  initLoad?: boolean
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const image = imgRef.current
    if (!image) return

    if (image.complete) {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: props.rootMargin || "200px" }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [props.rootMargin]);

  return (
    <span ref={containerRef} className={`relative block ${props.className}`}>
      {/* Loading text */}
      {shouldLoad && !isLoaded && (
        <span className="absolute inset-0 w-full p-6 flex items-center justify-center text-sm bg-zinc-800 text-zinc-500">
          {props.loadingText || "Loading image..."}
        </span>
      )}

      {/* Image */}
      <img
        ref={imgRef}
        src={shouldLoad ? props.src : undefined}
        alt={props.alt}
        className="w-full"
        onLoad={() => setIsLoaded(true)}
      />
    </span>
  );
}
