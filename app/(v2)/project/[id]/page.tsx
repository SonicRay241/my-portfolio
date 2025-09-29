import ClientPage from "./_client"

export default async function Page(props: {
  params: {
    id: string
  }
}) {
  const { id } = await props.params

  return <ClientPage projectId={id}/>
}