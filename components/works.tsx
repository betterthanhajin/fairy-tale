"use client";
import { useEffect, useRef } from "react";
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
        desc:"로컬에서 LLM을 설정하여 엑셀 파일로 들어오는 정보의 특정부분을 마스킹하는 시스템을 개발하였습니다.",
        bgColor:"#a8cdab"
    },

    {
        id:5,
        title:"CGV 나이 인식 서비스 개발",
        desc:"AI를 활용하여 웹캠으로 인식된 사용자의 얼굴 사진 정보를 분석하여 나이를 추정하는 웹 서비스를 개발하였는데 카메라 권한 문제가 있었지만 여러가지 문서를 찾아서 해결했습니다.",
        bgColor:"#d187e2ff"
    },

    {
        id:6,
        title:"라미 비지니스 웹사이트 개발",
        desc:"회사의 전반적인 기술과 사업을 소개하는 웹 사이트 개발하였습니다.",
        bgColor:"#52b3e7ff"
    },
    
    {
        id:7,
        title:"온디바이스AI 라미앱 개발",
        desc:"여러 AI 모델과 대화할수 있는 인터넷이 없는 환경에서도 사용할수 있는 앱의 개발에 참여했습니다.",
        bgColor:"#e8b547ff"
    }
]

const bgColorArr = [
  
    "#149154ff", "#9932beff", "#2290c3ff","#efa020ff"
  
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

  useEffect(() => {
    // 스크롤러 결정: 외부 스크롤 컨테이너가 있으면 그쪽, 없으면 window
    const scroller: Window | HTMLElement =
      (scrollRootRef?.current as HTMLElement | null) ?? window;

    const pageNumRef = { current: 0 }; // 리렌더와 무관하게 저장하고 싶다면 useRef로 바꾸세요.

    const getScrollTop = () =>
      scroller === window
        ? window.scrollY
        : (scroller as HTMLElement).scrollTop;

    const getViewportH = () =>
      scroller === window
        ? window.innerHeight
        : (scroller as HTMLElement).clientHeight;

    // 스크롤러 기준 offsetTop 계산
    const getOffsetTop = (el: HTMLElement) => {
      if (scroller === window) {
        const r = el.getBoundingClientRect();
        return r.top + (window.scrollY ?? 0);
      }
      const rEl = el.getBoundingClientRect();
      const rSc = (scroller as HTMLElement).getBoundingClientRect();
      return rEl.top - rSc.top + (scroller as HTMLElement).scrollTop;
    };

    const pageChangeFunc = (idx: number) => {
      const color = bgColorArr[idx % bgColorArr.length];
      document.body.style.background = color;
    };

    const onScrollEvent = () => {
      const workSection = Array.from(
        document.querySelectorAll<HTMLElement>('[id^="work-"]') // ✅ 수정된 selector
      );

      const scroll = getScrollTop();
      const vh = getViewportH();

      for (let i = 0; i < workSection.length; i++) {
        const top = getOffsetTop(workSection[i]);
        const h = workSection[i].offsetHeight;

        // 뷰포트(or 스크롤러) 상단에서 1/3 지점 기준 진입 판정
        const start = top - vh / 3;
        const end = start + h;

        if (scroll > start && scroll < end) {
          if (pageNumRef.current !== i) {
            pageNumRef.current = i;
            pageChangeFunc(i);
          }
          break;
        }
      }
    };

    // 이벤트 등록 (window와 element 모두 대응)
    const add = (target: any) =>
      target.addEventListener('scroll', onScrollEvent, { passive: true });
    const remove = (target: any) =>
      target.removeEventListener('scroll', onScrollEvent);

    add(scroller);
    onScrollEvent(); // 최초 1회 반영

    return () => remove(scroller);
  }, [scrollRootRef?.current]);


  return (
    <section
      ref={sectionRef}
      id="section-1"
      className="relative z-10 min-h-screen"
    >
      {/* <div className="p-8">
        <h2 className="lg:text-3xl text-xl text-white font-extrabold">WORKS</h2>
      </div> */}

      {/* <div className="flex flex-col lg:flex-row justify-center items-center gap-8 p-8">
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
      </div> */}
       <div className="min-h-screen absolute top-0 left-[50%] flex flex-col justify-center items-center overflow-y-scroll  scrollbar-none"
       style={{transform:"translateX(-50%);"}}
       >
        {workData2.map((work, i) => (
          <div
            key={work.id}
            id={`work-${work.id}`}
            className={`w-[500px] h-[600px] p-4 text-white font-medium
                       transition-all duration-700 will-change-transform`}
            style={{
              backgroundColor:`${work.bgColor}`,
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

