import {
    createContext,
    useContext,
    useEffect,
    useLayoutEffect,
    useState,
    type ReactNode,
} from "react";

type ThemeMode = "light" | "dark" | "system";

type ThemeContextType = {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
    isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSystemTheme(): Omit<ThemeMode, "system"> {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

function getStoredTheme(): ThemeMode {
    return (localStorage.getItem("theme") as ThemeMode) || "system";
}

function saveStoredTheme(mode: ThemeMode) {
    if (mode === "system") {
        localStorage.removeItem("theme");
    } else {
        localStorage.theme = mode;
    }
}

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within Theme Provider");
    }
    return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setThemeState] = useState<ThemeMode>(() => getStoredTheme());

    const isDark =
        theme === "system" ? getSystemTheme() === "dark" : theme === "dark";

    useLayoutEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(isDark ? "dark" : "light");
        root.style.colorScheme = isDark ? "dark" : "light";
    }, [isDark]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = () => {
            if (theme === "system") {
                setThemeState("system");
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);

    const setTheme = (mode: ThemeMode) => {
        saveStoredTheme(mode);
        setThemeState(mode);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    );
};
