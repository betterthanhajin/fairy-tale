"use client";
import Image from "next/image"
import { useRef, useEffect, useState } from "react";
import { forwardRef } from 'react';

export const Hero = forwardRef<HTMLElement>((props, ref) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const imageRef2 = useRef<HTMLImageElement>(null);
    const [imageIndex, setImageIndex] = useState(0);
    
    useEffect(() => {
        const handleScroll = () => {
            if (imageRef.current) {
                imageRef.current.style.opacity = "0"
            }

            if(imageRef2.current) {
                imageRef2.current.style.opacity = "1"
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [imageRef.current]);

    return (
        <section ref={ref} className="relative">
            <div className="absolute p-4 text-white font-extrabold text-3xl z-10">
                <h3 className="text-sm">Product Engineer</h3>
                <h5>LEE</h5>
                <h1>HAJIN</h1>
            </div>
            <div className="w-full relative flex">
                <Image
                    ref={imageRef}
                    className="dark:invert w-full"
                    src="/image/main.png" 
                    alt="main"
                    width={1900}
                    height={700}
                    priority
                />
                <Image
                    ref={imageRef2}
                    className="dark:invert w-full absolute top-0 left-0 opacity-0"
                    src="/image/main2.png"
                    alt="main"
                    width={1900}
                    height={700}
                    priority
                />
            </div>
      </section>
    )
});