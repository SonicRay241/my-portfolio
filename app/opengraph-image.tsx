import { ImageResponse } from "next/og"
export const alt = 'Portfolio website'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'
export const runtime = 'edge'

const Image = async () => {
    const rubikNormal = fetch(
        new URL('../public/Rubik-Regular.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer())

    return new ImageResponse(
        (
            <div style={{
                height: "100%",
                width: "100%",
                padding: "24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <h1 
                    style={{
                        fontSize: 72,
                        lineHeight: 1
                    }}
                >
                    <span style={{color: "#7C3AED"}}>/</span>RAYHAN PERMANA
                </h1>
            </div>
        ),
        {
            ...size,
            fonts: [
                {
                    name: 'Rubik',
                    data: await rubikNormal,
                    style: 'normal',
                    weight: 400,
                },
            ],
        }
    )
}

export default Image