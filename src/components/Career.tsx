import { useEffect, useRef } from "react";
import LanguagePreset from "../config/language.config.json";
import { useLanguage } from "../hooks/useLanguage";
export function Career() {
    const {language} = useLanguage();
    const stageRef = useRef<HTMLDivElement>(null);
    const career = LanguagePreset[language].career;
    useEffect(() => {
        console.log(stageRef.current);
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("viewing");
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.3});

        if (stageRef.current) {
            for (let i = 0; i < stageRef.current.children.length; i++) {
                observer.observe(stageRef.current.children[i]);
            }
        }

    }, [])
    return <div className="flex w-full justify-center items-center">
        <div className="p-20 max-lg:p-5 max-w-7xl">
        <h1 className="text-5xl text-center uppercase text-gradient-brand mb-10">Career</h1>
        <div className="grid grid-cols-[0.1fr_2fr] max-lg:grid-cols-1" ref={stageRef}>
            {career.map((item, index) => (
                <>
                    <div className="flex flex-col items-center -gap-5 max-lg:hidden">
                        <div className="w-1 h-50 bg-blue-500"/>
                        <div className="w-4 h-4 rounded-full bg-blue-500"/>
                        <div className="w-1 h-50 bg-blue-500"/>
                    </div>
                    <div key={index} className="p-5 rounded-3xl bg-black mb-4 stage">
                        <div className="mb-2">
                            <h2 className="text-xl font-bold">{item.position} at {item.company}</h2>
                            <p className="text-white/50">{item.duration}</p>
                        </div>
                        <p className="whitespace-pre-wrap">{item.description}</p>
                    </div>
                </>
            ))}
            <div className="flex flex-col items-center -gap-5 max-lg:hidden">
                <div className="w-1 h-5 bg-blue-500"/>
                <div className="w-4 h-4 rounded-full bg-blue-500 mb-7"/>
                
            </div>
            <div className="p-5 rounded-3xl bg-black self-end">
                <h2 className="text-xl font-bold">Ваша команда/компания может стать частью моей карьеры</h2>
            </div>
        </div>
    </div>
    </div>
}
