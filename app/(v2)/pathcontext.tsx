"use client"

import { usePathname } from "next/navigation"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"

const PathContext = createContext<{
  path: string,
  setPath: Dispatch<SetStateAction<string>>
} | undefined>(undefined)

export function PathContextProvider(props: {
  children: ReactNode
}) {
  const pathname = usePathname()
  const [path, setPath] = useState(pathname)

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