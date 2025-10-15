// TreeSprout.tsx (같은 파일에 넣어도 OK)
import React from "react";

type TreeSproutProps = {
  left?: string;   // "50%" 같이 배치용
  top?: string;    // "60%"
  scale?: number;  // 전체 크기 배율
  delay?: number;  // 시작 지연(초)
  hue?: number;    // 90~150 사이 초록톤
};

export default function TreeSprout({
  left = "50%",
  top = "10%",
  scale = 1,
  delay = 0,
  hue = 120,
}: TreeSproutProps) {
  const leafColor = `hsl(${hue} 60% 40%)`;
  const trunkColor = `hsl(28 50% 35%)`;
  const canopyColor = `hsl(${hue} 45% 35%)`;
  const seedColor = `hsl(${hue} 55% 32%)`;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left,
        top,
        transform: `scale(${scale})`,
      }}
    >
      <svg width="160" height="220" viewBox="0 0 160 220" fill="none">
        {/* 줄기 */}
        <rect
          x="77"
          y="90"
          width="6"
          height="70"
          rx="3"
          fill={trunkColor}
          style={{
            transformBox: "fill-box",
            transformOrigin: "bottom",
            transform: "scaleY(0)",
            animation: `trunk-grow 900ms cubic-bezier(.2,.8,.2,1) ${delay + 0.35}s both`,
            filter: "drop-shadow(0 2px 2px rgba(0,0,0,.15))",
          }}
        />

        {/* 수관(동그란 나무 머리) */}
        <circle
          cx="80"
          cy="88"
          r="42"
          fill={canopyColor}
          style={{
            transformBox: "fill-box",
            transformOrigin: "bottom",
            transform: "scale(0)",
            animation: `canopy-grow 800ms cubic-bezier(.2,.8,.2,1) ${delay + 0.6}s both`,
            filter: "drop-shadow(0 6px 10px rgba(0,0,0,.2))",
          }}
        />
      </svg>

      {/* 애니메이션 키프레임 */}
      <style jsx>{`
        @keyframes seed-pop {
          0%   { transform: scale(0.2); opacity: 0; }
          70%  { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes trunk-grow {
          0%   { transform: scaleY(0); }
          80%  { transform: scaleY(1.05); }
          100% { transform: scaleY(1); }
        }
        @keyframes canopy-grow {
          0%   { transform: scale(0);   }
          70%  { transform: scale(1.06);}
          100% { transform: scale(1);   }
        }
        @keyframes leaf-pop {
          0%   { transform: scale(0) rotate(var(--r, 0deg)); opacity: 0; }
          100% { transform: scale(1) rotate(var(--r, 0deg)); opacity: 1; }
        }
        @keyframes sway {
          0%   { transform: rotate(-1.8deg) scale(1); }
          50%  { transform: rotate( 1.6deg) scale(1.01); }
          100% { transform: rotate(-1.8deg) scale(1); }
        }
      `}</style>
    </div>
  );
}
