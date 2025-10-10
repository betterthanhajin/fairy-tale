"use client";
import Image from "next/image"
import { useRef, useEffect, useState } from "react";
import { forwardRef } from 'react';
import { Deco } from "./deco";

export const Hero = forwardRef<HTMLElement>((props, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const images = [
        "/image/main01.png",
        "/image/main02.png",
        "/image/main03.png",
        "/image/main04.png"
    ];
    
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        const handleScroll = () => {
            const scrollTop = scrollContainer.scrollTop;
            const scrollThreshold = 800;
            
            const newIndex = Math.min(
                Math.floor(scrollTop / scrollThreshold),
                images.length - 1
            );
            
            // 현재 섹션 내에서의 스크롤 진행도 (0~1)
            const progress = (scrollTop % scrollThreshold) / scrollThreshold;
            
            console.log("scroll", scrollTop, newIndex, progress);
            setCurrentIndex(newIndex);
            setScrollProgress(progress);
        };

        handleScroll();
        
        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            scrollContainer.removeEventListener('scroll', handleScroll);
        };
    }, [images.length]);

    return (
        <section ref={ref || sectionRef} className="relative bg-gradient-to-br from-[#EEAECA] via-[#C0B5DA] to-[#94BBE9] h-screen overflow-hidden">
            <div className="absolute p-4 text-white font-extrabold text-3xl z-10">
                <h3 className="text-sm">Product Engineer</h3>
                <h5>LEE</h5>
                <h1>HAJIN</h1>
            </div>
            <div 
                ref={scrollContainerRef}
                className="w-full h-full overflow-y-scroll"
            >
                <div className="relative h-[400vh]">
                    <div className="sticky top-0 w-full h-screen flex items-center justify-center">
                        {images.map((src, index) => {
                            const isActive = index === currentIndex;
                            const isPrev = index === currentIndex - 1;
                            
                            // 현재 이미지: 스케일 업 효과
                            const scale = isActive ? 1 + scrollProgress * 0.1 : 1;
                            // 이전 이미지: 페이드아웃하면서 스케일 다운
                            const prevScale = isPrev ? 1 - scrollProgress * 0.1 : 1;
                            
                            return (
                                <Image
                                    key={src}
                                    className={`dark:invert w-[1500px] h-[900px] absolute transition-opacity duration-500 
                                    ${isActive ? 'opacity-100' : 'opacity-0'}`}
                                    style={{
                                        transform: `scale(${isActive ? scale : isPrev ? prevScale : 1})`,
                                        transition: 'transform 0.3s ease-out'
                                    }}
                                    src={src}
                                    alt={`main-${index + 1}`}
                                    width={800}
                                    height={800}
                                    priority={index === 0}
                                />
                            );
                        })}
                    </div>
                    <Deco/>
                </div>
            </div>
        </section>
    )
});

Hero.displayName = 'Hero';