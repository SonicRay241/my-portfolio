import { motion, Variants } from "framer-motion"

const LoadingBar = () => {
    const loaderVariants: Variants = {
        initial: {
            scaleY: 0.5,
            opacity: 0,
        },
        animate: {
            scaleY: 1,
            opacity: 1,
            transition: {
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1,
                ease: "circIn",
            },
        },
    };

    return (
        <motion.div
            transition={{
                staggerChildren: 0.25,
            }}
            initial="initial"
            animate="animate"
            className="flex gap-1"
        >
            <motion.div variants={loaderVariants} className="h-12 w-2 bg-white" />
            <motion.div variants={loaderVariants} className="h-12 w-2 bg-white" />
            <motion.div variants={loaderVariants} className="h-12 w-2 bg-white" />
            <motion.div variants={loaderVariants} className="h-12 w-2 bg-white" />
            <motion.div variants={loaderVariants} className="h-12 w-2 bg-white" />
        </motion.div>
    );
};

export default LoadingBar