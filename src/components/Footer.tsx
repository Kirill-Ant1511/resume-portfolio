import LanguagePreset from "../config/language.config.json";
import { useLanguage } from "../hooks/useLanguage";

export function Footer() {
    const {language} = useLanguage();
    const footer = LanguagePreset[language].footer;
    return <footer>
        <p className="text-center text-white/70 m-10">{footer.text}</p>
    </footer>
}
