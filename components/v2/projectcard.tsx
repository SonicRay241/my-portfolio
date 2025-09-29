import { motion } from "motion/react";
import TransitionLink from "./transitionlink";

export default function ProjectCard(props: {
  id: number
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailName?: string;
  thumbnailType: "image" | "video";
  locked?: boolean;
}) {
  return (
    <motion.div
      className="w-full h-fit"
      whileHover={{
        filter: "brightness(0.8)"
      }}
      transition={{
        type: "spring"
      }}
    >
      <TransitionLink
        className="block"
        href={`/project/${props.id}`}
      >
      <div className="bg-white mb-2">
        {props.thumbnailType == "image" ? (
          <img className="w-full" src={props.thumbnailUrl} alt={props.title} />
        ) : (
          <video
          className="w-full h-auto block"
          src={props.thumbnailUrl}
          controls={false}
          playsInline
          loop
          muted
          autoPlay
          />
        )
        
      }
      </div>
      <p className="text-zinc-100 text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl">{props.title}</p>
      <p className="text-zinc-500 text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl">{props.description}</p>
      </TransitionLink>
    </motion.div>
  )
}