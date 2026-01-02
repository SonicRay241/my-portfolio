"use client"

import { useVersion } from "@/app/(versions)/_versionContext";
import { useEffect } from "react"

export default function VersionInfo(props: {
  version: number;
}) {
  const [_, setVersion] = useVersion()

  useEffect(() => {
    setVersion(props.version)
    console.log(props.version);

  }, [])

  return null
}