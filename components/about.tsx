"use client";
import { useRef } from "react";
import { useRevealOnEnter } from "@/lib/hooks/useRevealOnEnter";
import Image from "next/image";

const aboutData = {
  id: 1,
  title: "개발자 이하진",
  description: [
    "'코드 한 줄이 사용자의 하루를 바꿀 수 있다'고 믿는 개발자 이하진입니다.",
    "복잡한 문제를 심플하게 해결하는 것을 좋아하며, 5초 걸리던 로딩을 1.5초로 줄이는 것에서 큰 성취감을 느낍니다.",
    "사용자가 '어? 이거 편하네'라고 느끼는 순간을 만들기 위해 고민합니다.",
    "팀과 함께 성장하는 것을 중요하게 생각하며, 팀 전체의 생산성을 높이기 위해 노력합니다.",
    "새로운 기술을 두려워하지 않고, 여러 기술을 넘나들며 최적의 솔루션을 찾아갑니다.",
  ],
  imageUrl: "/image/works/me.png",
};

const skillsData = {
  frontend: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Zustand", "React Query", "Valtio"],
  backend: ["Node.js", "Spring boot", "REST API"],
  tools: ["Git", "Figma", "Webpack", "Vite"],
  soft: ["성능 최적화", "팀 협업", "문제 해결", "UI/UX 개선"],
};

type AboutProps = {
  scrollRootRef?: React.RefObject<HTMLElement | null>;
};

export const About = ({ scrollRootRef }: AboutProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const isActive = useRevealOnEnter(sectionRef, {
    root: scrollRootRef?.current ?? null,
    threshold: 0.25,
  });

  const introTransform = `translate(-300px, -700px) rotate(-30deg)`;

  return (
    <section
      ref={sectionRef}
      id="section-2"
      className="relative z-10 py-20 bg-gradient-to-br from-[#d8c5b3] to-[#c9b299]"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* 타이틀 */}
        <h1 className="text-white text-4xl lg:text-5xl font-extrabold mb-12 text-center">
          ABOUT ME
        </h1>

        {/* 메인 소개 카드 */}
        <div
          className={`
            bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 lg:p-12 mb-12
            transition-all duration-700 will-change-transform
          `}
          style={{
            visibility: isActive ? "visible" : "hidden",
            opacity: isActive ? 1 : 0,
            transform: isActive ? "none" : introTransform,
          }}
        >
          <div className="lg:flex items-center gap-12">
            {/* 이미지 */}
            <div className="lg:w-1/3 mb-8 lg:mb-0">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={aboutData.imageUrl}
                  alt="이하진 프로필"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* 텍스트 */}
            <div className="lg:w-2/3">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#665444] mb-6">
                {aboutData.title}
              </h2>
              <div className="space-y-4">
                {aboutData.description.map((desc, i) => (
                  <p
                    key={i}
                    className="text-base lg:text-lg text-gray-700 leading-relaxed"
                  >
                    {desc}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 기술 스택 섹션 */}
        <div
          className={`
            grid lg:grid-cols-2 gap-6
            transition-all duration-700 will-change-transform
          `}
          style={{
            visibility: isActive ? "visible" : "hidden",
            opacity: isActive ? 1 : 0,
            transform: isActive ? "none" : introTransform,
            transitionDelay: "200ms",
          }}
        >
          {/* Frontend */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 lg:p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-[#665444] mb-4 flex items-center gap-2">
              <span>💻</span> Frontend
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillsData.frontend.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-gradient-to-r from-[#927650] to-[#a58764] text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Backend & Tools */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 lg:p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-[#665444] mb-4 flex items-center gap-2">
              <span>🛠️</span> Backend & Tools
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-[#927650] mb-2">Backend</h4>
                <div className="flex flex-wrap gap-2">
                  {skillsData.backend.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-[#d8c5b3]/50 text-[#665444] rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#927650] mb-2">Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {skillsData.tools.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-[#d8c5b3]/50 text-[#665444] rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Soft Skills */}
          <div className="lg:col-span-2 bg-white/95 backdrop-blur-md rounded-2xl p-6 lg:p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-[#665444] mb-4 flex items-center gap-2">
              <span>🎯</span> Core Strengths
            </h3>
            <div className="flex flex-wrap gap-3">
              {skillsData.soft.map((skill) => (
                <span
                  key={skill}
                  className="px-6 py-3 bg-gradient-to-r from-[#3a902f] to-[#2d7224] text-white rounded-full text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 경력 요약 */}
        <div
          className={`
            mt-12 bg-white/95 backdrop-blur-md rounded-2xl p-6 lg:p-8 shadow-lg
            transition-all duration-700 will-change-transform
          `}
          style={{
            visibility: isActive ? "visible" : "hidden",
            opacity: isActive ? 1 : 0,
            transform: isActive ? "none" : introTransform,
            transitionDelay: "400ms",
          }}
        >
          <h3 className="text-2xl font-bold text-[#665444] mb-6 text-center">
            📊 Career Highlights
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-4xl font-extrabold text-[#927650] mb-2">5+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-extrabold text-[#927650] mb-2">20+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-extrabold text-[#927650] mb-2">70%</div>
              <div className="text-gray-600">Performance Improved</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};