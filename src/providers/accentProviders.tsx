import { tempAccent, type LCH } from "@/utils/colors";
import { createContext, useContext, type ReactNode } from "react";

type AccentContextType = {
    accentColor: LCH;
};

const AccentContext = createContext<AccentContextType | undefined>(undefined);

export const AccentProvider = ({ children }: { children: ReactNode }) => {
    const accentColor = tempAccent;
    return (
        <AccentContext.Provider value={{ accentColor }}>
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
