import Image from "next/image"

export default function ProjectCard(props: {
    title: string;
    imageUrl: string;
}) {
    return (
        <div className="w-full h-fit">
            <div className="bg-white">
                <img src={props.imageUrl} alt={props.title} />
            </div>
        </div>
    )
}