"use client";
import { useRef } from "react";
import { useRevealOnEnter } from "@/lib/hooks/useRevealOnEnter";

const workData = [
    {
        id:0,
        title:"AI 챗봇 라미챗 QR코드 공유기능",
        desc:"afadsfdasfsadfdsa"
    },

    {
        id:1,
        title:"AI 챗봇 라미챗 대시보드 개발",
        desc:"afadsfdasfsadfdsa"
    },

    {
        id:2,
        title:"AI 챗봇 라미 테마 기능 개발",
        desc:"afadsfdasfsadfdsa"
    },
    
    {
        id:3,
        title:"AI 이미지 생성 컴포넌트 개발",
        desc:"afadsfdasfsadfdsa"
    }

]


type WorksProps = {
  scrollRootRef?: React.RefObject<HTMLElement | null>; // 외부 스크롤러
};


export const Works = ({ scrollRootRef }: WorksProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // 외부 스크롤 컨테이너가 있다면 root로 지정, 없으면 viewport
  const isActive = useRevealOnEnter(sectionRef, {
    root: scrollRootRef?.current ?? null,
    threshold: 0.25, // 25% 노출 시 시작 (원하는 값으로 조정)
  });

  const introTransform = `translate(-300px, -700px) rotate(-30deg)`;

  return (
    <section
      ref={sectionRef}
      id="section-1"
      className="relative z-10 min-h-screen bg-gradient-to-br from-[#EEAECA] via-[#C0B5DA] to-[#94BBE9]"
    >
      <div className="p-8">
        <h2 className="lg:text-3xl text-xl text-white font-extrabold">WORKS</h2>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 p-8">
        {workData.map((work, i) => (
          <div
            key={work.id}
            className="bg-pink-300/50 w-full h-72 rounded-md p-4 mt-8 text-white font-medium
                       transition-all duration-700 will-change-transform"
            style={{
              visibility: isActive ? "visible" : "hidden",
              opacity: isActive ? 1 : 0,
              transform: isActive ? "none" : introTransform,
              transitionDelay: `${i * 100}ms`,
            }}
          >
            <div className="text-lg font-bold">{work.title}</div>
            <div className="mt-2 text-sm">{work.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

