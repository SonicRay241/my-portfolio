"use client";

import CopyrightIcon from "@mui/icons-material/Copyright";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ScrollVelocity from "./scrollvelocity";
import CurvedLoop from "./curvedmarquee";

export default function Footer() {
  return (
    <div className="w-full mt-12 px-2 py-2">
      <div className="w-full p-4 text-white bg-black rounded-lg">
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

        <div className="w-full grid grid-cols-3 items-end">
          <p className="text-4xl md:text-6xl font-medium">rayy.dev</p>
          <p className="w-full text-center text-sm text-zinc-600">
            Last updated September 2025
          </p>
          <div className="flex justify-end gap-2">
            <CopyrightIcon fontSize="large" className="" />
            <p className="text-4xl md:text-6xl font-medium">2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
