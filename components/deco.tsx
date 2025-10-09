"use client";
import Image from "next/image"
import { useRef, useEffect, useState } from "react";
import { forwardRef } from 'react';

export const Deco = () => {
    const imageRef = useRef<HTMLImageElement>(null);
    const imageRef2 = useRef<HTMLImageElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

     const images = [
        "/image/main.png",
        "/image/main2.png",
        "/image/main3.png",
        "/image/main4.png"
    ];
    
      useEffect(() => {
       console.log("init");
    }, []);

    return (
        <section className="flex justify-center">
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden z-10">
                <div className="circleAnimation transition-delay flex">
                    {/* 원본 */}
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div 
                            key={`original-${index}`}
                            className="w-52 h-52 rounded-full bg-blue-400/40 flex-shrink-0"
                        />
                    ))}
                    
                    {/* 복사본 (끊김 없는 무한 스크롤) */}
                    {/* {Array.from({ length: 12 }).map((_, index) => (
                      <div 
                            key={`copy-${index}`}
                            className="w-24 h-24 rounded-full bg-green-600 flex-shrink-0"
                        />
                    ))} */}
                </div>
            </div>
      </section>
    )
};