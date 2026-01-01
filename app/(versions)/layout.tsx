"use client"

import { ReactNode } from "react"
import { VersionModalProvider, VersionProvider } from "./_versionContext"
import VersionModal from "./_modal"

export default function Layout(props: {
  children: ReactNode
}) {
  return (
    <VersionModalProvider>
      <VersionProvider>
        {props.children}
        <VersionModal />
      </VersionProvider>
    </VersionModalProvider>
  )
}