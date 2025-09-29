"use client";

import SpanWords from "@/components/v2/spanwords";
import Link from "next/link";

export default function Page() {
  return (
    <div className="max-w-screen-sm px-6">
      <p className="text-zinc-300">
        Rayhan is an enthusiast in data science and AI with a strong interest in
        transforming data into practical solutions.
      </p>
      <p className="text-zinc-500 text-sm">
        <SpanWords text="The 2025 page is under construction, click"/>
        <Link href="/v1" className="text-violet-600 underline mx-1">here</Link> 
        <SpanWords text="to view the 2023 page."/>
      </p>
    </div>
  );
}
