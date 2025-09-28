import { motion } from "motion/react"

export default function ProjectCard(props: {
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
      <p className="text-zinc-300 text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl">{props.title}</p>
      <p className="text-zinc-500 text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl">{props.description}</p>
    </motion.div>
  )
}