import ScrollVelocity from "./scrollvelocity";

export default function Showcase() {
    return (
        <div className="pt-8 text-white">
            <ScrollVelocity
                texts={["My Works"]}
                className="text-3xl font-medium"
                parallaxClassName="border-y border-violet-500 pb-1"
                numCopies={16}
            />
        </div>
    )
}