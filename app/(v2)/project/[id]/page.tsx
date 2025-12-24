import { showcases } from "@/libs/showcasemeta"
import ClientPage from "./_client"

export const dynamicParams = false

export default async function Page(props: PageProps<'/project/[id]'>) {
  const { id } = await props.params

  return <ClientPage projectId={id} />
}

export async function generateStaticParams() {
  const paths = [...showcases.keys().map((id) => ({ id: id.toString() }))]

  return paths
}
