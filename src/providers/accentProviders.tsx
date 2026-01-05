import { defaultAccent, type LCH } from "@/utils/colors";
import {
    createContext,
    useContext,
    useLayoutEffect,
    useState,
    type ReactNode,
} from "react";

type AccentContextType = {
    accentColor: LCH;
    setAccentColor: React.Dispatch<React.SetStateAction<LCH>>;
};

const AccentContext = createContext<AccentContextType | undefined>(undefined);

export const AccentProvider = ({ children }: { children: ReactNode }) => {
    const [accentColor, setAccentColor] = useState<LCH>(defaultAccent);

    useLayoutEffect(() => {
        const { l, c, h } = accentColor;
        document.documentElement.style.setProperty(
            "--color-accent",
            `oklch(${l} ${c} ${h})`
        );
    }, [accentColor]);

    return (
        <AccentContext.Provider value={{ accentColor, setAccentColor }}>
            {children}
        </AccentContext.Provider>
    );
};

export function useAccentContext() {
    const context = useContext(AccentContext);
    if (!context) {
        throw new Error("useAccentContext must be used within Theme Provider");
    }
    return context;
}
