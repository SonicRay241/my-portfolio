"use client"

import "./v2.css"
import FuzzyOverlay from "@/components/v2/FuzzyOverlay";
import VersionOverlay from "@/components/v2/VersionOverlay";
import { aeonik, vt323 } from "@/libs/fonts";
import { ReactNode } from "react";
import { ReactLenis } from "lenis/react"
import Menubutton from "@/components/v2/menubutton";
import TransitionRoot from "@/components/v2/transitionroot";
import { PathContextProvider } from "./pathcontext";
import Footer from "@/components/v2/footer";

const font = aeonik

export default function Layout(props: {
  children: ReactNode
}) {
  return (
    <>
      <ReactLenis root />
      <div className={`${font.className} w-full relative min-h-screen`}>
        <FuzzyOverlay />
        <VersionOverlay
          font={vt323}
          version={2}
          className="text-lg text-zinc-700/60"
        />
        <PathContextProvider>
          <TransitionRoot>
            <div className="flex flex-col justify-between min-h-screen">
              <main>
                {props.children}
              </main>
              <Footer />
            </div>
          </TransitionRoot>
          <Menubutton />
        </PathContextProvider>
      </div>
    </>
  )
}