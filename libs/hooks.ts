"use client"

import { useState, useEffect, useRef, MutableRefObject } from "react"

function useIsInViewport(ref: MutableRefObject<any>) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null)
    
    useEffect(() => {
        observer.current = new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting),),
        observer.current?.observe(ref.current);
        

        return () => {
            observer.current?.disconnect();
        };
    }, [ref, observer]);

    return isIntersecting;
}

export { useIsInViewport }