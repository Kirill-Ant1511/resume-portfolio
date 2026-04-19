
import { useState, type ReactNode } from "react";
import { LanguageContext } from "./LanguageContext";





export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<"ru" | "en">("ru");

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "ru" ? "en" : "ru"));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}