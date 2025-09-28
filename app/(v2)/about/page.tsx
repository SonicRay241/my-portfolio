"use client"

import BlurText from "@/components/v2/blurtext";
import Logo from "@/components/v2/logo";
import TransitionRoot from "@/components/v2/transitionroot";

export default function Page() {
  return (
    <div className="flex justify-center w-full px-4">
      <div className="flex flex-col items-center w-full text-zinc-300 max-w-screen-md pt-16">
        <BlurText
          text={"A curious and creative learner who loves exploring technology, building long-term projects, and finding clever, hands-on solutions to challenges."}
          delay={20}
          animateBy="words"
          direction="bottom"
          className="text-4xl font-medium min-w-full"
        />
        <p className="min-w-full mt-8">
          Rayhan is an aspiring AI and Data Engineer currently pursuing a bachelor's degree in Data Science at BINUS University. His studies focus on machine learning, data engineering, and software development, complemented by hands-on projects in recommendation systems, predictive modeling, and deployment pipelines.
        </p>
        <p className="min-w-full mt-6">
          His passion for AI stems from the challenge of transforming raw data into meaningful insights and building systems that can learn, adapt, and scale. Reflecting this, his skillset blends strong foundations (Python, SQL, Cloud, Full-Stack Development) with exploratory interests (Deep Learning, NLP, and scalable data pipelines).
        </p>
        <p className="min-w-full mt-6">
          Outside academics, he is a web developer experimenting with modern frameworks, a tinkerer who enjoys creating small apps to solve everyday problems, and a lifelong learner constantly exploring new tools and technologies. On quieter days, he dives into anime, experiments with new tools, or learns something new in programming and design.
        </p>
        <p className="min-w-full mt-6">
          Always learning — always fascinated by the world of AI and data.
        </p>
        <h2 className="min-w-full mt-24 mb-6 text-xl font-semibold">Contact</h2>
        <Contact
          contact="rayhan.permana@outlook.com"
          type="Email Address"
          url="mailto:rayhan.permana@outlook.com"
        />
        <Contact
          contact="linkedin.com/in/rayhan-permana-733129292/"
          type="LinkedIn"
          url="https://www.linkedin.com/in/rayhan-permana-733129292/"
        />
        <Contact
          contact="My Resume"
          type="PDF"
          url="/CV.pdf"
        />
        <Contact
          contact="@rayy.dev"
          type="Instagram account I really wanna use"
          url="https://www.instagram.com/rayy.dev"
        />
      </div>
      <div className="fixed top-2 left-2 px-2 rounded-lg backdrop-blur">
        <Logo />
      </div>
    </div>
  )
}

function Contact(props: {
  contact: string;
  type: string;
  url?: string;
}) {
  return (
    <a className="group flex justify-between items-center min-w-full py-2" href={props.url} target="_blank" rel="noreferrer">
      <h3 className="text-xl text-zinc-300 group-hover:text-violet-600 transition-colors">{props.contact}</h3>
      <p className="text-xs text-zinc-500">{props.type}</p>
    </a>
  )
}