"use client"

import { ReactNode } from "react";
import { createPortal } from "react-dom";

export default function OverlayPortal(props: {
  children: ReactNode
}) {
  const layoutRoot = document.getElementById("root")

  if (!layoutRoot) return null
  return createPortal(props.children, layoutRoot)
}