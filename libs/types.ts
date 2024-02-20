import { StaticImageData } from "next/image"
import { Property } from "csstype"
import { RefObject } from "react"

type TProjectURL = {
    title: string,
    url: string
}

type TProjectData = {
    name: string,
    image: StaticImageData,
    imageAlt: string,
    bgFrom: Property.BackgroundColor,
    bgTo: Property.BackgroundColor,
    description: string,
    urls: TProjectURL[]
}

type TNavChild = {
    title: string;
    ref: RefObject<HTMLDivElement>;
}

export type { TProjectData, TNavChild }