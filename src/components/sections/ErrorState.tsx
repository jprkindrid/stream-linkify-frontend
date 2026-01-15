import { motion, type MotionProps } from "motion/react";

interface ErrorStateProps {
    error: Error | string;
    fadeScale: MotionProps;
}

const ErrorState = ({ error, fadeScale }: ErrorStateProps) => {
    const message = error instanceof Error ? error.message : error;

    return (
        <motion.div
            layout
            {...fadeScale}
            className="flex flex-col items-center justify-center gap-4 p-6"
        >
            <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950">
                <h3 className="mb-2 font-bold text-red-900 dark:text-red-100">
                    Something went wrong
                </h3>
                <p className="text-sm text-red-700 dark:text-red-200">
                    {message ||
                        "Failed to fetch track details. Please try again."}
                </p>
            </div>
            <button
                onClick={() => window.location.reload()}
                className="rounded-lg bg-neutral-900 px-4 py-2 text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
            >
                Try Again
            </button>
        </motion.div>
    );
};

export default ErrorState;
