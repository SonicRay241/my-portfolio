"use client";

import ClientPage from "./_client"
import { useParams } from 'next/navigation';

export default function Page() {
  const { id }: { id: string | undefined } = useParams();

  return <ClientPage projectId={id || ""}/>
}