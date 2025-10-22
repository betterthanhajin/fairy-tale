"use client";
import { useEffect, useRef, useState } from "react";
import { useRevealOnEnter } from "@/lib/hooks/useRevealOnEnter";
import Image from "next/image";

const workData2 = [
  {
    id: 4,
    title: "01. AI 챗봇",
    desc: "기존 URL 공유 방식 대비 QR코드 스캔으로 접근 장벽 제거하여 사용 편의성 개선, 인스타그램/카카오톡 SNS api와 연동하여 챗봇의 편의성을 높임, 챗봇의 폰트/애니메이션테마/아이콘을 적용할수 있게 커스텀 기능 강화, 에디터 라이브러리를 적용하여 유저와 챗봇의 상호작용을 강화",
    bgColor: "#9ddbf8ff",
    imageUrl: "/image/works/image.png",
    techStack: ["React", "TypeScript", "Node.js", "Instagram API", "Kakao API"],
    highlights: ["QR코드 도입으로 접근성 40% 개선", "SNS 연동으로 사용자 편의성 향상", "커스텀 기능으로 만족도 증가"],
  },
  {
    id: 5,
    title: "02. 개인정보 탐지·마스킹 시스템",
    desc: "대용량 Excel 내 개인정보를 자동 탐지 마스킹해야 하며 외부 반출을 최소화, 헤더 식별 및 검증 | 선택 열 기반 마스킹 | 엑셀 재생성까지 파이프라인 구축, 수작업 대비 반복 업무 자동화, 마스킹 결과의 일관성을 확보, 대용량 파일에서도 안정 동작",
    bgColor: "#f9dcffff",
    imageUrl: "/image/works/masking.png",
    techStack: ["NextJS", "Gemma3", "Excel API", "AI"],
    highlights: ["수작업 대비 처리 시간 80% 단축", "대용량 파일 안정 처리", "자동화 파이프라인 구축"],
  },
  {
    id: 6,
    title: "03. 투자관리 사내 업무 관리 시스템",
    desc: "사용자 1000명 규모의 CJ 투자관리 시스템 프론트엔드 개발, 20개 UI 컴포넌트 공통화로 개발 효율성 40% 향상, 페이지 로딩속도 5초에서 1.5초로 최적화, 동적 탭 네비게이션 개발로 사용자 편의성 60% 개선",
    bgColor: "#d1ebf9ff",
    imageUrl: "/image/works/image.webp",
    techStack: ["React", "TypeScript", "Zustand", "React Query"],
    highlights: ["로딩속도 70% 개선 (5초→1.5초)", "개발 효율성 40% 향상", "1000명 규모 안정 운영"],
  },
  {
    id: 7,
    title: "04. CGV Her 프로젝트",
    desc: "영화 'Her' 이벤트를 위해 개발된 사용자와 음성 대화를 나누는 웹 애플리케이션, 프로젝트 전체 아키텍처 설계 및 핵심 기능 구현을 담당, 실시간 음성 스트리밍 구현, iOS Safari 호환성 구현, 대화 컨텍스트 시스템(장기 기억) 구현",
    bgColor: "#fff1d3ff",
    imageUrl: "/image/works/her.png",
    techStack: ["NextJS", "Web Audio API", "WebSocket", "OpenAI API"],
    highlights: ["실시간 음성 스트리밍 구현", "iOS Safari 호환성 확보", "AI 대화 컨텍스트 시스템 개발"],
  },
  {
    id: 8,
    title: "05. CGV 어시스턴트",
    desc: "CGV 영화 실관람평 모니터링 및 분석 서비스로 AI 기반 감정 분석과 유해 콘텐츠 탐지를 통해 실시간 리뷰 관리 및 통계 리포트를 제공하는 대시보드 애플리케이션",
    bgColor: "#fff1d3ff",
    imageUrl: "/image/works/cgv-ass.png",
    techStack: ["NextJS", "React", "Typescript", "Radix UI", "Recharts", "Supabase", "CloudFlare"],
    highlights: ["레이더 차트 구현", "감정 및 매력포인트 분석 기능", "메모 작성/수정 기능", "트렌드 차트 목업", "키워드 데이터 시각화", "CGV 데이터 최신화", "스토리 스크래핑", "AI 키워드 추출", "매력포인트 및 감정포인트 분석 로직 개발", "JSON-to-TXT 변환 기능 구현 등 데이터 분석 및 처리 작업 수행"],
  },
  {
    id: 9,
    title: "06. 라미앱",
    desc: "디바이스 AI 기술을 활용한 개인정보 보호 중심의 크로스플랫폼 AI 어시스턴트 모바일 앱. 모든 대화 이력과 AI 처리가 사용자 기기 내에서만 이루어지며 외부 서버로 데이터를 전송하지 않는 완전한 프라이버시 보장 솔루션",
    bgColor: "#fff1d3ff",
    imageUrl: "/image/works/235.png",
    techStack: ["React Native", " Expo", "Typescript", "ONNX Runtime","Legend State"],
    highlights: ["UI 디테일 및 사용자 경험 개선", "사이드바 인터랙션 개선", "세밀한 UI/UX 품질 향상 작업"],
  },
];

