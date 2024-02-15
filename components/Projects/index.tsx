import { FC } from "react"
import { Property } from "csstype"

const Projects:
FC<{ 
    mouseEnterHandler: (size: number, color: Property.BackgroundColor, blendMode?: Property.MixBlendMode) => void, 
    mouseLeaveHandler: () => void,  
}>
= (props) => {
    return (
        <div className="w-full h-96 bg-white" onMouseEnter={()=>props.mouseEnterHandler(40, "black", "normal")}>
            sisi
        </div>
    )
}

export default Projects