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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(initLoad || false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // HAVE_METADATA or higher
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
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
      { rootMargin: rootMargin || "200px" }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <span ref={containerRef} className={`relative block ${className}`}>
      {/* Loading text */}
      {shouldLoad && !isLoaded && (
        <span className="absolute inset-0 w-full p-6 flex items-center justify-center text-sm bg-zinc-800 text-zinc-500 xl:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl">
          {loadingText || "Loading video..."}
        </span>
      )}

      {/* Video */}
      <video
        ref={videoRef}
        src={shouldLoad ? src : undefined}
        className="h-auto w-full block"
        onCanPlay={() => setIsLoaded(true)}
        onLoadedMetadata={() => setIsLoaded(true)}
        preload={shouldLoad ? "auto" : "none"}
        {...rest}
      />
    </span>
  );
}
