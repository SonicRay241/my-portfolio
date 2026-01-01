"use client"

import { usePathname, useRouter } from "next/navigation"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react"

const PathContext = createContext<{
  path: string,
  setPath: Dispatch<SetStateAction<string>>
} | undefined>(undefined)

export function PathContextProvider(props: {
  children: ReactNode
}) {
  const pathname = usePathname()
  const [path, setPath] = useState(pathname)
  const [isBrowserNav, setIsBrowserNav] = useState(false)

  useEffect(() => {
    function handlePopState() {
      setIsBrowserNav(true)
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [])

  useEffect(() => {
    if (isBrowserNav) {
      setPath(pathname)
    }
  }, [pathname])

  return (
    <PathContext.Provider value={{ path, setPath }}>
      {props.children}
    </PathContext.Provider>
  )
}

export function usePathContext() {
  const context = useContext(PathContext)
  if (!context) throw new Error("usePathContext must be used within a PathContextProvider");
  return context
}