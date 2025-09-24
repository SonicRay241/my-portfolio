import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode, useEffect, useRef, useState } from "react"

export function NavbarTabs(props: {
    routes: { href: string, title: string, compareFn?: (href: string, path: string) => boolean }[]
}) {
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

    return (
        <div className="sticky top-0 w-full border-b bg-background z-50 overflow-x-auto">
            <div
                ref={indicatorRef}
                className="absolute bottom-0 h-[2px] bg-primary w-[128px] origin-left transition-all"
                style={{
                    transform: "scaleX(0)"
                }}
            />
            <div className="relative flex justify-start items-center w-full">
                {props.routes.map(route => {
                    return <NavbarTab key={route.href} href={route.href} trigger={moveIndicator} compareFn={route.compareFn}>{route.title}</NavbarTab>
                })}
            </div>
        </div>
    )
}

function NavbarTab(props: {
    href: string,
    children?: ReactNode
    trigger?: (width: number, offsetLeft: number) => void
    compareFn?: (href: string, path: string) => boolean
}) {
    const pathname = usePathname()

    const ref = useRef<HTMLDivElement>(null)

    function compare() {
        if (props.compareFn) {
            return props.compareFn(props.href, pathname)
        }

        return props.href == pathname
    }

    function trigger() {
        if (props.trigger && ref.current && ref.current.offsetParent) {
            const rect = ref.current.getBoundingClientRect();
            const parentRect = ref.current.offsetParent.getBoundingClientRect();
            const fullXOffset = rect.left - parentRect.left;
            props.trigger(ref.current.clientWidth, fullXOffset)
        }
    }

    useEffect(() => {
        if (compare()) trigger()
    }, [pathname])

    return (
        <div ref={ref} className="py-1">
            <Link
                className={compare() ? "text-primary hover:text-primary" : "text-foreground"}
                href={props.href}
            >
                {props.children}
            </Link>
        </div>
    )
}