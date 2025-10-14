"use client";
import { About } from "@/components/about";
import Header from "@/components/header";
import {Hero} from "@/components/hero";
import { Works } from "@/components/works";
import { useRef } from "react";

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const outerScrollRef = useRef<HTMLElement | null>(null); // 외부 스크롤 컨테이너

  return (
    <section
      ref={outerScrollRef}
      className="h-full overflow-y-scroll scrollbar-none"  // ← 이게 외부 스크롤러
    >
      <Header/>
      <Hero ref={heroRef}/>
      {/* 외부 스크롤러를 Works에 넘겨줌 */}
      <Works scrollRootRef={outerScrollRef}/>
      {/* <About/> */}
    </section>
  );
}
