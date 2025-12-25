import { showcases } from "@/libs/showcasemeta"
import ClientPage from "./_client"
import { Metadata, ResolvingMetadata } from "next";

export const dynamicParams = false

export async function generateMetadata(
  props: PageProps<'/project/[id]'>,
): Promise<Metadata> {
  const { id } = await props.params
  const project = showcases[id]

  return {
    title: "Project",
    description: project.name,
  };
}

export default async function Page(props: PageProps<'/project/[id]'>) {
  const { id } = await props.params

  return <ClientPage projectId={id} />
}

export async function generateStaticParams() {
  const paths = Object.keys(showcases).map((id) => ({ id: id.toString() }))

  return paths
}
