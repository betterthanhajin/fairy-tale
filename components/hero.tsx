"use client";
import Image from "next/image";
import { forwardRef, useEffect, useRef, useState, useMemo } from "react";

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
    () => [
       { src: "/image/main01.png", title:`안녕하세요`, desc:"개발에 참여하는 모든" }, 
       { src: "/image/main02.png", title:"사람들의 입장에서" , desc:"공감하고" }, 
       { src: "/image/main03.png", title:"항상 팀원들과", desc:"회사를 위하고자하는" }, 
       { src: "/image/main04.png", title:"개발 5년차 엔지니어" , desc:"이하진입니다." }
    ],
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
      id="section-0"
      className={`relative bg-gradient-to-br from-[#EEAECA] via-[#C0B5DA] to-[#94BBE9] h-screen ${className ?? ""}`}
    >
      <div className="absolute p-4 text-white font-extrabold text-3xl z-10 drop-shadow">
        <h3 className="text-sm">Product Engineer</h3>
        <h5>LEE</h5>
        <h1>HAJIN</h1>
      </div>

      <div ref={scrollContainerRef} className="w-full h-full overflow-y-scroll overflow-x-hidden scrollbar-none">
        <div className="relative h-[400vh]">
          <div className="sticky top-0 w-full h-screen flex items-center justify-center">
            {images.map((image, index) => {
              const isActive = index === currentIndex; const isPrev = index === currentIndex - 1; 
              const scale = isActive ? 1 + scrollProgress * 0.1 : 1; 
              const prevScale = isPrev ? 1 - scrollProgress * 0.1 : 1;

              return (
                <div key={image.src}>
                <div className={`p-1 absolute top-[20%] left-[30%] z-10 bg-gradient-to-br from-[#EEAECA] via-[#C0B5DA] to-[#94BBE9] shadow-md rounded-md will-change-transform ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-gray-600 font-extrabold lg:text-4xl text-xl">{image.title}<br/>{image.desc}</h2>
                </div>
                <div
                  key={image.src}
                  className={`absolute inset-0 flex items-center justify-center will-change-transform ${isActive ? 'opacity-100' : 'opacity-0'} `}
                  style={{ transform: `scale(${isActive ? scale : isPrev ? prevScale : 1})`, transition: 'transform 0.3s ease-out' }}
                >
                  <Image
                    src={image.src}
                    alt={`포트폴리오 메인 이미지 ${index + 1}`}
                    fill
                    // 반응형 사이즈 (데스크톱에서 최대 1200px로 렌더)
                    sizes="(min-width: 1280px) 1200px, 100vw"
                    priority={index === 0}
                    className="object-contain"
                  />
                </div>
                 </div>
              );
            })}
          </div>

          {/* 장식 요소 */}
          {/* <Deco /> */}
        </div>
      </div>
    </section>
   
  );
});
