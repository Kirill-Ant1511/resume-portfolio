import { createContext } from "react";

export interface LanguageContextType {
    language: "ru" | "en";
    toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextType>({} as LanguageContextType);
