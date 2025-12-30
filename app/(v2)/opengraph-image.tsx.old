// app/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 960, height: 540 };
export const contentType = "image/png";

export default async function OGImage() {
  const aeonikFont = await readFile(
    join(process.cwd(), "/public/assets/fonts/Aeonik/aeonikpro-regular.ttf")
  )

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: "#18181b",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
          fontFamily: "Aeonik",
        }}
      >
        {/* Noise layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.12,
            backgroundImage: `url(${process.env.NEXT_PUBLIC_URL}/black-noise.png)`,
            backgroundSize: "35%"
          }}
        />

        {/* Content */}
        <div style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: 64
        }}
        >
          <span
            style={{
              fontSize: 144,
              color: "#7F22FF",
              transform: "translateY(-8px)"
            }}
          >/</span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <strong style={{ fontSize: 72 }}>Rayhan Permana</strong>
            <span style={{
              fontSize: 36,
              color: "#737373"
            }}>
              An AI Enthusiast.
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Aeonik",
          data: await aeonikFont,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );
}
