import { NextFont } from "next/dist/compiled/@next/font"

export default function VersionOverlay(props: {
    className?: string,
    font: NextFont,
    version: number
}) {
    return (
        <div className={`sticky bottom-0 translate-x-2 pointer-events-none ${props.font.className} ${props.className || ""} z-50`}>
            {`V${props.version}`}
        </div>
    )
}