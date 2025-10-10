"use client";
import { Deco } from "@/components/deco";
import {Hero} from "@/components/hero";
import { useRef } from "react";

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  return (
    <>
      <Hero ref={heroRef}/>
      {/* <Deco/> */}
    </>
  );
}
