import { aeonik } from "@/libs/fonts"
import { ReactNode } from "react"

const font = aeonik

export default function Layout(props: {
  children: ReactNode
}) {
  
  return (
    <div className={`${font.className} flex justify-center items-center w-screen h-screen bg-black`}>
      {props.children}
    </div>
  )
}