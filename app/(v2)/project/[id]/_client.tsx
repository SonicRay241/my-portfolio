"use client"

export default function ClientPage(props: {
  projectId: string
}) {
  return (
    <div className="text-white">{props.projectId}</div>
  )
}