"use client";
import { About } from "@/components/about";
import Header from "@/components/header";
import {Hero} from "@/components/hero";
import { Works } from "@/components/works";
import { useRef } from "react";

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);

  return (
    <>
    <section className="h-full overflow-y-scroll scrollbar-none">
      <Header/>
      <Hero ref={heroRef}/>
      <Works/>
      <About/>
    </section>
    </>
  );
}
