const LinkSkeleton = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-8 p-6">
            <div className="sm:grid-cold-5 grid w-full max-w-md animate-pulse grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map(() => {
                    return (
                        <a
                            target="_blank"
                            rel="noreferrer"
                            className="shadow-accent group flex flex-col items-center gap-1.5 p-3 transition-all hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="h-18 w-18 bg-neutral-200/50 text-start shadow-xl dark:bg-neutral-700/50"></div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default LinkSkeleton;
