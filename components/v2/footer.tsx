"use client"

import CopyrightIcon from '@mui/icons-material/Copyright';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export default function Footer() {
  return (
    <div className="w-full mt-12 px-4 py-2 text-zinc-300 bg-black/20 backdrop-blur-md">
      <p className="text-zinc-500">Contact</p>
      <a
        href="mailto:rayhan.permana@outlook.com"
        className="mb-12 transition-colors hover:text-violet-600"
        target="_blank"
        rel="noreferrer"
      >
        rayhan.permana@outlook.com
      </a>
      <p className="text-zinc-500 mt-12">Links</p>
      <a
        href="/CV.pdf"
        className="text-lg flex items-center transition-colors hover:text-violet-600"
        target="_blank"
        rel="noreferrer"
      >
        <span>Resume</span>
        <ArrowOutwardIcon fontSize="small" className="" />
      </a>
      <a
        href="https://www.linkedin.com/in/rayhan-permana-733129292/"
        className="text-lg flex items-center transition-colors hover:text-violet-600"
        target="_blank"
        rel="noreferrer"
      >
        <span>LinkedIn</span>
        <ArrowOutwardIcon fontSize="small" className="" />
      </a>

      <div className="w-full flex justify-between">
        <p className="text-4xl md:text-6xl font-medium">rayy.dev</p>
        <div className="flex gap-2">
          <CopyrightIcon fontSize="large" className="" />
          <p className="text-4xl md:text-6xl font-medium">2025</p>
        </div>
      </div>
    </div>
  )
}