type WorksProps = {
  scrollRootRef?: React.RefObject<HTMLElement | null>;
};

export const Works = ({ scrollRootRef }: WorksProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [modalImage, setModalImage] = useState<{ url: string; title: string } | null>(null);

  const isActive = useRevealOnEnter(sectionRef, {
    root: scrollRootRef?.current ?? null,
    threshold: 0.1,
  });

  const introTransform = `translate(-300px, -700px) rotate(-30deg)`;

  useEffect(() => {
    const scroller: Window | HTMLElement =
      (scrollRootRef?.current as HTMLElement | null) ?? window;

    const pageNumRef = { current: 0 };

    const getScrollTop = () =>
      scroller === window ? window.scrollY : (scroller as HTMLElement).scrollTop;

    const getViewportH = () =>
      scroller === window ? window.innerHeight : (scroller as HTMLElement).clientHeight;

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
      document.body.style.background = `#f3f3f3`;
    };

    const onScrollEvent = () => {
      const workSection = Array.from(
        document.querySelectorAll<HTMLElement>('[id^="work-"]')
      );

      const scroll = getScrollTop();
      const vh = getViewportH();

      for (let i = 0; i < workSection.length; i++) {
        const top = getOffsetTop(workSection[i]);
        const h = workSection[i].offsetHeight;
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

    const add = (target: Window | HTMLElement) =>
      target.addEventListener("scroll", onScrollEvent, { passive: true });
    const remove = (target: Window | HTMLElement) =>
      target.removeEventListener("scroll", onScrollEvent);

    add(scroller);
    onScrollEvent();

    return () => remove(scroller);
  }, [scrollRootRef?.current]);

  // 모달 닫기 핸들러
  const closeModal = () => {
    setModalImage(null);
  };

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (modalImage) {
      document.addEventListener('keydown', handleEscape);
      // 스크롤 방지
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [modalImage]);

  return (
    <>
      <section
        ref={sectionRef}
        id="section-1"
        className="relative z-10 lg:py-20 py-12 bg-gradient-to-b from-white to-gray-50"
      >
        {/* 개선된 타이틀 */}
        <div className="text-center mb-16">
          <h2 className="text-[#665444] text-5xl lg:text-6xl font-extrabold mb-4">WORKS</h2>
          <p className="text-[#927650] text-lg lg:text-xl">프로젝트로 보는 성장 스토리</p>
        </div>

        <div className="max-w-6xl mx-auto px-4 space-y-12">
          {workData2.map((work, i) => (
            <div
              key={work.id}
              id={`work-${work.id}`}
              onMouseEnter={() => setHoveredId(work.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`
                bg-white rounded-2xl shadow-lg overflow-hidden
                transition-all duration-700 will-change-transform
                hover:shadow-2xl hover:-translate-y-2
                ${hoveredId === work.id ? 'scale-[1.02]' : 'scale-100'}
              `}
              style={{
                visibility: isActive ? "visible" : "hidden",
                opacity: isActive ? 1 : 0,
                transform: isActive ? "none" : introTransform,
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div className="flex lg:flex-row flex-col">
                {/* 이미지 섹션 */}
                <div 
                  className="lg:w-1/2 relative h-64 lg:h-auto overflow-hidden bg-gray-100 cursor-pointer group" 
                  onClick={() => setModalImage({ url: work.imageUrl, title: work.title })}
                >
                  <Image
                    src={work.imageUrl || ""}
                    alt={work.title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* 확대 힌트 */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm bg-black/50 px-3 py-1 rounded">
                      클릭하여 확대
                    </span>
                  </div>
                </div>

                {/* 내용 섹션 */}
                <div className="lg:w-1/2 p-6 lg:p-8">
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#665444] mb-4">
                    {work.title}
                  </h3>

                  {/* 설명 */}
                  <div className="space-y-2 mb-6">
                    {work.desc.split(",").map((desc, idx) => (
                      <p key={idx} className="text-sm lg:text-base text-gray-700 leading-relaxed">
                        • {desc.trim()}
                      </p>
                    ))}
                  </div>

                  {/* 기술 스택 */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[#927650] mb-2">🛠️ Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {work.techStack?.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-[#d8c5b3]/30 text-[#665444] rounded-full text-xs lg:text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 주요 성과 */}
                  <div>
                    <h4 className="text-sm font-semibold text-[#927650] mb-2">🎯 Key Achievements</h4>
                    <div className="space-y-1">
                      {work.highlights?.map((highlight, idx) => (
                        <p key={idx} className="text-xs lg:text-sm text-gray-600">
                          ✓ {highlight}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 이미지 모달 */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-100 bg-black/90 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10 cursor-pointer"
            aria-label="닫기"
          >
            ×
          </button>
          
          <div 
            className="relative w-full h-full max-w-6xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={modalImage.url}
              alt={modalImage.title}
              fill
              className="object-contain"
              quality={100}
            />
          </div>
        </div>
      )}
    </>
  );
};