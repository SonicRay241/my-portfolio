import Head from "next/head"
import { ReactNode } from "react"

export default function Layout(props: {
  children: ReactNode
}) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://ufs.sh" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://ufs.sh" />
      </Head>
      {props.children}
    </>
  )
}