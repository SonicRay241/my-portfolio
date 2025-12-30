import "./v2.css"
import FuzzyOverlay from "@/components/v2/FuzzyOverlay";
import VersionOverlay from "@/components/v2/VersionOverlay";
import { aeonik, vt323 } from "@/libs/fonts";
import { ReactNode } from "react";
import { ReactLenis } from "lenis/react"
import TransitionRoot from "@/components/v2/transitionroot";
import { PathContextProvider } from "./pathcontext";
import Footer from "@/components/v2/footer";
import Menubar from "@/components/v2/menubar";
import { Metadata } from "next";
import Head from "next/head";

const font = aeonik

export const metadata: Metadata = {
  title: "Rayhan Permana",
  description: "I like building stuff.",
  metadataBase: new URL("https://rayy.dev"),
  openGraph: {
    images: "/assets/preview.png",
    type: "website"
  }
};

export default function Layout(props: {
  children: ReactNode
}) {
  return (
    <>
      <Head>
        <link rel="mask-icon" color="#7F22FF"></link>
      </Head>
      <ReactLenis root />
      <div className={`${font.className} w-full relative min-h-screen`} id="root">
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
          <Menubar />
        </PathContextProvider>
      </div>
    </>
  )
}