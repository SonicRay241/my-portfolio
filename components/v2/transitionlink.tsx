"use client"

import { usePathContext } from "@/app/(v2)/pathcontext";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, ReactNode, RefObject } from "react";

export default function TransitionLink(props: LinkProps & {
  children?: ReactNode,
  className?: string;
  ref?: RefObject<HTMLAnchorElement | null>
}) {
  const router = useRouter()
  const { path, setPath } = usePathContext()

  function handleTransition(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    const url = new URL(props.href.toString(), window.location.origin);

    setPath(url.pathname)

    if (path != url.pathname) {
      setTimeout(() => {
        router.push(props.href.toString())
      }, 500)
    }

    if (props.onClick) props.onClick(e)
  }

  return (
    <Link
      {...props}
      onClick={handleTransition}
    />
  )
}