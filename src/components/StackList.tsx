import { useEffect, useRef } from "react";
import LanguagePreset from "../config/language.config.json";

type StackItem = {
    name: string;
    icon: string;
};


export function StackList() {
    const stack: StackItem[] = LanguagePreset.stack;
    const containerRef = useRef<HTMLDivElement>(null);
    const segmentRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const AUTO_SCROLL_SPEED = 70;

    useEffect(() => {
        const container = containerRef.current;
        const segment = segmentRef.current;
        const track = trackRef.current;
        if (!container || !segment || !track) return;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("viewing");
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.5});


        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        const segmentWidth = segment.scrollWidth;
        if (segmentWidth === 0) return;

        let offset = -segmentWidth;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let rafId = 0;
        let lastFrameTime = performance.now();

        const applyTransform = () => {
            track.style.transform = `translate3d(${offset}px, 0, 0)`;
        };

        applyTransform();

        const animate = (now: number) => {
            const delta = now - lastFrameTime;
            lastFrameTime = now;

            if (!prefersReducedMotion) {
                offset -= (AUTO_SCROLL_SPEED * delta) / 1000;

                if (offset <= -segmentWidth * 2) {
                    offset += segmentWidth;
                }

                applyTransform();
            }

            rafId = window.requestAnimationFrame(animate);
        };

        if (!prefersReducedMotion) {
            rafId = window.requestAnimationFrame(animate);
        }

        return () => {
            if (rafId) {
                window.cancelAnimationFrame(rafId);
            }
        };
    }, []);

    const renderSegment = (copyIndex: number, withRef = false) => (
        <div
            ref={withRef ? segmentRef : null}
            className="flex gap-20 max-lg:gap-5 shrink-0"
            aria-hidden={copyIndex !== 1}
        >
            {stack.map((item, index) => (
                <div
                    key={`${copyIndex}-${item.name}-${index}`}
                    className="text-md text-white/70 flex items-center gap-4 py-3 px-7 font-bold rounded-full bg-black/20 max-lg:gap-2 max-lg:px-4 max-lg:py-2 max-lg:text-sm"
                >
                    <img src={item.icon} alt={item.name} className="w-12 h-12 max-lg:w-8 max-lg:h-8" />
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    );

    return (
        <>
        <h1 className="text-4xl text-center uppercase text-gradient-brand mb-10">Stack</h1>
        <div ref={containerRef} className="overflow-hidden stack__list">
            <div ref={trackRef} className="flex gap-20 w-max max-lg:gap-5 will-change-transform">
                {renderSegment(0)}
                {renderSegment(1, true)}
                {renderSegment(2)}
            </div>
        </div>
        </>
    );
}
