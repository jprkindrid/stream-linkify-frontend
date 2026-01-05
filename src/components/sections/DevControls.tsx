import type { QueryStatus } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";

interface DevControlsProps {
    setDevOverride: Dispatch<SetStateAction<QueryStatus | null>>;
    devOverride: QueryStatus | null;
}

const DevControls = ({ setDevOverride, devOverride }: DevControlsProps) => {
    return (
        <div className="fixed bottom-4 left-4 flex gap-1 rounded bg-neutral-800 p-1 text-sm">
            <button
                onClick={() => setDevOverride(null)}
                className={`rounded px-2 py-1 ${
                    devOverride === null
                        ? "bg-accent text-white"
                        : "text-neutral-400 hover:text-white"
                }`}
            >
                real
            </button>
            {(["pending", "success", "error"] as const).map((s) => (
                <button
                    key={s}
                    onClick={() => setDevOverride(s)}
                    className={`rounded px-2 py-1 ${
                        devOverride === s
                            ? "bg-accent text-white"
                            : "text-neutral-400 hover:text-white"
                    }`}
                >
                    {s}
                </button>
            ))}
        </div>
    );
};

export default DevControls;
