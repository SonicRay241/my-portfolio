"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="">
      <p className="text-zinc-300">
        Rayhan is an enthusiast in data science and AI with a strong interest in
        transforming data into practical solutions.
      </p>
      <p className="flex gap-1 text-zinc-500 text-sm">
        <span>The 2025 page is under construction, click</span>
        <Link href="/v1" className="text-violet-600 underline">here</Link> 
        <span>to view the 2023 page.</span>
      </p>
    </div>
  );
}
