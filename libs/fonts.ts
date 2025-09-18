import { Bebas_Neue, VT323 } from "next/font/google"
import localFont from "next/font/local"

export const bebasNeue = Bebas_Neue({
    weight: "400",
    subsets: ["latin"]
})

export const vt323 = VT323({
    weight: ["400"],
    subsets: ["latin"]
})

export const neueMontreal = localFont({
    src: [
        {
            path: "../fonts/NeueMontreal/NeueMontreal-Light.otf",
            weight: "300",
            style: "normal"
        },
        {
            path: "../fonts/NeueMontreal/NeueMontreal-LightItalic.otf",
            weight: "300",
            style: "italic"
        },
        {
            path: "../fonts/NeueMontreal/NeueMontreal-Regular.otf",
            weight: "400",
            style: "normal"
        },
        {
            path: "../fonts/NeueMontreal/NeueMontreal-Italic.otf",
            weight: "400",
            style: "italic"
        },
        {
            path: "../fonts/NeueMontreal/NeueMontreal-Medium.otf",
            weight: "500",
            style: "normal"
        },
        {
            path: "../fonts/NeueMontreal/NeueMontreal-MediumItalic.otf",
            weight: "500",
            style: "italic"
        },
        {
            path: "../fonts/NeueMontreal/NeueMontreal-Bold.otf",
            weight: "700",
            style: "normal"
        },
        {
            path: "../fonts/NeueMontreal/NeueMontreal-BoldItalic.otf",
            weight: "700",
            style: "italic"
        },
        
    ],
    display: "swap"
})