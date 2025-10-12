"use client";
import Image from "next/image";
import { forwardRef, useEffect, useRef, useState, useMemo } from "react";
import { Deco } from "./deco";

// 여러 ref를 안전하게 합치는 유틸
function setRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (value: T) => {
    refs.forEach((r) => {
      if (!r) return;
      if (typeof r === "function") r(value);
      else (r as React.MutableRefObject<T | null>).current = value;
    });
  };
}

type HeroProps = {
  className?: string;
};

export const Hero = forwardRef<HTMLElement, HeroProps>(function Hero(
  { className },
  ref
) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const images = useMemo(
    () => ["/image/main01.png", "/image/main02.png", "/image/main03.png", "/image/main04.png"],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    let rafId = 0;
    const getThreshold = () => el.clientHeight; // 뷰포트 높이 기준
    let lastScrollTop = -1;

    const onScroll = () => {
      const run = () => {
        const scrollTop = el.scrollTop;
        if (scrollTop === lastScrollTop) return; // 중복 계산 방지
        lastScrollTop = scrollTop;

        const threshold = Math.max(1, getThreshold());
        const idx = Math.min(Math.floor(scrollTop / threshold), images.length - 1);
        const progress = (scrollTop % threshold) / threshold;

        setCurrentIndex(idx);
        setScrollProgress(progress);
      };
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(run);
    };

    // 초기 1회 계산
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });

    // 레이아웃 변경(리사이즈) 대응
    const onResize = () => onScroll();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [images.length]);

  return (
    <section
      ref={setRefs(ref, sectionRef)}
      className={`relative bg-gradient-to-br from-[#EEAECA] via-[#C0B5DA] to-[#94BBE9] h-screen overflow-hidden ${className ?? ""}`}
    >
      <div className="absolute p-4 text-white font-extrabold text-3xl z-10 drop-shadow">
        <h3 className="text-sm">Product Engineer</h3>
        <h5>LEE</h5>
        <h1>HAJIN</h1>
      </div>

      <div ref={scrollContainerRef} className="w-full h-full overflow-y-scroll">
        <div className="relative h-[400vh]">
          <div className="sticky top-0 w-full h-screen flex items-center justify-center">
            {images.map((src, index) => {
              const isActive = index === currentIndex; const isPrev = index === currentIndex - 1; 
              const scale = isActive ? 1 + scrollProgress * 0.1 : 1; 
              const prevScale = isPrev ? 1 - scrollProgress * 0.1 : 1;

              return (
                <div
                  key={src}
                  className={`absolute inset-0 flex items-center justify-center will-change-transform ${isActive ? 'opacity-100' : 'opacity-0'} `}
                  style={{ transform: `scale(${isActive ? scale : isPrev ? prevScale : 1})`, transition: 'transform 0.3s ease-out' }}
                >
                  <Image
                    src={src}
                    alt={`포트폴리오 메인 이미지 ${index + 1}`}
                    fill
                    // 반응형 사이즈 (데스크톱에서 최대 1200px로 렌더)
                    sizes="(min-width: 1280px) 1200px, 100vw"
                    priority={index === 0}
                    className="object-contain"
                  />
                </div>
              );
            })}
          </div>

          {/* 장식 요소 */}
          <Deco />
        </div>
      </div>
    </section>
  );
});
