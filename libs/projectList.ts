import { TProjectData } from "@/libs/types"

import PortFolio from "@/public/projects/Portfolio.png"
import Livre from "@/public/projects/Livre.png"
import Blog from "@/public/projects/Blog.png"

const projectList: TProjectData[] = [
    {
        name: "My Portfolio",
        image: PortFolio,
        imageAlt: "My Portfolio",
        bgFrom: "#5e6177",
        bgTo: "#404251",
        description: "Portfolio website i made with NextJS and Framer Motion.",
        urls: [
            {
                title: "rayy.dev",
                url: "/"
            },
            {
                title: "Github",
                url: "https://github.com/SonicRay241/my-portfolio"
            }
        ]
    },
    {
        name: "Livre",
        image: Livre,
        imageAlt: "Livre App",
        bgFrom: "#a855f7",
        bgTo: "#8b5cf6",
        description: "Livre is a markdown editor used for note-taking. Built with Sveltekit and Electron.",
        urls: [
            {
                title: "Github",
                url: "https://github.com/SonicRay241/livre"
            }
        ]
    },
    {
        name: "Blog Page",
        image: Blog,
        imageAlt: "Blog Page",
        bgFrom: "#5e6177",
        bgTo: "#404251",
        description: "My blog website complete with a built-in editor, built with NextJS and ElysiaJS",
        urls: [
            {
                title: "blogs.rayy.dev",
                url: "https://blogs.rayy.dev"
            },
            {
                title: "Github",
                url: "https://github.com/SonicRay241/blog"
            }
        ]
    }
]

export default projectList