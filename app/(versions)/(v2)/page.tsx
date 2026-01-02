"use client"

import Hero from "@/components/v2/hero";
import Showcase from "@/components/v2/showcase";
import { useEffect, useRef, useState } from "react";
import NoScriptContent from "./noscript";
import { useVersion } from "../_versionContext";
import VersionInfo from "@/components/versioninfo";

export default function Page() {
  const heroRef = useRef<HTMLDivElement>(null)

  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <>
      <VersionInfo version={1} />
      {
        show && (
          <>
            <Hero ref={heroRef} />
            <Showcase heroRef={heroRef} />
          </>
        )
      }
      <noscript>
        <NoScriptContent />
      </noscript>
    </>
  );
}
