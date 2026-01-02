import { Metadata } from "next";
import { ReactNode } from "react";
import "./v1.css"

export const metadata: Metadata = {
  openGraph: {
    images: "/assets/preview/v1.png",
    type: "website"
  }
};

export default function Layout(props: {
  children: ReactNode
}) {
  return props.children
}