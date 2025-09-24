import FuzzyOverlay from "@/components/v2/FuzzyOverlay";
import Navbar from "@/components/v2/Navbar";
// import ProjectList from "@/components/v2/Projects";
import Hero from "@/components/v2/hero";
import VersionOverlay from "@/components/v2/VersionOverlay";
import { neueMontreal, vt323 } from "@/libs/fonts";
import Menubutton from "@/components/v2/menubutton";
import Showcase from "@/components/v2/showcase";
import { ReactNode } from "react";

const font = neueMontreal

export default function Layout(props: {
    children: ReactNode
}) {
    return (
        <div className="w-full h-screen bg-zinc-900">
            <div className={`${font.className} min-h-screen pt-2`}>
                {props.children}
            </div>
            <VersionOverlay
                font={vt323}
                version={2}
                className="text-lg text-zinc-700/60"
            />
            <FuzzyOverlay />
        </div>
    )
}