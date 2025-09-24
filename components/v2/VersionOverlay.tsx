import { NextFont } from "next/dist/compiled/@next/font"

export default function VersionOverlay(props: {
    className?: string,
    font: NextFont,
    version: number
}) {
    return (
        <div className={`fixed bottom-0 left-2 pointer-events-none ${props.font.className} ${props.className || ""}`}>
            {`V${props.version}`}
        </div>
    )
}