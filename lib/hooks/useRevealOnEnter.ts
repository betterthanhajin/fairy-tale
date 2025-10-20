"use client";
import { useEffect, useState } from "react";

export function useRevealOnEnter(
  targetRef: React.RefObject<HTMLElement | null>,
  options?: { root?: Element | null; threshold?: number }
) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect(); // 한 번만
        }
      },
      {
        root: options?.root ?? null,           // null = viewport
        threshold: options?.threshold ?? 0.2,  // 20% 보이면 발동
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [targetRef, options?.root, options?.threshold]);

  return active;
}
