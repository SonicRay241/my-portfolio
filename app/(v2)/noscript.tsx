import Logo from "@/components/v2/logo";
import { ShowcaseMeta, showcases } from "@/libs/showcasemeta";

export default function NoScriptContent() {
  return (
    <div className="p-4">
      <div className="w-full h-full">
        <Logo />
      </div>
      <div className="flex justify-center w-full">
        <div className="flex flex-col items-center w-full text-zinc-300 max-w-screen-md pt-16">
          <h1 className="text-4xl font-medium min-w-full">
            Introduction
          </h1>
          <p className="min-w-full mt-6">
            Rayhan is an enthusiast in data science and AI with a strong interest in transforming data into practical solutions. His work spans a range of challenges, from training XGboost models to categorizing obesity based on health metrics, and building LSTMs for forecasting sales, pricing, and air quality.
          </p>
          <p className="min-w-full mt-6">
            He focuses not only on model performance but also on efficiency. Exploring techniques like data augmentation, precision trade-offs, and lightweight architectures to create solutions that are both effective and scalable. To him, AI is about blending technical skill with creativity to uncover insights and solve real-world problems.
          </p>
          <h1 className="text-4xl font-medium min-w-full mt-8 mb-6">
            Projects
          </h1>
          {Object.entries(showcases).map(([k, v]) => v.description == "Project" ? <Project id={k} {...v} key={k} /> : null)}
          <h1 className="text-4xl font-medium min-w-full mt-8 mb-6">
            Experience
          </h1>
          {Object.entries(showcases).map(([k, v]) => v.description != "Project" ? <Project id={k} {...v} key={k} /> : null)}
          <div className="w-full mt-12">
            <a className="group flex justify-start items-center w-fit py-2" href="/about">
              <h3 className="text-xl text-zinc-100 group-hover:text-violet-600 transition-colors">About</h3>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function Project(props: ShowcaseMeta & { id: string }) {
  return <ItemList name={props.name} type={props.description} url={`/project/${props.id}`} />
}

function ItemList(props: {
  name: string;
  type: string;
  url?: string;
}) {
  return (
    <a className="group flex justify-between items-center min-w-full py-2" href={props.url} rel="noreferrer">
      <h3 className="text-xl text-zinc-100 group-hover:text-violet-600 transition-colors">{props.name}</h3>
      <p className="text-xs text-zinc-500">{props.type}</p>
    </a>
  )
}