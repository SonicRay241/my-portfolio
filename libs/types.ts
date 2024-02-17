import { StaticImageData } from "next/image"
import { Property } from "csstype"

type TProjectData = {
    name: string,
    image: StaticImageData,
    imageAlt: string,
    bgFrom: Property.BackgroundColor,
    bgTo: Property.BackgroundColor
}

export type { TProjectData }