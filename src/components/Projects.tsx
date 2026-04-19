import { useEffect, useRef } from "react";
import LanguagePreset from "../config/language.config.json";
import { useLanguage } from "../hooks/useLanguage";

export function Projects() {
    const {language} = useLanguage();
    const projectsRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("viewing");
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.3});

        if (projectsRef.current) {
            for (let i = 0; i < projectsRef.current.children.length; i++) {
                observer.observe(projectsRef.current.children[i]);
            }
        }
    })
    const projects = LanguagePreset[language].projects;
    return <div className="flex w-full justify-center items-center">
        <div className="max-w-6xl">
        <h1 className="text-5xl text-center uppercase text-gradient-brand">Projects</h1>
        <div className="grid grid-cols-1 gap-10 p-10 max-lg:p-5" ref={projectsRef}>
            {projects.map((item) => (
                <div key={item.name} className="p-5 rounded-3xl bg-black project">
                    <div className="mb-2 flex items-center gap-2">
                        <h2 className="text-xl font-bold">{item.name}</h2>
                        {item.github && <a href={item.github} target="_blank" rel="noopener noreferrer" className="text-blue-500">GitHub</a>}
                    </div>
                    <p className="text-white/70 mb-2">Stack: {item.stack.join(", ")}</p>
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
    </div>
    </div>
}
