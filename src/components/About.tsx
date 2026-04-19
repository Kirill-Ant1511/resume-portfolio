
import { useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import LanguagePreset from "../config/language.config.json";
import { useLanguage } from "../hooks/useLanguage";
import "../index.css";
export function About() {
    const {language} = useLanguage();
    const imgRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const currentLanguage = (language === "ru" || language === "en") ? language : "en";
    const about = LanguagePreset[currentLanguage].about;
    const posts = LanguagePreset.posts;


    useEffect(() => {
        const observerImg = new IntersectionObserver((entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("viewing");
                    observerImg.unobserve(entry.target);
                }
            });
        }), {threshold: 0.5});

        const observerContainer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observerContainer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.5});

        const observerAbout = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observerAbout.unobserve(entry.target);
                }
            });
        }, {threshold: 0.2});

        if (imgRef.current) {
            observerImg.observe(imgRef.current);
        }
        if (containerRef.current) {
            observerContainer.observe(containerRef.current);
        }

        if (aboutRef.current) {
            observerAbout.observe(aboutRef.current);
        }

        return () => {
            if (imgRef.current) {
                observerImg.unobserve(imgRef.current);
            }
            if (containerRef.current) {
                observerContainer.unobserve(containerRef.current);
            }
            if (aboutRef.current) {
                observerAbout.unobserve(aboutRef.current);
            }
        };
    }, [])
    return <div className="flex w-full justify-center items-center">
        <div className="grid grid-cols-[2fr_2fr] p-20 max-lg:grid-cols-1 max-lg:gap-10 max-md:p-5 max-w-7xl">
            <div className="profile__photo" ref={containerRef}>
                <img src="/portfolio_image.jpg" alt="Profile" className="w-100 h-120 object-cover profile__img" ref={imgRef} />
            </div>
            <div className="flex flex-col items-start pt-10 about__text" ref={aboutRef}>
                <h1 className="max-lg:text-xl text-3xl font-bold mt-4">
                    <p>{about.surname.toUpperCase()} {about.name.toUpperCase()}</p>
                    <p>{about.patronymic.toUpperCase()}</p>
                </h1>
                <div className="flex gap-5 max-lg:flex-col max-lg:items-start max-lg:gap-0">
                    <p>📧 kirilldevelop1511@mail.ru</p>
                    <p>💬 Telegram: @Palma1511</p>
                    <a href="https://github.com/Kirill-Ant1511" className="hover:text-blue-500 transition-colors">
                        🐙GitHub
                    </a>
                </div>
                <div className="mb-5">
                    <p className="text-white/70">🎓{about.university} - {about.degree}</p>
                    <TypeAnimation 
                        sequence={[
                            ...posts.map(post => [post, 1500]).flat(),
                        ]}
                        speed={1}
                        repeat={Infinity}
                        className="text-gradient-brand"
                    />
                    <span>Developer</span>
                </div>
                
                <p className="text-xl max-lg:text-[18px]">{about.description}</p>
            </div>
        </div>
    </div>
}
