"use client";
import { useEffect, useRef } from "react";
import { useRevealOnEnter } from "@/lib/hooks/useRevealOnEnter";
import Image from "next/image";


const workData2 = [

    {
        id:1,
        title:"엔지니어 이하진",
        desc:"'코드 한 줄이 사용자의 하루를 바꿀 수 있다'고 믿는 개발자 이하진입니다. 복잡한 문제를 심플하게 해결하는 것을 좋아하며, 5초 걸리던 로딩을 1.5초로 줄이는 것에서 큰 성취감을 느낍니다. 사용자가 '어? 이거 편하네'라고 느끼는 순간을 만들기 위해 고민합니다. 팀과 함께 성장하는 것을 중요하게 생각하며, 팀 전체의 생산성을 높이기 위해 노력합니다. 새로운 기술을 두려워하지 않고, 여러 기술을 넘나들며 최적의 솔루션을 찾아갑니다.",
        bgColor:"#C0B5DA",
        imageUrl:"/image/works/me.png"
    },


]

const bgColorArr = [
  
    "#149154ff", "#9932beff", "#2290c3ff","#efa020ff"
  
]

type WorksProps = {
  scrollRootRef?: React.RefObject<HTMLElement | null>; // 외부 스크롤러
};


export const About = ({ scrollRootRef }: WorksProps) => {
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
      id="section-2"
      className="relative z-10 p-12 bg-gradient-to-br from-[#EEAECA] via-[#C0B5DA] to-[#94BBE9]"
    >
       <h1 className="text-white text-3xl font-extrabold mb-3">ABOUT ME</h1>
       <div className="flex lg:flex-row flex-col justify-start"
       >
        {workData2.map((work, i) => (
          <div
            key={work.id}
            id={`work-${work.id}`}
            className={`p-4 text-white font-medium w-full h-full
                       transition-all duration-700 will-change-transform shadow-md`}
            style={{
              backgroundColor:``,
              visibility: isActive ? "visible" : "hidden",
              opacity: isActive ? 1 : 0,
              transform: isActive ? "none" : introTransform,
              transitionDelay: `${i * 100}ms`,
            }}
          >
            <div className="text-lg font-bold">{work.title}</div>
            {work.desc.split(",").map((desc,i) => (
            <div key={desc} className="mt-2 text-sm">{desc}</div>
            ))}
            <div className="mt-8">
                <Image style={{
                }} src={work.imageUrl || ""} alt="상세이미지" width={500} height={200}></Image>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

