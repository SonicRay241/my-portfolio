"use client"

import Hero from "@/components/v2/hero";
import Showcase from "@/components/v2/showcase";
import { useEffect, useRef } from "react";

export default function Page() {
  const heroRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Hero ref={heroRef} />
      <Showcase heroRef={heroRef} />
    </>
  );
}
