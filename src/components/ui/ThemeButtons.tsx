import { useAccentContext } from "@/providers/accentProviders";
import { useThemeContext, type ThemeMode } from "@/providers/themeProvider";
import {
    SunIcon,
    MoonIcon,
    ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";
import clsx from "clsx";

type ThemeButton = {
    mode: ThemeMode;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const ThemeButtons = () => {
    const { theme, setTheme } = useThemeContext();
    const { accentColor } = useAccentContext();

    const buttons: ThemeButton[] = [
        { mode: "light", Icon: SunIcon },
        { mode: "dark", Icon: MoonIcon },
        { mode: "system", Icon: ComputerDesktopIcon },
    ];

    return (
        <div className="flex flex-row justify-between gap-2 transition">
            {buttons.map(({ mode, Icon }) => (
                <button
                    key={mode}
                    onClick={() => setTheme(mode)}
                    className={clsx(
                        "group p-2 text-black transition hover:bg-black hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black",
                        mode === theme && "bg-black/5 dark:bg-white/5"
                    )}
                >
                    <Icon
                        className={clsx(
                            "size-5 group-hover:text-white dark:group-hover:text-black",
                            theme === mode && "text-amber-500"
                        )}
                    />
                </button>
            ))}
        </div>
    );
};

export default ThemeButtons;
