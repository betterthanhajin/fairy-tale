"use client";
import Image from "next/image"
import { useRef, useEffect, useState } from "react";
import { forwardRef } from 'react';
import { Deco } from "./deco";

export const Hero = forwardRef<HTMLElement>((props, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    const images = [
        "/image/main-image.png",
        "/image/main02.png"
    ];
    
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            
            // 100px 스크롤마다 이미지 전환
            const scrollThreshold = 150;
            const newIndex = Math.min(
                Math.floor(scrollTop / scrollThreshold)
            );
            console.log("news", scrollTop ,newIndex);
            setCurrentIndex(newIndex);
        };

        // 초기 실행
        handleScroll();
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // images.length를 dependency에 추가

    return (
        <section ref={ref || sectionRef} className={`relative bg-gradient-to-br ${currentIndex === 0 ? 'from-[#EEAECA] via-[#C0B5DA] to-[#94BBE9]' : ''}  min-h-screen`}>
            <div className="absolute p-4 text-white font-extrabold text-3xl z-10">
                <h3 className="text-sm">Product Engineer</h3>
                <h5>LEE</h5>
                <h1>HAJIN</h1>
            </div>
            <div className="w-full relative min-h-screen flex items-center justify-center">
                <>
                {images.map((src, index) => (
                    
                        <Image
                            key={src}
                            className={`dark:invert w-full transition-opacity duration-500 ${
                                index === 0 ? '' : 'absolute top-0 left-0'
                            } ${
                                index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                            src={src}
                            alt={`main-${index + 1}`}
                            width={1000}
                            height={400}
                            priority={index === 0}
                        />
                   
                ))}
                {currentIndex !== 0 && (
                    <Deco/>
                )}
                </>
            </div>
        </section>
    )
});