import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const font = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rayhan Permana",
  description: "Rayhan's Portfolio Website",
  metadataBase: new URL("https://rayy.dev"),
  openGraph: {
    images: '/og-image.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Rayhan Permana</title>
    <meta name="title" content="Rayhan Permana" />
    <meta name="description" content="A student in BINUS University who is also a Software Engineer." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://rayy.dev" />
    <meta property="og:title" content="Rayhan Permana" />
    <meta property="og:description" content="A student in BINUS University who is also a Software Engineer." />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://rayy.dev" />
    <meta property="twitter:title" content="Rayhan Permana" />
    <meta property="twitter:description" content="A student in BINUS University who is also a Software Engineer." />

      <body className={font.className}>
        {children}
      </body>
    </html>
  );
}
