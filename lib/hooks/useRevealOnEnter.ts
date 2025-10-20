"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type UseRevealOptions = {
  /** 커스텀 스크롤 컨테이너. 모바일에서는 기본적으로 무시하고 viewport 사용 */
  root?: Element | null;
  /** IO threshold (기본 0.2) */
  threshold?: number | number[];
  /** IO rootMargin (기본 "0px") */
  rootMargin?: string;
  /** true면 최초 진입 시 한 번만 true로 전환 후 옵저버 해제 (기본 true) */
  once?: boolean;
  /** 모바일에서 root를 강제로 viewport(null)로 바꿀지 (기본 true) */
  mobileViewportFallback?: boolean;
};

export function useRevealOnEnter(
  targetRef: React.RefObject<HTMLElement | null>,
  options?: UseRevealOptions
) {
  const {
    root,
    threshold = 0.2,
    rootMargin = "0px",
    once = true,
    mobileViewportFallback = true,
  } = options ?? {};

  const [active, setActive] = useState(false);
  const ioRef = useRef<IntersectionObserver | null>(null);
  const manualFallbackUsedRef = useRef(false);

  const isClient = typeof window !== "undefined";
  const isMobile = isClient
    ? window.matchMedia?.("(max-width: 1024px)")?.matches ?? false
    : false;

  // iOS/모바일 안전: 모바일이면 root를 강제로 viewport(null)로.
  const effectiveRoot = useMemo<HTMLElement | null>(() => {
    if (!isClient) return null;
    if (mobileViewportFallback && isMobile) return null;
    return (root as HTMLElement | null) ?? null;
  }, [root, mobileViewportFallback, isMobile, isClient]);

  useEffect(() => {
    const el = targetRef.current;
    if (!isClient || !el || active) return;

    // 기존 옵저버 정리
    ioRef.current?.disconnect();
    ioRef.current = null;

    // IntersectionObserver 지원 여부 체크
    const hasIO = typeof IntersectionObserver !== "undefined";
    if (!hasIO) {
      // IO 미지원 → 수동 폴백
      manualCheck(); // 최초 1회 체크
      attachManualListeners();
      manualFallbackUsedRef.current = true;
      return () => detachManualListeners();
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setActive(true);
          if (once) {
            io.disconnect();
            ioRef.current = null;
            detachManualListeners();
          }
        }
      },
      {
        root: effectiveRoot,
        threshold,
        rootMargin,
      }
    );

    io.observe(el);
    ioRef.current = io;

    // IO가 불안정한 환경(iOS Safari 등) 대비: 보조 폴백도 함께 건다
    attachManualListeners();
    manualFallbackUsedRef.current = true;

    return () => {
      io.disconnect();
      ioRef.current = null;
      detachManualListeners();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetRef.current, effectiveRoot, threshold, rootMargin, once, isClient, active]);

  // ----- 수동 폴백: 뷰포트(또는 root)와의 교차 여부를 직접 계산 -----
  const getRootBox = () => {
    if (!isClient) return null;
    if (!effectiveRoot) {
      return {
        top: 0,
        left: 0,
        right: window.innerWidth,
        bottom: window.innerHeight,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
    const r = effectiveRoot.getBoundingClientRect();
    return {
      top: r.top,
      left: r.left,
      right: r.right,
      bottom: r.bottom,
      width: r.width,
      height: r.height,
    };
  };

  const isIntersectingManually = () => {
    const el = targetRef.current;
    if (!el) return false;
    const rootBox = getRootBox();
    if (!rootBox) return false;
    const rect = el.getBoundingClientRect();

    // threshold를 단일 수치로 환산 (배열이면 최소값 사용)
    const thr = Array.isArray(threshold) ? Math.min(...threshold) : threshold;

    // 요소의 가시 필요 영역(비율)
    const requiredW = rect.width * thr;
    const requiredH = rect.height * thr;

    // 교차 영역 계산
    const interLeft = Math.max(rect.left, rootBox.left);
    const interTop = Math.max(rect.top, rootBox.top);
    const interRight = Math.min(rect.right, rootBox.right);
    const interBottom = Math.min(rect.bottom, rootBox.bottom);

    const interW = Math.max(0, interRight - interLeft);
    const interH = Math.max(0, interBottom - interTop);

    return interW >= requiredW && interH >= requiredH;
  };

  const manualCheck = () => {
    if (active) return;
    if (isIntersectingManually()) {
      setActive(true);
      if (once) detachManualListeners();
      // IO가 살아있다면 해제
      ioRef.current?.disconnect();
      ioRef.current = null;
    }
  };

  const attachManualListeners = () => {
    if (!isClient) return;
    window.addEventListener("scroll", manualCheck, { passive: true });
    window.addEventListener("resize", manualCheck);
    // layout 안정 이후 한 번 더 체크
    requestAnimationFrame(() => manualCheck());
    setTimeout(() => manualCheck(), 200);
  };

  const detachManualListeners = () => {
    if (!isClient) return;
    window.removeEventListener("scroll", manualCheck as any);
    window.removeEventListener("resize", manualCheck as any);
  };

  return active;
}
