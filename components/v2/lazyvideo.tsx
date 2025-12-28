"use client"

import { useEffect, useRef, useState, VideoHTMLAttributes } from "react";

export default function LazyVideo(props: VideoHTMLAttributes<HTMLVideoElement> & {
  src?: string | Blob,
  className?: string,
  rootMargin?: string,
  loadingText?: string,
  initLoad?: boolean
}) {
  const {
    src,
    className,
    rootMargin,
    loadingText,
    initLoad,
    ...rest
  } = props

  const containerRef = useRef<HTMLSpanElement>(null);
  const [shouldLoad, setShouldLoad] = useState(initLoad || false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: rootMargin || "200px" }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <span ref={containerRef} className={`relative block ${className}`}>
      {/* Loading text */}
      {shouldLoad && !isLoaded && (
        <span className="absolute inset-0 w-full p-6 flex items-center justify-center text-sm bg-zinc-800 text-zinc-500">
          {loadingText || "Loading video..."}
        </span>
      )}

      {/* Video */}
      <video
        src={shouldLoad ? src : undefined}
        className="h-auto w-full block"
        onCanPlay={() => setIsLoaded(true)}
        onLoadedMetadata={() => setIsLoaded(true)}
        preload={shouldLoad ? "auto" : "none"}
        style={{ display: isLoaded ? "block" : "none" }}
        {...rest}
      />
    </span>
  );
}
