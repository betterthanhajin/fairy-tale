"use client";
import { useEffect, useRef } from "react";
import { useRevealOnEnter } from "@/lib/hooks/useRevealOnEnter";
import Image from "next/image";

const workData2 = [
    {
        id:4,
        title:"01. AI 챗봇",
        desc:"기존 URL 공유 방식 대비 QR코드 스캔으로 접근 장벽 제거하여 사용 편의성 개선, 인스타그램/카카오톡 SNS api와 연동하여 챗봇의 편의성을 높임,챗봇의 폰트/애니메이션테마/아이콘을 적용할수 있게 커스텀 기능 강화,에디터 라이브러리를 적용하여 유저와 챗봇의 상호작용을 강화",
        bgColor:"#9ddbf8ff",
        imageUrl:"/image/works/image.png"
    },

    {
        id:5,
        title:"02. 개인정보 탐지·마스킹 시스템",
        desc:"대용량 Excel 내 개인정보를 자동 탐지 마스킹해야 하며 외부 반출을 최소화, 헤더 식별 및 검증 | 선택 열 기반 마스킹 | 엑셀 재생성까지 파이프라인 구축, 수작업 대비 반복 업무 자동화, 마스킹 결과의 일관성을 확보, 대용량 파일에서도 안정 동작",
        bgColor:"#f9dcffff",
         imageUrl:"/image/works/masking.png"
    },

    {
        id:6,
        title:"03. 투자관리 사내 업무 관리 시스템 개발",
        desc:"사용자 1000명 규모의 CJ 투자관리 시스템 프론트엔드 개발, 20개 UI 컴포넌트 공통화로 개발 효율성 40% 향상, 페이지 로딩속도 5초에서 1.5초로 최적화, 동적 탭 네비게이션 개발로 사용자 편의성 60% 개선",
        bgColor:"#d1ebf9ff",
        imageUrl:"/image/works/image.webp"
    },
    
    {
        id:7,
        title:"04. CGV Her 프로젝트",
        desc:"영화 'Her' 이벤트를 위해 개발된 사용자와 음성 대화를 나누는 웹 애플리케이션, 프로젝트 전체 아키텍처 설계 및 핵심 기능 구현을 담당, 실시간 음성 스트리밍 구현, iOS Safari 호환성 구현, 대화 컨텍스트 시스템(장기 기억) 구현",
        bgColor:"#fff1d3ff",
        imageUrl:"/image/works/her.png"
    }
]

const bgColorArr = [
  
  ["#2ab1efff","#fa9b4eff"],
  ["#d362ecff","#47e0e8ff"],
  ["#e67060ff","#8651e9ff"]
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
      const [c1, c2] = bgColorArr[idx % bgColorArr.length];
      document.body.style.background = `linear-gradient(120deg,${c1}, ${c2})`;
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
    const add = (target: Window | HTMLElement) =>
      target.addEventListener('scroll', onScrollEvent, { passive: true });
    const remove = (target: Window | HTMLElement) =>
      target.removeEventListener('scroll', onScrollEvent);

    add(scroller);
    onScrollEvent(); // 최초 1회 반영

    return () => remove(scroller);
  }, [scrollRootRef?.current]);


  return (
    <section
      ref={sectionRef}
      id="section-1"
      className="relative z-10 lg:h-[2400px] h-[1800px]"
    >
       <div className="absolute top-0 left-[50%] flex flex-col justify-center"
       style={{transform:"translateX(-50%);"}}
       >
        <h2 className="text-white text-4xl font-extrabold">WORKS</h2>
        {workData2.map((work, i) => (
       
          <div
            key={work.id}
            id={`work-${work.id}`}
            className={`lg:w-[500px] lg:h-[600px] w-[300px] h-[400px] p-4 text-white font-bold shadow-sm rounded-lg mt-3
                       transition-all duration-700 will-change-transform`}
            style={{
              backgroundColor:``,
              visibility: isActive ? "visible" : "hidden",
              opacity: isActive ? 1 : 0,
              transform: isActive ? "none" : introTransform,
              transitionDelay: `${i * 100}ms`,
            }}
          >
            
            <div className="lg:text-lg text-md font-bold">{work.title}</div>
            {work.desc.split(",").map((desc,i) => (
            <div key={desc} className="mt-2 lg:text-sm text-xs">{desc}</div>
            ))}
            <div className="lg:mt-12 mt-2">
              <Image className="lg:block hidden" src={work.imageUrl || ""} alt="상세이미지" width={450} height={400}></Image>
              <Image className="block lg:hidden" src={work.imageUrl || ""} alt="상세이미지" width={300} height={200}></Image>
            </div>
          </div>
       
        ))}
      </div>
    </section>
  );
};

