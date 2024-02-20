import { ImageResponse } from "next/og"
import { Rubik } from "next/font/google"

export const runtime = 'edge'
export const alt = 'Portfolio website'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

const Image = async () => {
    const rubikMedium = fetch(
        new URL('./Rubik-Medium.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer())

    return new ImageResponse(
        (
            <div style={{
                height: "100%",
                width: "100%",
                padding: "24px"
            }}>
                <h1 style={{
                    fontSize: 72,
                    lineHeight: 1
                }}>
                    <span style={{color: "#7C3AED"}}>/</span>RAYHAN PERMANA
                </h1>
            </div>
        ),
        {
            // For convenience, we can re-use the exported opengraph-image
            // size config to also set the ImageResponse's width and height.
            ...size,
            fonts: [
                {
                    name: 'Rubik',
                    data: await rubikMedium,
                    style: 'normal',
                    weight: 400,
                },
            ],
        }
    )
}

export default Image