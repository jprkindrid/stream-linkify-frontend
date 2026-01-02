import { useState } from "react";
import clsx from "clsx";

const LinkInput = () => {
    const [inputLink, setInputLink] = useState("");
    const [isTrack, setIsTrack] = useState(true);

    return (
        <form
            className="flex w-2xl flex-col items-center"
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >
            <div className="flex w-full">
                <div className="flex bg-neutral-100 text-neutral-500 transition dark:border-neutral-700 dark:bg-neutral-900">
                    <button
                        className={clsx(
                            "px-3 py-2 transition",
                            isTrack
                                ? "bg-accent text-neutral-100"
                                : "hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        )}
                        onClick={() => setIsTrack(true)}
                    >
                        Track
                    </button>
                    <button
                        className={clsx(
                            "px-3 py-2 transition",
                            !isTrack
                                ? "bg-accent text-neutral-100"
                                : "hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        )}
                        onClick={() => setIsTrack(false)}
                    >
                        Album
                    </button>
                </div>
                <input
                    className="focus-visible:ring-accent flex-1 bg-neutral-300 p-2 text-neutral-800 placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset dark:bg-neutral-700 dark:text-neutral-200"
                    type="text"
                    placeholder="https://music.apple.com/us/song/..."
                    value={inputLink}
                    onChange={(e) => setInputLink(e.target.value)}
                />
                <button className="bg-neutral-100 px-4 py-2 text-neutral-800 transition hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default LinkInput;
