import type { QueryStatus } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import clsx from "clsx";

interface DevControlsProps {
    setDevOverride: Dispatch<SetStateAction<QueryStatus | null>>;
    devOverride: QueryStatus | null;
}

const DevControls = ({ setDevOverride, devOverride }: DevControlsProps) => {
    return (
        <div className="absolute bottom-4 left-4 flex gap-1 rounded bg-neutral-800 text-sm">
            <button
                onClick={() => setDevOverride(null)}
                className={clsx(
                    "rounded px-2 py-1",
                    devOverride === null
                        ? "bg-white text-neutral-900"
                        : "text-neutral-400 hover:text-white"
                )}
            >
                real
            </button>
            {(["pending", "success", "error"] as const).map((s) => (
                <button
                    key={s}
                    onClick={() => setDevOverride(s)}
                    className={clsx(
                        "rounded px-2 py-1",
                        devOverride === s
                            ? "bg-white text-neutral-900"
                            : "text-neutral-400 hover:text-white"
                    )}
                >
                    {s}
                </button>
            ))}
        </div>
    );
};

export default DevControls;
