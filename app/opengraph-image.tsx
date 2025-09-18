import { ImageResponse } from "next/og"
export const alt = "Rayhan"
export const size = {
    width: 768,
    height: 540,
}

export const contentType = 'image/png'
export const runtime = 'edge'

const Image = async () => {
    const montrealNormal = fetch(
        new URL('../fonts/NeueMontreal/NeueMontreal-Regular.otf', import.meta.url)
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
                alignItems: "center",
                backgroundColor: "#18181b",
            }}>
                <img
                    src="/black-noise.png"
                    alt="e"
                    style={{
                        opacity: 0.05,
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "auto"
                    }}
                />
                <h1
                    style={{
                        fontSize: 72,
                        lineHeight: 0.3,
                        color: "white",
                    }}
                >
                    <span style={{ color: "#7C3AED" }}>/</span>rayhan.
                </h1>
            </div>
        ),
        {
            ...size,
            fonts: [
                {
                    name: 'Neue Montreal',
                    data: await montrealNormal,
                    style: 'normal',
                    weight: 400,
                },
            ],
        }
    )
}

export default Image