"use client";

export const Header = () => {
  const navHandler = (idx: number) => {
    const sections = document.querySelectorAll<HTMLElement>('section[id^="section-"]');
    const target = sections[idx];
    if (target) {
      // window가 스크롤하는 페이지면 이게 가장 간단/안정적
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      // 고정 헤더가 가리면 CSS에서 해당 섹션들에 scroll-mt 적용:
      // <section id="section-1" className="scroll-mt-20">...</section>
    }
  };

  return (
    <nav className="p-4 backdrop-filter fixed left-0 right-0 top-0 z-[100]">
      <ul className="text-right font-bold text-white cursor-pointer nav-bar">
        <li onClick={() => navHandler(0)}>
          Home
        </li>
        <li onClick={() => navHandler(1)}>
          Works
        </li>
        <li onClick={() => navHandler(2)}>
          About
        </li>
        <li onClick={() => navHandler(3)}>
          Contact
        </li>
      </ul>
    </nav>
  );
};

export default Header;
