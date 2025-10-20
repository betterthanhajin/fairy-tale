"use client";
import { useState } from "react";

export const Contact = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const contactLinks = [
    {
      id: "email",
      icon: "📧",
      label: "Email",
      href: "mailto:better.dev@kakao.com",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "github",
      icon: "💻",
      label: "GitHub",
      href: "https://github.com/betterthanhajin",
      color: "from-gray-700 to-gray-900",
    },
    {
      id: "linkedin",
      icon: "💼",
      label: "LinkedIn",
      href: "#",
      color: "from-blue-600 to-blue-700",
    },
  ];

  return (
    <section
      id="section-3"
      className="relative bg-gradient-to-br from-[#665444] to-[#4a3d32] w-full py-20 lg:py-32 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* 배경 장식 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* 타이틀 */}
        <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-4">
          Get In Touch
        </h2>
        
        {/* 서브타이틀 */}
        <p className="text-lg lg:text-xl text-white/90 mb-12 leading-relaxed">
          새로운 기회와 도전을 환영합니다. 
          <br className="lg:hidden" />
          언제든지 연락주세요! 🚀
        </p>

        {/* 연락처 링크 그리드 */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-12">
          {contactLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              onMouseEnter={() => setHoveredLink(link.id)}
              onMouseLeave={() => setHoveredLink(null)}
              className={`
                group relative
                bg-white/10 backdrop-blur-md
                hover:bg-white/20
                border border-white/20
                rounded-2xl p-6
                transition-all duration-300
                hover:scale-110 hover:-translate-y-2
                hover:shadow-2xl hover:shadow-white/20
                ${hoveredLink === link.id ? 'ring-2 ring-white/50' : ''}
              `}
            >
              {/* 아이콘 */}
              <div className="text-4xl lg:text-5xl mb-3 transition-transform duration-300 group-hover:scale-125">
                {link.icon}
              </div>
              
              {/* 라벨 */}
              <div className="text-white font-semibold text-sm lg:text-base">
                {link.label}
              </div>

              {/* 호버 효과 */}
              <div
                className={`
                  absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                  bg-gradient-to-br ${link.color}
                  transition-opacity duration-300 -z-10 blur-xl
                `}
              />
            </a>
          ))}
        </div>

        {/* CTA 버튼 */}
        <div className="space-y-4">
          <a
            href="mailto:better.dev@kakao.com"
            className="inline-block px-8 py-4 bg-white text-[#665444] font-bold text-lg rounded-full
                     hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-xl
                     shadow-lg"
          >
            📨 이메일 보내기
          </a>
          
          {/* 추가 정보 */}
          <p className="text-white/70 text-sm">
            평균 응답 시간: 24시간 이내
          </p>
        </div>
      </div>

      {/* 푸터 */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-white/50 text-sm">
          © 2025 LEE HAJIN ❤️
        </p>
      </div>
    </section>
  );
};