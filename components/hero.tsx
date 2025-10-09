"use client";
import Image from "next/image"
import { useRef, useEffect, useState } from "react";
import { forwardRef } from 'react';

export const Hero = forwardRef<HTMLElement>((props, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

     const images = [
        "/image/main.png",
        "/image/main2.png",
    ];
    
      useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const scrollTop = window.scrollY;
                const sectionHeight = sectionRef.current.offsetHeight;
                
                // 스크롤 위치에 따라 이미지 인덱스 계산
                const scrollPercentage = scrollTop / (sectionHeight * images.length);
                const newIndex = Math.min(
                    Math.floor(scrollPercentage * images.length),
                    images.length - 1
                );
                
                setCurrentIndex(newIndex);
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section ref={ref || sectionRef} className="relative">
            <div className="absolute p-4 text-white font-extrabold text-3xl z-10">
                <h3 className="text-sm">Product Engineer</h3>
                <h5>LEE</h5>
                <h1>HAJIN</h1>
            </div>
             <div className="w-full relative">
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
                        width={1900}
                        height={600}
                        priority={index === 0}
                    />
                ))}
            </div>
      </section>
    )
});