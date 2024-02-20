import { ImageResponse } from "next/og"
export const alt = 'Portfolio website'
export const size = {
    width: 768,
    height: 540,
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
                flexDirection: "column",
                justifyContent: "center",
                // alignItems: "center"
                backgroundColor: "white"
            }}>
                <h1 
                    style={{
                        fontSize: 72,
                        lineHeight: 0.3
                    }}
                >
                    <span style={{color: "#7C3AED"}}>/</span>RAYHAN PERMANA
                </h1>
                <p
                    style={{
                        fontSize: 28,
                        lineHeight: 0.3
                    }}
                >
                    A software engineer.
                </p>
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