"use client";
import { Deco } from "@/components/deco";
import {Hero} from "@/components/hero";
import { Works } from "@/components/works";
import { useRef } from "react";

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  return (
    <>
    <section className="h-full overflow-y-scroll scrollbar-none">
      <Hero ref={heroRef}/>
      <Works/>
    </section>
    </>
  );
}
