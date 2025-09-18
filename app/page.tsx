import FuzzyOverlay from "@/components/v2/FuzzyOverlay";
import Navbar from "@/components/v2/Navbar";
import ProjectList from "@/components/v2/Projects";
import Hero from "@/components/v2/Hero";
import VersionOverlay from "@/components/v2/VersionOverlay";
import { neueMontreal, vt323 } from "@/libs/fonts";

const font = neueMontreal

export default function Page() {
    return (
        <div className="w-full h-screen overflow-hidden">
            <div className={`${font.className} bg-zinc-900 h-screen pt-12 p-4`}>
                <Navbar />
                <Hero/>
                {/* <ProjectList/> */}
            </div>
            <VersionOverlay
                font={vt323}
                version={2}
                className="text-lg text-zinc-700/60"
            />
            <FuzzyOverlay/>
        </div>
    )
}