"use client";
import { Deco } from "@/components/deco";
import Header from "@/components/header";
import {Hero} from "@/components/hero";
import { Works } from "@/components/works";
import { useRef, useEffect } from "react";

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);

  return (
    <>
    <section className="h-full overflow-y-scroll scrollbar-none">
      <Header/>
      <Hero ref={heroRef}/>
      <Works/>
    </section>
    </>
  );
}
