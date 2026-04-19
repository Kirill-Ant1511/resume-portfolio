import { useLanguage } from "../hooks/useLanguage";

export function ToggleLanguageButton() {
    const {language, toggleLanguage} = useLanguage();
    return <button onClick={toggleLanguage} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded fixed right-4 bottom-4">
            {language === "ru" ? "EN" : "РУ"}
        </button>
}
