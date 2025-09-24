"use client"

import Link from "next/link";
import { MouseEvent, useEffect, useRef, useState } from "react";

export default function Role() {
    const indicatorRef = useRef<HTMLDivElement>(null)

    const [scale, setScale] = useState(0)
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        if (indicatorRef.current) {
            indicatorRef.current.style.transform = `translateX(${offset}px) scaleX(${scale})`
        }
    }, [scale, offset])

    function moveIndicator(width: number, offsetLeft: number) {
        const scale = width / 128
        setScale(scale)
        setOffset(offsetLeft)
    }

    function trigger(e: MouseEvent<HTMLAnchorElement>) {
        if (e.currentTarget.offsetParent) {
            const rect = e.currentTarget.getBoundingClientRect();
            const parentRect = e.currentTarget.offsetParent.getBoundingClientRect();
            const fullXOffset = rect.left - parentRect.left;

            moveIndicator(e.currentTarget.clientWidth, fullXOffset)
        }
    }

    return (
        <div className="flex relative items-center gap-2 pr-2 text-white text-sm">
            <div
                ref={indicatorRef}
                className="absolute bottom-0 h-[2px] bg-violet-500 w-[128px] origin-left transition-all"
                style={{
                    transform: "scaleX(0)"
                }}
            />
            <Link
                href=""
                className="px-1"
                onMouseEnter={(e) => trigger(e)}
                onMouseLeave={(e) => { setScale(0) }}
            >
                About
            </Link>
            <Link
                href=""
                className="px-1"
                onMouseEnter={(e) => trigger(e)}
                onMouseLeave={(e) => { setScale(0) }}
            >
                Contacts
            </Link>
        </div>
    )
}