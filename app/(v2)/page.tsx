"use client"

import GlassSurface from "@/components/v2/glasssurface";
import Hero from "@/components/v2/hero";
import Menubutton from "@/components/v2/menubutton";
import Showcase from "@/components/v2/showcase";
import { useRef } from "react";

export default function Page() {
  const heroRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Hero heroRef={heroRef} />
      <Showcase heroRef={heroRef} />

      <Menubutton />
    </>
  );
}
