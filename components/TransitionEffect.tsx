import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const variants = {
    in: {
        opacity: 1,
        x: 0,
    },
    center: {
        opacity: 1,
        x: "-30%",
    },
    out: {
        opacity: 0.0,
        x: "30%",
    },
};

export default function TransitionEffect1({ children }) {
    const { asPath } = useRouter();

    return (
        <AnimatePresence initial={false}>
            <motion.div
                transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                }}
                key={asPath}
                variants={variants}
                initial="center"
                animate="in"
                exit="out">
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
