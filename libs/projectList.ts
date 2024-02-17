import { TProjectData } from "@/libs/types"

import PortFolio from "@/public/projects/Portfolio.png"
import Livre from "@/public/projects/Livre.png"


const projectList: TProjectData[] = [
    {
        name: "Portfolio",
        image: PortFolio,
        imageAlt: "My Portfolio",
        bgFrom: "#ddd",
        bgTo: "#999"
    },
    {
        name: "Livre",
        image: Livre,
        imageAlt: "Livre App",
        bgFrom: "#a855f7",
        bgTo: "#8b5cf6"
    }
]

export default projectList