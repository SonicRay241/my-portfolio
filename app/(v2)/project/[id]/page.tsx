import { showcases } from "@/libs/showcasemeta"
import ClientPage from "./_client"
import { Metadata, ResolvingMetadata } from "next";

export const dynamicParams = false

export async function generateMetadata(
  props: PageProps<'/project/[id]'>,
): Promise<Metadata> {
  const { id } = await props.params
  const project = showcases[id]
  const ogImage = project.thumbnailType == "image" ? `${project.path}/${project.thumbnailName}` : `${project.path}/banner.jpg`;

  return {
    title: project.name,
    description: project.details?.firstHalf || project.description,
    openGraph: {
      images: ogImage,
      type: "website"
    }
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
