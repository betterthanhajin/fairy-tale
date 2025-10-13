"use client";
import { useRef } from "react";
import { useRevealOnEnter } from "@/lib/hooks/useRevealOnEnter";

const workData = [
    {
        id:0,
        title:"AI 챗봇 라미챗 QR코드 공유기능",
        desc:"챗봇이 어디서든 편하게 사용될수 있으면 좋겠다 싶어서 제가 기획부터 개발까지 담당해서 진행하게 되었습니다."
    },

    {
        id:1,
        title:"AI 챗봇 라미챗 대시보드 개발",
        desc:"AI 챗봇을 사용하는 유저를 위한 대시보드 페이지 기능들을 개발했습니다. 챗봇의 새소식란을 작업할때 에디터 라이브러리를 붙이는 과정에서 문제가 있었는데 랜더링 시점을 이해하면 되는 문제였습니다."
    },

    {
        id:2,
        title:"AI 챗봇 라미 테마 기능 개발",
        desc:"유저가 챗봇에 아이콘을 적용할수 있고 여러가지 테마를 가진 애니메이션 테마를 작업하였고 여러가지 폰트도 적용할 수 있게 구글폰트를 적용시켰습니다."
    },
    
    {
        id:3,
        title:"AI 이미지 생성 컴포넌트 개발",
        desc:"Stable Diffusion API 연동으로 AI 이미지 생성 시스템 구축하였습니다."
    },
]


const workData2 = [
    {
        id:4,
        title:"CGV AI 마스킹 시스템",
        desc:"로컬에서 LLM을 설정하여 엑셀 파일로 들어오는 정보의 특정부분을 마스킹하는 시스템을 개발하였습니다."
    },

    {
        id:5,
        title:"CGV 나이 인식 서비스 개발",
        desc:"AI를 활용하여 웹캠으로 인식된 사용자의 얼굴 사진 정보를 분석하여 나이를 추정하는 웹 서비스를 개발하였는데 카메라 권한 문제가 있었지만 여러가지 문서를 찾아서 해결했습니다."
    },

    {
        id:6,
        title:"라미 비지니스 웹사이트 개발",
        desc:"회사의 전반적인 기술과 사업을 소개하는 웹 사이트 개발하였습니다."
    },
    
    {
        id:7,
        title:"온디바이스AI 라미앱 개발",
        desc:"여러 AI 모델과 대화할수 있는 인터넷이 없는 환경에서도 사용할수 있는 앱의 개발에 참여했습니다."
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
            className="bg-white/50 text-black w-full h-72 rounded-md p-4 mt-8 font-medium
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
       <div className="flex flex-col lg:flex-row justify-center items-center gap-8 p-8">
        {workData2.map((work, i) => (
          <div
            key={work.id}
            className="bg-pink-400/80 w-full h-72 rounded-md p-4 mt-2 text-white font-medium
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

