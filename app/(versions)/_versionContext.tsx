"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

const VersionModalContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>]>([false, () => { }])

export function useVersionModal() {
  return useContext(VersionModalContext)
}

export function VersionModalProvider(props: {
  children?: ReactNode
}) {
  const state = useState(false)

  return (
    <VersionModalContext.Provider value={state}>
      {props.children}
    </VersionModalContext.Provider>
  )
}

const VersionContext = createContext<[number, Dispatch<SetStateAction<number>>]>([0, () => { }])

export function useVersion() {
  return useContext(VersionContext)
}

export function VersionProvider(props: {
  children?: ReactNode
}) {
  const state = useState(0)

  return (
    <VersionContext.Provider value={state}>
      {props.children}
    </VersionContext.Provider>
  )
}